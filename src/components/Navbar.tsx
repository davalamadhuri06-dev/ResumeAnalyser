import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X,
  FileText,
  Trophy,
  Sliders,
  CheckCircle2,
  Wand2,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  onScrollToForm: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToForm, activeSection = 'analyzer' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Upload & Score', href: '#analyzer' },
    { label: 'Top Candidates', href: '#leaderboard' },
    { label: 'Bullet Enhancer', href: '#optimizer' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Role Standards', href: '#role-benchmarks' },
    { label: 'ATS Checker', href: '#ats-audit' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#top" 
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-orange-400 transition-colors flex items-center gap-2.5"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-display">Resume Analyser AI</span>
        </a>

        {/* Desktop Clear Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.href === '#analyzer') {
                  e.preventDefault();
                  onScrollToForm();
                }
              }}
              className="hover:text-orange-400 transition-colors py-1 relative text-slate-300 hover:text-white"
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onScrollToForm}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-5 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.href === '#analyzer') {
                    e.preventDefault();
                    onScrollToForm();
                  }
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800 mt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToForm();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
