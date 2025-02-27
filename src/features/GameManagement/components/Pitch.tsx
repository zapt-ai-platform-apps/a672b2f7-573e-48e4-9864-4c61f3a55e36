import React, { useEffect } from 'react';
import Player from './Player';
import type { Player as PlayerType } from '../../../types/GameTypes';

interface PitchProps {
  pitchRef: React.RefObject<HTMLDivElement>;
  playerData: PlayerType[];
  players: PlayerType[];
  handlePointerDown: (event: React.PointerEvent<Element>, playerId?: string) => void;
}

function Pitch({ pitchRef, playerData, handlePointerDown, players }: PitchProps): JSX.Element {
  // Listen for position update events to update the state
  useEffect(() => {
    const updatePlayerPosition = (e: Event) => {
      const { playerId, x, y } = (e as CustomEvent).detail;
      
      // Find the player in state and update its position
      const playerIndex = playerData.findIndex(p => p.id?.toString() === playerId);
      if (playerIndex !== -1) {
        const updatedPlayerData = [...playerData];
        updatedPlayerData[playerIndex] = {
          ...updatedPlayerData[playerIndex],
          position: { x, y }
        };
        
        // This should trigger a state update in the parent component
        console.log(`Updated position for player ${playerId}:`, { x, y });
      }
    };
    
    const pitchElement = pitchRef.current;
    if (pitchElement) {
      pitchElement.addEventListener('playerPositionFinal', updatePlayerPosition);
      
      // Add real-time update listener for smoother UI feedback
      pitchElement.addEventListener('playerPositionUpdate', updatePlayerPosition);
    }
    
    return () => {
      if (pitchElement) {
        pitchElement.removeEventListener('playerPositionFinal', updatePlayerPosition);
        pitchElement.removeEventListener('playerPositionUpdate', updatePlayerPosition);
      }
    };
  }, [pitchRef, playerData]);
  
  return (
    <div 
      ref={pitchRef}
      data-testid="pitch-container"
      className="pitch relative w-full h-96 md:h-[450px] bg-green-600 rounded-xl overflow-hidden shadow-lg"
      style={{
        backgroundImage: `
          linear-gradient(to right, transparent 49.9%, white 50%, transparent 50.1%),
          linear-gradient(to bottom, transparent 49.9%, white 50%, transparent 50.1%),
          radial-gradient(circle at center, white 2%, transparent 2.5%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%'
      }}
    >
      {/* Add pitch markings */}
      <div className="absolute inset-x-0 top-0 h-[20%] border-b-2 border-white"></div> {/* Penalty area 1 */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] border-t-2 border-white"></div> {/* Penalty area 2 */}
      
      {/* Render players */}
      {players.map((player, index) => (
        <div 
          key={player.id || index}
          style={{
            position: 'absolute',
            left: `${player.position?.x || 0}%`,
            top: `${player.position?.y || 0}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10, // Add z-index to ensure players are above pitch elements
            touchAction: 'none' // Important for touch devices to prevent scrolling while dragging
          }}
          data-player-id={player.id?.toString()}
          data-testid={`player-${player.id}`}
        >
          <Player 
            player={player}
            onPointerDown={handlePointerDown}
            showStatus={false}
          />
        </div>
      ))}
    </div>
  );
}

export default Pitch;