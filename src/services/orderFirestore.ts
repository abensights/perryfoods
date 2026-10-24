import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { OrderSheetPayload, LiveSheetOrder } from './googleSheets';
import { cleanText, sanitizePaymentSms } from '../utils/cart';

/**
 * Normalizes phone numbers to standard format (e.g. 0911458705 or 0712345678)
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
 * Normalizes text for case-insensitive exact matching
 */
export const normalizeAlphanumeric = (str: string | undefined | null): string => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

/**
 * C1/C2 — Persists a validated new order into Firestore.
 * Document ID strictly equals orderNo.
 * Orders collection is write-only inbox: update/delete/list are denied in rules.
 * Status is forced to 'Pending'. Formulas are neutralized.
 */
export async function saveOrderToFirestore(order: OrderSheetPayload): Promise<void> {
  const cleanOrderNo = order.orderNo.trim();
  if (!cleanOrderNo) return;

  try {
    const rawPhone = cleanText(order.phoneNumber || '', 30);
    const phoneDigits = normalizePhoneDigits(rawPhone).slice(0, 20);
    const totalAmountBirr = Math.max(0, Math.min(1000000, Number(order.totalAmountBirr) || 0));

    const docData = {
      orderNo: cleanOrderNo,
      customerName: cleanText(order.customerName, 100),
      customerNameLower: cleanText(order.customerName.toLowerCase(), 100),
      phoneNumber: rawPhone,
      phoneDigits,
      orderDate: cleanText(order.orderDate || new Date().toISOString().split('T')[0], 30),
      eventDeliveryDate: cleanText(order.eventDeliveryDate || 'TBD', 50),
      deliveryOption: order.deliveryOption === 'delivery' ? 'delivery' : 'pickup',
      deliveryLocation: cleanText(order.deliveryLocation || 'N/A', 300),
      deliveryAddress: cleanText(order.deliveryAddress || '', 300),
      deliveryFee: Math.max(0, Math.min(100000, Number(order.deliveryFee) || 0)),
      totalAmountBirr,
      totalAmount: `${totalAmountBirr.toLocaleString()} Birr`,
      itemsSummary: cleanText(order.itemsSummary || 'Catering', 1000),
      bankName: cleanText(order.bankName || 'N/A', 50),
      accountNumber: cleanText(order.accountNumber || 'N/A', 50),
      paymentSms: sanitizePaymentSms(order.paymentSms || '', 250),
      remark: cleanText(order.remark || '', 300),
      // C2: Status forced to 'Pending' on creation
      orderVerified: 'Pending',
      orderDelivered: 'Pending',
      createdAt: Date.now(),
    };

    await setDoc(doc(db, 'orders', cleanOrderNo), docData);
  } catch (error) {
    console.warn('Firestore write warning:', error);
  }
}

/**
 * M1 — Strict exact matching helper for local device orders.
 * Matches an order ONLY if the query exactly matches:
 * 1. Order ID (e.g. PF-K7M2QX9TDA or K7M2QX9TDA)
 * 2. Customer Name (exact full name, case-insensitive)
 * 3. Phone Number (exact normalized phone digits)
 *
 * No lossy zero-stripping or substring matching.
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

  // 1. Exact Order ID match
  if (target.orderNo) {
    const cleanId = (s: string) => s.trim().toUpperCase().replace(/^PF-?/, '');
    const qClean = cleanId(q);
    const targetClean = cleanId(target.orderNo);
    if (qClean && targetClean && qClean === targetClean) return true;
  }

  // 2. Exact Customer Name match
  if (target.customerName) {
    const qName = q.trim().toLowerCase().replace(/\s+/g, ' ');
    const tName = target.customerName.trim().toLowerCase().replace(/\s+/g, ' ');
    if (qName && tName && qName === tName) return true;
  }

  // 3. Exact Phone Number match
  const rawTargetPhone = target.phoneNumber || target.phone || '';
  if (rawTargetPhone) {
    const qDigits = normalizePhoneDigits(q);
    const tDigits = normalizePhoneDigits(rawTargetPhone);
    if (qDigits && tDigits && qDigits.length >= 9 && qDigits === tDigits) {
      return true;
    }
  }

  return false;
};

/**
 * C1 — Firestore orders collection is write-only inbox per security rules.
 * Client does not download or enumerate other customers' orders from Firestore.
 */
export async function searchOrdersInFirestore(_searchQuery: string): Promise<LiveSheetOrder[]> {
  return [];
}
