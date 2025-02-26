import React, { useEffect, useRef } from 'react';
import Player from './Player';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { assignInitialPositions } from '../utils/assignInitialPositions';
import { Player as PlayerType } from '../../../types/GameTypes';
import * as Sentry from '@sentry/browser';

interface PitchVisualizationProps {
  players: PlayerType[];
  className?: string;
  'data-testid'?: string;
}

const PitchVisualization: React.FC<PitchVisualizationProps> = ({ 
  players, 
  className = '',
  'data-testid': dataTestId
}) => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const { handlePointerDown, init } = useDragAndDrop();
  
  // Initialize drag and drop with the pitch element
  useEffect(() => {
    if (pitchRef.current) {
      const cleanup = init(pitchRef.current);
      return cleanup;
    }
  }, [init]);

  // Assign initial positions to players without positions
  useEffect(() => {
    try {
      assignInitialPositions(players);
    } catch (error) {
      console.error('Error assigning initial positions:', error);
      Sentry.captureException(error);
    }
  }, [players]);

  // Handle direct interactions on the pitch
  const handlePitchPointerDown = (e: React.PointerEvent) => {
    const nativeEvent = e.nativeEvent;
    // Only handle direct clicks on the pitch, not on players
    if (e.currentTarget === e.target) {
      handlePointerDown(nativeEvent);
    }
  };

  // Handle player drag start
  const handlePlayerDragStart = (playerId: string) => {
    const playerElement = document.querySelector(`[data-player-id="${playerId}"]`);
    if (playerElement && pitchRef.current) {
      const pointerEvent = new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true
      });
      
      // Set up the event to be handled by our drag and drop system
      handlePointerDown(pointerEvent, playerId);
    }
  };

  return (
    <div 
      ref={pitchRef}
      className={`pitch ${className}`} 
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 200px)',
        maxHeight: '500px',
        backgroundColor: '#4c9c4c',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
      }}
      onPointerDown={handlePitchPointerDown}
      data-testid={dataTestId || "pitch-visualization"}
    >
      {/* Pitch markings */}
      <div className="pitch-markings" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {/* Center line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: 'rgba(255,255,255,0.7)',
          transform: 'translateX(-50%)'
        }} />
        
        {/* Center circle */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.7)',
          transform: 'translate(-50%, -50%)'
        }} />
        
        {/* Penalty areas */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '15%',
          height: '40%',
          border: '2px solid rgba(255,255,255,0.7)',
          borderLeft: 'none',
          transform: 'translateY(-50%)'
        }} />
        <div style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          width: '15%',
          height: '40%',
          border: '2px solid rgba(255,255,255,0.7)',
          borderRight: 'none',
          transform: 'translateY(-50%)'
        }} />
      </div>
      
      {/* Render each player */}
      {players.map(player => (
        <Player 
          key={player.id} 
          player={player}
          onDragStart={handlePlayerDragStart}
        />
      ))}
    </div>
  );
};

export default PitchVisualization;