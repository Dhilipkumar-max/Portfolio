"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievements } from "@/lib/data";
import { X } from "lucide-react";
import confetti from "canvas-confetti";

type AchievementCategory = "all" | "award" | "milestone" | "competition" | "recognition";

export function AchievementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(
    null
  );

  const categories: { id: AchievementCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "award", label: "Awards" },
    { id: "milestone", label: "Milestones" },
    { id: "competition", label: "Competitions" },
    { id: "recognition", label: "Recognition" },
  ];

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((ach) => ach.category === selectedCategory);

  const rarityStyles = {
    common: {
      gradient: "from-gray-600 to-gray-700",
      glow: "shadow-lg shadow-gray-600/30",
      border: "border-gray-600/30",
    },
    rare: {
      gradient: "from-cyan-500 to-blue-600",
      glow: "shadow-lg shadow-cyan-500/40",
      border: "border-cyan-500/30",
    },
    epic: {
      gradient: "from-purple-600 to-indigo-700",
      glow: "shadow-lg shadow-purple-600/40",
      border: "border-purple-600/30",
    },
    legendary: {
      gradient: "from-yellow-400 via-pink-500 to-red-500",
      glow: "shadow-lg shadow-yellow-400/50",
      border: "border-yellow-400/30",
    },
  };

  const handleAchievementClick = (achievement: typeof achievements[0]) => {
    const particleCount = {
      common: 50,
      rare: 100,
      epic: 150,
      legendary: 250,
    }[achievement.rarity];

    confetti({
      particleCount,
      spread: 70,
      origin: { y: 0.6 },
      colors: [achievement.color, "#FFFFFF", "#FFD700"],
      gravity: 0.8,
      decay: 0.95,
    });

    setSelectedAchievement(achievement);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0, rotateZ: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotateZ: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: { scale: 0.8, opacity: 0, filter: "blur(10px)" },
  };

  const StatCounter = ({ value, label }: { value: string; label: string }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value.replace(/\D/g, ""));

    useEffect(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [target]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-2xl font-bold text-foreground">{count}+</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </motion.div>
    );
  };

  // Calculate stats
  const totalAchievements = achievements.length;
  const featuredCount = achievements.filter((a) => a.featured).length;
  const legendaryCount = achievements.filter((a) => a.rarity === "legendary").length;

  return (
    <section
      id="achievements"
      className="min-h-screen w-full bg-gradient-to-b from-background to-background/50 py-20 px-4 md:px-8 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Achievements & Awards
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 p-6 md:p-8 rounded-2xl bg-card border border-border"
        >
          <StatCounter value={`${totalAchievements}`} label="Total Achievements" />
          <StatCounter value={`${featuredCount}`} label="Featured Awards" />
          <StatCounter value={`${legendaryCount}`} label="Legendary Status" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 flex flex-wrap gap-2 md:gap-3"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/50"
                  : "bg-card text-foreground hover:bg-card/80 border border-border"
              }`}
              suppressHydrationWarning
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, index) => (
              <motion.button
                key={achievement.id}
                variants={cardVariants}
                exit="exit"
                onClick={() => handleAchievementClick(achievement)}
                whileHover="hover"
                className="group perspective text-left"
                suppressHydrationWarning
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: {
                      scale: 1,
                      rotateY: 0,
                    },
                    hover: {
                      scale: 1.08,
                    },
                  }}
                  className={`relative w-full h-64 rounded-2xl p-6 bg-gradient-to-br ${
                    rarityStyles[achievement.rarity].gradient
                  } border ${rarityStyles[achievement.rarity].border} ${
                    rarityStyles[achievement.rarity].glow
                  } transition-all duration-300 overflow-hidden`}
                >
                  {/* Rarity Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-bold text-white uppercase">
                    {achievement.rarity}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col h-full justify-between relative z-10">
                    {/* Icon */}
                    <motion.div
                      initial={{ rotateY: 0, scale: 1 }}
                      whileHover={{
                        rotateY: 360,
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="text-5xl mb-2"
                    >
                      {achievement.icon}
                    </motion.div>

                    {/* Title */}
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-white/80 text-sm font-medium">
                        {achievement.subtitle}
                      </p>
                    </div>

                    {/* Date & Org */}
                    <div className="text-white/70 text-xs space-y-1">
                      {achievement.organization && (
                        <p className="font-medium">{achievement.organization}</p>
                      )}
                      <p>{achievement.date}</p>
                    </div>
                  </div>

                  {/* Animated Background Gradient */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  />
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No achievements found in this category.
            </p>
          </motion.div>
        )}

        {/* Achievement Modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              suppressHydrationWarning
            >
              <motion.div
                initial={{ scale: 0.5, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: -90 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-md rounded-2xl p-8 bg-gradient-to-br ${
                  rarityStyles[selectedAchievement.rarity].gradient
                } border ${rarityStyles[selectedAchievement.rarity].border}`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  suppressHydrationWarning
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Rarity Badge */}
                <div className="inline-flex px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white uppercase mb-4">
                  {selectedAchievement.rarity}
                </div>

                {/* Icon */}
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                  className="text-7xl mb-6"
                >
                  {selectedAchievement.icon}
                </motion.div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedAchievement.title}
                </h2>
                <h3 className="text-lg text-white/80 font-semibold mb-4">
                  {selectedAchievement.subtitle}
                </h3>

                {selectedAchievement.organization && (
                  <p className="text-white/70 mb-2">{selectedAchievement.organization}</p>
                )}
                <p className="text-white/60 text-sm mb-4">{selectedAchievement.date}</p>

                {/* Description */}
                <p className="text-white/90 mb-6">{selectedAchievement.description}</p>

                {/* Stats */}
                {selectedAchievement.stats && selectedAchievement.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                    {selectedAchievement.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-white font-bold text-lg">{stat.value}</p>
                        <p className="text-white/70 text-xs">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAchievement(null)}
                  className="w-full py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors backdrop-blur-sm"
                >
                  Celebrate! 🎉
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
