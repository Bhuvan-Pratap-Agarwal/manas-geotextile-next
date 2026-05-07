export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function prefersReducedData(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  return Boolean(connection?.saveData);
}

export function shouldDeferHeavyExperience(): boolean {
  if (typeof window === "undefined") return false;
  return (
    isMobileViewport() ||
    prefersReducedData() ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
