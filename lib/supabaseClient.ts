import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kxxyuqpdjfauifhimqwm.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHl1cXBkamZhdWlmaGltcXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDU3MzEsImV4cCI6MjA0ODc4MTczMX0.8uqAh2-hhAOkCbqf8L-EWeBx-zYa_p0E6rS6toFKEww';

export const supabase = createClient(supabaseUrl, supabaseKey);
