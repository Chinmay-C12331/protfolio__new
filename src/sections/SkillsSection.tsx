import React from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-slate-800/70 bg-[#070B17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-2">02. Technical Skills</div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Five Core Capability Areas
            </h2>
          </div>

          {/* Exposure Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>
              <strong className="text-cyan-300 font-medium">Project:</strong> Applied in hands-on builds
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>
              <strong className="text-violet-300 font-medium">Coursework / Lab:</strong> Academic foundation
            </span>
          </div>
        </div>

        {/* 5 Compact Skill Categories Grid with Clean Hover States */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="p-5 rounded-2xl bg-[#0C1324] hover:bg-[#0F182D] border border-slate-800/90 hover:border-cyan-400/40 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-white">{group.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{group.subtitle}</p>

                <ul className="mt-4 divide-y divide-slate-800/70">
                  {group.skills.map((skill) => {
                    const isProject = skill.exposure === 'Project Experience';
                    return (
                      <li
                        key={skill.name}
                        className="py-2 px-2 -mx-2 rounded-lg hover:bg-slate-800/40 transition-colors duration-150 flex items-center justify-between gap-2 text-xs sm:text-sm"
                      >
                        <span className="text-slate-200 font-medium">
                          {skill.name}
                          {skill.note && (
                            <span className="text-slate-400 font-mono text-xs ml-1.5">
                              ({skill.note})
                            </span>
                          )}
                        </span>
                        <span
                          className={`font-mono text-[11px] whitespace-nowrap shrink-0 ${
                            isProject ? 'text-cyan-400' : 'text-violet-300'
                          }`}
                        >
                          {isProject ? 'Project' : 'Coursework / Lab'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
