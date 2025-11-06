/* env.js — must be loaded before index.html scripts
 * Defines global runtime Supabase environment variables.
 */

(function () {
  'use strict';

  // ======= REQUIRED: replace with your real credentials =======
  const SUPABASE_URL_VALUE = 'https://xbiymioeyhvlgacfjeqz.supabase.co';
  const SUPABASE_ANON_KEY_VALUE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiaXltaW9leWh2bGdhY2ZqZXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzMzNjAsImV4cCI6MjA3NjEwOTM2MH0.dRSsQqgGwvCILMXXCg7Argiy8rQ2SeupTQIzqs5H7dc';
  // ============================================================

  // Expose to window
  window.SUPABASE_URL = SUPABASE_URL_VALUE;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY_VALUE;

  // Optional helper to reset local Supabase state
  window.__resetSupabaseLocalState = async function () {
    try {
      if (window.indexedDB && indexedDB.databases) {
        const dbs = await indexedDB.databases();
        for (const d of dbs) if (d.name) indexedDB.deleteDatabase(d.name);
      }
      localStorage.clear();
      sessionStorage.clear();
      console.log('[env.js] Cleared local Supabase state. Reloading...');
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };
})();


