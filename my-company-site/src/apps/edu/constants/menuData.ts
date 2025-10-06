// src/constants/menuData.ts
export interface SubMenuItem {
  title: string;
  description?: string;
  links: string[];
}

export interface MenuItem {
  name: string;
  columns: SubMenuItem[];
}

const menuData: MenuItem[] = [
  {
    name: "Smart School",
    columns: [
      {
        title: "Learning Tools",
        description: "Empower students and teachers with modern learning tools.",
        links: [
          "Smart Screens",
          "Robotics & Coding",
          "Online Exams & Assignments",
          "Interactive Quizzes"
        ],
      },
      {
        title: "Training & Skills",
        description: "Build digital literacy and life skills.",
        links: [
          "Student Training",
          "Teacher Training",
          "Soft Skills",
          "Tech Confidence"
        ],
      },
      {
        title: "School Resources",
        description: "Tailored supplies for daily academic life.",
        links: [
          "Educational Wears",
          "Stationery & Branded Materials",
          "Lab Coats & Sportswear"
        ],
      },
    ],
  },
  {
    name: "Digital Infrastructure",
    columns: [
      {
        title: "Smart I.T Infrastructure",
        description: "Ensure uninterrupted digital learning.",
        links: [
          "High-Speed Internet",
          "Cloud Storage",
          "Smart Servers",
          "Device Integration",
          "Procurement & Setup"
        ],
      },
      {
        title: "Digital Tools",
        description: "Modern tools for administration and education.",
        links: [
          "Computers & Printers",
          "Projectors",
          "Remote School Systems"
        ],
      },
      {
        title: "Digital Presence",
        description: "Grow your school's online reach.",
        links: [
          "School Websites",
          "Secure Emails",
          "Result Portals",
          "Online Billing",
          "Social Media Management"
        ],
      },
    ],
  },
  {
    name: "Security",
    columns: [
      {
        title: "Physical Security",
        description: "Protect your campus with physical security systems.",
        links: [
          "CCTV Surveillance",
          "Access Control",
          "Biometric Tracking"
        ],
      },
      {
        title: "Cyber Security",
        description: "Secure your data and devices.",
        links: [
          "Cybersecurity Systems",
          "Cloud Backups",
          "Data Protection"
        ],
      },
    ],
  },
  {
    name: "About",
    columns: [
      {
        title: "About Anjonix",
        description: "Technology-driven solutions with a mission.",
        links: ["Who We Are", "Our Mission", "Our Values", "Global Presence"],
      },
      {
        title: "Why Choose Us",
        description: "Tailored, integrated, and future-ready services.",
        links: [
          "Tailored Solutions",
          "Ongoing Support",
          "Sustainable Systems",
          "Seamless Integration"
        ],
      },
      {
        title: "Contact",
        description: "Reach out to us globally.",
        links: [
          "Contact Details",
          "Office Locations",
          "Support Channels"
        ],
      },
    ],
  },
];

export default menuData;
