import React, { useState } from 'react';
import { 
  FileCheck, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

interface AuditCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export const AtsAuditTool: React.FC = () => {
  const criteria: AuditCriterion[] = [
    { id: 'contact', name: 'Clean Contact Header', description: 'Name, phone, email, and LinkedIn URL without nested tables or background images.', weight: 15 },
    { id: 'singleColumn', name: 'Single-Column Hierarchy', description: 'Left-aligned chronological or functional layout readable from top to bottom.', weight: 20 },
    { id: 'standardHeadings', name: 'Standard Section Headings', description: 'Universal names ("Experience", "Education", "Skills") instead of non-standard labels.', weight: 15 },
    { id: 'metrics', name: 'Quantified Accomplishments', description: 'Metrics with % gains, dollar figures, team sizes, or latency reductions in each role.', weight: 25 },
    { id: 'keywords', name: 'Domain Keyword Density', description: 'Direct inclusion of targeted technical skills and industry tools.', weight: 15 },
    { id: 'fileFormat', name: 'Text-Searchable Format', description: 'Native PDF or DOCX file (NOT flattened image scan or screenshot).', weight: 10 }
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(['contact', 'singleColumn', 'standardHeadings', 'fileFormat']);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentScore = criteria.reduce((sum, c) => (checkedIds.includes(c.id) ? sum + c.weight : sum), 0);

  const getScoreBand = (score: number) => {
    if (score >= 90) return { label: 'Exceptional ATS Readability', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 border-emerald-500/30' };
    if (score >= 70) return { label: 'Good Passing Potential', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 border-amber-500/30' };
    return { label: 'Risk of ATS Rejection', color: 'text-rose-400', badgeBg: 'bg-rose-500/20 border-rose-500/30' };
  };

  const band = getScoreBand(currentScore);

  return (
    <section id="ats-audit" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Interactive Self-Audit Checklist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
            Instant ATS Compatibility Calculator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Check off each structural item present in your document to calculate its estimated extraction reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Checkbox List */}
          <div className="lg:col-span-8 space-y-3">
            {criteria.map((c) => {
              const isChecked = checkedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => toggleCheck(c.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                    isChecked
                      ? 'bg-slate-900/90 border-orange-500/40 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                    isChecked ? 'bg-orange-600 border-orange-500 text-white' : 'border-slate-700 bg-slate-950'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-semibold transition-colors ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                        {c.name}
                      </h3>
                      <span className="font-mono text-xs text-orange-400 font-semibold">
                        +{c.weight} pts
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Score Gauge & Live Feedback */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                CALCULATED READINESS
              </span>

              <div className="text-5xl font-black font-mono text-white mb-2 tabular-nums">
                {currentScore}
                <span className="text-xl text-slate-500">/100</span>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6 border ${band.badgeBg} ${band.color}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{band.label}</span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden mb-6 border border-slate-800">
                <div 
                  className={`h-full transition-all duration-500 ${
                    currentScore >= 90 ? 'bg-emerald-500' : currentScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${currentScore}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6 text-left">
                {currentScore >= 90 
                  ? 'Your resume has all prerequisites for flawless text extraction by the n8n OCR parser.' 
                  : 'Consider incorporating missing items above before dispatching into the automated screening workflow.'}
              </p>

              <button
                type="button"
                onClick={() => setCheckedIds(criteria.map(c => c.id))}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              >
                Select All Best Practices
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
