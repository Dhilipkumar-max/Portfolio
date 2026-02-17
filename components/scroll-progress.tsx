"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 z-[9999] h-1"
      aria-hidden="true"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]" />
    </motion.div>
  );
}
