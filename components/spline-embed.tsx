"use client";

import { useMemo } from "react";

type SplineEmbedProps = {
  className?: string;
  url?: string;
  title?: string;
  loading?: "eager" | "lazy";
};

const DEFAULT_SPLINE_UI_URL =
  "https://app.spline.design/ui/a23edb09-f4e3-4ea7-b949-579fb454350c";

export function SplineEmbed({
  className = "",
  url,
  title = "Nectare Honie Interactive Scene",
  loading = "eager",
}: SplineEmbedProps) {
  const resolvedUrl = useMemo(
    () => url || process.env.NEXT_PUBLIC_SPLINE_UI_URL || DEFAULT_SPLINE_UI_URL,
    [url],
  );

  return (
    <div className={`relative overflow-hidden rounded-[26px] border border-white/20 bg-black ${className}`}>
      <iframe
        title={title}
        src={resolvedUrl}
        className="h-full w-full border-0"
        loading={loading}
        allow="fullscreen; xr-spatial-tracking"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
