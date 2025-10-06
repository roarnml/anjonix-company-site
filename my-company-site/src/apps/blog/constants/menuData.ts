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
    name: "Categories",
    columns: [
      {
        title: "Tech & Innovation",
        description: "Explore AI, IoT, automation, and digital tools.",
        links: [
          "Artificial Intelligence",
          "Internet of Things (IoT)",
          "Cybersecurity",
          "Mobile & Web Apps",
          "Smart Devices",
        ],
      },
      {
        title: "Education & Training",
        description: "Insights for smart learning and digital literacy.",
        links: [
          "Smart Classrooms",
          "Online Exams & LMS",
          "Digital Literacy",
          "Teacher Development",
          "CBT Systems",
        ],
      },
      {
        title: "Agric-Tech",
        description: "Tech-driven solutions for smarter farming.",
        links: [
          "Precision Farming",
          "Agri Sensors",
          "Irrigation Automation",
          "Farm Management Apps",
          "Agri Drones",
        ],
      },
    ],
  },
  {
    name: "Sectors",
    columns: [
      {
        title: "Smart Infrastructure",
        description: "Integrated systems for modern living.",
        links: [
          "Smart Schools",
          "Smart Cities",
          "Smart Homes",
          "Power Backup",
        ],
      },
      {
        title: "Energy Solutions",
        description: "Clean and sustainable energy coverage.",
        links: [
          "Solar Innovations",
          "Hybrid Systems",
          "Off-grid Tech",
          "Inverter Tips",
        ],
      },
      {
        title: "Security & Access",
        description: "Safety systems for physical and cyber protection.",
        links: [
          "Surveillance Systems",
          "Access Control",
          "Security Tech Trends",
          "Biometric Integration",
        ],
      },
    ],
  },
  {
    name: "Resources",
    columns: [
      {
        title: "How-To Guides",
        links: [
          "Install Smart Panels",
          "Setup Online Exams",
          "Connect Agri Sensors",
          "Secure Your Network",
        ],
      },
      {
        title: "Case Studies",
        links: [
          "School Digitalization",
          "Energy Deployment Stories",
          "Agri-Tech Pilot Projects",
          "Security Upgrades",
        ],
      },
      {
        title: "Product Reviews",
        links: [
          "Smart Screens",
          "CCTV Cameras",
          "Coding Kits",
          "Agri Tools",
        ],
      },
    ],
  },
  {
    name: "Newsroom",
    columns: [
      {
        title: "Company Updates",
        links: [
          "Latest Anjonix News",
          "Press Releases",
          "Partnerships",
          "Events & Conferences",
        ],
      },
      {
        title: "Industry Insights",
        links: [
          "EdTech Trends",
          "Green Energy Reports",
          "Agri-Tech in Africa",
          "Security Forecasts",
        ],
      },
      {
        title: "Expert Voices",
        links: [
          "CEO Columns",
          "Developer Highlights",
          "Women in Tech",
          "Guest Contributors",
        ],
      },
    ],
  },
  {
    name: "About",
    columns: [
      {
        title: "The Blog",
        description: "Our mission to inform and inspire.",
        links: ["About the Blog", "Writing Guidelines", "Editorial Team"],
      },
      {
        title: "Contribute",
        description: "Submit your ideas and stories.",
        links: ["Submit an Article", "Join as Contributor", "Pitch a Topic"],
      },
      {
        title: "Support & Legal",
        links: [
          "FAQs",
          "Contact Editor",
          "Privacy Policy",
          "Terms of Use",
        ],
      },
    ],
  },
];

export default menuData;
