"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Globe,
  FileCode,
  Paintbrush,
  Server,
  Terminal,
  Database,
  Share2,
  Figma,
  GitBranch,
  Box,
  Cloud,
} from "lucide-react";
import { skillCategories } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Globe,
  FileCode,
  Paintbrush,
  Server,
  Terminal,
  Database,
  Share2,
  Figma,
  GitBranch,
  Box,
  Cloud,
};

function CircularProgress({
  value,
  size = 100,
  strokeWidth = 6,
  color,
  delay = 0,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="hsl(var(--muted))"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        style={{
          filter: `drop-shadow(0 0 6px ${color}40)`,
        }}
      />
    </svg>
  );
}

function SkillCard({
  skill,
  color,
  delay,
}: {
  skill: (typeof skillCategories)[0]["skills"][0];
  color: string;
  delay: number;
}) {
  const Icon = iconMap[skill.icon] || Code2;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, type: "spring", damping: 15 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group flex flex-col items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-card p-6 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(108,99,255,0.15)]"
    >
      <div className="relative">
        <CircularProgress
          value={skill.proficiency}
          size={90}
          strokeWidth={5}
          color={color}
          delay={delay}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="h-6 w-6 transition-colors"
            style={{ color }}
          />
        </div>
      </div>
      <h4 className="text-sm font-semibold text-foreground">{skill.name}</h4>
      <span className="font-mono text-xs text-muted-foreground">
        {skill.proficiency}%
      </span>
    </motion.div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      aria-label="Skills"
    >
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(108, 99, 255, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#00D4FF]/10 px-4 py-1.5 font-mono text-sm text-[#00D4FF]">
            Expertise
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Skills & Tools
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skill categories */}
        <div className="flex flex-col gap-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3
                className="mb-8 text-center text-xl font-bold"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {category.skills.map((skill, skillIdx) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    color={category.color}
                    delay={catIdx * 0.1 + skillIdx * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
