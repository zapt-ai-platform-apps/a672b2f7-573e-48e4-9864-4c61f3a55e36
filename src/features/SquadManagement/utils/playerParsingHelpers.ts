import * as Sentry from "@sentry/browser";

/**
 * Parses a JSON array string into an array of player names
 * 
 * @param jsonString - JSON array string to parse
 * @param errorContext - Context identifier for error logging
 * @returns Array of player names as strings
 */
export function parseJsonArray(jsonString: string, errorContext: string): string[] {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      console.warn(`JSON parsing did not result in an array in ${errorContext}`);
      return [jsonString];
    }
    
    // Map to strings and filter out empty names
    return parsed
      .map(item => {
        if (item && typeof item === 'object' && 'name' in item) {
          return String(item.name);
        }
        return String(item);
      })
      .filter(Boolean);
  } catch (error) {
    console.error(`Failed to parse JSON in ${errorContext}:`, error);
    Sentry.captureException(error);
    return [jsonString.trim()];
  }
}

/**
 * Parses a comma-separated string into an array of player names
 * 
 * @param csvString - Comma-separated string to parse
 * @returns Array of player names as strings
 */
export function parseCommaSeparated(csvString: string): string[] {
  return csvString
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
}

/**
 * Parses a newline-separated string into an array of player names
 * 
 * @param multilineString - Newline-separated string to parse
 * @returns Array of player names as strings
 */
export function parseNewlineSeparated(multilineString: string): string[] {
  return multilineString
    .split(/\r?\n/)
    .map(name => name.trim())
    .filter(Boolean);
}