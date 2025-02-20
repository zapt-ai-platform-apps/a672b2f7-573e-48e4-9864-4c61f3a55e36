import { initializeZapt } from '@zapt/zapt-js';

const envAppId: string = import.meta.env.VITE_PUBLIC_APP_ID as string;

export const { createEvent, supabase, recordLogin } = initializeZapt(envAppId);