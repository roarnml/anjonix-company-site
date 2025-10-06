/*// src/public-site/components/types/navbar.ts

export interface SubMenuItem {
  title: string;
  links: { label: string; path: string }[]; // each submenu item has a label + path
}

export interface NavbarLink {
  name: string; // e.g. "Product"
  path?: string; // for normal links (About, Support, etc.)
  columns?: SubMenuItem[]; // for mega menu dropdowns
}

export interface NavbarData {
  logo: string;
  links: NavbarLink[];
}*/



// src/public-site/components/types/navbar.ts

// Leaf link (can be internal or external)
export interface NavLinkItem {
  label: string;
  path?: string; // internal navigation
  url?: string;  // external navigation
  external?: boolean; // true if url should open in new tab
}

// Submenu grouping (like "Products", "Services")
export interface SubMenuItem {
  title: string;
  links: NavLinkItem[];
}

// Top-level navbar link
export interface NavbarLink {
  name: string;              // e.g. "Products"
  path?: string;             // for direct links (About, Support, etc.)
  columns?: SubMenuItem[];   // for multi-column dropdowns (desktop)
  links?: NavLinkItem[];     // for simple list submenus (mobile, external sections, etc.)
}

export interface NavbarData {
  logo: string;
  links: NavbarLink[];
}
