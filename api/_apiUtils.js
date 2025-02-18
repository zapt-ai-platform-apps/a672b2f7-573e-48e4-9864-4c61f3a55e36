import { initializeZapt } from '@zapt/zapt-js';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

/**
 * Authenticates a user based on the request's Authorization header.
 * Retrieves the user details using the Supabase client.
 *
 * @param {Object} req - The HTTP request object containing headers.
 * @returns {Promise<Object>} A promise that resolves to the authenticated user object.
 * @throws {Error} Throws an error if the Authorization header is missing or token is invalid.
 */
export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) {
    throw new Error('Invalid token');
  }
  return user;
}