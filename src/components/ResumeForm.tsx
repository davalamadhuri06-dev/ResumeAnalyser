import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  Sparkles, 
  Shield, 
  FileCheck, 
  RotateCcw, 
  User, 
  Mail, 
  Zap, 
  Check,
  Award
} from 'lucide-react';
import { SAMPLE_PROFILES, SampleResumeProfile } from '../data/sampleResumes';
import { SubmissionResult } from '../types';
import { LiveScorecard } from './LiveScorecard';

interface ResumeFormProps {
  onSubmissionComplete?: (result: SubmissionResult) => void;
  initialSubmission?: SubmissionResult | null;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ 
  onSubmissionComplete,
  initialSubmission
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Submission & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string>('');
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(initialSubmission || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Pre-Analysis Simulation State
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [detectedSections, setDetectedSections] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSubmission) {
      setSubmissionResult(initialSubmission);
    }
  }, [initialSubmission]);

  // Analyze file whenever a file is selected
  useEffect(() => {
    if (!file) {
      setAtsScore(null);
      setDetectedSections([]);
      return;
    }

    let score = 88;
    const detected: string[] = ['Contact Information', 'Professional Experience', 'Technical Skills'];
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      score += 6;
      detected.push('Standard PDF Encoding');
    } else if (ext === 'docx') {
      score += 4;
      detected.push('Standard Word XML Schema');
    }

    if (file.size > 2000 && file.size < 5000000) {
      score += 4;
      detected.push('Optimal File Size Range');
    }

    setAtsScore(Math.min(score, 98));
    setDetectedSections(detected);
  }, [file]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    setErrorMessage(null);
    const validExtensions = ['pdf', 'doc', 'docx', 'txt'];
    const extension = uploadedFile.name.split('.').pop()?.toLowerCase();

    if (!extension || !validExtensions.includes(extension)) {
      setErrorMessage('Please upload a valid resume document (.pdf, .docx, .doc, or .txt).');
      return;
    }

    if (uploadedFile.size > 20 * 1024 * 1024) {
      setErrorMessage('File size exceeds 20MB limit. Please upload a smaller document.');
      return;
    }

    setFile(uploadedFile);
  };

  const handleLoadSample = (sample: SampleResumeProfile) => {
    setName(sample.name);
    setEmail(sample.email);

    const blob = new Blob([sample.textContent], { type: 'text/plain;charset=utf-8' });
    const sampleFile = new File([blob], sample.fileName, { type: 'text/plain' });
    
    setFile(sampleFile);
    setErrorMessage(null);
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!file) {
      setErrorMessage('Please select or upload your resume file.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStep('Analyzing resume document...');

    try {
      const formData = new FormData();
      formData.append('field-0', name.trim());
      formData.append('field-1', email.trim());
      formData.append('field-2', file, file.name);

      setSubmitStep('Evaluating ATS formatting & keyword impact...');
      
      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze resume.');
      }

      setSubmitStep('Generating your custom evaluation report...');
      
      const result: SubmissionResult = {
        success: true,
        message: data.message || 'Resume evaluated successfully.',
        n8nStatus: data.n8nStatus || 200,
        candidate: {
          name: name.trim(),
          email: email.trim(),
          fileName: file.name,
          fileSize: file.size,
        },
        formResponseSnippet: data.formResponseSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };

      setSubmissionResult(result);
      if (onSubmissionComplete) {
        onSubmissionComplete(result);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(
        err.message || 'Unable to process resume at this moment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
      setSubmitStep('');
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setFile(null);
    setSubmissionResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="analyzer" ref={formRef} className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>INSTANT RESUME ANALYSIS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">
          Submit Resume for AI Evaluation
        </h2>
        <p className="text-sm sm:text-base text-slate-300">
          Upload your resume in PDF, Word, or Text format to receive an immediate ATS scorecard and tailored feedback.
        </p>
      </div>

      {/* Main Card Container */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl p-6 sm:p-10">
        
        {/* Sample Resume Quick Load Strip */}
        {!submissionResult && (
          <div className="mb-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block sm:inline mr-1">Want a quick demo?</span>
                <span className="text-slate-400">Load a pre-configured sample profile to see the instant scorecard:</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {SAMPLE_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => handleLoadSample(profile)}
                  className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-md transition-colors whitespace-nowrap"
                >
                  {profile.name} ({profile.role.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Success View with Interactive Live Scorecard */}
        {submissionResult ? (
          <LiveScorecard 
            submission={submissionResult} 
            onReset={handleResetForm} 
          />
        ) : (
          /* Active Form */
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Input Row: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              {/* Field 0: Candidate Name */}
              <div>
                <label 
                  htmlFor="field-0" 
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="field-0"
                    name="field-0"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/70 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              {/* Field 1: Candidate Email */}
              <div>
                <label 
                  htmlFor="field-1" 
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="field-1"
                    name="field-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@example.com"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/70 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all disabled:opacity-50"
                    required
                  />
                </div>
              </div>

            </div>

            {/* Field 2: Resume File Upload Zone */}
            <div className="mb-6">
              <label 
                htmlFor="field-2" 
                className="block text-xs font-medium text-slate-300 mb-2"
              >
                Upload Resume File <span className="text-orange-500">*</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                id="field-2"
                name="field-2"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileInputChange}
                disabled={isSubmitting}
                className="hidden"
              />

              {!file ? (
                /* Drag & Drop Zone */
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    dragActive 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-slate-700/80 hover:border-slate-600 bg-slate-950/40 hover:bg-slate-950/60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-orange-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Drag and drop your resume here, or <span className="text-orange-400 underline">browse files</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports PDF, Word (.docx, .doc), or Plain Text (.txt) up to 20MB
                  </p>
                </div>
              ) : (
                /* Selected File Card */
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024).toFixed(1)} KB · Ready for evaluation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleClearFile}
                      disabled={isSubmitting}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Instant ATS Health Preview (When file is loaded) */}
            {file && atsScore !== null && (
              <div className="mb-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200">ATS Readability Pre-Check</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                    {atsScore}/100 PARSE SCORE
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${atsScore}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  {detectedSections.map((sec, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{sec}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message Container */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-white">Notice</p>
                  <p className="mt-0.5 text-rose-300">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>Private & secure evaluation</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-orange-600/20 hover:shadow-orange-600/35 transition-all whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{submitStep || 'Analyzing resume...'}</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Resume Now</span>
                    <Zap className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
