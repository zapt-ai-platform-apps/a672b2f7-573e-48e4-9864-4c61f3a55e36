import { renderHook, act } from "@testing-library/react";
import useEditSquadForm from "../useEditSquadForm";
import { useStateContext } from "../../../../hooks/useStateContext";
import { vi } from "vitest";

// Mock useStateContext
vi.mock("../../../../hooks/useStateContext", () => ({
  useStateContext: vi.fn(),
}));

// Mock fetch API
global.fetch = vi.fn();

describe("useEditSquadForm", () => {
  const mockSetSelectedSquad = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation
    (useStateContext as any).mockReturnValue({
      selectedSquad: {
        id: "123",
        name: "Test Squad",
        players: [
          { id: "1", name: "Player 1" },
          { id: "2", name: "Player 2" },
        ],
      },
      setSelectedSquad: mockSetSelectedSquad,
    });
    
    // Mock successful fetch response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  test("initializes with squad data from context", () => {
    const { result } = renderHook(() => useEditSquadForm());
    
    expect(result.current.squadName).toBe("Test Squad");
    expect(result.current.squadPlayersList).toHaveLength(2);
    expect(result.current.squadPlayersList[0].name).toBe("Player 1");
  });

  test("handleUpdateSquad updates squad and calls setSelectedSquad", async () => {
    const { result } = renderHook(() => useEditSquadForm());
    
    // Update squad name
    act(() => {
      result.current.setSquadName("Updated Squad Name");
    });
    
    // Mock form event
    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;
    
    // Call handleUpdateSquad
    await act(async () => {
      await result.current.handleUpdateSquad(mockEvent);
    });
    
    // Check if fetch was called with correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/squads/123",
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );
    
    // Verify setSelectedSquad was called with updated squad
    expect(mockSetSelectedSquad).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "123",
        name: "Updated Squad Name",
        players: expect.arrayContaining([
          expect.objectContaining({ id: "1", name: "Player 1" }),
          expect.objectContaining({ id: "2", name: "Player 2" }),
        ]),
      })
    );
  });

  test("handleAddPlayer adds a new player to the list", () => {
    const { result } = renderHook(() => useEditSquadForm());
    
    // Set new player name
    act(() => {
      result.current.setNewPlayerName("New Player");
    });
    
    // Add the player
    act(() => {
      result.current.handleAddPlayer();
    });
    
    // Check if player was added to the list
    expect(result.current.squadPlayersList).toHaveLength(3);
    expect(result.current.squadPlayersList[2].name).toBe("New Player");
    expect(result.current.newPlayerName).toBe(""); // Input should be cleared
  });

  test("handleDeletePlayer removes a player from the list", () => {
    const { result } = renderHook(() => useEditSquadForm());
    
    // Delete player with id "1"
    act(() => {
      result.current.handleDeletePlayer("1");
    });
    
    // Check if player was removed
    expect(result.current.squadPlayersList).toHaveLength(1);
    expect(result.current.squadPlayersList[0].id).toBe("2");
  });
});