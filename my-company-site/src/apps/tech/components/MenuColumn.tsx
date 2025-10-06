// src/components/MenuColumn.tsx
import React from "react";

interface MenuLink {
  label: string;
  path: string; // using path since your menuData uses path
}

interface MenuColumnProps {
  title: string;
  description?: string;
  links: MenuLink[];
}

const MenuColumn: React.FC<MenuColumnProps> = ({ title, description, links }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <ul className="space-y-2">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.path}
              className="text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuColumn;
