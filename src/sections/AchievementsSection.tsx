import React from 'react';
import { ACHIEVEMENT_ITEMS, PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { ArrowUpRight } from 'lucide-react';

interface AchievementsSectionProps {
  onOpenProjectCaseStudy: (project: ProjectItem) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  onOpenProjectCaseStudy,
}) => {
  return (
    <section id="achievements" className="py-16 sm:py-20 border-t border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-cyan-400 mb-2">05. Achievements &amp; Activities</div>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Awards, Hackathons &amp; Workshops
          </h2>
        </div>

        {/* Compact Structured List with Clean Row Hover */}
        <div className="mt-8 rounded-2xl bg-[#0C1324] border border-slate-800/90 divide-y divide-slate-800/80 overflow-hidden">
          {ACHIEVEMENT_ITEMS.map((item) => {
            const linkedProject = item.linkedProjectId
              ? PROJECTS.find((p) => p.id === item.linkedProjectId)
              : undefined;

            const categoryTone =
              item.category === 'Award'
                ? 'text-cyan-300'
                : item.category === 'Hackathon / Challenge'
                ? 'text-violet-300'
                : 'text-slate-400';

            return (
              <div
                key={item.id}
                className="p-5 sm:px-6 hover:bg-[#101930] transition-colors duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono">
                    <span className={`font-semibold ${categoryTone}`}>{item.badgeText}</span>
                    <span aria-hidden="true" className="text-slate-600">
                      ·
                    </span>
                    <span className="text-slate-400">{item.eventOrOrganizer}</span>
                    {item.date && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">
                          ·
                        </span>
                        <span className="text-slate-300 tabular-nums">{item.date}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white mt-1">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {linkedProject && (
                  <button
                    type="button"
                    onClick={() => onOpenProjectCaseStudy(linkedProject)}
                    className="group inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono text-cyan-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 self-start lg:self-center cursor-pointer"
                  >
                    <span>Inspect {linkedProject.shortTitle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
