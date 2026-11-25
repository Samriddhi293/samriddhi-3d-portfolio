export const PORTFOLIO_DATA = {
  about: {
    name: "Samriddhi Agrawal",
    role: "Full-Stack & AI/ML Developer",
    location: "Bhopal, Madhya Pradesh",
    email: "samriddhiagrawal2903@gmail.com",
    phone: "+91 8770678896",
    github: "https://github.com/Samriddhi293",
    linkedin: "https://www.linkedin.com/in/samriddhi-agrawal-473a60328/",
    resumeUrl: "/Samriddhi_Agrawal_Resume.pdf",
    education: {
      degree: "B.Tech in Computer Science Engineering",
      university: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal",
      period: "Aug 2023 – Expected June 2027",
      cgpa: "7.41 / 10.0",
      schooling: "Class XII: 89.4% (2023) • Class X: 80.0% (2021)",
    },
    bio: "Final-year B.Tech Computer Science student at RGPV Bhopal building full-stack web platforms and meteorological machine learning pipelines. Solved 150+ algorithmic problems on LeetCode (C++) and 100+ on Codeforces (Python).",
    achievements: [
      "Solved 150+ algorithmic problems on LeetCode (C++) and 100+ problems on Codeforces (Python)",
      "Completed AI/ML Internship at Indian Meteorological Department (IMD), Bhopal",
      "Completed a 3-year degree in Kathak; selected by the Ministry of Culture to perform live at the Gamak festival",
      "Logistics & Coordination Lead for university festivals and alumni meets",
    ],
  },
  experience: [
    {
      id: "imd",
      title: "AI / ML Intern",
      org: "Indian Meteorological Department (IMD), Bhopal",
      period: "01 April 2026 – 29 May 2026",
      summary:
        "Built machine learning models to estimate rainfall using radar reflectivity, velocity, and spectral width parameters.",
      highlights: [
        "Processed 24 hours of continuous IRIS radar data to compute and plot maximum, average, and total reflectivity per pixel",
        "Cleaned sensor datasets by filtering ground clutter and bad signals at specific angles (227°–228.5°)",
        "Engineered Pandas and NumPy preprocessing scripts to convert raw radar arrays into clean ML feature matrices",
      ],
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Radar Signal Processing"],
    },
    {
      id: "events",
      title: "Logistics & Coordination Lead",
      org: "College Events Committee & Cultural Showcase",
      period: "2024 – 2026",
      summary:
        "Led event logistics, volunteer teams, and stage operations for major university festivals, alumni meets, and cultural showcases.",
      highlights: [
        "Coordinated multi-team logistics and execution for university annual festivals and alumni meets",
        "Selected by the Ministry of Culture to perform live Kathak at the Gamak cultural festival",
      ],
      tech: ["Team Leadership", "Event Operations", "Stage Coordination"],
    },
  ],
  projects: [
    {
      id: "campusnexus",
      title: "CampusNexus",
      tagline: "Centralized College Committees, Hiring & Event Ecosystem",
      period: "Oct 2026 – Present",
      description:
        "Architected a unified campus governance portal featuring automated CGPA/branch applicant screening, self-service interview slot booking, the Super 50 proctored assessment pipeline, QR-verified event passes, and a 48-hour SLA grievance engine.",
      tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "REST APIs"],
      github: "https://github.com/Samriddhi293",
      live: "",
    },
    {
      id: "educomic",
      title: "EduComic",
      tagline: "AI-Powered Visual Learning & Comic Generator",
      period: "May 2026",
      description:
        "Built the core ReactJS workflow and Express authentication backend for an AI learning platform that converts text topics into visual comics, flashcards, and quizzes, integrated with Formspree REST API and MongoDB storage.",
      tech: ["ReactJS", "Node.js", "Express", "MongoDB", "REST APIs"],
      github: "https://github.com/Samriddhi293",
      live: "https://educomic-client.vercel.app/",
    },
  ],
  skills: {
    Languages: ["C++", "Python", "JavaScript"],
    "Libraries & Frameworks": ["ReactJS", "NumPy", "Pandas", "Scikit-learn"],
    "Tools & Databases": ["GitHub", "MongoDB", "VS Code"],
    "Core Concepts": ["Data Structures", "MERN", "Machine Learning", "OOPs", "Linear Algebra", "Probability & Stats"],
  },
};