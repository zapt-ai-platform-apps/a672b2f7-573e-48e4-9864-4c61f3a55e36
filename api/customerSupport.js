import { initializeZapt } from '@zapt/zapt-js';
import Sentry from './_sentry.js';
import { authenticateUser } from './_apiUtils.js';

const APP_ID = process.env.VITE_PUBLIC_APP_ID;
if (!APP_ID) {
  throw new Error('Missing VITE_PUBLIC_APP_ID environment variable');
}
const { customerSupport } = initializeZapt(APP_ID);

export default async function handler(req, res) {
  console.log('-------- API: customerSupport.js --------');
  console.log(`Request Method: ${req.method}`);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    // Authenticate the user
    console.log('Authenticating user...');
    const user = await authenticateUser(req);
    if (!user) {
      console.log('Authentication failed: No user returned');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(`User authenticated: ${user.id}`);
    
    const email = user.email;
    if (!email) {
      console.log('User email not found');
      return res.status(400).json({ error: 'User email not found' });
    }
    
    const zaptSecretKey = process.env.ZAPT_SECRET_KEY;
    if (!zaptSecretKey) {
      console.log('Missing ZAPT_SECRET_KEY environment variable');
      throw new Error('Missing ZAPT_SECRET_KEY environment variable');
    }
    
    console.log('Calling customerSupport API with email:', email);
    const supportResponse = await customerSupport(email, zaptSecretKey);
    console.log('Customer support response received');
    
    return res.status(200).json(supportResponse);
  } catch (error) {
    console.error('Error in customerSupport endpoint:', error);
    console.error('Stack trace:', error.stack);
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  } finally {
    console.log('-------- API: customerSupport.js - Request Completed --------');
  }
}