import React from 'react';
import { LEARNING_ROADMAP } from '../data/portfolioData';

export const LearningRoadmap: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-t border-slate-800/70 bg-[#070B17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-cyan-400 mb-2">06. Learning Roadmap</div>
          <h2
            className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Current Development Focus
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {LEARNING_ROADMAP.map((track) => {
            const accentText =
              track.accentColor === 'cyan'
                ? 'text-cyan-400'
                : track.accentColor === 'violet'
                ? 'text-violet-400'
                : 'text-sky-400';

            return (
              <div
                key={track.id}
                className="p-5 rounded-2xl bg-[#0C1324] hover:bg-[#0F182D] border border-slate-800/90 hover:border-cyan-400/45 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className={`font-mono text-xs font-semibold tabular-nums ${accentText}`}>
                    {track.number} · ACTIVE FOCUS
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mt-1">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{track.summary}</p>

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-200">
                    {track.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className={`font-mono select-none ${accentText}`}>→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
