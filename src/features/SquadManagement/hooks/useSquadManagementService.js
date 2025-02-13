export async function fetchSquads() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Alpha Squad' },
    { id: 2, name: 'Bravo Squad' },
    { id: 3, name: 'Charlie Squad' }
  ];
}