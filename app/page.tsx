"use client";

import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { CertificatesSection } from "@/components/sections/certificates";
import { AchievementsSection } from "@/components/sections/achievements";
import { ContactSection } from "@/components/sections/contact";
import { CharacterGuide } from "@/components/character-guide";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/sections/hero";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
      <CharacterGuide />
    </>
  );
}
