import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';

interface N8nDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const N8nDetailsModal: React.FC<N8nDetailsModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const n8nUrl = 'https://madhuridavala.app.n8n.cloud/form/f3941119-17ec-4836-ad69-e6fb23e836a1';
  const formId = 'f3941119-17ec-4836-ad69-e6fb23e836a1';
  const tenantHost = 'madhuridavala.app.n8n.cloud';

  const handleCopy = () => {
    navigator.clipboard.writeText(n8nUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                n8n Cloud Webhook Specification
              </h3>
              <p className="text-xs text-slate-400">
                Connected workflow telemetry and form metadata
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5 text-xs text-slate-300">
          
          <div>
            <label className="block text-slate-400 font-mono text-[11px] mb-1">
              FULL ENDPOINT URL
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
              <span className="truncate flex-1 text-slate-200">{n8nUrl}</span>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:text-white text-slate-400 transition-colors"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1">Cloud Host</span>
              <span className="font-mono text-white text-xs font-semibold">{tenantHost}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1">Form UUID</span>
              <span className="font-mono text-white text-xs font-semibold">{formId.slice(0, 18)}...</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Declared Form Schema
            </h4>
            <div className="rounded-lg border border-slate-800 overflow-hidden divide-y divide-slate-800 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2.5 bg-slate-950">
                <span className="text-orange-400">field-0</span>
                <span className="text-white">Name (text input, required)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-950">
                <span className="text-orange-400">field-1</span>
                <span className="text-white">Email (email input, required)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-950">
                <span className="text-orange-400">field-2</span>
                <span className="text-white">Upload Resume (file, multipart/form-data)</span>
              </div>
            </div>
          </div>

          {/* Technical Note on Frame Protection */}
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Full-Stack Proxy Architecture: </span>
                n8n Cloud sets <code className="font-mono text-amber-300">X-Frame-Options: SAMEORIGIN</code>. This application provides a server-side proxy route that forwards multipart submissions directly to the webhook without client CORS or frame restrictions.
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <a
            href={n8nUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Open in n8n Cloud directly</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
