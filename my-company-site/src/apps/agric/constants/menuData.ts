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
    name: "Services",
    columns: [
      {
        title: "Farm Projects",
        description: "Comprehensive farm development support",
        links: [
          "Farm Setup & Management",
          "Cash Crop Cultivation",
          "Irrigation Planning",
          "Farm Staffing & Training",
        ],
      },
      {
        title: "Advanced Agriculture",
        description: "Modern tools for high-efficiency farming",
        links: [
          "Precision Farming Implements",
          "Automation Systems",
          "Agri Data Monitoring",
          "Sensor Integration",
        ],
      },
      {
        title: "Processing & Value Addition",
        description: "Maximize returns from produce",
        links: [
          "Cash Crop Processing (Industrial)",
          "Sorting & Packaging",
          "Drying Units",
          "Agro Waste Management",
        ],
      },
    ],
  },
  {
    name: "Sales",
    columns: [
      {
        title: "Land & Inputs",
        links: ["Agricultural Land", "Seedlings", "Fertilizers", "Pesticides"],
      },
      {
        title: "Machinery",
        links: [
          "Farm Tractors",
          "Tillage Equipment",
          "Harvesters",
          "Farm Machinery Rentals",
        ],
      },
      {
        title: "Smart Equipment",
        links: [
          "Agricultural Production Equipment",
          "Automation Farming Equipment",
          "Greenhouse Kits",
          "Irrigation Controllers",
        ],
      },
    ],
  },
  {
    name: "Support",
    columns: [
      {
        title: "Technical Support",
        links: ["Installation", "Maintenance", "On-field Help", "Troubleshooting"],
      },
      {
        title: "Farmer Training",
        links: ["Workshops", "Demo Farms", "Remote Advisory", "Best Practices"],
      },
      {
        title: "Seasonal Assistance",
        links: ["Planting Guides", "Weather Planning", "Crop Calendar", "Market Advisory"],
      },
    ],
  },
  {
    name: "Partners",
    columns: [
      {
        title: "Our Network",
        links: ["Agro Dealers", "Farmer Co-ops", "Local Agents", "Research Institutes"],
      },
      {
        title: "Join Us",
        links: ["Become a Partner", "Franchise", "Field Collaborators", "NGO Alliances"],
      },
      {
        title: "Investment & Funding",
        links: ["Agric Financing", "Pilot Programs", "CSR Partnerships", "Grants"],
      },
    ],
  },
  {
    name: "About",
    columns: [
      {
        title: "About Anjonix Agric",
        description: "Smart solutions for modern agriculture",
        links: ["Our Mission", "Vision & Goals", "Leadership Team", "Impact Stories"],
      },
      {
        title: "Resources & Insights",
        description: "Growing knowledge for the agric space",
        links: ["Blog", "Reports", "Case Studies", "FAQs"],
      },
      {
        title: "Contact",
        description: "Reach out or join our journey",
        links: ["Contact Us", "Work With Us", "Support", "Visit Our Farm"],
      },
    ],
  },
];

export default menuData;