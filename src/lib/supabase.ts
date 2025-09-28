import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};