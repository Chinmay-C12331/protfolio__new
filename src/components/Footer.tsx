import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { NAV_ITEMS } from './Navbar';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050811] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="font-display text-sm font-bold text-white">
            <span className="text-cyan-400 font-mono mr-2">{PERSONAL_INFO.initials}</span>
            <span>{PERSONAL_INFO.name}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {PERSONAL_INFO.degree} · {PERSONAL_INFO.university}, Bengaluru
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-500 text-center sm:text-right">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}
        </div>
      </div>
    </footer>
  );
};
