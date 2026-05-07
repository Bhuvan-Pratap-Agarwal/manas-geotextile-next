export type WebglSupportLevel = "none" | "basic" | "full";

export interface GpuCapabilities {
  webgl: WebglSupportLevel;
  maxTextureSize: number | null;
  renderer: string | null;
}

export function getGpuCapabilities(): GpuCapabilities {
  if (typeof document === "undefined") {
    return { webgl: "none", maxTextureSize: null, renderer: null };
  }
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) {
      return { webgl: "none", maxTextureSize: null, renderer: null };
    }
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string)
      : null;
    const max = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    const isWebgl2 =
      typeof WebGL2RenderingContext !== "undefined" &&
      gl instanceof WebGL2RenderingContext;
    return {
      webgl: isWebgl2 ? "full" : "basic",
      maxTextureSize: Number.isFinite(max) ? max : null,
      renderer,
    };
  } catch {
    return { webgl: "none", maxTextureSize: null, renderer: null };
  }
}

export function canRunHeavyWebgl(cap: GpuCapabilities): boolean {
  return cap.webgl === "full";
}
