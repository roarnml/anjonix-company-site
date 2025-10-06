// src/constants/menuData.ts

export interface NavLink {
  label: string;
  path: string;
}

export interface SubMenuItem {
  title: string;
  description?: string;
  links: NavLink[];
}

export interface MenuItem {
  name: string;          // e.g. "Products"
  columns: SubMenuItem[]; // Dropdown columns
}

export type MenuData = MenuItem[];
