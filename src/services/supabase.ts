import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase-type";

export const supabaseUrl: string = "YOUR_SUPABASE_URL";
const supabaseKey: string = "";
// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
