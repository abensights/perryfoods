import { db } from './firebase';

export { db };

// Stubs for legacy imports during transition
export const getAccessToken = async (): Promise<string | null> => null;
export const auth = null;
