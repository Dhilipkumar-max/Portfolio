"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Github, Linkedin, Twitter } from "lucide-react";
import confetti from "canvas-confetti";
import { socialLinks } from "@/lib/data";

const socialIcons: Record<string, React.ElementType> = {
  Mail,
  Github,
  Linkedin,
  Twitter,
};

type FormState = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#6C63FF", "#00D4FF", "#FF6584", "#FF8C42"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#6C63FF", "#00D4FF", "#FF6584", "#FF8C42"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState("sending");

      // Simulate sending
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormState("success");
      fireConfetti();
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setFormState("idle"), 5000);
    },
    [fireConfetti]
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      aria-label="Contact"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(108, 99, 255, 0.1) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#FF8C42]/10 px-4 py-1.5 font-mono text-sm text-[#FF8C42]">
            Contact
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {"Let's Build Something Amazing"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)]"
              placeholder="Your name"
              disabled={formState === "sending"}
              suppressHydrationWarning
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full rounded-lg border border-[hsl(var(--border))] bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)]"
              placeholder="you@example.com"
              disabled={formState === "sending"}
              suppressHydrationWarning
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
              className="w-full resize-none rounded-lg border border-[hsl(var(--border))] bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)]"
              placeholder="Tell me about your project..."
              disabled={formState === "sending"}
              suppressHydrationWarning
            />
          </div>

          <AnimatePresence>
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 py-4 text-sm font-medium text-green-400"
              >
                <CheckCircle className="h-5 w-5" />
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                type="submit"
                disabled={formState === "sending"}
                className="group relative flex items-center justify-center gap-2 rounded-lg bg-[#6C63FF] px-6 py-4 text-sm font-semibold text-foreground transition-all hover:bg-[#5B54E6] hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                suppressHydrationWarning
              >
                {formState === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 rounded-full border-2 border-foreground border-t-transparent"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Send Message
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.icon] || Mail;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--border))] text-muted-foreground transition-all hover:border-[#6C63FF]/50 hover:text-[#6C63FF] hover:shadow-[0_0_15px_rgba(108,99,255,0.2)]"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${link.name}`}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
