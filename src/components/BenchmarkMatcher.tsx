import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Briefcase, 
  FileText, 
  Code2, 
  TrendingUp, 
  RotateCw,
  Copy,
  Check
} from 'lucide-react';

interface JobRoleBenchmark {
  id: string;
  title: string;
  category: string;
  mustHaveKeywords: string[];
  suggestedPhrasing: string[];
  commonPitfalls: string[];
  sampleBulletPoint: string;
}

export const BenchmarkMatcher: React.FC<{ onApplyKeywordsToForm?: (keywords: string[]) => void }> = ({ onApplyKeywordsToForm }) => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const benchmarks: JobRoleBenchmark[] = [
    {
      id: 'fullstack-dev',
      title: 'Full Stack & Backend Engineer',
      category: 'Engineering',
      mustHaveKeywords: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Docker', 'RESTful APIs', 'Microservices', 'CI/CD'],
      suggestedPhrasing: [
        'Architected high-throughput RESTful microservices reducing API latency by 42%',
        'Implemented end-to-end CI/CD delivery pipelines in GitHub Actions & Docker',
        'Engineered responsive React SPA interfaces supporting 250k+ active monthly users'
      ],
      commonPitfalls: [
        'Listing technologies in a list without mentioning project context or scale',
        'Omitting metric gains like latency reduction, concurrency, or test coverage',
        'Saving as an image-only PDF which strips OCR text extraction'
      ],
      sampleBulletPoint: 'Architected distributed event-driven ingestion pipeline handling 12M events daily, reducing database lock contention by 35% through Redis caching.'
    },
    {
      id: 'ai-engineer',
      title: 'AI / LLM & ML Engineer',
      category: 'Machine Learning',
      mustHaveKeywords: ['Python', 'PyTorch', 'Vector DB', 'RAG Pipelines', 'LangChain/LlamaIndex', 'Model Fine-tuning', 'Embeddings', 'FastAPI'],
      suggestedPhrasing: [
        'Built enterprise Retrieval-Augmented Generation (RAG) system with Pinecone/Qdrant',
        'Fine-tuned open-weights LLMs for specialized domain extraction achieving 94% F1-score',
        'Optimized token streaming latency via asynchronous FastAPI websockets'
      ],
      commonPitfalls: [
        'Calling standard API wrappers "custom model development"',
        'Ignoring token cost, evaluation benchmarks, and inference latency stats',
        'Not showcasing evaluation frameworks (e.g. Ragas, TruLens, DeepEval)'
      ],
      sampleBulletPoint: 'Engineered production RAG pipeline indexing 400k technical docs with Milvus & hybrid semantic search, improving answer grounding accuracy from 68% to 92%.'
    },
    {
      id: 'product-lead',
      title: 'Technical Product Manager',
      category: 'Product & Growth',
      mustHaveKeywords: ['Roadmap Prioritization', 'Product-Led Growth', 'A/B Testing', 'SQL Analytics', 'User Discovery', 'PRDs', 'Sprint Velocity', 'Churn Reduction'],
      suggestedPhrasing: [
        'Spearheaded self-serve onboarding flow increasing 30-day user retention by 22%',
        'Authored technical PRDs and aligned cross-functional squad of 12 engineers and designers',
        'Formulated data-driven product roadmap resulting in $4.2M net-new ARR'
      ],
      commonPitfalls: [
        'Focusing solely on features shipped rather than business outcomes generated',
        'Vague team sizes and missing revenue or user adoption percentages',
        'Overly wordy paragraphs rather than concise bullet points'
      ],
      sampleBulletPoint: 'Prioritized feature delivery roadmap through quantitative churn analysis, launching self-service seat expansions that drove 28% expansion ARR.'
    },
    {
      id: 'cloud-devops',
      title: 'DevOps & Cloud Architect',
      category: 'Infrastructure',
      mustHaveKeywords: ['Kubernetes (K8s)', 'AWS/GCP', 'Terraform', 'IaC', 'Observability (Prometheus/Grafana)', 'Zero Trust Security', 'Cost Optimization'],
      suggestedPhrasing: [
        'Designed multi-region Kubernetes clusters with automated autoscaling & failover',
        'Provisioned cloud infrastructure using modular Terraform IaC templates',
        'Reduced annual cloud expenditure by $180k through spot instance orchestration'
      ],
      commonPitfalls: [
        'Listing tools without detailing infrastructure scale (# of nodes, clusters, or traffic)',
        'Omitting security compliance standards (SOC2, HIPAA, ISO)',
        'Not highlighting disaster recovery or downtime reduction metrics'
      ],
      sampleBulletPoint: 'Migrated monolithic infrastructure to containerized Kubernetes on AWS EKS with Terraform, reducing deployment rollbacks by 74%.'
    }
  ];

  const current = benchmarks[selectedRoleIndex];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="role-benchmarks" className="py-20 border-b border-slate-800/60 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>RECRUITER RADAR & BENCHMARKING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Target Role Alignment Inspector
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl">
              Compare your resume bullets and competencies against standard benchmarks evaluated by automated ATS and hiring algorithms.
            </p>
          </div>

          {/* Role selector pills */}
          <div className="flex flex-wrap gap-2">
            {benchmarks.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setSelectedRoleIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedRoleIndex === idx
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {b.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Benchmark Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Keywords & Phrasings */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Keywords */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-orange-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    High-Weight ATS Keywords ({current.category})
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Target Match Rate: &gt;85%</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {current.mustHaveKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono bg-slate-950 border border-slate-700 text-slate-200 rounded-md hover:border-orange-500/50 transition-colors"
                  >
                    +{kw}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                These industry-standard terms trigger high scoring weights inside n8n workflow qualification nodes.
              </p>
            </div>

            {/* Phrasing Examples */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Impact-Driven Phrasing Formulas
                </h3>
              </div>

              <div className="space-y-3">
                {current.suggestedPhrasing.map((phrase, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start justify-between gap-3 text-xs text-slate-200 group hover:border-slate-700"
                  >
                    <span className="font-mono text-orange-400 shrink-0 font-bold">0{idx + 1}.</span>
                    <p className="flex-1 leading-relaxed">{phrase}</p>
                    <button
                      onClick={() => handleCopy(phrase, idx)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="Copy formula"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pitfalls & Pro Tip Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Common Pitfalls Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Parsing Pitfalls to Avoid
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                {current.commonPitfalls.map((pitfall, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Model Bullet Sample */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 via-slate-900 to-slate-900 border border-orange-500/20 shadow-xl">
              <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest block mb-2">
                EXCELLENCE SPECIMEN
              </span>
              <h4 className="text-sm font-bold text-white mb-2">
                High-Scoring Accomplishment Statement
              </h4>
              <blockquote className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 italic leading-relaxed mb-4">
                &ldquo;{current.sampleBulletPoint}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span>ATS Classification:</span>
                <span className="text-emerald-400 font-semibold font-mono">STAR Pattern Verified</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
