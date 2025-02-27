import { tryAuthenticateUser } from './_apiUtils.ts';
import * as Sentry from '@sentry/node';
import { getSquads } from './squadService.ts';

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    // Use optional authentication to support both authenticated and non-authenticated users
    const user = await tryAuthenticateUser(req);
    const userId = user?.id || null;
    
    // Get squads (the service should handle retrieving public squads if userId is null)
    const squads = await getSquads(userId);
    
    return res.status(200).json(squads);
  } catch (error) {
    console.error('Error in squads endpoint:', error);
    Sentry.captureException(error);
    
    // Return a friendly error message
    return res.status(500).json({ 
      error: 'Failed to retrieve squads',
      message: error.message 
    });
  }
}