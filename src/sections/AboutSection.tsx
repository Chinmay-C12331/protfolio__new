import React from 'react';
import { ABOUT_SUMMARY, PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 border-t border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Professional Summary from Resume */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono text-cyan-400 mb-2">01. About</div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Professional Summary &amp; Education
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">{ABOUT_SUMMARY}</p>
          </div>

          {/* Right: Education & Relevant Coursework from Resume */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-[#0C1324] hover:bg-[#101930] border border-slate-800/90 hover:border-cyan-400/45 hover:-translate-y-0.5 transition-all duration-150">
                <div className="text-xs font-mono text-slate-400">Education</div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {PERSONAL_INFO.degree}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{PERSONAL_INFO.university}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#0C1324] hover:bg-[#101930] border border-slate-800/90 hover:border-cyan-400/45 hover:-translate-y-0.5 transition-all duration-150">
                <div className="text-xs font-mono text-slate-400">Academic Standing</div>
                <div className="mt-1 text-base font-bold font-mono tabular-nums text-cyan-300">
                  CGPA {PERSONAL_INFO.cgpa}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5 tabular-nums">
                  {PERSONAL_INFO.graduationClass}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0C1324] hover:bg-[#101930] border border-slate-800/90 hover:border-cyan-400/45 hover:-translate-y-0.5 transition-all duration-150">
              <div className="text-xs font-mono text-cyan-400">Relevant University Coursework</div>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {PERSONAL_INFO.relevantCoursework}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
