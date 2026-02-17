"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] py-8" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            {`\u00A9 ${new Date().getFullYear()} Dhilip Kumar. Built with Next.js & Framer Motion.`}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            Designed with <span className="gradient-text font-semibold">creativity</span> and code.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
