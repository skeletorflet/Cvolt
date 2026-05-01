import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, CameraOff, ImagePlus, Trash2 } from "lucide-react";
import { useCVStore } from "@/store/cvStore";
import { AvatarPhoto } from "@/components/AvatarPhoto";
import { useI18n } from "@/hooks/useI18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Maximum dimension (px) for stored avatar images.
 *  On mobile we cap at 320px — toDataURL() is synchronous and blocks the
 *  main thread on iOS Safari; smaller canvas = significantly less work.
 *  On desktop 512px keeps faces sharp for any CV template (~120 KB base64). */
const AVATAR_MAX_PX = typeof window !== "undefined" && window.innerWidth < 768 ? 320 : 512;
const AVATAR_QUALITY = 0.88;

/**
 * Resize + compress an image File to a JPEG data-URL.
 * Uses createObjectURL (no FileReader) + canvas.
 *
 * The actual canvas work is wrapped in setTimeout(fn, 0) so the main thread
 * yields BEFORE the expensive drawImage/toDataURL calls. On iOS Safari,
 * toDataURL on a 12 MP photo can block for 2-3 s; deferring it lets React
 * render the uploading spinner first, keeping the UI responsive.
 */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      // Yield the main thread so the loading spinner can paint before we
      // do the heavy synchronous canvas work (critical on iOS Safari).
      setTimeout(() => {
        try {
          let { naturalWidth: w, naturalHeight: h } = img;

          // Downscale maintaining aspect ratio
          if (w > AVATAR_MAX_PX || h > AVATAR_MAX_PX) {
            if (w >= h) {
              h = Math.round((h * AVATAR_MAX_PX) / w);
              w = AVATAR_MAX_PX;
            } else {
              w = Math.round((w * AVATAR_MAX_PX) / h);
              h = AVATAR_MAX_PX;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("No 2d context");

          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", AVATAR_QUALITY));
        } catch (err) {
          reject(err);
        } finally {
          URL.revokeObjectURL(objectUrl);
        }
      }, 0);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image load failed"));
    };

    img.src = objectUrl;
  });
}

