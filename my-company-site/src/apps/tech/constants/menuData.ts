// src/constants/menuData.ts
/*export interface SubMenuItem {
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
    name: "Product",
    columns: [
      {
        title: "Renewable Energy",
        links: ["Solar Panels", "Wind Turbine", "Inverter", "Batteries"],
      },
      {
        title: "Security",
        links: ["Cameras", "DVRs", "NVRs", "PoE Devices", "Solar Cameras", "Cables"],
      },
      {
        title: "IT",
        links: ["Computers", "Switches", "Routers", "Voltage Regulators", "Smart Devices"],
      },
    ],
  },
  {
    name: "Solutions",
    columns: [
      {
        title: "Energy",
        description: "Integrated clean energy solutions",
        links: ["Solar Power", "Wind Power", "House Wiring", "Hybrid Systems"],
      },
      {
        title: "Security",
        description: "Smart, secure, and scalable",
        links: ["CCTV Installation", "IP Surveillance", "Smart Home", "Biometrics"],
      },
      {
        title: "IT & Training",
        description: "Empowering users with tech",
        links: ["IT Support", "CBT Labs", "Digital Tools", "Remote School Systems"],
      },
    ],
  },
  {
    name: "Support",
    columns: [
      {
        title: "Renewable Energy",
        links: ["Solar Panels", "Wind Turbine", "Inverter", "Batteries"],
      },
      {
        title: "Security",
        links: ["Cameras", "DVRs", "NVRs", "PoE Devices", "Solar Cameras", "Cables"],
      },
      {
        title: "IT",
        links: ["Computers", "Switches", "Routers", "Voltage Regulators", "Smart Devices"],
      },
    ],
  },
  {
    name: "Partners & Developers",
    columns: [
      {
        title: "Renewable Energy",
        links: ["Solar Panels", "Wind Turbine", "Inverter", "Batteries"],
      },
      {
        title: "Security",
        links: ["Cameras", "DVRs", "NVRs", "PoE Devices", "Solar Cameras", "Cables"],
      },
      {
        title: "IT",
        links: ["Computers", "Switches", "Routers", "Voltage Regulators", "Smart Devices"],
      },
    ],
  },
  {
    name: "About",
    columns: [
      {
        title: "Energy",
        description: "Integrated clean energy solutions",
        links: ["Solar Power", "Wind Power", "House Wiring", "Hybrid Systems"],
      },
      {
        title: "Security",
        description: "Smart, secure, and scalable",
        links: ["CCTV Installation", "IP Surveillance", "Smart Home", "Biometrics"],
      },
      {
        title: "IT & Training",
        description: "Empowering users with tech",
        links: ["IT Support", "CBT Labs", "Digital Tools", "Remote School Systems"],
      },
    ],
  },
  /*{
    name: "Cart",
    columns: [
      {
        title: "Your Cart",
        links: ["View Cart", "Checkout", "Order History"],
      },
    ],

  }
  // Add Support, Partners & Developers, About later
];

export default menuData;*/



// src/constants/menuData.ts
export interface SubMenuItem {
  title: string;
  description?: string;
  links: {
    label: string;
    path: string;
  }[];
}

