export async function fetchSquadsAPI() {
  try {
    const response = await fetch('/api/squads');
    if (!response.ok) {
      throw new Error('Error fetching squads');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createSquadAPI(squadName, squadPlayers) {
  try {
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: squadName,
        players: squadPlayers.split(',').map(player => player.trim())
      })
    });
    if (!response.ok) {
      throw new Error('Error creating squad');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}