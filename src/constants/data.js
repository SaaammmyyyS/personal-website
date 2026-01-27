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
      description: "I specialize in architecting resilient backends and multi-tenant SaaS infrastructure. Currently, I'm focusing on high-consistency systems, automated cloud deployments, and secure data isolation."
    },
    education: {
      school: "Davao City University",
      degree: "BS Computer Science"
    }
  },

  cloudExpertise: [
    {
      title: "AWS & Cloud Native",
      color: "text-orange-400",
      icon: "cloud",
      tags: ["App Runner", "ECS (Fargate)", "Lambda", "EC2", "S3"]
    },
    {
      title: "Frontend & UI",
      color: "text-pink-400",
      icon: "layers",
      tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Data Architecture",
      color: "text-cyan-400",
      icon: "database",
      tags: ["PostgreSQL", "Hibernate 7", "Redis", "DynamoDB", "Supabase"]
    },
    {
      title: "DevOps & Security",
      color: "text-emerald-400",
      icon: "shield",
      tags: ["Terraform", "Docker", "IAM", "Clerk Auth", "CloudWatch"]
    },
    {
      title: "Core Stack",
      color: "text-purple-400",
      icon: "terminal",
      tags: ["Spring Boot", "Java 21", "Node.js", "NestJS", "Laravel"]
    }
  ],

  learningLog: "Deepening my expertise in the AWS ecosystem, specifically focusing on the Well-Architected Framework, Serverless Design Patterns, and automated Infrastructure as Code (IaC).",

  projects: [
    {
      id: "node-inventory-saas-2026",
      title: "Stack Inventory Manager",
      subtitle: "Enterprise-grade Multi-tenant SaaS platform for real-time inventory tracking and automated audit trails.",
      tags: ["Spring Boot 3.4", "React 19", "AWS App Runner", "Terraform"],
      link: "#",
      github: "https://github.com/SaaammmyyyS/stack-inventory-manager",
      isPrivate: false,
      detailedDescription: {
        headline: "High-Consistency Multi-Tenant SaaS Architecture",
        overview: "A production-ready SaaS designed for strict data isolation. It solves multi-tenancy by utilizing Hibernate 7's native @TenantId filtering and features a 'Zero-Waste' deployment flow via AWS App Runner and Terraform.",
        innovation: [
          "Tenant Isolation: Secure siloed data via X-Tenant-ID headers and Hibernate engine filters.",
          "Audit Integrity: Defensive history fetchers that preserve transaction trails even for items in the Recycle Bin.",
          "Enterprise Reporting: Dynamic PDF generation using OpenPDF for real-time inventory valuations.",
          "Test-Driven Reliability: 100% isolation coverage using H2 in-memory databases to catch tenant leaks."
        ],
        stack: "Java 21, Spring Boot 3.4, Hibernate 7, Supabase (Postgres), Clerk Auth, Terraform, AWS App Runner."
      }
    },
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
        overview: "CLOUD-SENTRY intercepts and visualizes live cloud attack vectors using a serverless event-driven architecture and Amazon Bedrock AI.",
        innovation: [
          "Zero-Polling: Sub-second data propagation via GraphQL Subscriptions.",
          "AI-in-the-Loop: Threat analysis by Claude 3 (Bedrock) before UI delivery.",
          "Cyberpunk UX: High-fidelity React interface for SOC environments."
        ],
        stack: "React 18, Apollo Client, AWS Lambda, Amazon Bedrock, DynamoDB, AppSync."
      }
    },
    {
      id: "proj-lambda-news",
      title: "Lambda News Engine",
      subtitle: "A serverless news aggregation platform utilizing AWS Lambda for high-speed, event-driven data processing.",
      tags: ["AWS Lambda", "Node.js", "Serverless", "Event-Driven"],
      link: "https://lambda-news-engine.vercel.app/",
      github: "https://github.com/SaaammmyyyS/Lambda-News-Engine",
      isPrivate: false,
      detailedDescription: {
        headline: "Automated OSINT Intelligence Pipeline",
        overview: "A persistent background engine that archives global news data 24/7 using EventBridge heartbeats.",
        innovation: [
          "Decoupled Architecture: Background engine persists even when UI is closed.",
          "Secure API: REST protection with API Key authorization.",
          "Automated Orchestration: Uses AWS EventBridge for ETL scheduling."
        ],
        stack: "React 19, AWS EventBridge, AWS Lambda, DynamoDB, API Gateway."
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
      subtitle: "Lead Backend Developer for the official digital ecosystem of the ADDU Student Government.",
      tags: ["Next.js", "Supabase", "PostgreSQL", "Realtime"],
      link: "https://samahan.addu.edu.ph",
      github: null,
      isPrivate: true,
      detailedDescription: {
        headline: "Unified Governance & Information Hub",
        overview: "Architected a platform serving 8,000+ students with real-time data delivery during critical periods.",
        innovation: [
          "BaaS Orchestration: Complex RLS policies and real-time database listeners.",
          "Scalable Governance: Designed for massive concurrency during university elections."
        ],
        stack: "Next.js, Supabase, PostgreSQL, TypeScript."
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
        "Architected core email notification systems.",
        "Integrated third-party SMTP services with Spring Boot.",
        "Optimized asynchronous messaging tasks."
      ],
      tech: ["Spring Boot", "PostgreSQL", "Java"]
    },
    {
      id: "exp-sysdev",
      role: "Project Lead",
      company: "Systems Development",
      period: "2023 — 2024",
      shortDesc: "Led technical implementation and overseen system architecture for university projects.",
      details: [
        "Modernized monolithic code into modular services.",
        "Optimized SQL queries for large student datasets."
      ],
      tech: ["NestJS", "Node.js", "AWS EC2"]
    },
    {
      id: "exp-infosoft",
      role: "Backend Engineering Intern",
      company: "Infosoft",
      period: "2022 — 2023",
      shortDesc: "Worked on the PPMP procurement system using Laravel.",
      details: [
        "Maintained PPMP system using Laravel framework.",
        "Automated internal data synchronization processes."
      ],
      tech: ["Laravel", "PHP", "MySQL"]
    }
  ],
  philosophy: {
    coding: "Write code for the next engineer, not the compiler.",
    scaling: "Build for 10x current load, design for 100x.",
    problem_solving: "Deep dive into the 'Why' before the 'How'."
  },
  skillProficiency: {
    backend: ["Multi-tenant SaaS Design", "Hibernate 7 engine", "Microservices", "API Security"],
    database: ["Relational Modeling (Postgres)", "@TenantId filtering", "NoSQL Patterns"],
    aws: ["Terraform (IaC)", "AWS App Runner", "IAM Hardening", "CloudWatch"]
  },
};