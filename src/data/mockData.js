export const sampleResumeData = {
  id: "res-001",
  fileName: "Alex_Morgan_FullStack_Resume.pdf",
  fileSize: "1.4 MB",
  fileType: "application/pdf",
  uploadedAt: "Just now",
  overview: {
    fullName: "Alex Morgan",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA (Open to Remote)",
    linkedIn: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan-code",
    portfolio: "alexmorgan.tech",
    education: [
      {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "National Institute of Technology",
        period: "2020 — 2024",
        grade: "CGPA: 8.9 / 10.0"
      }
    ],
    experience: [
      {
        role: "Software Development Engineer Intern",
        company: "Veloce Cloud Solutions",
        period: "Jan 2024 — Jun 2024",
        highlights: [
          "Developed high-throughput REST APIs in Node.js and Python handling 1.2M daily queries.",
          "Implemented Redis caching reducing average p95 response latency by 38%.",
          "Collaborated in Agile sprints, wrote unit tests with Jest achieving 88% code coverage."
        ]
      },
      {
        role: "Full Stack Developer Trainee",
        company: "Apex Innovations Lab",
        period: "Jun 2023 — Dec 2023",
        highlights: [
          "Built customer-facing React dashboard with Tailwind CSS and Redux Toolkit.",
          "Integrated PostgreSQL database schemas and optimized SQL query execution plans."
        ]
      }
    ]
  },
  scores: {
    atsScore: 82,
    jobMatchScore: 87,
    skillsFoundCount: 18,
    suggestionsCount: 7,
    breakdown: {
      formatting: 90,
      keywordMatch: 84,
      experienceImpact: 78,
      skillsAlignment: 88,
      educationSection: 95
    }
  },
  detectedSkills: [
    { name: "Python", category: "Language", level: "Advanced", verified: true },
    { name: "Java", category: "Language", level: "Intermediate", verified: true },
    { name: "JavaScript", category: "Language", level: "Advanced", verified: true },
    { name: "TypeScript", category: "Language", level: "Intermediate", verified: true },
    { name: "HTML5", category: "Frontend", level: "Advanced", verified: true },
    { name: "CSS3", category: "Frontend", level: "Advanced", verified: true },
    { name: "React", category: "Frontend", level: "Advanced", verified: true },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced", verified: true },
    { name: "Node.js", category: "Backend", level: "Advanced", verified: true },
    { name: "Express.js", category: "Backend", level: "Intermediate", verified: true },
    { name: "SQL", category: "Database", level: "Intermediate", verified: true },
    { name: "PostgreSQL", category: "Database", level: "Intermediate", verified: true },
    { name: "MongoDB", category: "Database", level: "Intermediate", verified: true },
    { name: "Git", category: "DevOps/Tools", level: "Advanced", verified: true },
    { name: "REST APIs", category: "Architecture", level: "Advanced", verified: true },
    { name: "Machine Learning", category: "AI/Data", level: "Foundational", verified: true },
    { name: "Jest", category: "Testing", level: "Intermediate", verified: true },
    { name: "Agile/Scrum", category: "Methodology", level: "Intermediate", verified: true }
  ],
  missingSkills: [
    { 
      name: "AWS (Amazon Web Services)", 
      importance: "High", 
      reason: "Frequently required in target job description for deploying cloud-native microservices (EC2, S3, Lambda).",
      quickTip: "Include any coursework, projects, or certifications utilizing AWS services."
    },
    { 
      name: "Docker & Containerization", 
      importance: "High", 
      reason: "Mentioned 4 times in job requirements. Missing from both projects and skills sections.",
      quickTip: "Highlight experience containerizing applications or writing Dockerfiles."
    },
    { 
      name: "System Design & Scalability", 
      importance: "Medium", 
      reason: "Target mid-to-senior role expects clear articulation of microservices, caching layers, and load balancing.",
      quickTip: "Add 1-2 bullet points referencing architectural decisions in your final year capstone."
    },
    { 
      name: "GraphQL", 
      importance: "Low", 
      reason: "Listed as preferred qualification in the job description.",
      quickTip: "Mention if you have worked with Apollo GraphQL or built graph schemas."
    }
  ],
  strengths: [
    {
      title: "Strong Quantifiable Metrics",
      description: "You incorporated specific performance metrics ('reduced p95 latency by 38%', '1.2M daily queries'). ATS engines rank achievement-oriented resumes significantly higher.",
      score: "9.5/10"
    },
    {
      title: "Clean ATS-Friendly Layout",
      description: "Standard single-column format, standard font hierarchy, and absence of complex multi-column tables or icons that confuse ATS parsers.",
      score: "9.2/10"
    },
    {
      title: "Strong Technical Core Alignment",
      description: "Excellent coverage of foundational full-stack web technologies (JavaScript, React, Node.js, SQL, Git).",
      score: "8.9/10"
    },
    {
      title: "Clear Contact Information",
      description: "Professional email, active GitHub profile, and LinkedIn URL are clearly readable in the header.",
      score: "10/10"
    }
  ],
  improvements: [
    {
      id: 1,
      title: "Add Cloud Infrastructure Keywords",
      priority: "High",
      impact: "+6 ATS Score",
      category: "Keywords",
      description: "Modern full-stack roles expect cloud deployment mentions. Include AWS, Docker, or CI/CD pipelines to clear recruiter screening filters.",
      example: "Before: 'Deployed application on server.' → After: 'Containerized microservices using Docker and orchestrated deployment on AWS EC2 with automated GitHub Actions CI/CD.'"
    },
    {
      id: 2,
      title: "Expand Action Verbs & Leadership Impact",
      priority: "Medium",
      impact: "+4 ATS Score",
      category: "Content",
      description: "Replace passive verbs like 'Worked on' or 'Helped with' with authoritative leadership verbs such as 'Architected', 'Spearheaded', 'Optimized', or 'Streamlined'.",
      example: "Before: 'Helped in database maintenance.' → After: 'Optimized PostgreSQL schemas and indexed queries, reducing lookup overhead by 24%.'"
    },
    {
      id: 3,
      title: "Add a Dedicated Target Summary Section",
      priority: "Medium",
      impact: "+3 ATS Score",
      category: "Structure",
      description: "Your resume starts immediately with education. Adding a tailored 3-line professional summary at the top helps both human recruiters and semantic search algorithms.",
      example: "'Results-driven Software Engineer with strong foundations in React, Node.js, and cloud systems. Proven track record optimizing latency and shipping resilient web applications.'"
    },
    {
      id: 4,
      title: "Explicitly List Soft Skills in Project Context",
      priority: "Low",
      impact: "+2 ATS Score",
      category: "Soft Skills",
      description: "Cross-functional collaboration, code reviews, and stakeholder communication were detected implicitly, but explicit framing boosts behavioral matching scores.",
      example: "Mention cross-functional collaboration with product managers and UX designers."
    }
  ],
  jobMatch: {
    overallPercentage: 87,
    jobTitle: "Senior Full Stack Software Engineer",
    company: "TechNova Enterprises",
    matchingSkills: ["Python", "SQL", "JavaScript", "React", "Node.js", "Git", "REST APIs", "PostgreSQL"],
    missingSkills: ["AWS", "Docker", "System Design", "GraphQL"],
    experienceMatch: 85,
    educationMatch: 100,
    keywordsMatch: 82,
    matchSummary: "Your profile has exceptional synergy with this position's core frontend and backend programming requirements. Adding Docker and AWS cloud deployments will elevate your candidacy into the top 5% applicant tier."
  },
  aiRecommendations: [
    {
      number: 1,
      headline: "Inject Target Keywords into Work Experience Bullets",
      detail: "Applicant tracking systems scan your work history for contextual keyword frequency, not just the skills section. We recommend embedding 'Docker containerization' and 'AWS deployment' directly into your Veloce Cloud internship description.",
      suggestedAction: "Copy suggested bullet: 'Orchestrated Docker containers and integrated automated CI/CD builds on AWS, accelerating release turnaround by 25%.'"
    },
    {
      number: 2,
      headline: "Optimize Resume File Naming Convention",
      detail: "Your current file name 'Alex_Morgan_FullStack_Resume.pdf' is good, but including the target role or year ensures recruiters find your file instantly in applicant pools.",
      suggestedAction: "Recommended filename: 'Alex_Morgan_Software_Engineer_2025.pdf'"
    },
    {
      number: 3,
      headline: "Quantify Capstone & Academic Project Outcomes",
      detail: "Add user counts, benchmarks, or simulated stress test data to academic projects to prove real-world engineering standards.",
      suggestedAction: "Include GitHub repo stars, live demo links, or load-testing metrics (e.g., 'Benchmarked at 500 req/sec')."
    },
    {
      number: 4,
      headline: "Ensure 1-Page Constraint Compliance",
      detail: "With 0-3 years of total experience, ATS algorithms and HR reviewers favor a dense, high-impact single-page format.",
      suggestedAction: "Adjust line spacing to 1.15 and margins to 0.65 in to keep your resume strictly at 1 impactful page."
    },
    {
      number: 5,
      headline: "Standardize Section Header Titles",
      detail: "Your section headers match standard conventions ('Education', 'Experience', 'Technical Skills'), ensuring 100% parser recognition across Taleo, Workday, and Greenhouse.",
      suggestedAction: "Maintain current header labels without graphical banners or unusual icons."
    }
  ]
};

