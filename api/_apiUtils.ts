import { initializeZapt } from '@zapt/zapt-js';

export interface AuthUser {
  id: string;
  email?: string;
  // additional fields can be added here
}

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID as string);

/**
 * Authenticates a user based on the request's Authorization header.
 * Retrieves the user details using the Supabase client.
 *
 * @param req - The HTTP request object containing headers.
 * @returns A promise that resolves to the authenticated user object.
 * @throws Throws an error if the Authorization header is missing or token is invalid.
 */
export async function authenticateUser(req: { headers: { authorization?: string } }): Promise<AuthUser> {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    throw new Error('Invalid token');
  }
  return user as AuthUser;
}