export interface MenuItem {
  name: string;
  columns: SubMenuItem[];
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

const createLinks = (category: string, items: string[]) =>
  items.map((label) => ({
    label,
    path: `/tech/${slugify(category)}/${slugify(label)}`,
  }));

const menuData: MenuItem[] = [
  {
    name: "Product",
    columns: [
      {
        title: "Renewable Energy",
        links: createLinks("products", [
          "Solar Panels",
          "Wind Turbine Systems",
          "Inverters & Hybrid Systems",
          "Tubular Batteries",
          "PV Cables & Accessories"
        ]),
      },
      {
        title: "Security",
        links: createLinks("products", [
          "CCTV Cameras",
          "DVRs & NVRs",
          "PoE Devices",
          "Motion Sensors",
          "Biometric Devices",
          "Cables & Accessories"
        ]),
      },
      {
        title: "IT & Robotics",
        links: createLinks("products", [
          "Computers & Laptops",
          "Switches & Routers",
          "Smart Devices",
          "Voltage Regulators",
          "Smart Locks",
          "Robotics Kits",
        ]),
      },
    ],
  },
  {
    name: "Solutions",
    columns: [
      {
        title: "Smart School Solutions",
        description: "End-to-end tech for education",
        links: createLinks("solutions", [
          "Digital Classrooms",
          "CBT Lab Setup",
          "Robotics & Coding Labs",
          "Soft Skills Training",
          "Educational Wears & Stationery"
        ]),
      },
      {
        title: "Security Solutions",
        description: "Protect people, assets & infrastructure",
        links: createLinks("solutions", [
          "CCTV Installation",
          "IP Surveillance",
          "Access Control Systems",
          "Alarm Systems",
          "Intrusion Detection"
        ]),
      },
      {
        title: "Energy Solutions",
        description: "Sustainable power for all sectors",
        links: createLinks("solutions", [
          "Solar Power Systems",
          "Hybrid Inverter Solutions",
          "Wind Power Systems",
          "Custom Off-Grid Design"
        ]),
      },
      {
        title: "IT & Training",
        description: "Empowering users with tech",
        links: createLinks("solutions", ["IT Support", "CBT Labs", "Digital Tools", "Remote School Systems"]),
      },
    ],
  },
  {
    name: "Support",
    columns: [
      {
        title: "Technical Support",
        description: "Keep your systems running smoothly",
        links: createLinks("support", [
          "IT Troubleshooting",
          "Network Maintenance",
          "Firmware Updates",
          "Remote Support"
        ]),
      },
      {
        title: "Installation Services",
        description: "Expert setup for maximum performance",
        links: createLinks("support", [
          "Solar & Inverter Installation",
          "Security Device Installation",
          "Network Infrastructure Setup"
        ]),
      },
      {
        title: "Training & Capacity Building",
        description: "Empower your team or students",
        links: createLinks("support", [
          "Web Solutions Training",
          "Robotics Training",
          "Security Installation Training",
          "Renewable Energy Installation Training"
        ]),
      },
    ],
  },
  {
    name: "Partners & Developers",
    columns: [
      {
        title: "Technical Support",
        description: "Keep your systems running smoothly",
        links: createLinks("support", [
          "IT Troubleshooting",
          "Network Maintenance",
          "Firmware Updates",
          "Remote Support"
        ]),
      },
      {
        title: "Installation Services",
        description: "Expert setup for maximum performance",
        links: createLinks("support", [
          "Solar & Inverter Installation",
          "Security Device Installation",
          "Network Infrastructure Setup"
        ]),
      },
      {
        title: "Training & Capacity Building",
        description: "Empower your team or students",
        links: createLinks("support", [
          "Web Solutions Training",
          "Robotics Training",
          "Security Installation Training",
          "Renewable Energy Installation Training"
        ]),
      },
    ],
  },
  {
    name: "About",
    columns: [
      {
        title: "Company",
        description: "Our story & mission",
        links: createLinks("about", [
          "Who We Are",
          "Mission & Vision",
          "Leadership Team",
          "Careers"
        ]),
      },
      {
        title: "Impact Areas",
        description: "Where we make a difference",
        links: createLinks("about", [
          "Education",
          "Energy Access",
          "Security & Safety",
          "Digital Transformation"
        ]),
      },
      {
        title: "Contact",
        description: "Get in touch with us",
        links: createLinks("about", [
          "Contact Form",
          "Request a Quote",
          "Support Channels"
        ]),
      },
    ],
  },
];

export default menuData;



/* // src/constants/menuData.ts
export interface SubMenuItem {
  title: string;
  description?: string;
  links: {
    label: string;
    path: string;
  }[];
}

export interface MenuItem {
  name: string;
  columns: SubMenuItem[];
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

const createLinks = (category: string, items: string[]) =>
  items.map((label) => ({
    label,
    path: `/tech/${slugify(category)}/${slugify(label)}`,
  }));

const menuData: MenuItem[] = [
  {
    name: "Products",
    columns: [
      {
        title: "Renewable Energy",
        description: "Clean, reliable energy solutions",
        links: createLinks("products", [
          "Solar Panels",
          "Wind Turbine Systems",
          "Inverters & Hybrid Systems",
          "Tubular Batteries",
          "PV Cables & Accessories"
        ]),
      },
      {
        title: "Security",
        description: "Smart, scalable security devices",
        links: createLinks("products", [
          "CCTV Cameras",
          "DVRs & NVRs",
          "PoE Devices",
          "Motion Sensors",
          "Biometric Devices",
          "Cables & Accessories"
        ]),
      },
      {
        title: "IT & Robotics",
        description: "Tools for modern connectivity & automation",
        links: createLinks("products", [
          "Computers & Laptops",
          "Switches & Routers",
          "Smart Devices",
          "Voltage Regulators",
          "Smart Locks",
          "Robotics Kits"
        ]),
      },
    ],
  },
  {
    name: "Solutions",
    columns: [
      {
        title: "Smart School Solutions",
        description: "End-to-end tech for education",
        links: createLinks("solutions", [
          "Digital Classrooms",
          "CBT Lab Setup",
          "Robotics & Coding Labs",
          "Soft Skills Training",
          "Educational Wears & Stationery"
        ]),
      },
      {
        title: "Security Solutions",
        description: "Protect people, assets & infrastructure",
        links: createLinks("solutions", [
          "CCTV Installation",
          "IP Surveillance",
          "Access Control Systems",
          "Alarm Systems",
          "Intrusion Detection"
        ]),
      },
      {
        title: "Energy Solutions",
        description: "Sustainable power for all sectors",
        links: createLinks("solutions", [
          "Solar Power Systems",
          "Hybrid Inverter Solutions",
          "Wind Power Systems",
          "Custom Off-Grid Design"
        ]),
      },
    ],
  },
  {
    name: "Support",
    columns: [
      {
        title: "Technical Support",
        description: "Keep your systems running smoothly",
        links: createLinks("support", [
          "IT Troubleshooting",
          "Network Maintenance",
          "Firmware Updates",
          "Remote Support"
        ]),
      },
      {
        title: "Installation Services",
        description: "Expert setup for maximum performance",
        links: createLinks("support", [
          "Solar & Inverter Installation",
          "Security Device Installation",
          "Network Infrastructure Setup"
        ]),
      },
      {
        title: "Training & Capacity Building",
        description: "Empower your team or students",
        links: createLinks("support", [
          "Web Solutions Training",
          "Robotics Training",
          "Security Installation Training",
          "Renewable Energy Installation Training"
        ]),
      },
    ],
  },
  {
    name: "Partners & Developers",
    columns: [
      {
        title: "Partnership Programs",
        description: "Collaborate for greater impact",
        links: createLinks("partners", [
          "Reseller Program",
          "Installation Partner",
          "School Partnership",
          "Government/NGO Collaboration"
        ]),
      },
      {
        title: "Developer Resources",
        description: "Build on our platforms & APIs",
        links: createLinks("partners", [
          "API Documentation",
          "Integration Guides",
          "Testing Sandbox"
        ]),
      },
      {
        title: "Case Studies",
        description: "See our solutions in action",
        links: createLinks("partners", [
          "Smart School Project",
          "Community Solar Program",
          "Enterprise Security Deployment"
        ]),
      },
    ],
  },
  {
    name: "About",
    columns: [
      {
        title: "Company",
        description: "Our story & mission",
        links: createLinks("about", [
          "Who We Are",
          "Mission & Vision",
          "Leadership Team",
          "Careers"
        ]),
      },
      {
        title: "Impact Areas",
        description: "Where we make a difference",
        links: createLinks("about", [
          "Education",
          "Energy Access",
          "Security & Safety",
          "Digital Transformation"
        ]),
      },
      {
        title: "Contact",
        description: "Get in touch with us",
        links: createLinks("about", [
          "Contact Form",
          "Request a Quote",
          "Support Channels"
        ]),
      },
    ],
  },
];

export default menuData;
 */