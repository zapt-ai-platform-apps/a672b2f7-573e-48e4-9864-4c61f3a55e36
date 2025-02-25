export function parseCommaSeparated(input: string): string[] {
  return input
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
}

export function parseJsonArray(input: string, errorContext: string): string[] {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (jsonError) {
    console.warn(`Failed to parse as JSON in ${errorContext}:`, jsonError);
  }
  const innerContent = input.substring(1, input.length - 1);
  console.log(`Parsing non-JSON array format in ${errorContext}: ${innerContent}`);
  return innerContent.split('\n').map(name => name.trim()).filter(Boolean);
}

export function parseNewlineSeparated(input: string): string[] {
  return input.split('\n').map(name => name.trim()).filter(Boolean);
}