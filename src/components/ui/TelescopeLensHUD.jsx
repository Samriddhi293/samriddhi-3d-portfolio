import React from "react";

export default function TelescopeLensHUD({ zoomFactor }) {
  // zoomFactor goes 0 -> 1 -> 0 as you look through the telescope and zoom back out
  if (zoomFactor <= 0.02) return null;

  const ringScale = 1.45 - zoomFactor * 0.45; // Smoothly zooms from 1.45x down to 1.0x aperture

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center transition-opacity duration-200"
      style={{ opacity: Math.min(1, zoomFactor * 1.4) }}
    >
      {/* Subtle Optical Lens Vignette around the Circular Glass */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 36%, rgba(5, 4, 15, 0.72) 54%, rgba(3, 2, 10, 0.94) 75%)",
        }}
      />

      {/* Circular Glass Telescope Lens Frame & Etched Optical Reticle */}
      <div
        className="relative w-[78vmin] h-[78vmin] rounded-full border border-amber-300/35 shadow-[inset_0_0_60px_rgba(56,189,248,0.18),0_0_40px_rgba(0,0,0,0.8)]"
        style={{ transform: `scale(${ringScale})` }}
      >
        {/* Inner Precision Optical Ring */}
        <div className="absolute inset-3 rounded-full border border-indigo-300/20 border-dashed" />

        {/* Subtle Cardinal Reticle Ticks */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-3 bg-amber-300/50" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-px h-3 bg-amber-300/50" />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-px w-3 bg-amber-300/50" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-px w-3 bg-amber-300/50" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] uppercase text-amber-200/70 font-medium">
          Optical Observatory • 40x
        </div>
      </div>
    </div>
  );
}