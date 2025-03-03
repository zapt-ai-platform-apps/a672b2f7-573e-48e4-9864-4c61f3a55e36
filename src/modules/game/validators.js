import { z } from 'zod';
import { createValidator } from '../core/validators';

/**
 * Schemas for validating game data
 */
// Define the game interval schema first
const gameIntervalSchema = z.object({
  startTime: z.number().positive(),
  endTime: z.number().positive().nullable()
});

// Then use it in other schemas
export const schemas = {
  gameInterval: gameIntervalSchema,
  
  gameState: z.object({
    isRunning: z.boolean(),
    gameIntervals: z.array(gameIntervalSchema), // Use the separately defined schema
    ourScore: z.number().min(0),
    opponentScore: z.number().min(0),
    includeGKPlaytime: z.boolean(),
    goalkeeper: z.string().nullable()
  })
};

// Validators
export const validateGameInterval = createValidator(schemas.gameInterval, 'GameInterval');
export const validateGameState = createValidator(schemas.gameState, 'GameState');
export const validateGameIntervals = createValidator(z.array(schemas.gameInterval), 'GameIntervals');