export const sampleJobDescription = `Senior Full Stack Software Engineer — TechNova Enterprises

About the Role:
We are seeking a talented and proactive Full Stack Software Engineer to build scalable cloud-native web applications. You will work across the entire stack, from sleek user interfaces to robust server-side APIs and microservices.

Key Responsibilities:
- Design and develop scalable web applications using React, JavaScript/TypeScript, and modern CSS.
- Build high-performance backend APIs and microservices in Python or Node.js.
- Work closely with relational (PostgreSQL, SQL) and NoSQL databases.
- Deploy, monitor, and maintain services on AWS (EC2, S3, ECS, Lambda).
- Containerize applications using Docker and participate in CI/CD pipeline automation.
- Contribute to architectural discussions, system design, and high-concurrency optimization.
- Write clean, maintainable, and well-tested code using Git and automated testing tools.

Requirements:
- Bachelor's degree in Computer Science, Software Engineering, or related field.
- Proficiency in Python, JavaScript/TypeScript, React, Node.js, and SQL.
- Hands-on experience with cloud platforms (AWS preferred) and Docker containerization.
- Solid understanding of RESTful API principles and System Design fundamentals.
- Strong problem-solving, communication, and agile team collaboration skills.
- Familiarity with GraphQL, Redis caching, or CI/CD is a strong plus.`;

