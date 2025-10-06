

/*
import { useState, useEffect, useRef } from "react";
import menuData from "../constants/menuData";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? "" : menu));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow relative z-50 w-screen">
      {/* Navbar Header }
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Anjonix</div>
        <ul className="flex space-x-8 text-sm font-semibold">
          {menuData.map((menu) => (
            <li key={menu.name} className="relative">
              <button
                onClick={() => toggleMenu(menu.name)}
                className={`cursor-pointer focus:outline-none ${
                  activeMenu === menu.name ? "text-blue-600" : ""
                }`}
              >
                {menu.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown Panel (positioned below the navbar) }
      {activeMenu && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-full w-full bg-white border-t shadow-lg z-40"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menuData
              .find((menu) => menu.name === activeMenu)
              ?.columns.map((col) => (
                <div key={col.title}>
                  <h4 className="font-bold mb-1">{col.title}</h4>
                  {col.description && (
                    <p className="text-xs mb-1 text-gray-600">
                      {col.description}
                    </p>
                  )}
                  <ul className="text-sm space-y-1">
                    {col.links.map((link) => (
                      <li
                        key={link}
                        className="text-gray-700 hover:underline cursor-pointer"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}*/

import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import menuData from "../constants/menuData";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? "" : menu));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow relative z-50 w-screen">
      {/* Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold"><a href="/">Anjonix</a></div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 bg-transparent text-sm font-semibold">
          {menuData.map((menu) => (
            <li key={menu.name} className="relative">
              <button
                onClick={() => toggleMenu(menu.name)}
                className={`cursor-pointer focus:outline-none ${
                  activeMenu === menu.name ? "text-blue-600" : ""
                }`}
              >
                {menu.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Panel for Desktop */}
      {activeMenu && (
        <div
          ref={dropdownRef}
          className="hidden md:block absolute left-0 top-full w-full bg-white border-t shadow-lg z-40"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menuData
              .find((menu) => menu.name === activeMenu)
              ?.columns.map((col) => (
                <div key={col.title}>
                  <h4 className="font-bold mb-1">{col.title}</h4>
                  {col.description && (
                    <p className="text-xs mb-1 text-gray-600">
                      {col.description}
                    </p>
                  )}
                  <ul className="text-sm space-y-1">
                    {col.links.map((link) => (
                      <li
                        key={link}
                        className="text-gray-700 hover:underline cursor-pointer"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white bg-transparent border-t px-4 py-4 space-y-4">
          {menuData.map((menu) => (
            <div key={menu.name}>
              <button
                onClick={() => toggleMenu(menu.name)}
                className="w-full text-left font-semibold text-gray-800 py-2"
              >
                {menu.name}
              </button>

              {/* Mobile Dropdown Content */}
              {activeMenu === menu.name && (
                <div className="pl-4 py-2 space-y-4 border-l-2 border-blue-500">
                  {menu.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="font-bold text-sm">{col.title}</h4>
                      {col.description && (
                        <p className="text-xs text-gray-600">{col.description}</p>
                      )}
                      <ul className="text-sm space-y-1 mt-1">
                        {col.links.map((link) => (
                          <li
                            key={link}
                            className="text-gray-700 hover:underline cursor-pointer"
                          >
                            {link}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
