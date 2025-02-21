import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authenticateUser, AuthUser } from './_apiUtils.js';
import * as Sentry from '@sentry/node';
import { handleGet, handlePost, handlePut } from './squadService.js';

/**
 * API handler for squads.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const user: AuthUser = await authenticateUser(req);
    if (req.method === 'GET') {
      return await handleGet(user, req, res);
    } else if (req.method === 'POST') {
      return await handlePost(user, req, res);
    } else if (req.method === 'PUT') {
      return await handlePut(user, req, res);
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error in squad API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
