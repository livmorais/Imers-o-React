import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://focbordcvalhhaantyng.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvY2JvcmRjdmFsaGhhYW50eW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQzMTEsImV4cCI6MTk4Mzc3MDMxMX0.4htpWeTYDOg9LDWgrTG6MDJ4JGe1BZDorKnaxWrRdWI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}