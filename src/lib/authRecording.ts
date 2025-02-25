import { recordLogin } from '../supabaseClient';
import { EnvironmentType } from '../types/environment';

let hasRecordedLogin = false;

export async function recordUserLogin(email: string, environment: EnvironmentType, logMessage: string): Promise<void> {
  if (!hasRecordedLogin) {
    await recordLogin(email, environment);
    hasRecordedLogin = true;
    console.log(logMessage);
  }
}

export function resetRecordedLogin(): void {
  hasRecordedLogin = false;
}