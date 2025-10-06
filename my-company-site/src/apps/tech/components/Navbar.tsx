

/// grace prevails

/*import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import menuData from "../constants/menuData";
import { Link, useLocation } from "react-router-dom";
import { slugify } from "../utils/slugify";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? "" : menu));
  };

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeMenuItem = menuData.find((menu) => menu.name === activeMenu);

  const generateLinkPath = (menuName: string, link: string) => {
    return `/${slugify(menuName)}/${slugify(link)}`;
  };

  return (
    <nav className="bg-white shadow relative z-50 w-screen">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="text-orange-500 font-bold">Anjonix</a>
        </div>

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

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {activeMenuItem && (
        <div
          ref={dropdownRef}
          className="hidden md:block absolute left-0 top-full w-full bg-white border-t shadow-lg z-40 transition-all duration-300 ease-in-out opacity-100 translate-y-0"
        >
          <div
            className={`max-w-7xl mx-auto px-6 py-6 grid gap-6 ${
              activeMenuItem.columns.length === 1
                ? "grid-cols-1"
                : activeMenuItem.columns.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {activeMenuItem.columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-bold mb-1">{col.title}</h4>
                {col.description && (
                  <p className="text-xs mb-1 text-gray-600">{col.description}</p>
                )}
                <ul className="text-sm space-y-1">
                  {col.links.map((link) => {
                    const to = generateLinkPath(activeMenuItem.name, link);
                    return (
                      <li key={link}>
                        <Link
                          to={to}
                          className={`hover:underline ${
                            location.pathname === to
                              ? "text-blue-600 font-semibold underline"
                              : "text-gray-700"
                          }`}
                        >
                          {link}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          {menuData.map((menu) => (
            <div key={menu.name}>
              <button
                onClick={() => toggleMenu(menu.name)}
                className="w-full text-left font-semibold text-gray-800 py-2"
              >
                {menu.name}
              </button>

              {activeMenu === menu.name && (
                <div className="pl-4 py-2 space-y-4 border-l-2 border-blue-500">
                  {menu.columns?.map((col) => (
                    <div key={col.title}>
                      <h4 className="font-bold text-sm">{col.title}</h4>
                      {col.description && (
                        <p className="text-xs text-gray-600">{col.description}</p>
                      )}
                      <ul className="text-sm space-y-1 mt-1">
                        {col.links.map((link) => {
                          const to = generateLinkPath(menu.name, link);
                          return (
                            <li key={link}>
                              <Link
                                to={to}
                                className={`hover:underline ${
                                  location.pathname === to
                                    ? "text-blue-600 font-semibold underline"
                                    : "text-gray-700"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {link}
                              </Link>
                            </li>
                          );
                        })}
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
}*/




import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import menuData from "../constants/menuData";
import { Link, useLocation } from "react-router-dom";
import { slugify } from "../utils/slugify";
//import MiniCart from './Cart/MiniCart'
//import { CartProvider } from "../context/CardContext";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? "" : menu));
  };

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeMenuItem = menuData.find((menu) => menu.name === activeMenu);

  const generateLinkPath = (menuName: string, link: string) => {
    return `/${slugify(menuName, { lower: true })}/${slugify(link, { lower: true })}`;
  };

  return (
    <nav className="bg-white shadow relative z-50 w-screen">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="text-orange-500 font-bold">Anjonix</a>
        </div>

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

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {activeMenuItem && (
        <div
          ref={dropdownRef}
          className="hidden md:block absolute left-0 top-full w-full bg-white border-t shadow-lg z-40 transition-all duration-300 ease-in-out opacity-100 translate-y-0"
        >
          <div
            className={`max-w-7xl mx-auto px-6 py-6 grid gap-6 ${
              activeMenuItem.columns.length === 1
                ? "grid-cols-1"
                : activeMenuItem.columns.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {activeMenuItem.columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-bold mb-1">{col.title}</h4>
                {col.description && (
                  <p className="text-xs mb-1 text-gray-600">{col.description}</p>
                )}
                <ul className="text-sm space-y-1">
                  {col.links.map((link) => {
                    const to = generateLinkPath(activeMenuItem.name, link.label);
                    return (
                      <li key={link.label}>
                        <Link
                          to={link.path}
                          className={`hover:underline ${
                            location.pathname === to
                              ? "text-blue-600 font-semibold underline"
                              : "text-gray-700"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          {menuData.map((menu) => (
            <div key={menu.name}>
              <button
                onClick={() => toggleMenu(menu.name)}
                className="w-full text-left font-semibold text-gray-800 py-2"
              >
                {menu.name}
              </button>

              {activeMenu === menu.name && (
                <div className="pl-4 py-2 space-y-4 border-l-2 border-blue-500">
                  {menu.columns?.map((col) => (
                    <div key={col.title}>
                      <h4 className="font-bold text-sm">{col.title}</h4>
                      {col.description && (
                        <p className="text-xs text-gray-600">{col.description}</p>
                      )}
                      <ul className="text-sm space-y-1">
                        {col.links.map((link) => {
                          const to = generateLinkPath(menu.name, link.label);
                          return (
                            <li key={link.label}>
                              <Link
                                to={link.path}
                                className={`hover:underline ${
                                  location.pathname === to
                                    ? "text-blue-600 font-semibold underline"
                                    : "text-gray-700"
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {/*<ul className="text-sm space-y-1 mt-1">
                        {col.links.map((link) => {
                          const to = link.path;
                          return (
                            <li key={link.label}>
                              <Link
                                to={link.path}
                                className={`hover:underline ${
                                  location.pathname === to
                                    ? "text-blue-600 font-semibold underline"
                                    : "text-gray-700"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>*/}
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



