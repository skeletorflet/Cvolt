export type FontPair = {
  id: string;
  name: string;
  heading: string;
  body: string;
  googleSpec: string; // for Google Fonts URL
};

export const fontPairs: FontPair[] = [
  { id: "classic", name: "Classic Editorial", heading: "Playfair Display", body: "Source Serif 4", googleSpec: "Playfair+Display:wght@400;600;700;800&family=Source+Serif+4:wght@400;500;600" },
  { id: "modern", name: "Modern Sans", heading: "Space Grotesk", body: "DM Sans", googleSpec: "Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600" },
  { id: "editorial", name: "Editorial Refined", heading: "Cormorant Garamond", body: "Jost", googleSpec: "Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600" },
  { id: "tech", name: "Tech Mono", heading: "JetBrains Mono", body: "Inter", googleSpec: "JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700" },
  { id: "elegant", name: "Elegant Serif", heading: "EB Garamond", body: "Lato", googleSpec: "EB+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700" },
  { id: "bold", name: "Bold Statement", heading: "Syne", body: "Work Sans", googleSpec: "Syne:wght@500;600;700;800&family=Work+Sans:wght@400;500;600" },
  { id: "geometric", name: "Geometric Clean", heading: "Raleway", body: "Open Sans", googleSpec: "Raleway:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600" },
  { id: "sharp", name: "Sharp Impact", heading: "Bebas Neue", body: "Roboto", googleSpec: "Bebas+Neue&family=Roboto:wght@300;400;500;700" },
  { id: "minimal", name: "Minimal Pro", heading: "Archivo", body: "Figtree", googleSpec: "Archivo:wght@500;600;700;800&family=Figtree:wght@400;500;600" },
  { id: "creative", name: "Creative Fraunces", heading: "Fraunces", body: "Plus Jakarta Sans", googleSpec: "Fraunces:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600" },
  { id: "swiss", name: "Swiss Style", heading: "Barlow Condensed", body: "Barlow", googleSpec: "Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600" },
  { id: "academic", name: "Academic", heading: "Spectral", body: "Inter", googleSpec: "Spectral:wght@500;600;700&family=Inter:wght@400;500;600" },
];
