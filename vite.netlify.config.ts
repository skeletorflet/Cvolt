/**
 * Vite config for the Netlify static SPA build.
 *
 * Differences from vite.config.ts (Cloudflare Workers):
 *  - No Cloudflare / SSR plugin
 *  - Uses entry-netlify.tsx (RouterProvider SPA) instead of the Workers entry
 *  - Outputs to dist-netlify/ (served by Netlify CDN)
 *  - All 28 templates are lazy-split into individual chunks (already handled by React.lazy)
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],

  // Use the SPA index.html at the project root
  root: ".",

  build: {
    outDir: "dist-netlify",
    emptyOutDir: true,

    rollupOptions: {
      input: "index.html",

      output: {
        // Split large vendor chunks for faster initial load
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["@tanstack/react-router"],
          dnd: ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
          radix: [
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
});
