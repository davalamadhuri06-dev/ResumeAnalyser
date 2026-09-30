import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, FileCheck, Star } from 'lucide-react';
import heroImage from '../assets/images/hero_resume_analyzer_1790759242341.jpg';

interface HeroProps {
  onScrollToForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToForm }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60">
      {/* Subtle ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-orange-500/10 via-rose-500/5 to-transparent blur-3xl" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Candidate Evaluation System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-display" style={{ textWrap: 'balance' }}>
              Automated Resume Screening & Instant ATS Feedback
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Upload your resume to get instant, AI-driven feedback on ATS compatibility, keyword strength, 
              and role alignment. Get actionable suggestions to boost your interview callback rate.
            </p>

            {/* Single primary CTA and secondary action */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={onScrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-lg shadow-orange-600/20 hover:shadow-orange-600/35 transition-all duration-200"
              >
                <span>Upload & Analyze Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#ats-audit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
              >
                <span>Check ATS Readiness</span>
              </a>
            </div>

            {/* Claim-to-Proof Adjacency */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-lg">
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">Instant</p>
                <p className="text-xs text-slate-400 mt-1">AI Scorecard</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">100%</p>
                <p className="text-xs text-slate-400 mt-1">Free to Use</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">PDF & Word</p>
                <p className="text-xs text-slate-400 mt-1">Multi-format support</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Focal Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/60 group">
              {!imageError ? (
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Resume Analyser AI recruiter dashboard workstation"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Resume Analyser System</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Comprehensive talent screening & scorecards
                  </p>
                </div>
              )}

              {/* Overlay preview badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="font-semibold text-white">Smart Evaluation Engine</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready
                  </span>
                </div>
                <p className="text-slate-300 text-xs">
                  Upload your document below for structured assessment and instant tips.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
