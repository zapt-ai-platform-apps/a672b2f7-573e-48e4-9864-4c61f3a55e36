import { z } from 'zod';
import { createValidator, commonSchemas } from '../core/validators';

/**
 * Schemas for validating player data
 */
export const schemas = {
  player: z.object({
    name: z.string().min(1),
    playIntervals: z.array(commonSchemas.interval),
    isOnField: z.boolean(),
    isGoalkeeper: z.boolean(),
    totalPlayTime: z.number(),
    position: commonSchemas.position
  }),
  
  setupPlayer: z.object({
    name: z.string().min(1),
    isStartingPlayer: z.boolean()
  }),
  
  goalData: z.object({
    team: z.enum(['our', 'opponent']),
    scorerName: z.string().nullable(),
    time: z.number()
  })
};

// Validators
export const validatePlayer = createValidator(schemas.player);
export const validateSetupPlayer = createValidator(schemas.setupPlayer);
export const validateGoalData = createValidator(schemas.goalData);
export const validatePlayers = createValidator(z.array(schemas.player));
export const validateSetupPlayers = createValidator(z.array(schemas.setupPlayer));