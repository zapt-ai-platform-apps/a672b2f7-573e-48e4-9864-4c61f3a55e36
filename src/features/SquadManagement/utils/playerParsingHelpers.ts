import * as Sentry from "@sentry/browser";

/**
 * Parses a comma-separated string of player names
 */
export function parseCommaSeparated(input: string): string[] {
  return input
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
}

/**
 * Parses a newline-separated string of player names
 */
export function parseNewlineSeparated(input: string): string[] {
  return input
    .split(/\r?\n/)
    .map(name => name.trim())
    .filter(Boolean);
}

/**
 * Parses a JSON array string into an array of player names
 */
export function parseJsonArray(jsonString: string, errorContext: string): string[] {
  try {
    const parsed = JSON.parse(jsonString);
    
    if (!Array.isArray(parsed)) {
      console.warn(`JSON parse result is not an array in ${errorContext}`);
      return [jsonString];
    }
    
    // Handle array of objects or strings
    return parsed.map(item => {
      if (typeof item === 'string') {
        return item;
      } else if (item && typeof item === 'object' && 'name' in item) {
        return String(item.name);
      } else {
        return String(item);
      }
    }).filter(Boolean);
  } catch (error) {
    console.error(`Failed to parse JSON in ${errorContext}:`, jsonString, error);
    Sentry.captureException(error);
    
    // Fallback to treating as a single string
    return [jsonString];
  }
}