export const mockDashboardHistory = [
  {
    id: "res-001",
    resumeName: "Alex_Morgan_FullStack_Resume.pdf",
    targetRole: "Full Stack Engineer",
    date: "May 24, 2025",
    atsScore: 82,
    jobMatch: 87,
    status: "Optimized",
    skillsCount: 18,
    fileSize: "1.4 MB"
  },
  {
    id: "res-002",
    resumeName: "Priya_Sharma_DataScience_CV.pdf",
    targetRole: "AI / ML Engineer",
    date: "May 21, 2025",
    atsScore: 91,
    jobMatch: 94,
    status: "Excellent",
    skillsCount: 22,
    fileSize: "2.1 MB"
  },
  {
    id: "res-003",
    resumeName: "David_Kim_DevOps_Specialist.docx",
    targetRole: "Cloud / DevOps Lead",
    date: "May 18, 2025",
    atsScore: 74,
    jobMatch: 79,
    status: "Needs Polish",
    skillsCount: 14,
    fileSize: "890 KB"
  },
  {
    id: "res-004",
    resumeName: "Sarah_Jenkins_Frontend_Dev.pdf",
    targetRole: "UI/UX React Engineer",
    date: "May 12, 2025",
    atsScore: 88,
    jobMatch: 91,
    status: "Optimized",
    skillsCount: 19,
    fileSize: "1.2 MB"
  },
  {
    id: "res-005",
    resumeName: "Rahul_Verma_Backend_Intern.pdf",
    targetRole: "Junior Backend Developer",
    date: "May 05, 2025",
    atsScore: 68,
    jobMatch: 62,
    status: "Needs Polish",
    skillsCount: 11,
    fileSize: "1.6 MB"
  }
];

export const sampleAnalysisStages = [
  { stage: 1, label: "Extracting text and structure from document...", duration: 600 },
  { stage: 2, label: "Tokenizing content & extracting named entities...", duration: 700 },
  { stage: 3, label: "Scanning ATS parser compatibility & layout guidelines...", duration: 800 },
  { stage: 4, label: "Comparing skill embeddings against target job description...", duration: 900 },
  { stage: 5, label: "Generating personalized AI recommendations & score...", duration: 600 }
];
