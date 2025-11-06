/* env.js — public runtime configuration for Tempio Ludico Tavoli
 *
 * Put this at the site root next to index.html.
 * It exposes:
 *   - window.SUPABASE_URL
 *   - window.SUPABASE_ANON_KEY
 *
 * Never put the service role key in the browser.
 */

(function () {
  'use strict';

  // ========================== REQUIRED ==========================
  // Set your real values here (no trailing slash on URL)
  // ==============================================================
  var SUPABASE_URL   = "https://xbiymioeyhvlgacfjeqz.supabase.co";
  var SUPABASE_ANON_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiaXltaW9leWh2bGdhY2ZqZXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzMzNjAsImV4cCI6MjA3NjEwOTM2MH0.dRSsQqgGwvCILMXXCg7Argiy8rQ2SeupTQIzqs5H7dc";
  // ==============================================================

  // Small helper to wipe local auth state if you rotate keys
  window.__resetSupabaseLocalState = async function () {
    try {
      if (window.supabase?.auth?.signOut) {
        await window.supabase.auth.signOut().catch(() => {});
      }
    } catch (_) {}
    try { localStorage.clear(); } catch (_) {}
    try {
      if (indexedDB.databases) {
        const dbs = await indexedDB.databases();
        for (const d of dbs) {
          if (d && d.name) indexedDB.deleteDatabase(d.name);
        }
      }
    } catch (_) {}
    console.log('[env.js] Local Supabase state cleared. Reloading');
    window.location.reload();
  };
})();


