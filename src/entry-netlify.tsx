/**
 * Client-only SPA entry point — used by the Netlify build.
 * Uses TanStack Router's RouterProvider (no SSR, no Cloudflare Workers).
 * The existing routes (src/routes/**) work unchanged in SPA mode.
 */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
