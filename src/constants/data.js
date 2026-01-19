export const DATA = {
  profile: {
    name: "Ivan Sam",
    email: "ivansamwabina@gmail.com",
    role: "Fullstack Engineer",
    displayRole: "Fullstack Engineer // Systems Architect",
    cvLink: "https://ivan-sam-portfolio.vercel.app/Resume.pdf",
    location: "Davao City, PH",
    status: "Open for Opportunities",
    primaryStack: "Spring Boot // React // AWS",
    socials: {
      github: "https://github.com/SaaammmyyyS",
      linkedin: "https://www.linkedin.com/in/ivan-sam-wabina-875a91297/",
    },
    bio: {
      tagline: "Hi there! I'm a software engineer dedicated to building the backbone of digital experiences.",
      description: "I specialize in architecting resilient backends and high-throughput systems. Currently, I'm focusing on transforming complex business requirements into scalable, production-ready infrastructure."
    },
    education: {
      school: "Davao City University",
      degree: "BS Computer Science"
    }
  },

  cloudExpertise: [
    {
      title: "AWS Compute",
      color: "text-orange-400",
      icon: "cloud",
      tags: ["EC2", "Lambda", "ECS (Fargate)", "Elastic Beanstalk"]
    },
    {
      title: "Frontend & UI",
      color: "text-pink-400",
      icon: "layers",
      tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Data & Storage",
      color: "text-cyan-400",
      icon: "database",
      tags: ["RDS (PostgreSQL)", "DynamoDB", "S3", "ElastiCache"]
    },
    {
      title: "DevOps & Security",
      color: "text-emerald-400",
      icon: "shield",
      tags: ["IAM", "API Gateway", "Route 53", "CloudWatch"]
    },
    {
      title: "Core Stack",
      color: "text-purple-400",
      icon: "terminal",
      tags: ["Spring Boot", "NestJS", "Laravel", "Docker", "Terraform"]
    }
  ],

  learningLog: "Deepening my expertise in the AWS ecosystem, specifically focusing on the Well-Architected Framework, Serverless Design Patterns, and automated Infrastructure as Code (IaC).",

  projects: [
    {
      id: "proj-cloud-sentry",
      title: "Cloud Sentry",
      subtitle: "A real-time security monitoring dashboard designed to track AWS infrastructure health and visualize system vulnerabilities.",
      tags: ["React", "Tailwind", "AWS", "Infrastructure"],
      link: "https://cloud-sentry.vercel.app/",
      github: "https://github.com/SaaammmyyyS/cloud-sentry",
      isPrivate: false,
      detailedDescription: {
        headline: "Autonomous AI Threat Intelligence",
        overview: "CLOUD-SENTRY is a high-performance, real-time security monitoring dashboard designed to intercept and visualize live cloud attack vectors. By leveraging a serverless event-driven architecture, it transforms raw logs into an immersive, cyberpunk-inspired intelligence feed with sub-second latency.",
        innovation: [
          "Zero-Polling: Sub-second data propagation via GraphQL Subscriptions (WebSockets).",
          "AI-in-the-Loop: Every threat is analyzed by Amazon Bedrock (Claude 3) before hitting the UI.",
          "Cyberpunk UX: A high-fidelity React interface designed for low-latency SOC environments."
        ],
        stack: "React 18, Tailwind CSS, Apollo Client, AWS Lambda (Python 3.12), Amazon Bedrock, DynamoDB, AppSync."
      }
    },
    {
      id: "proj-lambda-news",
      title: "Lambda News Engine",
      subtitle: "A serverless news aggregation platform utilizing AWS Lambda for high-speed, event-driven data processing and distribution.",
      tags: ["AWS Lambda", "Node.js", "Serverless", "Event-Driven"],
      link: "https://lambda-news-engine.vercel.app/",
      github: "https://github.com/SaaammmyyyS/Lambda-News-Engine",
      isPrivate: false,
      detailedDescription: {
        headline: "Real-time Threat Monitoring Dashboard",
        overview: "CyberIntel_Sentinel is a production-ready, automated Open-Source Intelligence (OSINT) pipeline. While most dashboards simply fetch data on page load, this system operates as a persistent background engine that archives data 24/7.",
        innovation: [
          "Decoupled Architecture: Persistent background engine that archives data even when the UI is closed.",
          "Secure API Delivery: REST endpoint protection with API Key authorization.",
          "Automated Orchestration: Uses AWS EventBridge 'Heartbeat' triggers for the ETL pipeline."
        ],
        stack: "React 19 + Vite, AWS EventBridge, AWS Lambda (Python), Amazon DynamoDB, API Gateway."
      }
    },
    {
      id: "proj-gymeasy",
      title: "Gymeasy",
      subtitle: "Management ecosystem for fitness centers featuring automated scheduling, member tracking, and resilient backend logic.",
      tags: ["Spring Boot", "PostgreSQL", "Docker", "SMTP"],
      link: "#",
      github: null,
      isPrivate: true,
      detailedDescription: null
    },
    {
      id: "proj-samahan-2024",
      title: "SAMAHAN All For More 2024-2025",
      subtitle: "Lead Backend Developer for the official digital ecosystem of the Ateneo de Davao University Student Government.",
      tags: ["Next.js", "Supabase", "PostgreSQL", "Realtime"],
      link: "https://samahan.addu.edu.ph",
      github: null,
      isPrivate: true,
      detailedDescription: {
        headline: "Unified Governance Platform & Real-time Information Hub",
        overview: "Led the backend engineering effort for the official SAMAHAN website as part of the Systems Developer (Sysdev) team. We architected a unified platform to serve over 8,000 students, focusing on seamless data delivery and high-availability during critical university periods.",
        innovation: [
          "Lead Backend Engineering: Directed the technical implementation of database schemas and server-side logic, ensuring data integrity across multiple student government clusters.",
          "BaaS Orchestration: Leveraged Supabase to implement complex Row-Level Security (RLS) policies and real-time database listeners for live event updates.",
          "Scalable Governance: Designed the backend to handle massive concurrency spikes during student elections and organization registrations without the overhead of manual server management."
        ],
        stack: "Next.js (Frontend), Supabase (Auth, Database, Storage), PostgreSQL, TypeScript."
      }
    },

  ],

  career: [
    {
      id: "exp-gymeasy",
      role: "Backend Developer",
      company: "Gymeasy",
      period: "2024 — PRESENT",
      shortDesc: "Engineered robust communication microservices and backend logic for fitness management workflows.",
      details: [
        "Architected and implemented the core email notification system for automated member alerts and system updates.",
        "Integrated third-party SMTP services with Spring Boot to ensure high deliverability and reliability.",
        "Optimized backend processes for handling asynchronous messaging tasks.",
        "Collaborated on database schema refinements for member activity tracking."
      ],
      tech: ["Spring Boot", "PostgreSQL", "SMTP", "Docker", "Java"]
    },
    {
      id: "exp-sysdev",
      role: "Systems Developer & Project Lead",
      company: "Systems Development (Sysdev)",
      period: "2023 — 2024",
      shortDesc: "Led key software projects within the university's technical organization, focusing on infrastructure and modular design.",
      details: [
        "Spearheaded development for multiple organization-led projects, overseeing system architecture and code quality.",
        "Modernized internal business applications by refactoring monolithic code into modular services.",
        "Optimized SQL queries to handle large student datasets more efficiently."
      ],
      tech: ["NestJS", "Node.js", "MySQL", "AWS EC2"]
    },
    {
      id: "exp-infosoft",
      role: "Backend Engineering Intern",
      company: "Infosoft",
      period: "2022 — 2023",
      shortDesc: "Worked on the PPMP (Project Procurement Management Plan) system using Laravel.",
      details: [
        "Contributed to the development and maintenance of the PPMP system using the Laravel framework.",
        "Streamlined procurement workflows by automating internal data synchronization processes.",
        "Integrated robust REST APIs to improve data communication between system modules."
      ],
      tech: ["Laravel", "PHP", "MySQL", "Git"]
    }
  ],
  philosophy: {
    coding: "Write code for the next engineer, not the compiler. Prioritize readability and maintainability.",
    scaling: "Avoid premature optimization. Build for 10x the current load, but design for 100x.",
    problem_solving: "Deep dive into the 'Why' before touching the 'How'."
  },
  skillProficiency: {
    backend: ["Rest API Design", "Microservices", "Event-Driven Architecture", "Asynchronous Processing"],
    database: ["Relational Modeling (PostgreSQL)", "NoSQL Design Patterns (DynamoDB)", "Caching Strategies (Redis)"],
    aws: ["IAM Policy Hardening", "Lambda Power Tuning", "Serverless Framework", "CloudWatch Observability"]
  },
};