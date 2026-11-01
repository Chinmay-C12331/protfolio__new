import React, { useEffect } from 'react';
import { ProjectItem } from '../types/portfolio';
import { X, ArrowUpRight, AlertTriangle, CheckCircle2, Layers } from 'lucide-react';

interface ProjectCaseStudyProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A1020] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5">
              <span className="tabular-nums">CASE STUDY {project.index}</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400">{project.categoryLabel}</span>
            </div>
            <h2
              id="case-study-title"
              className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Close case study modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Overview
          </h3>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {project.overview}
          </p>
        </div>

        {/* Problem, Approach, Engineering Value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-[#0F172A]/80 border border-slate-800/90">
            <h4 className="text-xs font-mono text-cyan-400 mb-1.5">01. Problem</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A]/80 border border-slate-800/90">
            <h4 className="text-xs font-mono text-violet-400 mb-1.5">02. Approach</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.approach}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A]/80 border border-slate-800/90">
            <h4 className="text-xs font-mono text-sky-400 mb-1.5">03. Engineering Value</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.engineeringValue}
            </p>
          </div>
        </div>

        {/* Full Architecture & Features */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Full Architecture &amp; Features</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.fullFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0D1527] border border-slate-800/70 text-xs sm:text-sm text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Repository-Documented Verification */}
        {project.testingDocumentation && (
          <div className="mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <div className="text-xs font-mono text-cyan-300 mb-1">
              Repository-Documented Testing
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{project.testingDocumentation}</p>
          </div>
        )}

        {/* Known Limitations & Data Disclaimers */}
        {project.limitations && (
          <div className="mt-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/35">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{project.limitations.badge}</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
              {project.limitations.details.map((detail) => (
                <li key={detail} className="leading-relaxed">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-1">Technology Stack</div>
            <div className="text-xs font-mono text-slate-200">
              {project.technologies.join(' · ')}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Close
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>View on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
