import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'How does the Resume Analyser score my resume?',
      answer: 'Our evaluation engine assesses your resume across four core pillars: ATS Parseability, Action Verbs & Impact, Keyword Alignment for your target industry, and Structural Hierarchy.',
    },
    {
      question: 'Which file formats and sizes are supported?',
      answer: 'The system accepts PDF documents (.pdf), Microsoft Word files (.docx, .doc), and plain text documents (.txt) up to 20MB in size.',
    },
    {
      question: 'Can I test the evaluation without uploading my own personal resume?',
      answer: 'Yes! In the upload portal, click on one of the sample candidate profiles (e.g. "Alex Morgan" or "Priya Sharma"). This automatically loads a formatted resume document and profile so you can observe the evaluation scorecard instantly.',
    },
    {
      question: 'Is my personal information and resume kept confidential?',
      answer: 'Yes. Your document is processed securely and privately solely for generating your candidate evaluation scorecard.',
    },
    {
      question: 'Can I download and share my scorecard report?',
      answer: 'Yes! Once your evaluation is complete, you can click "Download Report" to save a full text summary or "Copy Summary" to share key metrics with recruiters or mentors.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-orange-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMON INQUIRIES</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about the resume evaluation process and scoring standards.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
