import * as Sentry from '@sentry/browser';

export async function fetchSquadsAPI() {
  try {
    const response = await fetch('/api/squad', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch squads');
    }
  } catch (error) {
    console.error('Error fetching squads:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function createSquadAPI(name, players) {
  try {
    const response = await fetch('/api/squad', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.trim(),
        players: players.trim()
      })
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to create squad');
    }
  } catch (error) {
    console.error('Error creating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}