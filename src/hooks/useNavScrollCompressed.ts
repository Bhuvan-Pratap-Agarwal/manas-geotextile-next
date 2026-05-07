"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function useNavScrollCompressed(threshold = 56) {
  const [compressed, setCompressed] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setCompressed(y > threshold);
  });

  return compressed;
}
