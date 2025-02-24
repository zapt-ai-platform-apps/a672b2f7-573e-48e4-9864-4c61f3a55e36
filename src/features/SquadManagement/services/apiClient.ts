import { supabase } from '../../../supabaseClient';

export const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.error("No active session found");
    throw new Error("No active session found");
  }
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session.access_token}`
  };
};

export const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Network response was not ok: ${response.status}`, errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return response.json();
};