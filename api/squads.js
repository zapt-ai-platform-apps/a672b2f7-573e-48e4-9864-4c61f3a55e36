import { authenticateUser } from './_apiUtils.js';
import * as Sentry from '@sentry/node';
import { handleGet, handlePost, handlePut } from './squadsHandlers.js';

/**
 * API handler for squads.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
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