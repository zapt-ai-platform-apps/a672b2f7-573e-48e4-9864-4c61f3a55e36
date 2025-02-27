import { supabase } from '../../../supabaseClient';

export const fetchSquads = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/squads', {
      headers: {
        ...(session?.access_token ? { 
          Authorization: `Bearer ${session.access_token}` 
        } : {})
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch squads');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching squads:', error);
    throw error;
  }
};

// Other squad API functions remain unchanged