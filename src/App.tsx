/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeForm } from './components/ResumeForm';
import { CandidateLeaderboard } from './components/CandidateLeaderboard';
import { BulletOptimizer } from './components/BulletOptimizer';
import { HowItWorks } from './components/HowItWorks';
import { BenchmarkMatcher } from './components/BenchmarkMatcher';
import { AtsAuditTool } from './components/AtsAuditTool';
import { AtsGuide } from './components/AtsGuide';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SubmissionResult } from './types';

export default function App() {
  const [lastSubmission, setLastSubmission] = useState<SubmissionResult | null>(null);

  const handleScrollToForm = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* 1. Header with clear navigation tabs */}
      <Navbar 
        onScrollToForm={handleScrollToForm}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero 
          onScrollToForm={handleScrollToForm}
        />

        {/* 3. Core Interactive Resume Form + Realtime ATS Scorecard */}
        <ResumeForm 
          onSubmissionComplete={(result) => setLastSubmission(result)}
          initialSubmission={lastSubmission}
        />

        {/* 4. Top Scored Candidates Leaderboard */}
        <CandidateLeaderboard 
          onScrollToForm={handleScrollToForm}
        />

        {/* 5. Interactive Bullet Point Enhancer Studio */}
        <BulletOptimizer 
          onScrollToForm={handleScrollToForm}
        />

        {/* 6. Step-by-step How It Works Section */}
        <HowItWorks 
          onScrollToForm={handleScrollToForm}
        />

        {/* 7. Target Role Alignment & Keyword Radar */}
        <BenchmarkMatcher />

        {/* 8. Interactive ATS Compatibility Calculator */}
        <AtsAuditTool />

        {/* 9. ATS Formatting Guide & Standards */}
        <AtsGuide />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer 
        onScrollToForm={handleScrollToForm}
      />
    </div>
  );
}
