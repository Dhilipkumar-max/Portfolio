"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timelineEvents } from "@/lib/data";

function TimelineCard({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -80 : 80 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}
      >
        <div className="group rounded-xl border border-[hsl(var(--border))] bg-card p-6 transition-all duration-300 hover:border-[#6C63FF]/30 hover:shadow-[0_8px_24px_rgba(108,99,255,0.15)]">
          <span className="mb-2 inline-block rounded-full bg-[#6C63FF]/10 px-3 py-1 font-mono text-sm text-[#6C63FF]">
            {event.year}
          </span>
          <h3 className="mb-2 text-xl font-bold text-foreground">
            {event.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </div>
      </motion.div>

      {/* Timeline dot - center on desktop */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          type: "spring",
          damping: 12,
          delay: index * 0.15 + 0.2,
        }}
        className="absolute left-0 z-10 hidden md:left-1/2 md:block md:-translate-x-1/2"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#6C63FF] bg-background">
          <div className="h-2 w-2 rounded-full bg-[#6C63FF]" />
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="hidden flex-1 md:block" />
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      aria-label="My Journey"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#6C63FF]/10 px-4 py-1.5 font-mono text-sm text-[#6C63FF]">
            About
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            My Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A timeline of growth, learning, and building
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="absolute left-0 top-0 hidden w-px bg-gradient-to-b from-[#6C63FF] via-[#00D4FF] to-[#FF6584] md:left-1/2 md:block md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Mobile line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-[#6C63FF] via-[#00D4FF] to-[#FF6584] md:hidden"
            aria-hidden="true"
          />

          {/* Events */}
          <div className="flex flex-col gap-12 pl-12 md:gap-16 md:pl-0">
            {timelineEvents.map((event, i) => (
              <TimelineCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {/* Mobile dots */}
          <div className="md:hidden" aria-hidden="true">
            {timelineEvents.map((event, i) => (
              <div
                key={event.id}
                className="absolute left-4 -translate-x-1/2"
                style={{ top: `${(i / (timelineEvents.length - 1)) * 100}%` }}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#6C63FF] bg-background">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
