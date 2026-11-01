import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { LearningRoadmap } from './sections/LearningRoadmap';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ProjectCaseStudy } from './components/ProjectCaseStudy';
import { useReducedMotion } from './hooks/useReducedMotion';
import { PROJECTS } from './data/portfolioData';
import { ProjectFilterCategory, ProjectItem } from './types/portfolio';

export function App() {
  const reducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeProjectCategory, setActiveProjectCategory] =
    useState<ProjectFilterCategory>('All Projects');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        setActiveSection(sectionId);
      }
    },
    [reducedMotion]
  );

  const handleSelectHologramNode = useCallback(
    (
      targetSection: string,
      filterCategory?: ProjectFilterCategory,
      projectId?: string
    ) => {
      if (filterCategory) {
        setActiveProjectCategory(filterCategory);
      }
      scrollToSection(targetSection);
      if (projectId) {
        const foundProject = PROJECTS.find((p) => p.id === projectId);
        if (foundProject) {
          window.setTimeout(() => {
            setSelectedCaseStudy(foundProject);
          }, 420);
        }
      }
    },
    [scrollToSection]
  );

  return (
    <div className="min-h-screen bg-[#060913] text-[#F1F5F9] relative selection:bg-cyan-400/25 selection:text-cyan-200">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="relative z-20">
        <HeroSection
          reducedMotion={reducedMotion}
          onNavigate={scrollToSection}
          onSelectHologramNode={handleSelectHologramNode}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection
          activeCategory={activeProjectCategory}
          onCategoryChange={setActiveProjectCategory}
          reducedMotion={reducedMotion}
          onOpenCaseStudy={setSelectedCaseStudy}
        />

        <ExperienceSection />

        <AchievementsSection onOpenProjectCaseStudy={setSelectedCaseStudy} />

        <LearningRoadmap />

        <ContactSection />
      </main>

      <Footer onNavigate={scrollToSection} />
      <BackToTop />

      <ProjectCaseStudy
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}

export default App;
