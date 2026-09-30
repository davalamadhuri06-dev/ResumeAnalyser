import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, Layers, BookOpen } from 'lucide-react';
import resumeDocImg from '../assets/images/resume_document_preview_1790759262818.jpg';

interface RoleKeyword {
  role: string;
  keywords: string[];
  tips: string;
}

export const AtsGuide: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('Software Engineering');
  const [imgError, setImgError] = useState(false);

  const roleKeywords: RoleKeyword[] = [
    {
      role: 'Software Engineering',
      keywords: ['TypeScript', 'Distributed Systems', 'CI/CD', 'Microservices', 'PostgreSQL', 'Unit Testing', 'Kubernetes', 'REST APIs'],
      tips: 'Emphasize architectural trade-offs, system throughput gains (e.g. "reduced latency by 35%"), and testing coverage.',
    },
    {
      role: 'Product Management',
      keywords: ['Product-Led Growth', 'Roadmap Prioritization', 'ARR Impact', 'A/B Testing', 'Sprint Planning', 'Stakeholder Alignment'],
      tips: 'Highlight conversion lift, customer retention metrics, and cross-functional leadership outcomes.',
    },
    {
      role: 'Data Science & AI',
      keywords: ['LLM Fine-Tuning', 'PyTorch', 'Vector Databases', 'Feature Engineering', 'Model Inference Latency', 'ROC-AUC'],
      tips: 'Focus on model evaluation metrics, deployment pipelines, and business value driven by predictive systems.',
    },
    {
      role: 'Growth & Marketing',
      keywords: ['CAC/LTV Optimization', 'Full-Funnel CRO', 'Organic Search Traffic', 'Attribution Modeling', 'HubSpot / n8n Automation'],
      tips: 'Quantify qualified pipeline generated, lead volume scaling, and payback period compression.',
    },
  ];

  const currentRole = roleKeywords.find((r) => r.role === selectedRole) || roleKeywords[0];

  return (
    <section id="ats-guide" className="py-20 border-b border-slate-800/60 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RESUME PREPARATION PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
            ATS Screening Criteria & Standards
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Automated applicant tracking systems and LLM evaluators scan for structured data points.
            Optimizing for readability ensures seamless data extraction by Madhuri’s n8n workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Guidelines & Role Keywords */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>DO: Clean Typography</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use standard single-column layouts with standard headings like &quot;Professional Experience&quot; and &quot;Education&quot;. Avoid nested text boxes or graphic tables.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold mb-2">
                  <Target className="w-4 h-4" />
                  <span>DO: Quantify Impact</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pair action verbs with concrete metrics (e.g. &quot;Engineered automated ingest pipeline reducing latency by 45% across 2M daily records&quot;).
                </p>
              </div>
            </div>

            {/* Role-Specific Keyword Explorer */}
            <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
              <h3 className="text-sm font-semibold text-white mb-4">
                Recommended Keywords by Target Discipline
              </h3>

              {/* Segmented control buttons */}
              <div className="flex flex-wrap gap-2 mb-5">
                {roleKeywords.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedRole === r.role
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {r.role}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <p className="text-xs font-medium text-slate-400 mb-2.5">
                  High-Priority Keywords Detected by Evaluator:
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {currentRole.keywords.map((kw, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-700/80 text-orange-300 rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 italic">
                  Tip: {currentRole.tips}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Preview Asset */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
              {!imgError ? (
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={resumeDocImg}
                    alt="Professional resume format preview"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-slate-900 flex items-center justify-center p-6 text-center">
                  <p className="text-xs text-slate-400">Resume Format Spec</p>
                </div>
              )}

              <div className="p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Document Parseability Score
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Text-searchable PDF documents and clean Microsoft Word .docx files achieve the highest extraction fidelity when parsed by automated n8n cloud tasks.
                </p>

                <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-800 text-slate-400 font-mono">
                  <span>FORMAT: PDF / DOCX</span>
                  <span className="text-emerald-400 font-semibold">99.4% EXTRACTION RATE</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
