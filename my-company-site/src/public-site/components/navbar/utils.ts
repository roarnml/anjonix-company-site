import type { MenuData } from "./menuData";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

const createLinks = (category: string, items: string[]): { label: string; path: string }[] =>
  items.map((label) => ({
    label,
    path: `/tech/${slugify(category)}/${slugify(label)}`,
  }));

const menuData: MenuData = [
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
          "PV Cables & Accessories",
        ]),
      },
      {
        title: "Security",
        description: "Smart, scalable devices",
        links: createLinks("products", [
          "CCTV Cameras",
          "DVRs & NVRs",
          "PoE Devices",
          "Motion Sensors",
          "Biometric Devices",
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
        links: createLinks("about", ["Who We Are", "Careers"]),
      },
    ],
  },
];

export default menuData;
