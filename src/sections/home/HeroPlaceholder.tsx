"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function HeroPlaceholder() {
  return (
    <Section
      padY={false}
      className="min-h-screen-fill flex flex-col justify-center overflow-hidden border-b border-border/60"
    >
      <div aria-hidden className="surface-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <Container className="relative py-24 md:py-32">
        <motion.div
          className="max-w-5xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} className="type-caption text-gold">
            Geotextile engineering — cinematic flagship
          </motion.p>
          <motion.h1 variants={fadeUp} className="type-display mt-6 text-foreground">
            Massive systems.
            <span className="block text-muted">Measured in the field.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="type-body mt-8 max-w-2xl text-muted">
            Placeholder hero — wire immersive 3D, scroll narrative, and product
            lanes. Typography and motion architecture are pre-wired for flagship
            delivery.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
