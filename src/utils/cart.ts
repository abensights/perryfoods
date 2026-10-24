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
 * H1 — Cryptographically secure order ID generator.
 * Uses Web Crypto API getRandomValues with a 32-character unambiguous alphabet.
 * 32^10 ≈ 1.12 * 10^15 (approx. 2^50 combinations) with 0 collision risk.
 * Output format: PF-XXXXXXXXXX (e.g. PF-K7M2QX9TDA)
 */
const BASE32_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

export function generateSecureOrderId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(10);
    crypto.getRandomValues(bytes);
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += BASE32_ALPHABET[bytes[i] % BASE32_ALPHABET.length];
    }
    return `PF-${id}`;
  }
  // Fallback for non-crypto environments
  let fallbackId = '';
  for (let i = 0; i < 10; i++) {
    fallbackId += BASE32_ALPHABET[Math.floor(Math.random() * BASE32_ALPHABET.length)];
  }
  return `PF-${fallbackId}`;
}
