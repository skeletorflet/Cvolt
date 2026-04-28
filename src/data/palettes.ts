export type Palette = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  muted: string;
};

export const palettes: Palette[] = [
  { id: "midnight", name: "Midnight", primary: "#1a1a2e", secondary: "#16213e", accent: "#0f3460", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "navy-gold", name: "Navy & Gold", primary: "#1B2A4A", secondary: "#2D4A7A", accent: "#C5A028", text: "#1f2937", background: "#fafafa", muted: "#6b7280" },
  { id: "charcoal", name: "Charcoal Pro", primary: "#2C2C2C", secondary: "#444444", accent: "#E74C3C", text: "#222222", background: "#ffffff", muted: "#6b7280" },
  { id: "forest-pro", name: "Forest Pro", primary: "#1B4332", secondary: "#2D6A4F", accent: "#52B788", text: "#1B4332", background: "#ffffff", muted: "#6b7280" },
  { id: "slate-blue", name: "Slate Blue", primary: "#2B4590", secondary: "#3D5A99", accent: "#5B7EC9", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "electric", name: "Electric", primary: "#0A0A0A", secondary: "#1a1a1a", accent: "#00C9A7", text: "#0A0A0A", background: "#ffffff", muted: "#6b7280" },
  { id: "coral-modern", name: "Coral Modern", primary: "#E94E77", secondary: "#FF8E8E", accent: "#FFB85C", text: "#2D2D2D", background: "#FFF9F9", muted: "#9b7a7a" },
  { id: "ocean-deep", name: "Ocean Deep", primary: "#03045E", secondary: "#023E8A", accent: "#00B4D8", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "emerald", name: "Emerald City", primary: "#004B23", secondary: "#006400", accent: "#38B000", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "sunset", name: "Sunset", primary: "#7209B7", secondary: "#F72585", accent: "#4CC9F0", text: "#1a1a1a", background: "#FFF0F5", muted: "#7a6b75" },
  { id: "teal-pop", name: "Teal Pop", primary: "#264653", secondary: "#2A9D8F", accent: "#E9C46A", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "pure-black", name: "Pure Black", primary: "#000000", secondary: "#333333", accent: "#000000", text: "#000000", background: "#ffffff", muted: "#737373" },
  { id: "warm-gray", name: "Warm Gray", primary: "#3F3F3F", secondary: "#5C5C5C", accent: "#A0825C", text: "#2D2D2D", background: "#FAFAFA", muted: "#8a8a8a" },
  { id: "sepia", name: "Sepia Classic", primary: "#704214", secondary: "#8B5A2B", accent: "#C4944A", text: "#3D2B1F", background: "#FFF8F0", muted: "#8a7560" },
  { id: "nordic", name: "Nordic Ice", primary: "#2E4057", secondary: "#3D5A80", accent: "#98C1D9", text: "#1a1a1a", background: "#F0F4F8", muted: "#6b7280" },
  { id: "harvard-crimson", name: "Harvard Crimson", primary: "#A51C30", secondary: "#C12B3C", accent: "#8C0000", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "oxford-blue", name: "Oxford Blue", primary: "#002147", secondary: "#003366", accent: "#1E6DC5", text: "#1a1a1a", background: "#ffffff", muted: "#6b7280" },
  { id: "clay-dust", name: "Clay & Dust", primary: "#8B5E52", secondary: "#A67B6E", accent: "#D4A276", text: "#3D2B24", background: "#FDF6F0", muted: "#9a7e72" },
  { id: "lavender-pro", name: "Lavender Pro", primary: "#4A3B6B", secondary: "#6B5B95", accent: "#B8A9C9", text: "#2D2D2D", background: "#F8F5FF", muted: "#8a7a9a" },
  { id: "copper-age", name: "Copper Age", primary: "#4A2C17", secondary: "#7B3F00", accent: "#B87333", text: "#2D1A0E", background: "#FFF5ED", muted: "#8a6a55" },
];
