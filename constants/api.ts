export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:54321"
    : "https://linfgkrrngfrrnplcyau.supabase.co";

export const FUNCTIONS_URL = `${BASE_URL}/functions/v1`;
