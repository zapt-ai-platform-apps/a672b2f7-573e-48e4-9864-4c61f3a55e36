export const fetchSquads = async (): Promise<any[]> => {
  const response = await fetch("/api/squads", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  return response.json();
};

export const createSquad = async (squad: { name: string; players: any[] }): Promise<any> => {
  const response = await fetch("/api/squads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(squad)
  });
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  return response.json();
};

export const updateSquad = async (id: string, squad: { name: string; players: any[] }): Promise<any> => {
  const response = await fetch(`/api/squads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(squad)
  });
  
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  return response.json();
};