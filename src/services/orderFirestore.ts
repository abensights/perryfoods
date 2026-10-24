import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  limit,
  updateDoc,
} from 'firebase/firestore';
import { db, auth } from './auth';
import { OrderSheetPayload, LiveSheetOrder } from './googleSheets';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.warn('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Normalizes phone numbers to standard 10-digit format (e.g. 0911458705 or 0712345678)
 */
export const normalizePhoneDigits = (phone: string | undefined | null): string => {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('251') && digits.length >= 12) {
    digits = '0' + digits.slice(3);
  } else if (!digits.startsWith('0') && (digits.length === 9 || digits.length === 10)) {
    digits = '0' + digits;
  }
  return digits;
};

/**
 * Normalizes text for case-insensitive matching
 */
export const normalizeAlphanumeric = (str: string | undefined | null): string => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

/**
 * Persists an order into Firestore
 */
export async function saveOrderToFirestore(order: OrderSheetPayload): Promise<void> {
  const cleanOrderNo = order.orderNo.trim();
  if (!cleanOrderNo) return;

  const path = `orders/${cleanOrderNo}`;
  try {
    const rawPhone = order.phoneNumber || '';
    const phoneDigits = normalizePhoneDigits(rawPhone);

    const docData = {
      orderNo: cleanOrderNo,
      customerName: order.customerName.trim(),
      customerNameLower: order.customerName.toLowerCase().trim(),
      phoneNumber: rawPhone,
      phoneDigits,
      orderDate: order.orderDate || new Date().toISOString().split('T')[0],
      eventDeliveryDate: order.eventDeliveryDate || 'TBD',
      deliveryOption: order.deliveryOption || 'pickup',
      deliveryLocation: order.deliveryLocation || 'N/A',
      deliveryAddress: order.deliveryAddress || '',
      deliveryFee: Number(order.deliveryFee || 0),
      totalAmountBirr: Number(order.totalAmountBirr || 0),
      totalAmount: `${order.totalAmountBirr.toLocaleString()} Birr`,
      itemsSummary: order.itemsSummary || 'Catering',
      bankName: order.bankName || 'N/A',
      accountNumber: order.accountNumber || 'N/A',
      paymentSms: order.paymentSms || '',
      remark: order.remark || '',
      orderVerified: order.orderVerified || 'Pending',
      orderDelivered: order.orderDelivered || 'Pending',
      createdAt: Date.now(),
    };

    await setDoc(doc(db, 'orders', cleanOrderNo), docData);
  } catch (error) {
    console.warn('Failed to save order to Firestore:', error);
  }
}

/**
 * Strict exact matching helper:
 * Matches an order ONLY if the query exactly matches:
 * 1. Order ID (neglecting PF- prefix, special characters, and leading/trailing zeros)
 * 2. Customer Name (neglecting special characters and leading/trailing zeros/spaces, case-insensitive)
 * 3. Phone Number (neglecting +251 country code, special characters, and leading/trailing zeros)
 *
 * Excludes all partial/related substring matches.
 */
