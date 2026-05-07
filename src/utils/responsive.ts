export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
  ultra: 2560,
} as const;

export type BreakpointName = keyof typeof breakpoints;

export function mediaUp(name: BreakpointName): string {
  return `(min-width: ${breakpoints[name]}px)`;
}

export function mediaDown(name: BreakpointName): string {
  return `(max-width: ${breakpoints[name] - 0.02}px)`;
}
