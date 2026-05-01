import { cn } from "@/lib/utils";
import type { AvatarSettings } from "@/store/cvStore";

const DEFAULT_AVATAR: AvatarSettings = {
  enabled: true,
  shape: "circle",
  size: 96,
  borderWidth: 2,
  borderColor: "#ffffff",
  effect: "shadow",
};

function dimensions(shape: AvatarSettings["shape"], size: number) {
  switch (shape) {
    case "oval":
      return { width: Math.round(size * 1.2), height: Math.round(size * 0.9), radius: "9999px", frame: false };
    case "rectangle":
      return { width: Math.round(size * 1.2), height: Math.round(size * 0.9), radius: "12px", frame: false };
    case "rounded":
      return { width: size, height: size, radius: "18px", frame: false };
    case "square":
      return { width: size, height: size, radius: "8px", frame: false };
    case "frame":
      return { width: Math.round(size * 1.05), height: Math.round(size * 1.25), radius: "10px", frame: true };
    case "circle":
    default:
      return { width: size, height: size, radius: "9999px", frame: false };
  }
}

function effectStyle(effect: AvatarSettings["effect"], tone: string): React.CSSProperties {
  switch (effect) {
    case "glow":
      return { boxShadow: `0 0 0 1px ${tone}66, 0 0 22px ${tone}55` };
    case "shadow":
      return { boxShadow: "0 8px 22px rgba(0,0,0,0.28)" };
    case "soft":
      return { boxShadow: "0 3px 10px rgba(0,0,0,0.18)" };
    default:
      return {};
  }
}

export function AvatarPhoto({
  src,
  settings,
  size,
  maxSize,
  minSize,
  borderColorFallback,
  className,
  alt = "Avatar",
}: {
  src?: string | null;
  settings?: AvatarSettings;
  size?: number;
  maxSize?: number;
  minSize?: number;
  borderColorFallback?: string;
  className?: string;
  alt?: string;
}) {
  const cfg = { ...DEFAULT_AVATAR, ...(settings ?? {}) };
  if (!cfg.enabled || !src) return null;

  const requested = size ?? cfg.size;
  const clampedMax = maxSize ?? 180;
  const clampedMin = minSize ?? 56;
  const baseSize = Math.max(clampedMin, Math.min(clampedMax, requested));
  const box = dimensions(cfg.shape, baseSize);
  const borderColor = cfg.borderColor || borderColorFallback || "#ffffff";

  const containerStyle: React.CSSProperties = {
    width: box.width,
    height: box.height,
    borderRadius: box.radius,
    overflow: "hidden",
    border: `${Math.max(0, cfg.borderWidth)}px solid ${borderColor}`,
    backgroundColor: "#ffffff",
    ...effectStyle(cfg.effect, borderColorFallback || borderColor),
  };

  if (box.frame) {
    containerStyle.padding = 6;
  }

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: box.frame ? "6px" : box.radius,
    filter: cfg.effect === "grayscale" ? "grayscale(100%)" : "none",
  };

  return (
    <div className={cn("shrink-0", className)} style={containerStyle}>
      <img src={src} alt={alt} style={imageStyle} />
    </div>
  );
}
