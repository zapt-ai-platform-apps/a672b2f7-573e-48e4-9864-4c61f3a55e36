let squads = [];

export async function fetchSquads() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...squads]);
    }, 500);
  });
}

export async function createSquad(name, players) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSquad = { id: Date.now(), name, players };
      squads.push(newSquad);
      resolve(newSquad);
    }, 500);
  });
}

export async function updateSquad(id, name, players) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = squads.findIndex((squad) => squad.id === id);
      if (index === -1) {
        reject(new Error('Squad not found'));
      } else {
        squads[index] = { id, name, players };
        resolve(squads[index]);
      }
    }, 500);
  });
}