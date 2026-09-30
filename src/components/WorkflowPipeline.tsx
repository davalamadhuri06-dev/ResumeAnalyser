import React, { useState } from 'react';
import { Network, Database, Cpu, MailCheck, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import workflowImg from '../assets/images/workflow_automation_concept_1790759284971.jpg';

export const WorkflowPipeline: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'schema'>('architecture');
  const [imgError, setImgError] = useState(false);

  const n8nUrl = 'https://madhuridavala.app.n8n.cloud/form/f3941119-17ec-4836-ad69-e6fb23e836a1';

  const handleCopy = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'n8n Form Webhook Intake',
      icon: Network,
      desc: 'The webhook node receives incoming HTTP POST submissions containing candidate details and binary resume files.',
      badge: 'Endpoint: /form/f3941119...',
    },
    {
      num: '02',
      title: 'Binary Text & OCR Extraction',
      icon: Database,
      desc: 'The workflow decodes multipart buffers, parses text layers from PDF/DOCX files, and organizes semantic sections.',
      badge: 'Multiformat Parsing',
    },
    {
      num: '03',
      title: 'AI Qualification & Gap Scoring',
      icon: Cpu,
      desc: 'Evaluates applicant seniority, skills alignment, quantifiable achievements, and ATS keyword relevance against industry benchmarks.',
      badge: 'Intelligent Evaluation',
    },
    {
      num: '04',
      title: 'Feedback Notification Dispatch',
      icon: MailCheck,
      desc: 'Generates structured candidate scorecards and automatically routes evaluation results to the specified recipient email.',
      badge: 'Automated Dispatch',
    },
  ];

  return (
    <section id="pipeline" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>N8N CLOUD AUTOMATION ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Under the Hood: The n8n Engine
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pipeline Nodes
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'schema'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Form Payload Schema
            </button>
          </div>
        </div>

        {activeTab === 'architecture' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Steps Column */}
            <div className="lg:col-span-7 space-y-4">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 font-mono text-sm font-bold">
                      {step.num}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-semibold text-white">
                          {step.title}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {step.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 relative shadow-xl">
                {!imgError ? (
                  <div className="relative aspect-[4/3] w-full">
                    <img
                      src={workflowImg}
                      alt="n8n workflow node connection visualization"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full bg-slate-900 flex items-center justify-center p-6 text-center">
                    <p className="text-xs text-slate-400">n8n Automation Graph</p>
                  </div>
                )}

                <div className="p-6 relative">
                  <h4 className="text-sm font-semibold text-white mb-2">Direct n8n Cloud Webhook</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Configured on Madhuri Davala’s cloud tenant with automatic file intake and notification nodes.
                  </p>

                  <div className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
                    <span className="truncate flex-1">{n8nUrl}</span>
                    <button
                      onClick={handleCopy}
                      className="p-1 hover:text-white text-slate-400 transition-colors"
                      title="Copy URL"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Schema Tab */
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-2">
              Multipart Payload Mapping
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              When a user submits via this web app, our server packages the HTTP request to match the exact DOM form specification of the n8n webhook:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-orange-400 block mb-1">field-0</span>
                <p className="text-sm font-semibold text-white">Candidate Name</p>
                <p className="text-xs text-slate-400 mt-1">String · Required</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-orange-400 block mb-1">field-1</span>
                <p className="text-sm font-semibold text-white">Candidate Email</p>
                <p className="text-xs text-slate-400 mt-1">Email format · Required</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-orange-400 block mb-1">field-2</span>
                <p className="text-sm font-semibold text-white">Resume File</p>
                <p className="text-xs text-slate-400 mt-1">Binary Stream (PDF, DOCX)</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`// Direct POST Curl Equivalent:
curl -X POST "${n8nUrl}" \\
  -F "field-0=Jane Doe" \\
  -F "field-1=jane.doe@example.com" \\
  -F "field-2=@/path/to/resume.pdf"`}</pre>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
