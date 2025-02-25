import { recordLogin } from '../supabaseClient';
import { environmentType } from '../types/environment';

let hasRecordedLogin = false;

export async function recordUserLogin(email: string, environment: environmentType, logMessage: string): Promise<void> {
  if (!hasRecordedLogin) {
    await recordLogin(email, environment);
    hasRecordedLogin = true;
    console.log(logMessage);
  }
}

export function resetRecordedLogin(): void {
  hasRecordedLogin = false;
}