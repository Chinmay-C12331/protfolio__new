import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-slate-800/70 bg-[#070B17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-cyan-400 mb-2">04. Experience</div>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Internship Experience
          </h2>
        </div>

        <div className="mt-8">
          {EXPERIENCE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0C1324] hover:bg-[#0F182D] border border-slate-800/90 hover:border-cyan-400/45 hover:-translate-y-0.5 transition-all duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.role} <span className="text-slate-500 font-normal">·</span>{' '}
                    <span className="text-cyan-300">{item.organization}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{item.summary}</p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 bg-[#080E1C] px-3.5 py-2 rounded-lg border border-slate-800 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="tabular-nums font-semibold">{item.dates}</span>
                  <span aria-hidden="true" className="text-slate-600">
                    ·
                  </span>
                  <span className="text-slate-400">{item.duration}</span>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                {item.highlights.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-slate-800/70 text-xs font-mono text-slate-400">
                {item.technologiesUsed.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
