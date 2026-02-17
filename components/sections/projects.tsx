"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, Github, Layers, Code2, Palette } from "lucide-react";
import { projects, type Project } from "@/lib/data";

const filters = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Design", value: "design" },
] as const;

const categoryIcons: Record<string, React.ElementType> = {
  frontend: Code2,
  fullstack: Layers,
  design: Palette,
};

const categoryColors: Record<string, string> = {
  frontend: "#6C63FF",
  fullstack: "#00D4FF",
  design: "#FF6584",
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const CategoryIcon = categoryIcons[project.category] || Layers;
  const color = categoryColors[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group perspective-[1000px]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        className="relative h-[340px] [transform-style:preserve-3d]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 cursor-pointer overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-card [backface-visibility:hidden]"
          onClick={() => setIsFlipped(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsFlipped(true)}
          aria-label={`View details for ${project.title}`}
          suppressHydrationWarning
        >
          {/* Preview area */}
          <div
            className="relative flex h-40 items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            }}
          >
            <CategoryIcon
              className="h-16 w-16 opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
              style={{ color }}
            />
            {/* Glow on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${color}10, transparent 70%)`,
              }}
            />
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: `${color}15`,
                  color,
                }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span className="rounded-full bg-[#FF8C42]/15 px-2.5 py-0.5 text-xs font-medium text-[#FF8C42]">
                  Featured
                </span>
              )}
            </div>
            <h3 className="mb-2 text-lg font-bold text-foreground">
              {project.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-3 text-xs text-muted-foreground/60">
              Click to see details
            </p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 cursor-pointer overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          onClick={() => setIsFlipped(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsFlipped(false)}
          aria-label={`Close details for ${project.title}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          suppressHydrationWarning
        >
          <h3 className="mb-3 text-lg font-bold text-foreground">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6C63FF] px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-[#5B54E6]"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[hsl(var(--border))] px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View source code of ${project.title}`}
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground/60">
            Click to go back
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#FF6584]/10 px-4 py-1.5 font-mono text-sm text-[#FF6584]">
            Work
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A selection of projects that showcase my skills
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? "bg-[#6C63FF] text-foreground shadow-[0_0_20px_rgba(108,99,255,0.3)]"
                  : "border border-[hsl(var(--border))] text-muted-foreground hover:border-[#6C63FF]/30 hover:text-foreground"
              }`}
              aria-pressed={activeFilter === filter.value}
              suppressHydrationWarning
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
