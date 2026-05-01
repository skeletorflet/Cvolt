import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * CV counter store.
 *
 * Architecture:
 *  • `localCount` — persisted in localStorage, always available (offline / dev).
 *  • `displayCount` — the number shown in the UI:
 *      - In production: the global count returned by the Netlify Function
 *        (all users, all time).
 *      - In development / fallback: the local count for this device.
 *
 * On every successful PDF export:
 *  1. `localCount` increments immediately (optimistic).
 *  2. POST /api/counter is called; on success `displayCount` is updated
 *     to the server-authoritative global value.
 *  3. If the POST fails (offline, dev), `displayCount` keeps using `localCount`.
 */

const COUNTER_API = "/api/counter";

// True when running in a real deployment (not localhost / Vite dev server)
const IS_PRODUCTION =
  typeof window !== "undefined" && !["localhost", "127.0.0.1"].includes(window.location.hostname);

interface CounterState {
  /** Persisted local count for this browser */
  localCount: number;
  /** Shown in the header — global (API) or local (fallback) */
  displayCount: number;

  setDisplayCount: (n: number) => void;

  /**
   * Call this after a successful PDF export.
   * Increments local count immediately and fires the global API in production.
   */
  recordExport: () => Promise<void>;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
      localCount: 0,
      displayCount: 0,

      setDisplayCount: (n) => set({ displayCount: n }),

      recordExport: async () => {
        // Optimistic local increment
        const nextLocal = get().localCount + 1;
        set({ localCount: nextLocal, displayCount: nextLocal });

        if (!IS_PRODUCTION) return;

        // Hit the global counter API
        try {
          const res = await fetch(COUNTER_API, { method: "POST" });
          if (res.ok) {
            const { count } = (await res.json()) as { count: number };
            set({ displayCount: count });
          }
        } catch {
          // Network error — silently fall back to local count
        }
      },
    }),
    {
      name: "cvolt-counter-v1",
      // Only persist localCount; displayCount is always re-derived on load
      partialize: (s) => ({ localCount: s.localCount }),
    },
  ),
);

// On app boot in production: fetch the current global count so the header
// shows the real number even before the user exports anything.
// Deferred 3 s so the cold-start latency of the Netlify Function doesn't
// appear in the critical render path / Lighthouse chain.
if (IS_PRODUCTION) {
  setTimeout(() => {
    fetch(COUNTER_API)
      .then((res) => res.json())
      .then((data: { count: number }) => {
        useCounterStore.getState().setDisplayCount(data.count);
      })
      .catch(() => {
        // Fallback to localCount (already the default)
        const { localCount } = useCounterStore.getState();
        useCounterStore.getState().setDisplayCount(localCount);
      });
  }, 3000);
}
