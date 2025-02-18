import { initializeZapt } from '@zapt/zapt-js';

/**
 * Initializes Zapt and exports Supabase client utilities.
 *
 * @property {Function} createEvent - Function to create events.
 * @property {Object} supabase - Supabase client instance.
 * @property {Function} recordLogin - Function to record user login events.
 */
export const { createEvent, supabase, recordLogin } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);