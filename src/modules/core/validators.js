import { z } from 'zod';
import * as Sentry from '@sentry/browser';

/**
 * Utility to create a validator that captures Zod errors and reports them to Sentry.
 * The error message clearly states what caused the validation error by including each error's path and message.
 */
export const createValidator = (schema) => {
  return (data) => {
    try {
      return schema.parse(data);
    } catch (error) {
      const errorDetails = error.errors
        ?.map(err => `${err.path.join('.')} : ${err.message}`)
        .join(', ') || error.message;
      
      // Capture the detailed Zod validation error with Sentry including extra context
      Sentry.captureException(new Error(`ZodValidationError: ${errorDetails}`), {
        extra: {
          schema: schema.toString(),
          data,
          errorDetails: error.errors
        }
      });
      
      console.error('Zod validation error:', errorDetails);
      throw new Error(`Validation failed: ${errorDetails}`);
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