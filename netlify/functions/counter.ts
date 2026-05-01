/**
 * Netlify Function — Global CV counter
 *
 * GET  /api/counter  → returns { count: number }
 * POST /api/counter  → atomically increments the count, returns { count: number }
 *
 * Storage: Netlify Blobs (free, serverless key-value, persists globally)
 */
import { getStore } from "@netlify/blobs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async function handler(request: Request): Promise<Response> {
  // Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  const store = getStore("cvolt-global");

  // ── GET — read current count ──────────────────────────────────────────
  if (request.method === "GET") {
    const raw = await store.get("total");
    const count = parseInt(raw ?? "0", 10) || 0;
    return new Response(JSON.stringify({ count }), { headers: CORS });
  }

  // ── POST — increment count ────────────────────────────────────────────
  if (request.method === "POST") {
    const raw = await store.get("total");
    const next = (parseInt(raw ?? "0", 10) || 0) + 1;
    await store.set("total", String(next));
    return new Response(JSON.stringify({ count: next }), { headers: CORS });
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: CORS,
  });
}

export const config = { path: "/api/counter" };
