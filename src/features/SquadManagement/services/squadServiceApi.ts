export const squadServiceApi = {
  createSquad: async (squad: { name: string; players: any[] }) => {
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
  }
};