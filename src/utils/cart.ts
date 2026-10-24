import { MenuItem } from '../types';
import { menuItemsData } from '../data/menu';

export interface CartItemEntry {
  item: MenuItem;
  quantity: number;
  totalBirr: number;
}

/**
 * H4 — Neutralizes spreadsheet formula injection.
 * Any string beginning with =, +, -, @ or tab is prepended with a single quote.
 */
export function neutralizeFormula(input: string | undefined | null): string {
  if (!input) return '';
  const trimmed = String(input).trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

/**
 * M3 — Clean and bounded text helper.
 */
export function cleanText(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  const sanitized = neutralizeFormula(input);
  return sanitized.slice(0, maxLength);
}

/**
 * H5 — Client-side price tampering protection.
 * Reconstructs the cart strictly from the static menu catalog in menu.ts:
 * - Drops unknown/deleted item IDs
 * - Enforces static catalog priceBirr and minGuests
 * - Clamps quantity to safe positive integer between 1 and 99
 * - Recomputes item totalBirr as unitPrice * quantity
 */
export function validateAndSanitizeCart(rawItems: unknown): CartItemEntry[] {
  if (!Array.isArray(rawItems)) return [];

  const catalogMap = new Map<string, MenuItem>(
    menuItemsData.map((item) => [item.id, item])
  );

  const sanitized: CartItemEntry[] = [];

  for (const entry of rawItems) {
    if (!entry || typeof entry !== 'object') continue;
    const rawItem = (entry as any).item;
    const rawId = typeof rawItem === 'object' && rawItem ? rawItem.id : (entry as any).id;
    if (!rawId || typeof rawId !== 'string') continue;

    const catalogItem = catalogMap.get(rawId);
    if (!catalogItem) continue; // Drop invalid or injected items not in the catalog

    // Clamp quantity safely
    const rawQty = Number((entry as any).quantity);
    const quantity = Number.isFinite(rawQty) ? Math.max(1, Math.min(99, Math.floor(rawQty))) : 1;

    // Strict catalog price calculation
    const isBuffet = catalogItem.category === 'buffet';
    const minGuests = isBuffet ? (catalogItem.minGuests || 30) : 1;
    const unitPrice = catalogItem.priceBirr * minGuests;
    const totalBirr = unitPrice * quantity;

    sanitized.push({
      item: catalogItem,
      quantity,
      totalBirr,
    });
  }

  return sanitized;
}

/**
 * H1 & Medium — Cryptographically secure order ID generator.
 * Uses Web Crypto API getRandomValues with a 32-character unambiguous alphabet.
 * Generates 16 characters = 32^16 ≈ 1.2 * 10^24 (approx. 2^80 combinations).
 * Fails closed if cryptographic RNG is unavailable (no insecure Math.random fallback).
 * Output format: PF-XXXXXXXXXXXXXXXX (e.g. PF-K7M2QX9TDAR4W89P)
 */
const BASE32_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

export const ORDER_ID_REGEX = /^PF-[2-9A-HJ-NP-Za-km-z0-9]{6,24}$/i;

export function isValidOrderId(orderNo: string): boolean {
  if (!orderNo || typeof orderNo !== 'string') return false;
  return ORDER_ID_REGEX.test(orderNo.trim());
}

export function generateSecureOrderId(): string {
  if (typeof crypto === 'undefined' || typeof crypto.getRandomValues !== 'function') {
    throw new Error('Cryptographically secure RNG unavailable. Cannot generate order ID.');
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let id = '';
  for (let i = 0; i < 16; i++) {
    id += BASE32_ALPHABET[bytes[i] % BASE32_ALPHABET.length];
  }
  return `PF-${id}`;
}

/**
 * High Privacy Risk — Sanitizes payment SMS confirmation.
 * Strips account balances and sensitive financial metadata while retaining
 * transaction reference codes and verification snippets needed for order auditing.
 */
export function sanitizePaymentSms(input: string | undefined | null, maxLength = 250): string {
  if (!input) return '';
  let cleaned = String(input).trim();

  // Strip balance disclosures often appended in mobile banking SMS
  cleaned = cleaned.replace(/(?:available\s*balance|current\s*balance|balance|acct\s*bal|rem\s*bal)[^\w\d]*:?\s*[\d,.]+(?:\s*(?:etb|birr|br))?/gi, '');
  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();

  return cleanText(cleaned, maxLength);
}

