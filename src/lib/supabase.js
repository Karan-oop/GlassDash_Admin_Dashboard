import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvmbmtpibjnrselrcuyf.supabase.co';  // apna paste karo
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bWJtdHBpYmpucnNlbHJjdXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MzgwNTEsImV4cCI6MjA5NjMxNDA1MX0.PZJYC0lkjhK5Oai_6GTvEZHFB5wP0C5V9pXbhglsfuc';   // apna paste karo

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);