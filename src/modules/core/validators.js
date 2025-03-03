import { z } from 'zod';

/**
 * Validation schemas for data crossing module boundaries
 */
export const createValidator = (schema) => {
  return (data) => {
    try {
      return schema.parse(data);
    } catch (error) {
      console.error('Validation error:', error);
      throw new Error(`Validation failed: ${error.message}`);
    }
  };
};

// Common schemas used across modules
export const commonSchemas = {
  timestamp: z.number().positive().int(),
  interval: z.object({
    startTime: z.number().positive(),
    endTime: z.number().positive().nullable(),
    isGoalkeeper: z.boolean()
  }),
  position: z.object({
    x: z.number().nullable(),
    y: z.number().nullable()
  })
};