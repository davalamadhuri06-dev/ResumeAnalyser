import React from 'react';
import { ChevronUp } from 'lucide-react';

interface FooterProps {
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToForm }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          
          <div className="md:col-span-2">
            <span className="text-lg font-bold text-white tracking-tight font-display flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Resume Analyser AI</span>
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              Autonomous candidate screening and resume evaluation engine designed to boost interview callback rates with data-backed ATS feedback.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onScrollToForm}
                  className="hover:text-white transition-colors"
                >
                  Upload & Score Resume
                </button>
              </li>
              <li>
                <a href="#leaderboard" className="hover:text-white transition-colors">
                  Top Scored Candidates
                </a>
              </li>
              <li>
                <a href="#optimizer" className="hover:text-white transition-colors">
                  Bullet Point Enhancer
                </a>
              </li>
              <li>
                <a href="#ats-audit" className="hover:text-white transition-colors">
                  ATS Score Checker
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Guides & Methodology
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#role-benchmarks" className="hover:text-white transition-colors">
                  Role Standards & Keywords
                </a>
              </li>
              <li>
                <a href="#ats-guide" className="hover:text-white transition-colors">
                  Resume Best Practices
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Resume Analyser AI. Built for candidates & recruiters.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 hover:text-white text-slate-400 transition-colors flex items-center gap-1"
              title="Back to top"
            >
              <span>Back to top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
