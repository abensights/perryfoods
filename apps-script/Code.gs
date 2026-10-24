/**
 * Perry Foods — Hardened Google Apps Script Backend (2026-10-24)
 *
 * Installation:
 * 1. In your Google Sheet, open Extensions → Apps Script.
 * 2. Replace all existing code with this file.
 * 3. Verify SHEET_NAME below matches your tab name (e.g. "Order Managment System" or "Orders").
 * 4. Click "Deploy" → "New deployment" → Select type "Web app":
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Click "Deploy" and authorize the script.
 * 6. Set your Google Sheet access to "Restricted" (Share → General access → Restricted).
 */

const SHEET_NAME = 'Order Managment System';
const MAX_ORDERS_PER_MINUTE = 60;

/**
 * H4 — Formula injection neutralization.
 * Any value beginning with =, +, -, @ or tab is safely escaped.
 */
function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  var s = String(val).trim();
  if (/^[=+\-@\t\r]/.test(s)) {
    return "'" + s;
  }
  return s;
}

function getTargetSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  return sheet;
}

/**
 * H3 — Secure order registration via POST with JSON body, de-duplication, and LockService.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30s for preceding writes
  } catch (lockErr) {
    return createJsonResponse({ status: 'error', message: 'Server busy, please retry in a moment' });
  }

  try {
    var raw = '';
    if (e && e.postData && e.postData.contents) {
      raw = e.postData.contents;
    } else if (e && e.parameter) {
      raw = JSON.stringify(e.parameter);
    }

    var data = {};
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      data = e.parameter || {};
    }

    if (data.action !== 'register') {
      return createJsonResponse({ status: 'error', message: 'Invalid action' });
    }

    var orderNo = sanitizeCell(data.orderNo || '');
    if (!orderNo || !/^PF-[A-Za-z0-9]{6,16}$/i.test(orderNo)) {
      return createJsonResponse({ status: 'error', message: 'Invalid order number format' });
    }

    var sheet = getTargetSheet();
    var lastRow = sheet.getLastRow();

    // De-duplication check: check if orderNo already exists in Column A
    if (lastRow > 1) {
      var existingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var i = 0; i < existingIds.length; i++) {
        if (String(existingIds[i][0]).trim().toUpperCase() === orderNo.toUpperCase()) {
          return createJsonResponse({
            status: 'success',
            message: 'Already registered',
            orderNo: orderNo,
          });
        }
      }
    }

    var name = sanitizeCell(data.name || 'Valued Client').substring(0, 100);
    var orderType = sanitizeCell(data.orderType || 'Catering').substring(0, 1000);
    var eventDate = sanitizeCell(data.eventDate || 'TBD').substring(0, 50);
    var phoneNumber = sanitizeCell(data.phoneNumber || 'N/A').substring(0, 30);
    var location = sanitizeCell(data.location || 'N/A').substring(0, 300);
    var totalAmount = sanitizeCell(data.totalAmount || '0 Birr').substring(0, 50);
    var bank = sanitizeCell(data.bank || 'N/A').substring(0, 50);
    var account = sanitizeCell(data.account || 'N/A').substring(0, 50);
    var sms = sanitizeCell(data.sms || 'N/A').substring(0, 500);
    var orderVerified = 'Pending';
    var orderDelivered = 'Pending';

    // Append new order row
    sheet.appendRow([
      orderNo,
      name,
      orderType,
      eventDate,
      phoneNumber,
      location,
      totalAmount,
      bank,
      account,
      sms,
      orderVerified,
      orderDelivered,
    ]);

    return createJsonResponse({
      status: 'success',
      message: 'Order registered successfully',
      orderNo: orderNo,
    });
  } catch (err) {
    return createJsonResponse({ status: 'error', message: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

/**
 * H2 — Sanitized status check by Order ID only.
 * Returns only non-sensitive summary fields: orderNo, customerName, orderType, eventDate, totalAmount, orderVerified, orderDelivered.
 * Strips phone, bank account, location details, and payment SMS.
 */
function doGet(e) {
  var params = e ? e.parameter || {} : {};
  var action = params.action;

  if (action === 'check') {
    var orderNo = String(params.orderNo || '').trim();
    if (!orderNo) {
      return createJsonResponse({ status: 'not_found' });
    }

    var sheet = getTargetSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return createJsonResponse({ status: 'not_found' });
    }

    var rows = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
    var cleanSearch = orderNo.toUpperCase();

    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      var cellId = String(row[0] || '').trim().toUpperCase();

      if (cellId === cleanSearch) {
        return createJsonResponse({
          status: 'found',
          order: {
            orderNo: String(row[0] || '').trim(),
            customerName: String(row[1] || '').trim(),
            orderType: String(row[2] || '').trim(),
            eventDate: String(row[3] || '').trim(),
            totalAmount: String(row[6] || '').trim(),
            orderVerified: String(row[10] || 'Pending').trim(),
            orderDelivered: String(row[11] || 'Pending').trim(),
            // Sensitive fields stripped to protect customer privacy
          },
        });
      }
    }

    return createJsonResponse({ status: 'not_found' });
  }

  // Reject GET registration to prevent unauthenticated query-string injection
  if (action === 'register') {
    return createJsonResponse({
      status: 'error',
      message: 'Order registration must be sent via POST with JSON body',
    });
  }

  return createJsonResponse({
    status: 'ok',
    message: 'Perry Foods API active',
  });
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
