import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  RefreshCw, 
  Wand2, 
  AlertCircle,
  ThumbsUp,
  Sliders,
  ChevronRight
} from 'lucide-react';

interface BulletOptimizerProps {
  onScrollToForm: () => void;
}

export const BulletOptimizer: React.FC<BulletOptimizerProps> = ({ onScrollToForm }) => {
  const defaultDraft = "Responsible for fixing bugs, helping customers, and making the website faster.";
  
  const [draft, setDraft] = useState(defaultDraft);
  const [targetSeniority, setTargetSeniority] = useState<'Mid-Level' | 'Senior' | 'Lead'>('Senior');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const presets = [
    {
      label: 'Performance / Backend',
      text: 'Worked on database queries and improved site load times for users.'
    },
    {
      label: 'Team Leadership / Scrum',
      text: 'Managed daily standups, coordinated tasks, and helped train new developers on the team.'
    },
    {
      label: 'Product & CRO',
      text: 'Changed checkout button design and saw more customers buy items.'
    }
  ];

  const getEnhancedOptions = () => {
    if (targetSeniority === 'Mid-Level') {
      return [
        {
          formula: 'Action Verb + Technical Scope + Measurable Metric',
          text: 'Refactored core RESTful microservices and optimized PostgreSQL indexing, reducing average page load latency by 34% across 80,000 monthly active users.',
          scoreGain: '+18 pts ATS Match',
          verbs: ['Refactored', 'Optimized', 'Reduced']
        },
        {
          formula: 'Methodology + Delivery + Outcome',
          text: 'Automated CI/CD validation tests using GitHub Actions & Docker, decreasing production regression incidents by 45% and accelerating release cadence.',
          scoreGain: '+15 pts ATS Match',
          verbs: ['Automated', 'Decreased', 'Accelerated']
        }
      ];
    }

    if (targetSeniority === 'Senior') {
      return [
        {
          formula: 'Architecture + Throughput + Business Scale',
          text: 'Architected distributed asynchronous event pipeline ingesting 12M events daily, reducing database lock contention by 42% through Redis caching.',
          scoreGain: '+24 pts ATS Match',
          verbs: ['Architected', 'Ingesting', 'Contention']
        },
        {
          formula: 'System Reliability + SLA + Cost Efficiency',
          text: 'Spearheaded zero-downtime database migration to AWS Aurora PostgreSQL, maintaining 99.98% SLA while trimming annual cloud compute overhead by $38,000.',
          scoreGain: '+22 pts ATS Match',
          verbs: ['Spearheaded', 'Maintaining', 'Trimming']
        }
      ];
    }

    return [
      {
        formula: 'Cross-Functional Leadership + ARR Impact + Strategic Vision',
        text: 'Directed technical roadmap and unified 14 engineers across US and EMEA squads, slashing candidate submission drop-off from 48% to 11% and driving $2.4M ARR expansion.',
        scoreGain: '+28 pts ATS Match',
        verbs: ['Directed', 'Unified', 'Slashing']
      },
      {
        formula: 'Talent Mentorship + Engineering Excellence + Operational Velocity',
        text: 'Mentored cohort of 8 engineers and instituted automated n8n webhook triage protocols, elevating sprint completion velocity by 35% with zero P1 regressions.',
        scoreGain: '+25 pts ATS Match',
        verbs: ['Instituted', 'Elevating', 'Zero P1']
      }
    ];
  };

  const enhancedList = getEnhancedOptions();

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleApplyPreset = (text: string) => {
    setDraft(text);
    setIsEnhancing(true);
    setTimeout(() => setIsEnhancing(false), 300);
  };

  return (
    <section id="optimizer" className="py-20 border-b border-slate-800/60 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
              <Wand2 className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">INTERACTIVE IMPACT STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Instant Bullet Point Enhancer
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              Transform passive duty descriptions into high-scoring, metric-driven accomplishment statements proven to pass Applicant Tracking Systems.
            </p>
          </div>

          {/* Seniority Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl self-start md:self-auto">
            {(['Mid-Level', 'Senior', 'Lead'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setTargetSeniority(level)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  targetSeniority === level
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Draft Input */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="bullet-draft" className="text-xs font-semibold text-slate-300">
                  Your Current Resume Bullet Point
                </label>
                <span className="text-[11px] text-slate-500">Edit or pick a preset</span>
              </div>

              <textarea
                id="bullet-draft"
                rows={4}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Paste an accomplishment or duty from your resume..."
                className="w-full p-3.5 text-sm bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none leading-relaxed"
              />

              {/* Presets row */}
              <div className="mt-4 pt-4 border-t border-slate-900">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  TRY WEAK SAMPLES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyPreset(p.text)}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
              <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-200">The STAR Formula: </strong>
                Applicant tracking systems flag bullets containing quantitative metrics (percentages, throughput numbers, cost savings) alongside active verbs.
              </p>
            </div>
          </div>

          {/* Right Column: AI-Enhanced Alternatives */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>ATS-Optimized Variations ({targetSeniority})</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">Formula: STAR Model</span>
            </div>

            {enhancedList.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-orange-500/40 transition-all shadow-xl space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-orange-400 font-semibold">
                    {item.formula}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.scoreGain}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  &ldquo;{item.text}&rdquo;
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-900 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Power Verbs:</span>
                    {item.verbs.map((v, vi) => (
                      <span key={vi} className="text-[11px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">
                        {v}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.text, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Bullet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready to audit your entire resume?</span>
              <button
                type="button"
                onClick={onScrollToForm}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              >
                <span>Upload Full Document</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
