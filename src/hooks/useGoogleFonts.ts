import { useEffect } from "react";
import { fontPairs } from "@/data/fonts";

export function useGoogleFonts() {
  useEffect(() => {
    // Google Fonts are loaded via a static <link id="cvolt-google-fonts"> in
    // index.html, which starts the request in parallel with the JS bundle.
    // This hook is a no-op when that link is present (normal production/dev).
    // It only falls back to dynamic injection for unusual environments where
    // index.html is bypassed.
    if (document.getElementById("cvolt-google-fonts")) return;

    const families = fontPairs.map((f) => `family=${f.googleSpec}`).join("&");
    const link = document.createElement("link");
    link.id = "cvolt-google-fonts";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(link);
  }, []);
}
