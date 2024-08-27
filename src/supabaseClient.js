import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ploqreoewwgjmmvqdnum.supabase.co'; // SupabaseのURL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsb3FyZW9ld3dnam1tdnFkbnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4ODMwMTksImV4cCI6MjAzOTQ1OTAxOX0.Da0e3YWVacSao4kNeEjXfxDYlh8XIg6moKTtk56UMwc'; // Supabaseのanon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
