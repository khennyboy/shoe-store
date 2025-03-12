import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  'https://yfqllbecpdvdoocqidft.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcWxsYmVjcGR2ZG9vY3FpZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MDU3NDAsImV4cCI6MjA1MDQ4MTc0MH0.A0MAafQyGjps9LqHnCO9-b381gVQCMuHJcFujgu659I'
);

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_KEY
// )

export default supabase;
