"use client";

import { useEffect, useState } from "react";
import {
  type GpuCapabilities,
  getGpuCapabilities,
} from "@/lib/gpu/capabilities";
import { getAdaptiveDpr } from "@/lib/gpu/dpr";
import { shouldDeferHeavyExperience } from "@/lib/performance/mobile";

export interface DeviceCapabilityState {
  gpu: GpuCapabilities;
  dpr: number;
  deferHeavyExperience: boolean;
  ready: boolean;
}

const defaultState: DeviceCapabilityState = {
  gpu: { webgl: "none", maxTextureSize: null, renderer: null },
  dpr: 1,
  deferHeavyExperience: false,
  ready: false,
};

export function useDeviceCapability(): DeviceCapabilityState {
  const [state, setState] = useState<DeviceCapabilityState>(defaultState);

  useEffect(() => {
    const gpu = getGpuCapabilities();
    const dpr = getAdaptiveDpr({
      max: 2,
      min: 1,
      capForMobile: 1.5,
    });
    const deferHeavyExperience = shouldDeferHeavyExperience();

    setState({
      gpu,
      dpr,
      deferHeavyExperience,
      ready: true,
    });
  }, []);

  return state;
}
