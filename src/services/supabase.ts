import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase-type";

export const supabaseUrl: string = "https://kzhoholumyvgzkmyrfzr.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aG9ob2x1bXl2Z3prbXlyZnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MzQ5NjUsImV4cCI6MjAzMzExMDk2NX0.WqucySvK3pfnFMBlUwtMskFkRjDj7MX8oIiSYWEWnCQ";
// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
