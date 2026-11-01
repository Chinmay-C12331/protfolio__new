import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      const tempInput = document.createElement('input');
      tempInput.value = PERSONAL_INFO.email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1324] border border-slate-800/90 hover:border-slate-700 transition-colors duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-mono text-cyan-400 mb-2">07. Contact</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Connect for Internship &amp; Engineering Opportunities
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {PERSONAL_INFO.location} ·{' '}
              <span className="font-mono text-slate-200">{PERSONAL_INFO.email}</span>
            </p>
          </div>

          {/* Direct Recruiter Actions: Email, Copy Email, GitHub, LinkedIn */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 hover:-translate-y-0.5 rounded-xl transition-all duration-150 whitespace-nowrap"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
