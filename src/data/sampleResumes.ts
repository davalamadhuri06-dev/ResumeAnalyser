export interface SampleResumeProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  experienceYears: number;
  fileName: string;
  textContent: string;
}

export const SAMPLE_PROFILES: SampleResumeProfile[] = [
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    email: 'alex.morgan.dev@example.com',
    role: 'Senior Full Stack Engineer',
    experienceYears: 6,
    fileName: 'Alex_Morgan_Senior_FullStack_Resume.txt',
    textContent: `ALEX MORGAN
Senior Full-Stack Engineer | San Francisco, CA | alex.morgan.dev@example.com

SUMMARY
Passionate Full-Stack Engineer with 6+ years of experience architecting distributed cloud systems, modern React frontends, and automated workflow pipelines. Proven track record reducing API latency by 42% and scaling SaaS platforms to 500k+ MAU.

CORE COMPETENCIES
- Languages: TypeScript, JavaScript, Python, SQL, Go
- Frontend: React 19, Next.js, Tailwind CSS, Redux Toolkit, Webpack/Vite
- Backend: Node.js, Express, FastAPI, PostgreSQL, Redis, GraphQL
- DevOps & Cloud: AWS (ECS, S3, RDS), Docker, Kubernetes, CI/CD, n8n Automation
- Methodologies: Agile/Scrum, Test-Driven Development, Microservices Architecture

PROFESSIONAL EXPERIENCE

Senior Software Engineer | CloudScale Systems (2022 - Present)
- Led architecture and delivery of a real-time event pipeline ingesting 15M daily events with sub-100ms processing SLA.
- Reduced candidate onboarding processing cycle from 4 days to 15 minutes by engineering automated n8n webhook integrations.
- Mentored a cohort of 5 junior and mid-level engineers, fostering engineering excellence and 98% sprint completion consistency.

Full-Stack Developer | Nexus Labs (2019 - 2022)
- Built customer-facing dashboard in React & TypeScript, boosting user retention metrics by 28%.
- Optimized PostgreSQL relational queries, indexing schemes, and cache layers, decreasing p99 latency from 1.2s to 180ms.
- Built automated RESTful microservices for resume text extraction, OCR document parsing, and talent scoring.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley (2015 - 2019)
- Magna Cum Laude, Dean's Honors List

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (2024)
- Professional Scrum Master I (PSM I)
`,
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    email: 'priya.sharma.pm@example.com',
    role: 'Lead Product Manager',
    experienceYears: 7,
    fileName: 'Priya_Sharma_Lead_ProductManager_Resume.txt',
    textContent: `PRIYA SHARMA
Lead Product Manager | Austin, TX | priya.sharma.pm@example.com

SUMMARY
Strategic, metric-driven Product Leader with 7+ years directing AI-driven B2B SaaS workflows and recruiter automation tools. Spearheaded $18M in ARR growth through iterative discovery, conversion rate optimization, and machine learning integrations.

CORE COMPETENCIES
- Product Strategy: Product-Led Growth (PLG), Roadmap Planning, North Star Metrics, TAM/SAM Analysis
- Technical Acumen: API Workflows, n8n Orchestration, LLM Fine-Tuning, SQL Data Analysis
- Execution: Agile/Scrum, User Journey Mapping, PRD Authoring, Rapid Prototyping
- Data & Analytics: Mixpanel, Amplitude, Google Analytics 4, Tableau, A/B Testing

PROFESSIONAL EXPERIENCE

Lead Product Manager | TalentFlow AI (2022 - Present)
- Spearheaded company flagship automated applicant screening module, boosting qualified interview throughput by 64%.
- Collaborated with engineering to integrate webhook automations and LLM summary engines, processing 85,000+ resumes monthly.
- Increased freemium to paid enterprise conversion by 34% through friction-free applicant upload workflows.

Senior Product Manager | Veloce Solutions (2018 - 2022)
- Managed cross-functional squads of 14 engineers, designers, and QA specialists across US and EMEA timezones.
- Decreased candidate drop-off during multi-step application submission from 48% to 11% via streamlined single-step submission.

EDUCATION
Master of Business Administration (MBA) | University of Texas at Austin, McCombs (2016 - 2018)
Bachelor of Science in Information Systems | University of Washington (2012 - 2016)
`,
  },
];
