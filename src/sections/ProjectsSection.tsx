import React from 'react';
import { PROJECT_FILTER_CATEGORIES, PROJECTS } from '../data/portfolioData';
import { ProjectFilterCategory, ProjectItem } from '../types/portfolio';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsSectionProps {
  activeCategory: ProjectFilterCategory;
  onCategoryChange: (category: ProjectFilterCategory) => void;
  reducedMotion: boolean;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeCategory,
  onCategoryChange,
  reducedMotion,
  onOpenCaseStudy,
}) => {
  const filteredProjects =
    activeCategory === 'All Projects'
      ? PROJECTS
      : PROJECTS.filter((project) => project.filterCategories.includes(activeCategory));

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-cyan-400 mb-2">03. Selected Projects</div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Primary Engineering Builds
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">
              Concise overview of problem statements and key features. Select View Case Study for full architecture and verification details.
            </p>
          </div>

          {/* Functional Category Filters */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0C1324] border border-slate-800 rounded-xl"
            role="group"
            aria-label="Filter projects by category"
          >
            {PROJECT_FILTER_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Grid for the 4 Primary Projects */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              reducedMotion={reducedMotion}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
