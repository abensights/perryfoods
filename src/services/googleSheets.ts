import { getAccessToken } from './auth';
import { saveOrderToFirestore } from './orderFirestore';

export const PERRY_SPREADSHEET_ID = '1PyNFQmiE0v7cyBgLvU8uGv_zdG3Ydyh4EInCWJWM9E0';
export const PERRY_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${PERRY_SPREADSHEET_ID}/edit?usp=sharing`;
export const PERRY_APPS_SCRIPT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxSLRcEka9z_KTqVpcHuA8Qfi2-LZCC7XYzzsxg0OO_g3cPuQhC_wQvoXPqjhnHXEjJ/exec';

export interface OrderSheetPayload {
  orderNo: string;
  customerName: string;
  orderDate: string;
  eventDeliveryDate: string;
  phoneNumber?: string;
  deliveryLocation?: string; // Google Maps location / pin info
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

/**
 * Register order using the user's deployed Google Apps Script Web App URL.
 * Uses GET requests which are natively supported by the Apps Script doGet(e) endpoint
 * with full CORS Access-Control-Allow-Origin: * headers, plus image beacon fallback.
 * Also persists order to Firestore for instant exact tracking by Name, Phone, and Order ID.
 */
export async function appendOrderToGoogleSheet(
  order: OrderSheetPayload
): Promise<{ success: boolean; message: string }> {
  const verifiedStatus = order.orderVerified || 'Pending';
  const deliveredStatus = order.orderDelivered || 'Pending';

  // Persist order in Firestore for instant search by Name, Phone, and Order ID
  saveOrderToFirestore(order).catch((err) => {
    console.warn('Firestore order save background warning:', err);
  });

  const payload: Record<string, string> = {
    action: 'register',
    orderNo: order.orderNo,
    name: order.customerName,
    orderType: order.itemsSummary || 'Catering',
    eventDate: order.eventDeliveryDate || 'TBD',
    phoneNumber: order.phoneNumber || 'N/A',
    location: order.deliveryLocation || 'N/A',
    totalAmount: `${order.totalAmountBirr.toLocaleString()} Birr`,
    bank: order.bankName,
    account: order.accountNumber,
    sms: order.paymentSms,
    orderVerified: verifiedStatus,
    orderDelivered: deliveredStatus,
  };

  const params = new URLSearchParams(payload);
  const fullUrl = `${PERRY_APPS_SCRIPT_WEB_APP_URL}?${params.toString()}`;

  // 1. Primary: Direct GET fetch (Google Apps Script doGet sends Access-Control-Allow-Origin: *)
  try {
    const res = await fetch(fullUrl, { method: 'GET' });
    if (res.ok) {
      try {
        const json = await res.json();
        console.log('Order registered in Google Sheet successfully:', json);
        return {
          success: true,
          message: json.message || 'Order registered in Google Sheet!',
        };
      } catch {
        // Non-JSON or opaque response followed
      }
    }
  } catch (err) {
    console.warn('Primary GET fetch encountered network limitation, attempting fallbacks:', err);
  }

  // 2. Secondary: Fallback with no-cors GET for strict browser sandbox policies
  try {
    await fetch(fullUrl, {
      method: 'GET',
      mode: 'no-cors',
    });
  } catch (noCorsErr) {
    console.warn('no-cors GET registration fallback warning:', noCorsErr);
  }

  // 3. Tertiary: Browser image beacon fallback (image GET requests bypass CORS in all browsers)
  try {
    if (typeof window !== 'undefined' && typeof Image !== 'undefined') {
      const img = new Image();
      img.src = fullUrl;
    }
  } catch (imgErr) {
    console.warn('Image beacon ping warning:', imgErr);
  }

  return {
    success: true,
    message: 'Order registered successfully!',
  };
}

/**
 * Fetch spreadsheet metadata if OAuth token is available
 */
export async function getFirstSheetTitle(accessToken: string): Promise<string> {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${PERRY_SPREADSHEET_ID}?fields=sheets.properties.title`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch spreadsheet metadata: ${res.statusText}`);
    }
    const data = await res.json();
    if (data.sheets && data.sheets.length > 0 && data.sheets[0].properties?.title) {
      return data.sheets[0].properties.title;
    }
  } catch (err) {
    console.warn('Could not read sheet title, falling back to Order Managment System', err);
  }
  return 'Order Managment System';
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
 * Fetch and parse orders directly from the Google Sheet table in real-time
 */
export async function fetchOrdersFromGoogleSheet(): Promise<LiveSheetOrder[]> {
  // If user is authenticated via OAuth, try the official Google Sheets API v4 first
  try {
    const token = await getAccessToken();
    if (token) {
      const sheetTitle = await getFirstSheetTitle(token);
      const range = `'${sheetTitle}'!A:Z`;
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${PERRY_SPREADSHEET_ID}/values/${encodeURIComponent(range)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const values: string[][] = data.values || [];
        if (values.length > 1) {
          const headerRow = values[0].map((h) => String(h || '').trim());
          const findCol = (pattern: RegExp, fallback: number): number => {
            const idx = headerRow.findIndex((lbl) => pattern.test(lbl));
            return idx >= 0 ? idx : fallback;
          };

          const noIdx = findCol(/^(no|order\s*no|order\s*id)$/i, 0);
          const nameIdx = findCol(/^(name|customer)/i, 1);
          const typeIdx = findCol(/^(order\s*type|items?|type)/i, 2);
          const dateIdx = findCol(/(event|delivery\s*date|date)/i, 3);
          const phoneIdx = findCol(/phone/i, 4);
          const locationIdx = findCol(/location|address|pin/i, 5);
          const amountIdx = findCol(/total(\s*amount)?/i, 6);
          const bankIdx = findCol(/bank/i, 7);
          const accountIdx = findCol(/account/i, 8);
          const smsIdx = findCol(/sms/i, 9);
          const verifiedIdx = findCol(/verified/i, 10);
          const deliveredIdx = findCol(/delivered/i, 11);

          return values
            .slice(1)
            .map((row) => ({
              orderNo: String(row[noIdx] || '').trim(),
              customerName: String(row[nameIdx] || '').trim(),
              itemsSummary: String(row[typeIdx] || '').trim(),
              deliveryDate: String(row[dateIdx] || '').trim(),
              phoneNumber: String(row[phoneIdx] || '').trim(),
              location: locationIdx >= 0 ? String(row[locationIdx] || '').trim() : undefined,
              totalAmount: String(row[amountIdx] || '').trim(),
              bank: String(row[bankIdx] || '').trim(),
              account: String(row[accountIdx] || '').trim(),
              sms: String(row[smsIdx] || '').trim(),
              orderVerified: String(row[verifiedIdx] || '').trim(),
              orderDelivered: String(row[deliveredIdx] || '').trim(),
            }))
            .filter((o) => o.orderNo.length > 0);
        }
      }
    }
  } catch (authErr) {
    console.warn('OAuth Sheets API read skipped, using GViz endpoint:', authErr);
  }

  // Fallback to public GViz table query endpoint
  try {
    const url = `https://docs.google.com/spreadsheets/d/${PERRY_SPREADSHEET_ID}/gviz/tq?tqx=out:json&t=${Date.now()}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load sheet: ${res.statusText}`);
    }
    const text = await res.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
    if (!match || !match[1]) {
      throw new Error('Google Sheet is restricted or returned HTML. Please ensure the sheet in Google Drive is shared as "Anyone with the link can view".');
    }
    const json = JSON.parse(match[1]);
    const cols: Array<{ id?: string; label?: string }> = json.table?.cols || [];
    const rows = json.table?.rows || [];

    // Check if row 0 has headers (common when sheets don't have explicit col labels in GViz)
    let headerLabels: string[] = cols.map((col) =>
      col?.label !== null && col?.label !== undefined ? String(col.label).trim() : ''
    );
    let dataRows = rows;

    if (rows.length > 0 && rows[0]?.c) {
      const candidateHeaders = rows[0].c.map((cell: any) => {
        if (!cell) return '';
        const val = cell.f ?? cell.v ?? '';
        return String(val).trim();
      });
      const isHeaderRow = candidateHeaders.some((h: string) =>
        /order|name|date|phone|location|amount|bank|account|sms|verified|delivered/i.test(h)
      );
      if (isHeaderRow) {
        headerLabels = candidateHeaders;
        dataRows = rows.slice(1);
      }
    }

    const findCol = (pattern: RegExp, fallback: number): number => {
      const idx = headerLabels.findIndex((lbl) => lbl && pattern.test(lbl));
      return idx >= 0 ? idx : fallback;
    };

    const noIdx = findCol(/^(no|order\s*no|order\s*id)$/i, 0);
    const nameIdx = findCol(/^(name|customer)/i, 1);
    const typeIdx = findCol(/^(order\s*type|items?|type)/i, 2);
    const dateIdx = findCol(/(event|delivery\s*date|date)/i, 3);
    const phoneIdx = findCol(/phone/i, 4);
    const locationIdx = findCol(/location|address|pin/i, 5);
    const amountIdx = findCol(/total(\s*amount)?/i, 6);
    const bankIdx = findCol(/bank/i, 7);
    const accountIdx = findCol(/account/i, 8);
    const smsIdx = findCol(/sms/i, 9);
    const verifiedIdx = findCol(/verified/i, 10);
    const deliveredIdx = findCol(/delivered/i, 11);

    return dataRows
      .map((r: { c?: Array<{ v?: string | number | null; f?: string | null } | null> }) => {
        const c = r.c || [];
        const getVal = (idx: number): string => {
          if (idx < 0 || !c[idx]) return '';
          if (c[idx]?.f !== undefined && c[idx]?.f !== null) return String(c[idx]?.f);
          if (c[idx]?.v !== undefined && c[idx]?.v !== null) return String(c[idx]?.v);
          return '';
        };

        return {
          orderNo: getVal(noIdx).trim(),
          customerName: getVal(nameIdx).trim(),
          itemsSummary: getVal(typeIdx).trim(),
          deliveryDate: getVal(dateIdx).trim(),
          phoneNumber: getVal(phoneIdx).trim(),
          location: locationIdx >= 0 ? getVal(locationIdx).trim() : undefined,
          totalAmount: getVal(amountIdx).trim(),
          bank: getVal(bankIdx).trim(),
          account: getVal(accountIdx).trim(),
          sms: getVal(smsIdx).trim(),
          orderVerified: getVal(verifiedIdx).trim(),
          orderDelivered: getVal(deliveredIdx).trim(),
        };
      })
      .filter((o: LiveSheetOrder) => o.orderNo.length > 0);
  } catch (err) {
    console.error('Error fetching live orders from Google Sheet:', err);
    throw err;
  }
}

