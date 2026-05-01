import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useI18n } from "@/hooks/useI18n";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  const { m } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{m.root.notFoundTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{m.root.notFoundDescription}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {m.root.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cvolt — Beautiful CVs in Minutes" },
      {
        name: "description",
        content:
          "Craft a professional CV with curated templates, palettes, and typography. Live preview, drag-and-drop sections, instant PDF export.",
      },
      { name: "author", content: "Cvolt" },
      { property: "og:title", content: "Cvolt — Beautiful CVs in Minutes" },
      {
        property: "og:description",
        content:
          "Curated templates, palettes, and typography. Live preview and instant PDF export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // Theme color for browser chrome (Android / Chrome)
      { name: "theme-color", content: "#ffffff" },
      // MS Tile (Windows pinned sites)
      { name: "msapplication-TileImage", content: "/appicon256x256.png" },
      { name: "msapplication-TileColor", content: "#ffffff" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Favicon
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      // Fallback favicon for older browsers
      {
        rel: "shortcut icon",
        href: "/favicon.png",
      },
      // Apple Touch Icon (iOS home screen)
      {
        rel: "apple-touch-icon",
        href: "/appicon256x256.png",
      },
      // PWA Manifest
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
