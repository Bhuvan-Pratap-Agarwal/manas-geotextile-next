"use client";

import dynamic from "next/dynamic";

export const LazyWebGLBadge = dynamic(
  () =>
    import("@/3d/canvas/WebGLDevBadge").then((m) => m.WebGLDevBadge),
  { ssr: false, loading: () => null },
);
