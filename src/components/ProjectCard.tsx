import React from 'react';
import { ProjectItem } from '../types/portfolio';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  reducedMotion: boolean;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

const ProjectSchematicPreview: React.FC<{ type: ProjectItem['schematicType'] }> = ({ type }) => {
  switch (type) {
    case 'scamsniffer':
      return (
        <div className="w-full h-36 bg-[#070C18] border-b border-slate-800/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>HYBRID RISK ARCHITECTURE</span>
            <span className="text-cyan-400 tabular-nums">6 VECTORS · 0–100% INDEX</span>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center my-auto">
            <div className="p-2 rounded-lg bg-[#0D1528] border border-slate-800 text-xs font-medium text-white truncate">
              Gemini Evidence
            </div>
            <div className="p-2 rounded-lg bg-[#0D1528] border border-cyan-500/30 text-xs font-medium text-cyan-200 truncate">
              Rule Engine
            </div>
            <div className="p-2 rounded-lg bg-[#0D1528] border border-violet-500/30 text-xs font-medium text-violet-200 truncate">
              Auditable Score
            </div>
          </div>
        </div>
      );

    case 'ecotech':
      return (
        <div className="w-full h-36 bg-[#070C18] border-b border-slate-800/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>CAMPUS RESOURCE WORKFLOW</span>
            <span className="text-amber-300">SIMULATED DEMO DATA</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 items-center my-auto">
            {['Measure', 'Detect', 'Act', 'Verify'].map((step, i) => (
              <div
                key={step}
                className="p-2 rounded-lg bg-[#0D1528] border border-slate-800 text-center text-xs font-medium text-white"
              >
                <span className="text-cyan-400 font-mono text-[10px] mr-1">0{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      );

    case 'rag':
      return (
        <div className="w-full h-36 bg-[#070C18] border-b border-slate-800/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>GROUNDED PDF RETRIEVAL</span>
            <span className="text-cyan-400 tabular-nums">1000/200 CHUNKS · TOP-3</span>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center my-auto">
            <div className="p-2 rounded-lg bg-[#0D1528] border border-slate-800 text-xs font-medium text-white truncate">
              PDF Chunking
            </div>
            <div className="p-2 rounded-lg bg-[#0D1528] border border-cyan-500/30 text-xs font-medium text-cyan-200 truncate">
              ChromaDB + HF
            </div>
            <div className="p-2 rounded-lg bg-[#0D1528] border border-violet-500/30 text-xs font-medium text-violet-200 truncate">
              Gemini + Pages
            </div>
          </div>
        </div>
      );

    case 'password':
      return (
        <div className="w-full h-36 bg-[#070C18] border-b border-slate-800/80 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>RESEARCH PROTOTYPE</span>
            <span className="text-violet-300">SYNTHETIC DATA ONLY</span>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center my-auto">
            <div className="p-2 rounded-lg bg-[#0D1528] border border-slate-800 text-xs font-medium text-white truncate">
              2-Layer BiLSTM
            </div>
            <div className="p-2 rounded-lg bg-[#0D1528] border border-cyan-500/30 text-xs font-medium text-cyan-200 truncate">
              22-Feature MLP
            </div>
            <div className="p-2 rounded-lg bg-[#0D1528] border border-violet-500/30 text-xs font-medium text-violet-200 truncate">
              ONNX INT8
            </div>
          </div>
        </div>
      );
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  return (
    <article className="group bg-[#0C1324] hover:bg-[#0F182D] border border-slate-800/90 hover:border-cyan-400/50 hover:-translate-y-1 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-150">
      <div>
        <ProjectSchematicPreview type={project.schematicType} />

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5">
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-400">{project.categoryLabel}</span>
          </div>

          {/* Project Name */}
          <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-150 leading-snug">
            {project.title}
          </h3>

          {/* One-Sentence Problem Statement */}
          <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
            <span className="font-mono text-xs text-slate-400 mr-1.5">Problem:</span>
            {project.problemStatement}
          </p>

          {/* Three Key Features */}
          <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-slate-300">
            {project.cardFeatures.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono select-none">—</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          {/* Concise Disclaimer Note for Simulated / Synthetic Data */}
          {project.limitations && (
            <div className="mt-3.5 pt-2.5 border-t border-slate-800/70 text-xs font-mono text-amber-300/90">
              Note: {project.limitations.shortNote}
            </div>
          )}
        </div>
      </div>

      {/* Technology Stack + GitHub & Case Study Actions */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-800/60 bg-[#090F1E]/60">
        <div className="text-xs font-mono text-slate-400 mb-4 leading-relaxed">
          {project.technologies.join(' · ')}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Case Study</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0"
            aria-label={`Open ${project.shortTitle} on GitHub`}
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
