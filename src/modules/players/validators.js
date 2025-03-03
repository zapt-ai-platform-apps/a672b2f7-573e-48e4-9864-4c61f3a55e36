import { z } from 'zod';
import { createValidator } from '@/modules/core/validators';

/**
 * Schemas for validating player data
 */
export const schemas = {
  player: z.object({
    name: z.string().min(1),
    playIntervals: z.array(z.object({
      startTime: z.number().positive(),
      endTime: z.number().positive().nullable(),
      isGoalkeeper: z.boolean()
    })),
    isOnField: z.boolean(),
    isGoalkeeper: z.boolean(),
    totalPlayTime: z.number(),
    position: z.object({
      x: z.number().nullable(),
      y: z.number().nullable()
    }).default({ x: null, y: null })
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
export const validatePlayer = createValidator(schemas.player, 'Player');
export const validateSetupPlayer = createValidator(schemas.setupPlayer, 'SetupPlayer');
export const validateGoalData = createValidator(schemas.goalData, 'GoalData');
export const validatePlayers = createValidator(z.array(schemas.player), 'Players');
export const validateSetupPlayers = createValidator(z.array(schemas.setupPlayer), 'SetupPlayers');