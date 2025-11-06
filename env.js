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

  // ======================================================
  // REQUIRED: set your real values here (no trailing slash)
  // ======================================================
  // Project URL looks like: https://<ref>.supabase.co
  // Anon key starts with:   eyJhbGciOiJIUzI1NiIsInR5cCI6...
  var SUPABASE_URL   = "https://xbiymioeyhvlgacfjeqz.supabase.co";
  var SUPABASE_ANON  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiaXltaW9leWh2bGdhY2ZqZXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzMzNjAsImV4cCI6MjA3NjEwOTM2MH0.dRSsQqgGwvCILMXXCg7Argiy8rQ2SeupTQIzqs5H7dc";

  // ------------------------------------------------------
  // Optional overrides via querystring (useful for testing)
  // e.g. ?sbUrl=https://xyz.supabase.co&sbAnon=eyJ...
  // ------------------------------------------------------
  try {
    var qs = new URLSearchParams(window.location.search);
    if (qs.get('sbUrl'))  SUPABASE_URL  = qs.get('sbUrl');
    if (qs.get('sbAnon')) SUPABASE_ANON = qs.get('sbAnon');
  } catch (_) { /* ignore */ }

  // ---------------------------
  // Normalize & validate values
  // ---------------------------
  function trimSlash(u) { return (u || '').replace(/\/+$/, ''); }
  SUPABASE_URL = trimSlash(SUPABASE_URL);

  // Basic scheme/host checks to avoid DNS failures
  (function validate() {
    if (!SUPABASE_URL || !SUPABASE_ANON) {
      console.error("[env.js] SUPABASE_URL or SUPABASE_ANON_KEY is missing.");
      return;
    }
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(SUPABASE_URL)) {
      console.warn("[env.js] SUPABASE_URL looks unusual:", SUPABASE_URL,
                   "Expected format: https://<ref>.supabase.co");
    }
    if (/\.supabase\.com$/i.test(SUPABASE_URL)) {
      console.error("[env.js] Domain should be .supabase.co, not .com →", SUPABASE_URL);
    }
  })();

  // -------------------------------
  // Expose as immutable window vars
  // -------------------------------
  // (Use defineProperty so accidental reassignments don’t silently happen.)
  Object.defineProperty(window, 'SUPABASE_URL', {
    value: SUPABASE_URL, enumerable: true, configurable: false, writable: false
  });
  Object.defineProperty(window, 'SUPABASE_ANON_KEY', {
    value: SUPABASE_ANON, enumerable: true, configurable: false, writable: false
  });

  // -----------------------------------
  // Debug helpers (optional, non-blocking)
  // -----------------------------------
  window.__printEnv = function () {
    var key = String(SUPABASE_ANON || "");
    console.log("SUPABASE_URL:", SUPABASE_URL || "(unset)");
    console.log("SUPABASE_ANON_KEY:", key ? key.slice(0, 6) + "…" + key.slice(-6) : "(unset)");
  };

  // Nuke local Supabase auth/session (useful after project switch)
  window.__clearSbLocalState = async function () {
    try {
      // Best-effort signOut if client exists
      if (window.supabase?.auth?.signOut) await window.supabase.auth.signOut().catch(()=>{});
    } catch(_) {}
    try { localStorage.clear(); } catch(_) {}
    try {
      if (indexedDB.databases) {
        const dbs = await indexedDB.databases();
        dbs.forEach(d => d && d.name && indexedDB.deleteDatabase(d.name));
      }
    } catch(_) {}
    console.log("[env.js] Local Supabase state cleared. Reloading…");
    window.location.reload();
  };
})();
