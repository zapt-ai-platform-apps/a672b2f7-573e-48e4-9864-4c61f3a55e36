import { z } from 'zod';
import * as Sentry from '@sentry/browser';

/**
 * Creates a validator function for the given schema
 * @param {z.ZodType} schema - Zod schema to validate against
 * @param {string} [contextName] - Name of what's being validated (e.g., 'User', 'Order')
 * @returns {function} - Validator function that throws descriptive errors
 */
export const createValidator = (schema, contextName = 'data') => {
  return (data) => {
    try {
      return schema.parse(data);
    } catch (error) {
      // Include the actual data in the error context (excluding sensitive fields)
      const safeData = typeof data === 'object' ? 
        JSON.stringify(data, (key, value) => 
          ['password', 'token', 'secret'].includes(key) ? '[REDACTED]' : value
        ) : String(data);
      
      // Format the error message with path information
      const formattedErrors = error.errors?.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('\n') || error.message;
      
      // Create a descriptive error message
      const errorMessage = `Validation failed for ${contextName}:\n${formattedErrors}`;
      
      // Capture with Sentry including context
      Sentry.captureException(error, {
        extra: {
          validationContext: contextName,
          receivedData: safeData,
          formattedErrors
        },
        tags: {
          validationType: contextName,
          moduleArea: 'validation'
        }
      });
      
      console.error(errorMessage, '\nReceived:', safeData);
      
      // Throw with improved message
      throw new Error(errorMessage);
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