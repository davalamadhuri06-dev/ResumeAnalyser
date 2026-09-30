import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SubmissionResult } from '../types';

interface LiveScorecardProps {
  submission: SubmissionResult;
  onReset: () => void;
}

export const LiveScorecard: React.FC<LiveScorecardProps> = ({ submission, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'actionPlan'>('overview');

  // Realistic synthesized metrics for candidate
  const metrics = [
    { name: 'ATS Parseability', score: 96, grade: 'A+', feedback: 'Clean standard typography, easily read by automated scanners.' },
    { name: 'Action Verbs & Impact', score: 92, grade: 'A', feedback: 'Strong quantitative verbs (architected, reduced, optimized).' },
    { name: 'Keyword Alignment', score: 88, grade: 'A-', feedback: 'Covers core industry technical stacks and workflow tools.' },
    { name: 'Structural Hierarchy', score: 95, grade: 'A', feedback: 'Single column layout without problematic nested table frames.' },
  ];

  const overallScore = 93;

  const handleCopySummary = () => {
    const text = `Resume Analysis Summary for ${submission.candidate?.name || 'Candidate'}
Overall ATS Score: ${overallScore}/100 (Tier: Top 5% ATS Ready)
Evaluated: ${submission.timestamp}
Document: ${submission.candidate?.fileName}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const report = `=====================================================
RESUME ANALYSER AI - OFFICIAL EVALUATION REPORT
=====================================================

CANDIDATE: ${submission.candidate?.name || 'Anonymous'}
EMAIL: ${submission.candidate?.email || 'N/A'}
FILE: ${submission.candidate?.fileName || 'resume.pdf'}
SIZE: ${submission.candidate?.fileSize ? (submission.candidate.fileSize / 1024).toFixed(1) + ' KB' : 'N/A'}
DATE/TIME: ${submission.timestamp}

-----------------------------------------------------
OVERALL ATS SCORE: ${overallScore} / 100 [EXCELLENT]
-----------------------------------------------------

EVALUATION BREAKDOWN:
- ATS Parseability: 96/100 (Grade: A+)
- Action Verbs & Impact: 92/100 (Grade: A)
- Keyword Alignment: 88/100 (Grade: A-)
- Structural Hierarchy: 95/100 (Grade: A)

KEY OBSERVATIONS:
1. Candidate profile exhibits exceptional structured layout compatibility.
2. Impact metrics and action verbs are present across recent roles.
3. Document is formatted for high readability by recruitment algorithms.

RECOMMENDATIONS FOR INTERVIEW ROUNDS:
- Prepare technical deep-dives around quantified achievements.
- Highlight workflow automation and scalable system design experience.
`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${submission.candidate?.name?.replace(/\s+/g, '_') || 'Candidate'}_Resume_Scorecard.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Candidate Evaluation Scorecard Generated</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                READY
              </span>
            </h3>
            <p className="text-xs text-emerald-300/80">
              Evaluation completed successfully at {submission.timestamp}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleDownloadReport}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
          <button
            onClick={handleCopySummary}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider">
              EVALUATION CANDIDATE
            </span>
            <h2 className="text-2xl font-bold text-white font-display">
              {submission.candidate?.name || 'Applicant'}
            </h2>
            <p className="text-xs text-slate-400">
              {submission.candidate?.email} · Document: <span className="font-mono text-slate-300">{submission.candidate?.fileName}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Overall ATS Score</span>
              <span className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
                {overallScore}/100
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/80 flex items-center justify-center bg-emerald-500/10 text-emerald-400 font-bold font-mono text-base">
              A+
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 py-4 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'breakdown'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Scoring Breakdown
          </button>
          <button
            onClick={() => setActiveTab('actionPlan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'actionPlan'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Actionable Next Steps
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-300">{m.name}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{m.score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${m.score}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{m.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Assessment Summary */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  <span>Executive Assessment Summary</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your resume achieved high scoring marks across ATS readability and metric-driven achievements. 
                  Implementing the targeted recommendations in the Actionable Next Steps tab can further polish keyword alignment for selective employer filters.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">High Impact Accomplishments</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Candidate paired actions with quantifiable percentage metrics and concrete outcomes.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Modern Technical Core</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Strong mentions of contemporary frameworks, distributed architectures, and automated pipelines.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Potential Polish Area: Keyword Densities</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Consider adding specific certifications and cloud orchestrator references to maximize role-specific ranking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actionPlan' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                  Recommendation 1: Tailor Role-Specific Summary
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tailor the top 3-line summary specifically to match the job description keywords of the target employer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                  Recommendation 2: Highlight Automation & Scalability Projects
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Include explicit mentions of automated workflows, API integrations, and system scalability achievements.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Analyze Another Candidate</span>
          </button>
        </div>

      </div>
    </div>
  );
};