export const isStrictExactOrderMatch = (
  searchQuery: string,
  target: {
    orderNo?: string;
    customerName?: string;
    phoneNumber?: string;
    phone?: string;
  }
): boolean => {
  const q = searchQuery.trim();
  if (!q) return false;

  // 1. Strict Exact Order ID match
  if (target.orderNo) {
    const cleanCore = (s: string) =>
      s
        .trim()
        .replace(/^pf-?/i, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^0+|0+$/g, '')
        .toLowerCase();

    const cleanFull = (s: string) =>
      s
        .trim()
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^0+|0+$/g, '')
        .toLowerCase();

    const qCore = cleanCore(q);
    const targetCore = cleanCore(target.orderNo);
    const qFull = cleanFull(q);
    const targetFull = cleanFull(target.orderNo);

    if (qCore && targetCore && qCore === targetCore) return true;
    if (qFull && targetFull && qFull === targetFull) return true;
  }

  // 2. Strict Exact Customer Name match
  if (target.customerName) {
    const cleanName = (s: string) =>
      s
        .trim()
        // Strip leading/trailing non-letters and zeros
        .replace(/^[^a-zA-Z1-9]+/, '')
        .replace(/[^a-zA-Z1-9]+$/, '')
        .replace(/\s+/g, ' ')
        .toLowerCase();

    const qName = cleanName(q);
    const targetName = cleanName(target.customerName);

    if (qName && targetName && qName === targetName) {
      return true;
    }
  }

  // 3. Strict Exact Phone Number match
  const rawTargetPhone = target.phoneNumber || target.phone || '';
  if (rawTargetPhone) {
    const cleanPhone = (s: string) => {
      let digits = s.replace(/\D/g, '');
      if (digits.startsWith('251') && digits.length >= 11) {
        digits = digits.slice(3);
      }
      return digits.replace(/^0+/, '');
    };

    const qPhone = cleanPhone(q);
    const tPhone = cleanPhone(rawTargetPhone);

    if (qPhone && tPhone && qPhone.length >= 7) {
      if (qPhone === tPhone) return true;
      // Also allow if 0 was added before or after
      const qPhoneNoTrailing = qPhone.replace(/0+$/, '');
      const tPhoneNoTrailing = tPhone.replace(/0+$/, '');
      if (
        qPhoneNoTrailing &&
        tPhoneNoTrailing &&
        qPhoneNoTrailing.length >= 7 &&
        qPhoneNoTrailing === tPhoneNoTrailing
      ) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Searches orders in Firestore by exact Order ID, Customer Name, or Phone Number
 */
export async function searchOrdersInFirestore(searchQuery: string): Promise<LiveSheetOrder[]> {
  const q = searchQuery.trim();
  if (!q) return [];

  const matches: LiveSheetOrder[] = [];
  const seenOrderNos = new Set<string>();

  try {
    // 1. Direct lookup by exact Order ID (e.g. PF-123456 or 123456)
    const candidateIds = [q];
    if (!q.toUpperCase().startsWith('PF-')) {
      candidateIds.push(`PF-${q}`);
    } else {
      candidateIds.push(q.replace(/^PF-?/i, ''));
    }

    for (const cand of candidateIds) {
      try {
        const snap = await getDoc(doc(db, 'orders', cand));
        if (snap.exists()) {
          const data = snap.data();
          if (isStrictExactOrderMatch(q, data)) {
            const normNo = normalizeAlphanumeric(data.orderNo);
            if (!seenOrderNos.has(normNo)) {
              seenOrderNos.add(normNo);
              matches.push({
                orderNo: data.orderNo,
                customerName: data.customerName || '',
                itemsSummary: data.itemsSummary || '',
                deliveryDate: data.eventDeliveryDate || data.deliveryDate || '',
                phoneNumber: data.phoneNumber || '',
                location: data.deliveryLocation || data.location || '',
                totalAmount: data.totalAmount || `${Number(data.totalAmountBirr || 0).toLocaleString()} Birr`,
                bank: data.bankName || data.bank || '',
                account: data.accountNumber || data.account || '',
                sms: data.paymentSms || data.sms || '',
                orderVerified: data.orderVerified || 'Pending',
                orderDelivered: data.orderDelivered || 'Pending',
              });
            }
          }
        }
      } catch {
        // continue
      }
    }

    // 2. Scan recent orders from Firestore collection and match strictly
    const colRef = collection(db, 'orders');
    const qSnapshot = await getDocs(query(colRef, limit(200)));

    qSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const orderNo = String(data.orderNo || docSnap.id || '').trim();
      const normNo = normalizeAlphanumeric(orderNo);
      if (seenOrderNos.has(normNo)) return;

      if (isStrictExactOrderMatch(q, data)) {
        seenOrderNos.add(normNo);
        matches.push({
          orderNo,
          customerName: String(data.customerName || ''),
          itemsSummary: String(data.itemsSummary || ''),
          deliveryDate: String(data.eventDeliveryDate || data.deliveryDate || ''),
          phoneNumber: String(data.phoneNumber || ''),
          location: String(data.deliveryLocation || data.location || ''),
          totalAmount: String(data.totalAmount || `${Number(data.totalAmountBirr || 0).toLocaleString()} Birr`),
          bank: String(data.bankName || data.bank || ''),
          account: String(data.accountNumber || data.account || ''),
          sms: String(data.paymentSms || data.sms || ''),
          orderVerified: String(data.orderVerified || 'Pending'),
          orderDelivered: String(data.orderDelivered || 'Pending'),
        });
      }
    });
  } catch (error) {
    console.warn('Error reading from Firestore orders:', error);
  }

  return matches;
}

/**
 * Updates order verification / delivery status in Firestore
 */
export async function updateOrderStatusInFirestore(
  orderNo: string,
  updates: { orderVerified?: string; orderDelivered?: string }
): Promise<void> {
  const cleanOrderNo = orderNo.trim();
  if (!cleanOrderNo) return;

  try {
    const docRef = doc(db, 'orders', cleanOrderNo);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Date.now(),
    });
  } catch (err) {
    // If updateDoc fails (e.g. doc doesn't exist yet), ignore silently
  }
}
