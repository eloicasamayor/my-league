import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./redux/constants";

export const supabase = createClient(supabaseUrl, supabaseKey);
