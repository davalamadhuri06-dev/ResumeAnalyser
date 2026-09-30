import React, { useState } from 'react';
import { 
  FileUp, 
  Cpu, 
  CheckCheck, 
  ArrowRight, 
  Sliders, 
  CheckCircle,
  Sparkles,
  BarChart3,
  Bot
} from 'lucide-react';

interface HowItWorksProps {
  onScrollToForm: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onScrollToForm }) => {
  const steps = [
    {
      step: '01',
      title: 'Upload Resume Document',
      icon: FileUp,
      subtitle: 'Instant File Parsing',
      description:
        'Upload your resume in PDF, Word (.docx), or plain text format. The system instantly verifies readability and text extraction layers.',
      highlight: 'PDF, DOCX & TXT compatible',
      badge: 'Step 1'
    },
    {
      step: '02',
      title: 'Deep ATS Inspection',
      icon: Cpu,
      subtitle: 'Algorithmic Scanner',
      description:
        'Scans layout, contact formatting, section headings, and date chronology to prevent filtering by automated Applicant Tracking Systems.',
      highlight: 'Standard hierarchy checks',
      badge: 'Step 2'
    },
    {
      step: '03',
      title: 'Keyword & Impact Analysis',
      icon: BarChart3,
      subtitle: 'Relevance Scoring',
      description:
        'Compares skill density and quantifiable accomplishment phrasing against high-weight industry standards for your target role.',
      highlight: 'Measurable metric scoring',
      badge: 'Step 3'
    },
    {
      step: '04',
      title: 'Instant Actionable Scorecard',
      icon: CheckCheck,
      subtitle: 'Personalized Report',
      description:
        'Get your overall readiness score out of 100, itemized grades, tailored phrasing suggestions, and an exportable report.',
      highlight: 'Actionable interview prep',
      badge: 'Step 4'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 border-b border-slate-800/60 bg-slate-950/70 relative overflow-hidden">
      {/* Subtle backdrop accents */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
            How Resume Analyser Evaluates Your Profile
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From file intake to deep keyword parsing and actionable suggestions, 
            here is how we help optimize your resume for recruiters and ATS bots.
          </p>
        </div>

        {/* 4 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-orange-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Step pill */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-orange-400/80 transition-colors">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-mono text-orange-400/90 mb-1">{item.subtitle}</p>
                  <h3 className="text-base font-bold text-white group-hover:text-orange-200 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA row */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Ready to inspect your resume?</h4>
              <p className="text-xs text-slate-400">Get your instant scorecard in seconds with full privacy.</p>
            </div>
          </div>

          <button
            onClick={onScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-md transition-colors"
          >
            <span>Upload Your Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
