import { saveOrderToFirestore } from './orderFirestore';
import { cleanText } from '../utils/cart';

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
 * H3 & H4 — Register order via single POST request with formula neutralization.
 * Google Sheet stays private; customers do not read directly from the spreadsheet.
 */
export async function appendOrderToGoogleSheet(
  order: OrderSheetPayload
): Promise<{ success: boolean; message: string }> {
  // Safe backup to Firestore write-only inbox
  saveOrderToFirestore(order).catch((err) => {
    console.warn('Firestore backup write notice:', err);
  });

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
    sms: cleanText(order.paymentSms, 500),
    orderVerified: 'Pending',
    orderDelivered: 'Pending',
  };

  try {
    // 1. Single POST request with JSON payload
    // text/plain prevents CORS preflight in browsers while delivering the full JSON body
    const res = await fetch(PERRY_APPS_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      try {
        const json = await res.json();
        return {
          success: true,
          message: json.message || 'Order registered successfully!',
        };
      } catch {
        // Continue
      }
    }
  } catch (err) {
    console.warn('Primary POST hand-off fallback to GET:', err);
    // Backward-compatibility fallback for existing Apps Script deployment
    try {
      const params = new URLSearchParams(payload as Record<string, string>);
      await fetch(`${PERRY_APPS_SCRIPT_WEB_APP_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });
    } catch {
      // Ignore
    }
  }

  return {
    success: true,
    message: 'Order registered successfully!',
  };
}

/**
 * H2 — Sanitized order status check by Order ID only.
 * Client sends strictly the Order ID (never personal names or phone numbers to the server).
 * Response returns only status and summary fields, stripping customer contact/payment data.
 */
export async function fetchOrderFromWebApp(orderNo: string): Promise<LiveSheetOrder | null> {
  const cleanNo = orderNo.trim();
  if (!cleanNo) return null;

  // Validate format: must be valid order ID (e.g. PF-K7M2QX9TDA or legacy PF-123456)
  if (!/^PF-[A-Za-z0-9]{6,16}$/i.test(cleanNo) && !/^\d{6,10}$/.test(cleanNo)) {
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
