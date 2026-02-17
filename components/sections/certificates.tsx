"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates } from "@/lib/data";
import { ExternalLink, CheckCircle } from "lucide-react";

type CertificateCategory = "all" | "technical" | "design" | "business" | "language";

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>("all");
  const [selectedCert, setSelectedCert] = useState(certificates[0]);
  const [flipped, setFlipped] = useState<string | null>(null);

  const categories: { id: CertificateCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "technical", label: "Technical" },
    { id: "design", label: "Design" },
    { id: "business", label: "Business" },
    { id: "language", label: "Languages" },
  ];

  const filteredCerts =
    selectedCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

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
    hidden: { y: 50, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { scale: 0.8, opacity: 0, filter: "blur(10px)" },
  };

  return (
    <section
      id="certificates"
      className="min-h-screen w-full bg-background py-20 px-4 md:px-8 flex items-center"
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
            Certifications & Licenses
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyan-400 to-pink-400 rounded-full" />
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

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                exit="exit"
                className="h-80 cursor-pointer group perspective"
                onClick={() => setFlipped(flipped === cert.id ? null : cert.id)}
                suppressHydrationWarning
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: flipped === cert.id ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <motion.div
                    className="absolute w-full h-full bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 border border-border shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-shadow duration-300"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex flex-col h-full justify-between">
                      {/* Issuer */}
                      <div className="space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                          {cert.issuer.charAt(0)}
                        </div>

                        {/* Name & Issuer */}
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {cert.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>

                        {/* Verification Badge */}
                        {cert.verified && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2 text-cyan-400 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified Credential</span>
                          </motion.div>
                        )}

                        {/* Date & Score */}
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>📅 {cert.issueDate}</p>
                          {cert.score && <p>🎯 Score: {cert.score}</p>}
                          <p className="text-xs">🔗 {cert.credentialId}</p>
                        </div>
                      </div>

                      {/* Skills & Action */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                          Click to see details
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Back */}
                  <motion.div
                    className="absolute w-full h-full bg-gradient-to-br from-primary/20 to-pink-500/20 rounded-2xl p-6 border border-primary/30 shadow-lg flex flex-col items-center justify-center text-center backdrop-blur-sm"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="space-y-4">
                      <p className="text-foreground font-semibold">{cert.description}</p>

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          All relevant skills covered:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No certificates found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
