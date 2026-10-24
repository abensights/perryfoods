/**
 * Perry Foods — Hardened Google Apps Script Backend (2026-10-24)
 *
 * Installation:
 * 1. In your Google Sheet, open Extensions → Apps Script.
 * 2. Replace all existing code with this file.
 * 3. Verify SHEET_NAME below matches your exact tab name (e.g. "Order Managment System" or "Orders").
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
 * Any value beginning with =, +, -, @ or tab is safely escaped with a leading single quote.
 */
function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  var s = String(val).trim();
  if (/^[=+\-@\t\r]/.test(s)) {
    return "'" + s;
  }
  return s;
}

/**
 * Fail closed: throws explicit error if configured sheet tab is missing.
 * Prevents writing or exposing data from accidental default/unrelated tabs.
 */
function getTargetSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Configured sheet "' + SHEET_NAME + '" not found. Please create the sheet tab.');
  }
  return sheet;
}

/**
 * Rate limiter: enforces MAX_ORDERS_PER_MINUTE using Google Apps Script CacheService.
 */
function checkRateLimit() {
  try {
    var cache = CacheService.getScriptCache();
    var minuteKey = 'orders_rate_' + Math.floor(Date.now() / 60000);
    var count = Number(cache.get(minuteKey) || 0);
    if (count >= MAX_ORDERS_PER_MINUTE) {
      return false;
    }
    cache.put(minuteKey, String(count + 1), 120); // 2-minute cache window
    return true;
  } catch (cacheErr) {
    // If cache service is temporarily unavailable, allow request to proceed under LockService
    return true;
  }
}

/**
 * H3 — Secure order registration via POST with JSON body, rate limiting, and LockService.
 */
function doPost(e) {
  // 1. Enforce global rate limit
  if (!checkRateLimit()) {
    return createJsonResponse({
      status: 'error',
      message: 'Server busy. Please wait a moment and try again.',
    });
  }

  // 2. Acquire lock to prevent race conditions during sheet appends
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30s
  } catch (lockErr) {
    return createJsonResponse({
      status: 'error',
      message: 'Server busy handling concurrent orders. Please retry.',
    });
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
      return createJsonResponse({ status: 'error', message: 'Invalid action.' });
    }

    var orderNo = sanitizeCell(data.orderNo || '');
    if (!orderNo || !/^PF-[2-9A-HJ-NP-Za-km-z0-9]{6,24}$/i.test(orderNo)) {
      return createJsonResponse({ status: 'error', message: 'Invalid order number format.' });
    }

    var sheet = getTargetSheet();
    var lastRow = sheet.getLastRow();

    // De-duplication check: check if orderNo already exists in Column A
    if (lastRow > 1) {
      var existingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      var cleanSearchId = orderNo.toUpperCase();
      for (var i = 0; i < existingIds.length; i++) {
        if (String(existingIds[i][0]).trim().toUpperCase() === cleanSearchId) {
          return createJsonResponse({
            status: 'success',
            message: 'Order already registered.',
            orderNo: orderNo,
          });
        }
      }
    }

    // Sanitize and bound all incoming values
    var name = sanitizeCell(data.name || 'Valued Client').substring(0, 100);
    var orderType = sanitizeCell(data.orderType || 'Catering').substring(0, 1000);
    var eventDate = sanitizeCell(data.eventDate || 'TBD').substring(0, 50);
    var phoneNumber = sanitizeCell(data.phoneNumber || 'N/A').substring(0, 30);
    var location = sanitizeCell(data.location || 'N/A').substring(0, 300);
    var totalAmount = sanitizeCell(data.totalAmount || '0 Birr').substring(0, 50);
    var bank = sanitizeCell(data.bank || 'N/A').substring(0, 50);
    var account = sanitizeCell(data.account || 'N/A').substring(0, 50);
    var sms = sanitizeCell(data.sms || 'N/A').substring(0, 250);
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
      message: 'Order registered successfully.',
      orderNo: orderNo,
    });
  } catch (err) {
    // Log detailed error internally on Google Apps Script Executions console
    console.error('Apps Script Order Registration Error:', err);
    // Return sanitized generic message to the client (never expose internal trace)
    return createJsonResponse({
      status: 'error',
      message: 'Unable to process order. Please verify your details and retry.',
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

/**
 * H2 & Audit Fix — Minimal status check by Order ID only.
 * Returns only verification state and event date.
 * Does NOT expose full customer name, phone number, delivery address, bank details,
 * or financial totals to unauthenticated callers.
 */
function doGet(e) {
  var params = e ? e.parameter || {} : {};
  var action = params.action;

  if (action === 'check') {
    var orderNo = String(params.orderNo || '').trim();
    if (!orderNo || !/^PF-[2-9A-HJ-NP-Za-km-z0-9]{6,24}$/i.test(orderNo)) {
      return createJsonResponse({ status: 'not_found' });
    }

    try {
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
              customerName: 'Valued Client', // PII protected
              orderType: 'Catering Order',   // Order items protected
              eventDate: String(row[3] || '').trim(),
              totalAmount: '',               // Financial disclosure protected
              orderVerified: String(row[10] || 'Pending').trim(),
              orderDelivered: String(row[11] || 'Pending').trim(),
            },
          });
        }
      }
    } catch (err) {
      console.error('Apps Script Check Error:', err);
    }

    return createJsonResponse({ status: 'not_found' });
  }

  // Reject GET registration to prevent unauthenticated query-string injection
  if (action === 'register') {
    return createJsonResponse({
      status: 'error',
      message: 'Order registration must be sent via POST with JSON body.',
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