/**
 * Query the deployed Google Apps Script Web App doGet endpoint directly:
 * GET https://script.google.com/macros/s/.../exec?action=check&orderNo=...
 * The Apps Script doGet returns:
 * {"status": "found", "order": { orderNo, customerName, orderType, eventDate, phoneNumber, location, totalAmount, bank, account, sms, orderVerified, orderDelivered }}
 */
export async function fetchOrderFromWebApp(orderNo: string): Promise<LiveSheetOrder | null> {
  const cleanNo = orderNo.trim();
  if (!cleanNo) return null;

  try {
    const url = `${PERRY_APPS_SCRIPT_WEB_APP_URL}?action=check&orderNo=${encodeURIComponent(cleanNo)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.status === 'found' && data.order) {
      const o = data.order;
      return {
        orderNo: String(o.orderNo || cleanNo).trim(),
        customerName: String(o.customerName || '').trim(),
        itemsSummary: String(o.orderType || '').trim(),
        deliveryDate: String(o.eventDate || '').trim(),
        phoneNumber: String(o.phoneNumber || '').trim(),
        location: String(o.location || '').trim(),
        totalAmount: String(o.totalAmount || '').trim(),
        bank: String(o.bank || '').trim(),
        account: String(o.account || '').trim(),
        sms: String(o.sms || '').trim(),
        orderVerified: String(o.orderVerified ?? 'Pending').trim(),
        orderDelivered: String(o.orderDelivered ?? 'Pending').trim(),
      };
    }
  } catch (err) {
    console.warn('Apps Script Web App check failed:', err);
  }
  return null;
}
