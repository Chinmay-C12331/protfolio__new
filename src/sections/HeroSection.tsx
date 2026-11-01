import React, { Suspense } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProjectFilterCategory } from '../types/portfolio';
import {
  ArrowRight,
  Download,
  ArrowUpRight,
  Terminal,
  GraduationCap,
  Code2,
  Cpu,
  MapPin,
} from 'lucide-react';

const LazyDeveloperScene3D = React.lazy(() => import('../components/DeveloperScene3D'));

interface HeroSectionProps {
  reducedMotion: boolean;
  onNavigate: (sectionId: string) => void;
  onSelectHologramNode: (
    targetSection: string,
    filterCategory?: ProjectFilterCategory,
    projectId?: string
  ) => void;
}

const QUICK_HIGHLIGHTS = [
  {
    id: 'cgpa',
    value: '9.27 / 10',
    label: 'Current CGPA',
    subtext: 'B.Tech CSE · Presidency Univ.',
    targetSection: 'about',
    icon: GraduationCap,
    accent: 'text-cyan-400',
  },
  {
    id: 'projects',
    value: '4 Primary Builds',
    label: 'Hands-On Projects',
    subtext: 'GenAI, RAG, PyTorch & Next.js',
    targetSection: 'projects',
    icon: Code2,
    accent: 'text-violet-400',
  },
  {
    id: 'toolkit',
    value: 'Python & GenAI',
    label: 'Core Toolkit',
    subtext: 'Gemini API, RAG, PyTorch & TS',
    targetSection: 'skills',
    icon: Cpu,
    accent: 'text-sky-400',
  },
  {
    id: 'status',
    value: 'Class of 2028',
    label: 'Bengaluru, India',
    subtext: 'Open to Internships',
    targetSection: 'contact',
    icon: MapPin,
    accent: 'text-cyan-400',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  reducedMotion,
  onNavigate,
  onSelectHologramNode,
}) => {
  return (
    <section id="home" className="relative pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Row: Left Intro + Right Compact 2x2 Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols): Focused Intro & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
              <Terminal className="w-3.5 h-3.5 shrink-0" />
              <span>{PERSONAL_INFO.availabilityStatus}</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              {PERSONAL_INFO.name}
            </h1>

            <p className="mt-3 font-mono text-sm sm:text-base font-medium text-cyan-300">
              {PERSONAL_INFO.roleLine}
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.heroIntro}
            </p>

            {/* Primary CTA Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#0C1324] hover:bg-[#111B33] border border-slate-700/90 hover:border-cyan-400/50 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap shrink-0"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {PERSONAL_INFO.resumePath && (
                <a
                  href={PERSONAL_INFO.resumePath}
                  download="Chinmay_Choudhari_Resume.pdf"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white bg-[#0C1324] hover:bg-[#111B33] border border-slate-700/80 hover:border-cyan-400/50 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4 text-cyan-400 transition-transform duration-150 group-hover:translate-y-0.5" />
                  <span>Download Resume</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Simple, Attractive 2x2 Quick Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {QUICK_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.targetSection)}
                  className="group p-4 sm:p-5 rounded-2xl bg-[#0C1324] hover:bg-[#101930] border border-slate-800/90 hover:border-cyan-400/50 hover:-translate-y-0.5 transition-all duration-150 text-left flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="text-xs font-mono text-slate-400">{item.label}</span>
                    <Icon
                      className={`w-4 h-4 ${item.accent} transition-transform duration-150 group-hover:scale-110 shrink-0`}
                    />
                  </div>

                  <div className="mt-3">
                    <div className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors tabular-nums">
                      {item.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">{item.subtext}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Full-Width Interactive 3D Developer Workstation Below Intro */}
        <div className="mt-10 w-full">
          <Suspense
            fallback={
              <div className="w-full h-[460px] sm:h-[520px] lg:h-[560px] rounded-2xl bg-[#090E1D] border border-slate-800/80 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="font-mono text-xs text-cyan-400">INITIALIZING 3D WORKSPACE</p>
                <p className="text-xs text-slate-400 mt-1">
                  Loading interactive developer workstation...
                </p>
              </div>
            }
          >
            <LazyDeveloperScene3D
              reducedMotion={reducedMotion}
              onSelectHologramNode={onSelectHologramNode}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
