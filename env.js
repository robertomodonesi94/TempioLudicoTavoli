/* env.js — public runtime configuration for Tempio Ludico Tavoli
 *
 * Place this file at the same path as index.html (site root).
 * It exposes two globals that index.html expects:
 *   - window.SUPABASE_URL
 *   - window.SUPABASE_ANON_KEY
 *
 * The anon key is PUBLIC by design. Never put the service role key in the browser.
 */

(function () {
  'use strict';

  // --- REQUIRED: set your real values here ---
  // Example URL looks like: https://abcd1234.supabase.co
  // Example anon key starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6...
  window.SUPABASE_URL = "https://ekijcvhrvkpgncfyemwu.supabase.co";
  window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVraWpjdmhydmtwZ25jZnllbXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NDQyMDMsImV4cCI6MjA3MzIyMDIwM30.4zSq2FwHbwT13OcXmNbMI6beFaKq0r6j6pmzqlCV1xk";
  // ------------------------------------------

  // Optional: allow quick overrides via querystring (handy for local tests)
  // e.g., ?sbUrl=https://xyz.supabase.co&sbAnon=eyJ...
  try {
    const qs = new URLSearchParams(window.location.search);
    if (qs.get('sbUrl'))  window.SUPABASE_URL = qs.get('sbUrl');
    if (qs.get('sbAnon')) window.SUPABASE_ANON_KEY = qs.get('sbAnon');
  } catch (_) { /* ignore */ }

  // Sanity checks and helpful logs
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
    console.error("env.js: SUPABASE_URL or SUPABASE_ANON_KEY is missing. Edit env.js and set both values.");
  }
  if (window.SUPABASE_URL.includes("YOUR-PROJECT-REF") || window.SUPABASE_ANON_KEY.includes("YOUR-ANON-PUBLIC-KEY")) {
    console.error("env.js: You must replace the placeholder values with your real Supabase URL and anon key.");
  }

  // Convenience helper for debugging
  window.__printEnv = function () {
    const key = String(window.SUPABASE_ANON_KEY || "");
    console.log("SUPABASE_URL:", window.SUPABASE_URL || "(unset)");
    console.log("SUPABASE_ANON_KEY:", key ? key.slice(0, 6) + "…" + key.slice(-6) : "(unset)");
  };
})();
