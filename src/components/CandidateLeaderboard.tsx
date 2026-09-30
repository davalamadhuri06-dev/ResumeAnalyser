import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Briefcase, 
  CheckCircle, 
  Filter, 
  Star, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CandidateLeader {
  id: string;
  name: string;
  initials: string;
  role: string;
  experienceYears: number;
  matchScore: number;
  category: 'Engineering' | 'Product' | 'AI & Data' | 'Design';
  topSkills: string[];
  status: 'Interview Ready' | 'Top 1%' | 'Highly Qualified';
  badgeColor: string;
}

interface LeaderboardProps {
  onScrollToForm: () => void;
}

export const CandidateLeaderboard: React.FC<LeaderboardProps> = ({ onScrollToForm }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCandidate, setHoveredCandidate] = useState<string | null>(null);

  const candidates: CandidateLeader[] = [
    {
      id: 'cand-1',
      name: 'Sarah Chen',
      initials: 'SC',
      role: 'Staff ML Infrastructure Engineer',
      experienceYears: 8,
      matchScore: 98,
      category: 'AI & Data',
      topSkills: ['PyTorch', 'Distributed Training', 'vLLM', 'Kubernetes'],
      status: 'Top 1%',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'cand-2',
      name: 'Marcus Vance',
      initials: 'MV',
      role: 'Principal Full Stack Architect',
      experienceYears: 10,
      matchScore: 96,
      category: 'Engineering',
      topSkills: ['TypeScript', 'React 19', 'PostgreSQL', 'n8n Pipelines'],
      status: 'Interview Ready',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'cand-3',
      name: 'Elena Rostova',
      initials: 'ER',
      role: 'Lead Growth Product Manager',
      experienceYears: 7,
      matchScore: 95,
      category: 'Product',
      topSkills: ['PLG Funnels', 'A/B Testing', 'Retention CRO', 'SQL'],
      status: 'Highly Qualified',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'cand-4',
      name: 'David Kalu',
      initials: 'DK',
      role: 'Senior DevOps & SRE Lead',
      experienceYears: 6,
      matchScore: 94,
      category: 'Engineering',
      topSkills: ['Terraform', 'AWS Multi-region', 'Prometheus', 'CI/CD'],
      status: 'Interview Ready',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'cand-5',
      name: 'Ananya Deshmukh',
      initials: 'AD',
      role: 'Senior Product Designer & Systems Lead',
      experienceYears: 6,
      matchScore: 92,
      category: 'Design',
      topSkills: ['Figma Tokens', 'Design Systems', 'Micro-interactions', 'WCAG AAA'],
      status: 'Highly Qualified',
      badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'cand-6',
      name: 'Liam O’Connor',
      initials: 'LO',
      role: 'Data Platform Engineer',
      experienceYears: 5,
      matchScore: 91,
      category: 'AI & Data',
      topSkills: ['ClickHouse', 'Apache Kafka', 'dbt', 'Python'],
      status: 'Interview Ready',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  const categories = ['All', 'Engineering', 'AI & Data', 'Product', 'Design'];

  const filteredCandidates = selectedCategory === 'All'
    ? candidates
    : candidates.filter(c => c.category === selectedCategory);

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-amber-500/20">
          <Trophy className="w-4 h-4" />
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-slate-400/20 border border-slate-400/40 text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
          <Medal className="w-4 h-4" />
        </div>
      );
    }
    if (index === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-orange-600/20 border border-orange-600/40 text-orange-300 flex items-center justify-center font-bold text-xs shrink-0">
          <Award className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center font-mono font-semibold text-xs shrink-0">
        #{index + 1}
      </div>
    );
  };

  return (
    <section id="leaderboard" className="py-20 border-b border-slate-800/60 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>CANDIDATE INTELLIGENCE LEADERBOARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Top Scored Candidates
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              Live ranking of high-potential profiles identified by our automated ATS scoring algorithms, 
              evaluated on keyword density, quantifiable impact, and structural parsing reliability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-sm divide-y divide-slate-800/80">
          
          {/* Table Header Row (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-900/90 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Candidate & Role</div>
            <div className="col-span-3">Top Assessed Competencies</div>
            <div className="col-span-3">Match Score & ATS Readiness</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          {/* Rows */}
          {filteredCandidates.map((candidate, idx) => (
            <div
              key={candidate.id}
              onMouseEnter={() => setHoveredCandidate(candidate.id)}
              onMouseLeave={() => setHoveredCandidate(null)}
              className="p-5 lg:px-6 lg:py-4 transition-colors hover:bg-slate-800/40 flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start lg:items-center"
            >
              {/* Col 1: Rank Badge */}
              <div className="lg:col-span-1 flex items-center gap-3">
                {getRankBadge(idx)}
              </div>

              {/* Col 2: Name & Role */}
              <div className="lg:col-span-4 flex items-center gap-3 min-w-0 w-full">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs shrink-0 font-mono">
                  {candidate.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate">
                      {candidate.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                      {candidate.experienceYears}y exp
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {candidate.role}
                  </p>
                </div>
              </div>

              {/* Col 3: Keywords & Skills */}
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 w-full">
                {candidate.topSkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950/80 border border-slate-800 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Col 4: Progress Bar for Match Score */}
              <div className="lg:col-span-3 w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-300">Match Score</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black font-mono text-emerald-400 tabular-nums">
                      {candidate.matchScore}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">ATS</span>
                  </div>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-700 ease-out"
                    style={{ width: `${candidate.matchScore}%` }}
                  />
                </div>
              </div>

              {/* Col 5: Status Tag */}
              <div className="lg:col-span-1 flex items-center justify-between lg:justify-end w-full pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/60">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${candidate.badgeColor} whitespace-nowrap`}>
                  {candidate.status}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Callout banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Want to see where your resume ranks?</h4>
              <p className="text-xs text-slate-400">Upload your CV to calculate your personalized match score and benchmark positioning.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-md transition-colors whitespace-nowrap"
          >
            <span>Analyze Your Resume Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