export function AvatarEditorDialog() {
  const { m } = useI18n();
  const av = m.avatar;
  const personal = useCVStore((s) => s.personal);
  const avatar = useCVStore((s) => s.avatar);
  const setAvatarPhoto = useCVStore((s) => s.setAvatarPhoto);
  const setAvatarSettings = useCVStore((s) => s.setAvatarSettings);

  const SHAPES = [
    { value: "circle", label: av.shapeCircle },
    { value: "oval", label: av.shapeOval },
    { value: "square", label: av.shapeSquare },
    { value: "rectangle", label: av.shapeRectangle },
    { value: "rounded", label: av.shapeRounded },
    { value: "frame", label: av.shapeFrame },
  ] as const;

  const EFFECTS = [
    { value: "none", label: av.effectNone },
    { value: "shadow", label: av.effectShadow },
    { value: "soft", label: av.effectSoft },
    { value: "glow", label: av.effectGlow },
    { value: "grayscale", label: av.effectGrayscale },
  ] as const;

  const [open, setOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Camera is only offered on non-iOS devices; on iOS the file picker already
  // shows "Take Photo / Photo Library / Browse" natively — no need for our own
  // camera UI, and getUserMedia inside a Dialog causes iOS freeze bugs.
  const isIOS = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)),
    [],
  );
  const canUseCamera = useMemo(
    () => !isIOS && typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia,
    [isIOS],
  );

  const stopCamera = () => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch {
      setCameraError(av.cameraError);
      stopCamera();
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = Math.min(video.videoWidth, AVATAR_MAX_PX);
    canvas.height = Math.round(video.videoHeight * (canvas.width / video.videoWidth));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setAvatarPhoto(canvas.toDataURL("image/jpeg", AVATAR_QUALITY));
  };

  const onFile = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await compressImage(file);
      setAvatarPhoto(dataUrl);
    } catch {
      // Fallback: store raw (won't happen in practice, but be safe)
      const reader = new FileReader();
      reader.onload = () =>
        setAvatarPhoto(typeof reader.result === "string" ? reader.result : null);
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!open) stopCamera();
    return () => stopCamera();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-full rounded-md border border-border bg-background/40 p-2.5 text-left hover:border-primary/50 transition"
          type="button"
        >
          <div className="flex items-center gap-3">
            <AvatarPhoto
              src={personal.photo}
              settings={avatar}
              size={56}
              borderColorFallback={avatar.borderColor}
            />
            <div>
              <div className="text-xs font-medium">{av.triggerTitle}</div>
              <div className="text-[11px] text-muted-foreground">
                {personal.photo ? av.triggerSubtitleHasPhoto : av.triggerSubtitleNoPhoto}
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl mx-auto">
        <DialogHeader>
          <DialogTitle>{av.title}</DialogTitle>
          <DialogDescription>{av.description}</DialogDescription>
        </DialogHeader>

        {/* Responsive: stacks on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-[300px_1fr] gap-4 max-h-[70dvh] overflow-y-auto pr-1">
          {/* ── Left: preview + upload ──────────────────────────────── */}
          <div className="rounded-lg border border-border p-4 bg-background/40 shrink-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
              {av.preview}
            </div>
            <div className="h-[180px] md:h-[200px] rounded-md border border-border bg-card flex items-center justify-center">
              {uploading ? (
                <div className="text-xs text-muted-foreground animate-pulse">Loading…</div>
              ) : personal.photo ? (
                <AvatarPhoto
                  src={personal.photo}
                  settings={avatar}
                  size={Math.max(72, avatar.size)}
                  borderColorFallback={avatar.borderColor}
                />
              ) : (
                <div className="text-xs text-muted-foreground">{av.noPhoto}</div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {/* Upload button — no `capture` attr so iOS shows full picker:
                  "Take Photo / Photo Library / Browse Files" */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs hover:border-primary/50 disabled:opacity-50"
              >
                <ImagePlus size={13} />
                {av.upload}
              </button>

              {/* Camera — desktop/Android only (iOS uses the native picker) */}
              {canUseCamera && !cameraOn && (
                <button
                  type="button"
                  onClick={startCamera}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs hover:border-primary/50"
                >
                  <Camera size={13} /> {av.camera}
                </button>
              )}
              {cameraOn && (
                <>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs hover:border-primary/50"
                  >
                    <Camera size={13} /> {av.capture}
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs hover:border-primary/50"
                  >
                    <CameraOff size={13} /> {av.close}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setAvatarPhoto(null)}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs hover:border-destructive/60 hover:text-destructive"
              >
                <Trash2 size={13} /> {av.remove}
              </button>
            </div>

            {/* Hidden file input — NO capture attribute.
                Without capture, iOS Safari shows the standard action sheet:
                "Take Photo | Photo Library | Browse" — no freeze, no bugs. */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                onFile(e.target.files?.[0] ?? null);
                // Reset so the same file can be selected again
                e.target.value = "";
              }}
            />

            {cameraOn && (
              <div className="mt-3 rounded-md overflow-hidden border border-border">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className="w-full h-[160px] object-cover bg-black"
                />
              </div>
            )}
            {cameraError && <div className="mt-2 text-xs text-destructive">{cameraError}</div>}
          </div>

          {/* ── Right: settings ─────────────────────────────────────── */}
          <div className="rounded-lg border border-border p-4 bg-background/40 space-y-3">
            <label className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm">
              <span>{av.showAvatar}</span>
              <input
                type="checkbox"
                checked={avatar.enabled}
                onChange={(e) => setAvatarSettings({ enabled: e.target.checked })}
                className="accent-primary"
              />
            </label>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {av.shape}
              </div>
              <select
                value={avatar.shape}
                onChange={(e) =>
                  setAvatarSettings({ shape: e.target.value as typeof avatar.shape })
                }
                className="w-full rounded-md bg-input border border-border px-2 py-1.5 text-sm"
              >
                {SHAPES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {av.effect}
              </div>
              <select
                value={avatar.effect}
                onChange={(e) =>
                  setAvatarSettings({ effect: e.target.value as typeof avatar.effect })
                }
                className="w-full rounded-md bg-input border border-border px-2 py-1.5 text-sm"
              >
                {EFFECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                <span>{av.size}</span>
                <span>{avatar.size}px</span>
              </div>
              <input
                type="range"
                min={64}
                max={180}
                value={avatar.size}
                onChange={(e) => setAvatarSettings({ size: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                <span>{av.border}</span>
                <span>{avatar.borderWidth}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                value={avatar.borderWidth}
                onChange={(e) => setAvatarSettings({ borderWidth: Number(e.target.value) })}
                className="w-full accent-primary"
              />
              <input
                type="color"
                value={avatar.borderColor}
                onChange={(e) => setAvatarSettings({ borderColor: e.target.value })}
                className="mt-2 h-8 w-16 rounded border border-border bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md border border-border px-3 py-1.5 text-sm hover:border-primary/50"
          >
            {av.done}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
