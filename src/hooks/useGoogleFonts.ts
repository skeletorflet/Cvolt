import { useEffect } from "react";
import { fontPairs } from "@/data/fonts";

export function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("cvolt-google-fonts")) return;
    const families = fontPairs.map((f) => `family=${f.googleSpec}`).join("&");
    const link = document.createElement("link");
    link.id = "cvolt-google-fonts";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(link);

    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://fonts.googleapis.com";
    document.head.appendChild(pre1);
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.gstatic.com";
    pre2.crossOrigin = "anonymous";
    document.head.appendChild(pre2);
  }, []);
}
