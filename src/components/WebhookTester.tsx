import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Play, 
  ArrowRight, 
  Code2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const WebhookTester: React.FC<{ onScrollToForm: () => void }> = ({ onScrollToForm }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  const webhookUrl = 'https://madhuridavala.app.n8n.cloud/form/f3941119-17ec-4836-ad69-e6fb23e836a1';

  const curlSnippet = `curl -X POST "${webhookUrl}" \\
  -F "field-0=Jane Doe" \\
  -F "field-1=jane.doe@example.com" \\
  -F "field-2=@resume.pdf"`;

  const nodeSnippet = `const formData = new FormData();
formData.append('field-0', 'Jane Doe');
formData.append('field-1', 'jane.doe@example.com');
formData.append('field-2', fs.createReadStream('./resume.pdf'));

const response = await fetch('${webhookUrl}', {
  method: 'POST',
  body: formData
});`;

  const pythonSnippet = `import requests

url = "${webhookUrl}"
files = {'field-2': open('resume.pdf', 'rb')}
data = {'field-0': 'Jane Doe', 'field-1': 'jane.doe@example.com'}

response = requests.post(url, files=files, data=data)
print(response.status_code)`;

  const [activeSnippet, setActiveSnippet] = useState<'curl' | 'node' | 'python'>('curl');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleRunPingTest = async () => {
    setPingStatus('testing');
    try {
      const res = await fetch('/api/workflow-info');
      const data = await res.json();
      if (res.ok && data.status === 'online') {
        setPingStatus('success');
      } else {
        setPingStatus('failed');
      }
    } catch {
      setPingStatus('failed');
    }
  };

  return (
    <section id="webhook-tester" className="py-20 border-b border-slate-800/60 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>DEVELOPER INTEGRATION SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Direct Webhook Console & Code Snippets
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl">
              Integrate Madhuri’s n8n resume analyzer directly into your ATS, career page, or custom hiring pipeline using standard HTTP multipart POST.
            </p>
          </div>

          <button
            onClick={handleRunPingTest}
            disabled={pingStatus === 'testing'}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 whitespace-nowrap self-start md:self-auto"
          >
            <Play className={`w-3.5 h-3.5 text-orange-400 ${pingStatus === 'testing' ? 'animate-spin' : ''}`} />
            <span>{pingStatus === 'testing' ? 'Testing Connection...' : 'Verify Cloud Status'}</span>
          </button>
        </div>

        {pingStatus === 'success' && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Proxy Bridge & n8n Endpoint Verified Active (madhuridavala.app.n8n.cloud)</span>
            </div>
            <span className="font-mono text-emerald-400 font-bold">HTTP 200 OK</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Code Selector */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Window bar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-slate-400 ml-2">n8n-webhook-dispatch</span>
              </div>

              <div className="flex items-center gap-1">
                {(['curl', 'node', 'python'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSnippet(tab)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                      activeSnippet === tab ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 relative group">
              <pre className="font-mono text-xs text-orange-200/90 leading-relaxed overflow-x-auto">
                {activeSnippet === 'curl' && curlSnippet}
                {activeSnippet === 'node' && nodeSnippet}
                {activeSnippet === 'python' && pythonSnippet}
              </pre>

              <button
                onClick={() => handleCopy(
                  activeSnippet === 'curl' ? curlSnippet : activeSnippet === 'node' ? nodeSnippet : pythonSnippet,
                  activeSnippet
                )}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center gap-1 text-xs"
                title="Copy snippet"
              >
                {copiedType === activeSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Schema Specifications */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Field Requirements</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-orange-400 font-bold block">field-0</span>
                  <p className="text-slate-300">Full Name of Applicant</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Required · String</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-orange-400 font-bold block">field-1</span>
                  <p className="text-slate-300">Applicant Email Address</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Required · Standard Email Format</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono text-orange-400 font-bold block">field-2</span>
                  <p className="text-slate-300">Resume File Document</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Required · PDF, DOCX, TXT binary</p>
                </div>
              </div>

              <button
                onClick={onScrollToForm}
                className="w-full mt-4 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Test in Web Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
