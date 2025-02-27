export function parseCommaSeparated(input: string): string[] {
  // Remove any square brackets if present
  const cleanInput = input.replace(/^\[|\]$/g, '');
  
  // Split by commas, trim whitespace, and filter out empty entries
  const playerNames = cleanInput
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
  
  console.log('Parsed comma-separated player names:', playerNames);
  return playerNames;
}

export function parseJsonArray(input: string, errorContext: string): string[] {
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      // Convert all items to strings if necessary
      const playerNames = parsed.map(item => {
        if (typeof item === 'object' && item !== null && 'name' in item) {
          return item.name;
        }
        return String(item);
      }).filter(Boolean);
      
      console.log(`Successfully parsed JSON array in ${errorContext}:`, playerNames);
      return playerNames;
    }
  } catch (jsonError) {
    console.warn(`Failed to parse as JSON in ${errorContext}:`, jsonError);
  }
  
  // Fallback to treating it as a text list with square brackets
  const innerContent = input.substring(1, input.length - 1);
  console.log(`Parsing non-JSON array format in ${errorContext}:`, innerContent);
  
  // First try comma-separated within the brackets
  if (innerContent.includes(',')) {
    return parseCommaSeparated(innerContent);
  }
  
  // Then try newline-separated
  return innerContent.split('\n').map(name => name.trim()).filter(Boolean);
}

export function parseNewlineSeparated(input: string): string[] {
  const playerNames = input
    .split('\n')
    .map(name => name.trim())
    .filter(Boolean);
  
  console.log('Parsed newline-separated player names:', playerNames);
  return playerNames;
}