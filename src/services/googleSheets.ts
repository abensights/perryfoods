import { cleanText, isValidOrderId } from '../utils/cart';

export const PERRY_APPS_SCRIPT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxSLRcEka9z_KTqVpcHuA8Qfi2-LZCC7XYzzsxg0OO_g3cPuQhC_wQvoXPqjhnHXEjJ/exec';

export interface OrderSheetPayload {
  orderNo: string;
  customerName: string;
  orderDate: string;
  eventDeliveryDate: string;
  phoneNumber?: string;
  deliveryLocation?: string;
  totalAmountBirr: number;
  bankName: string;
  accountNumber: string;
  paymentSms: string;
  remark?: string;
  itemsSummary: string;
  orderVerified?: string;
  orderDelivered?: string;
  deliveryOption?: 'pickup' | 'delivery';
  deliveryAddress?: string;
  deliveryLocationUrl?: string;
  deliveryCoordinates?: { lat: number; lng: number };
  deliveryFee?: number;
}

export interface LiveSheetOrder {
  orderNo: string;
  customerName: string;
  itemsSummary: string;
  deliveryDate: string;
  phoneNumber?: string;
  location?: string;
  totalAmount: string;
  bank: string;
  account: string;
  sms: string;
  orderVerified: string;
  orderDelivered: string;
}

/**
 * H3, H4 & Audit Fix — Register order via single authenticated POST request.
 * - Requires explicit json.status === 'success' from backend.
 * - Removes false-success GET fallback entirely.
 * - Eliminates duplicate Firestore writes (managed authoritative caller).
 */
export async function appendOrderToGoogleSheet(
  order: OrderSheetPayload
): Promise<{ success: boolean; message: string }> {
  const totalNum = Math.max(0, Number(order.totalAmountBirr) || 0);

  const payload = {
    action: 'register',
    orderNo: cleanText(order.orderNo, 30),
    name: cleanText(order.customerName, 100),
    orderType: cleanText(order.itemsSummary || 'Catering', 1000),
    eventDate: cleanText(order.eventDeliveryDate || 'TBD', 30),
    phoneNumber: cleanText(order.phoneNumber || 'N/A', 30),
    location: cleanText(order.deliveryLocation || 'N/A', 250),
    totalAmount: `${totalNum.toLocaleString()} Birr`,
    bank: cleanText(order.bankName, 50),
    account: cleanText(order.accountNumber, 50),
    sms: cleanText(order.paymentSms, 250),
    orderVerified: 'Pending',
    orderDelivered: 'Pending',
  };

  try {
    const res = await fetch(PERRY_APPS_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        success: false,
        message: `Order server responded with status ${res.status}. Please try again.`,
      };
    }

    const json = await res.json();
    if (json && json.status === 'success') {
      return {
        success: true,
        message: json.message || 'Order registered successfully!',
      };
    }

    return {
      success: false,
      message: json?.message || 'Order registration could not be verified by the server. Please retry.',
    };
  } catch (err) {
    console.warn('Order registration network error:', err);
    return {
      success: false,
      message: 'Network connection issue while submitting order. Please check your internet connection and tap Submit again.',
    };
  }
}


/**
 * H2 — Sanitized order status check by Order ID only.
 * Client sends strictly the Order ID (never personal names or phone numbers to the server).
 * Response returns only status and summary fields, stripping customer contact/payment data.
 */
export async function fetchOrderFromWebApp(orderNo: string): Promise<LiveSheetOrder | null> {
  const cleanNo = orderNo.trim();
  if (!cleanNo) return null;

  // Validate format: must be valid order ID (e.g. PF-K7M2QX9TDAR4W89P or legacy PF-123456)
  if (!isValidOrderId(cleanNo) && !/^PF-[A-Za-z0-9]{6,24}$/i.test(cleanNo) && !/^\d{6,10}$/.test(cleanNo)) {
    return null;
  }

  try {
    const url = `${PERRY_APPS_SCRIPT_WEB_APP_URL}?action=check&orderNo=${encodeURIComponent(cleanNo)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const data = await res.json();

    if (data && data.status === 'found' && data.order) {
      const o = data.order;
      // Return only sanitized non-PII fields
      return {
        orderNo: String(o.orderNo || cleanNo).trim(),
        customerName: cleanText(o.customerName || 'Valued Client', 100),
        itemsSummary: cleanText(o.orderType || o.itemsSummary || 'Catering', 500),
        deliveryDate: cleanText(o.eventDate || o.deliveryDate || 'TBD', 30),
        phoneNumber: '', // Stripped to protect PII
        location: '', // Stripped to protect PII
        totalAmount: cleanText(o.totalAmount || '', 30),
        bank: cleanText(o.bank || '', 50),
        account: '', // Stripped to protect PII
        sms: '', // Stripped to protect PII
        orderVerified: String(o.orderVerified ?? 'Pending').trim(),
        orderDelivered: String(o.orderDelivered ?? 'Pending').trim(),
      };
    }
  } catch (err) {
    console.warn('Apps Script Web App check notice:', err);
  }
  return null;
}
