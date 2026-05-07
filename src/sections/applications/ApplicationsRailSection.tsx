"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ApplicationsPanel } from "@/sections/applications/ApplicationsPanel";
import { APPLICATIONS } from "@/sections/applications/applications-data";
import { useApplicationsRailScroll } from "@/sections/applications/useApplicationsRailScroll";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ApplicationsRailSection() {
  const reducedMotion = useReducedMotion();
  const { deferHeavyExperience, ready } = useDeviceCapability();
  const ambientMotion = ready && !deferHeavyExperience;

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useApplicationsRailScroll(pinRef, trackRef, !reducedMotion);

  return (
    <section
      id="applications"
      className="relative border-b border-border/50 bg-[var(--surface-base)]"
      aria-label="Applications"
    >
      <div className="relative border-b border-border/40">
        <Container wide className="py-[clamp(3.25rem,9vh,6.5rem)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="type-caption text-muted">Applications</p>
            <h2 className="type-title mt-3 max-w-[22rem] text-foreground md:max-w-[36rem] min-[1800px]:max-w-[44rem]">
              Infrastructure systems at continental scale.
            </h2>
            <p className="type-body mt-4 max-w-[40rem] text-muted">
              {reducedMotion
                ? "Each environment below is staged for membrane discipline, structural clarity, and field-proven geosynthetic performance."
                : "Scroll the corridor—each environment phases forward with membrane discipline, structural clarity, and field-proven geosynthetic performance."}
            </p>
          </motion.div>
        </Container>
      </div>

      {reducedMotion ? (
        <div className="relative">
          {APPLICATIONS.map((spec) => (
            <ApplicationsPanel
              key={spec.id}
              spec={spec}
              layout="stack"
              ambientMotion={ambientMotion}
            />
          ))}
        </div>
      ) : (
        <div
          ref={pinRef}
          className="relative h-[100svh] max-h-[100dvh] overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex h-full w-max flex-nowrap will-change-transform"
          >
            {APPLICATIONS.map((spec) => (
              <ApplicationsPanel
                key={spec.id}
                spec={spec}
                layout="rail"
                ambientMotion={ambientMotion}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
