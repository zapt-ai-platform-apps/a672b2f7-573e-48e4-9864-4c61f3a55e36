import { z } from 'zod';
import { createValidator } from '../core/validators';

/**
 * Schemas for validating game data
 */
export const schemas = {
  gameInterval: z.object({
    startTime: z.number().positive(),
    endTime: z.number().positive().nullable()
  }),
  
  gameState: z.object({
    isRunning: z.boolean(),
    gameIntervals: z.array(schemas.gameInterval),
    ourScore: z.number().min(0),
    opponentScore: z.number().min(0),
    includeGKPlaytime: z.boolean(),
    goalkeeper: z.string().nullable()
  })
};

// Validators
export const validateGameInterval = createValidator(schemas.gameInterval);
export const validateGameState = createValidator(schemas.gameState);
export const validateGameIntervals = createValidator(z.array(schemas.gameInterval));