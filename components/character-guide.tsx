"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CharacterState = "wave" | "idle" | "point" | "jump" | "confused" | "goodbye";

interface CharacterMessage {
  state: CharacterState;
  message: string;
}

const sectionMessages: Record<string, CharacterMessage> = {
  hero: { state: "wave", message: "Hi! Welcome to my portfolio!" },
  about: { state: "point", message: "Here's my story so far..." },
  skills: { state: "jump", message: "I've learned a lot over the years!" },
  projects: { state: "point", message: "Check out what I've built!" },
  contact: { state: "goodbye", message: "Let's build something together!" },
};

// Simple SVG character with different expressions
function MiniCharacter({ state }: { state: CharacterState }) {
  const armRotation = state === "wave" ? [-10, 20, -10] : [0, 0, 0];
  const bodyBounce = state === "jump" ? [0, -8, 0] : [0, -2, 0];
  const eyeScale = state === "confused" ? [1, 1.3, 1] : [1, 1, 1];

  return (
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      animate={{ y: bodyBounce }}
      transition={{ duration: state === "jump" ? 0.4 : 2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="30" cy="44" rx="12" ry="14" fill="#6C63FF" />
      {/* Head */}
      <circle cx="30" cy="22" r="11" fill="#FFD8B5" />
      {/* Eyes */}
      <motion.circle
        cx="26" cy="20" r="1.5" fill="#1A1A2E"
        animate={{ scaleY: eyeScale }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="34" cy="20" r="1.5" fill="#1A1A2E"
        animate={{ scaleY: eyeScale }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Mouth */}
      {state === "confused" ? (
        <circle cx="30" cy="26" r="2" stroke="#1A1A2E" strokeWidth="1" fill="none" />
      ) : (
        <path d="M26 26 Q30 30 34 26" stroke="#1A1A2E" strokeWidth="1" fill="none" strokeLinecap="round" />
      )}
      {/* Hair */}
      <path d="M19 18 Q21 10 30 8 Q39 10 41 18" fill="#1A1A2E" />
      {/* Left arm (waving) */}
      <motion.line
        x1="18" y1="40" x2="8" y2="28"
        stroke="#6C63FF" strokeWidth="3" strokeLinecap="round"
        animate={{ rotate: armRotation }}
        transition={{
          duration: state === "wave" ? 0.5 : 2,
          repeat: state === "wave" ? 4 : Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "18px 40px" }}
      />
      {/* Right arm */}
      <line x1="42" y1="40" x2="50" y2="48" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round" />
    </motion.svg>
  );
}

export function CharacterGuide() {
  const [currentSection, setCurrentSection] = useState("hero");
  const [showBubble, setShowBubble] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show character after initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Track current section based on scroll
  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setCurrentSection(id);
            setIsIdle(false);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show speech bubble on section change
  useEffect(() => {
    setShowBubble(true);
    const timer = setTimeout(() => setShowBubble(false), 4000);
    return () => clearTimeout(timer);
  }, [currentSection]);

  // Idle detection
  useEffect(() => {
    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimer) clearTimeout(idleTimer);
      const timer = setTimeout(() => setIsIdle(true), 30000);
      setIdleTimer(timer);
    };

    window.addEventListener("mousemove", resetIdle, { passive: true });
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("touchmove", resetIdle, { passive: true });

    // Start the initial timer
    const timer = setTimeout(() => setIsIdle(true), 30000);
    setIdleTimer(timer);

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("touchmove", resetIdle);
      if (idleTimer) clearTimeout(idleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMsg = isIdle
    ? { state: "confused" as CharacterState, message: "Still there?" }
    : sectionMessages[currentSection] || sectionMessages.hero;

  const handleClick = useCallback(() => {
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
      className="fixed bottom-6 right-6 z-40 hidden sm:block"
      aria-live="polite"
    >
      <div className="relative">
        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute -top-16 right-0 w-48 rounded-xl border border-[hsl(var(--border))] bg-card p-3 text-xs text-foreground shadow-lg"
            >
              <p>{currentMsg.message}</p>
              <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-[hsl(var(--border))] bg-card" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character button */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-card shadow-lg transition-shadow hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]"
          aria-label="Character guide - click for a message"
        >
          <MiniCharacter state={currentMsg.state} />
        </motion.button>
      </div>
    </motion.div>
  );
}
