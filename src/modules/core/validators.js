import { z } from 'zod';
import * as Sentry from '@sentry/browser';

/**
 * Validation schemas for data crossing module boundaries
 */
export const createValidator = (schema) => {
  return (data) => {
    try {
      return schema.parse(data);
    } catch (error) {
      // Capture the Zod validation error with Sentry
      Sentry.captureException(error);
      console.error('Validation error:', error);
      
      // Format the error message for better readability
      const formattedMessage = error.errors?.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join(', ') || error.message;
      
      throw new Error(`Validation failed: ${formattedMessage}`);
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