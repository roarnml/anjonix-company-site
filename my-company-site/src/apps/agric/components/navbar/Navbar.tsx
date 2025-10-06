// src/public-site/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import type { NavbarData, NavbarLink, SubMenuItem, NavLinkItem } from "./types/navbar";

interface NavbarProps {
  variant?: string; // e.g. "tech", "agric", "edu"
}

interface MobileNavState {
  title: string;
  links: (NavbarLink | SubMenuItem | NavLinkItem)[];
  parent?: MobileNavState;
}

export default function Navbar({ variant = "agric" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // desktop
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [currentMenu, setCurrentMenu] = useState<MobileNavState | null>(null);
  const location = useLocation();

  useEffect(() => {
    import(`./data/${variant}navbar.json`)
      .then((module) => setNavbarData(module.default as NavbarData))
      .catch(async () => {
        const fallback = await import(`./data/${variant}navbar.json`);
        setNavbarData(fallback.default as NavbarData);
      });
  }, [variant]);

  // Add inside your Navbar component
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);
  
  // inside Navbar component
  useEffect(() => {
    const handleScroll = () => {
      if (dropdownOpen) {
        setDropdownOpen(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dropdownOpen]);


  useEffect(() => {
    if (navbarData) {
      setCurrentMenu({
        title: "Main Menu",
        links: navbarData.links,
      });
    }
  }, [navbarData]);

  if (!navbarData) return null;

  // ---------- DESKTOP DROPDOWN ----------
  const renderDropdownColumns = (sections: SubMenuItem[]) => {
    return (
      <div className="fixed -left-5 top-[60px] mt-2 w-screen max-w-full bg-white shadow-lg border-t z-50 text-black overflow-y-hidden">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-5">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              {/* Section title */}
              <h4 className="text-base font-semibold text-gray-900 border-b pb-1">
                {section.title}
              </h4>

              {/* Section links */}
              <ul className="space-y-2">
                {section.links.map((item) => {
                  if (item.external && item.url) {
                    return (
                      <li key={item.label}>
                        <a
                          href={item.url}
                          rel="noopener noreferrer"
                          className="block text-gray-600 hover:text-green-600 text-sm"
                        >
                          {item.label} ↗
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.path || "#"}
                        className="block text-gray-600 hover:text-green-600 text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

    );
  };

  const renderLink = (link: NavbarLink, isMobile = false) => {
    // Desktop mega menu
    if (!isMobile && link.columns) {
      return (
        <div key={link.name} className="relative">
        <button
          onClick={() =>
            setDropdownOpen(dropdownOpen === link.name ? null : link.name)
          }
          className={`px-4 py-2 rounded-md text-sm font-medium transition text-black ${
            dropdownOpen === link.name
              ? "text-green-600 border-b-2 border-green-600"
              : "hover:text-green-600"
          }`}
        >
          {link.name}
        </button>

          {dropdownOpen === link.name && renderDropdownColumns(link.columns)}
        </div>
      );
    }

    // Normal link
    if (!isMobile && link.path) {
      return (
        <Link
          key={link.name}
          to={link.path}
          className={`px-4 py-2 rounded-md text-sm font-medium text-black hover:text-green-600 ${
            location.pathname === link.path ? "text-green-600 font-bold" : ""
          }`}
        >
          {link.name}
        </Link>
      );
    }

    return null;
  };


  // ---------- MOBILE MULTI-LEVEL ----------
  const handleNavigate = (submenu: any, parent: MobileNavState) => {
    if ("columns" in submenu) {
      setCurrentMenu({
        title: submenu.name,
        links: submenu.columns,
        parent,
      });
    } else if ("links" in submenu) {
      setCurrentMenu({
        title: submenu.title || submenu.name,
        links: submenu.links,
        parent,
      });
    }
  };

  const handleBack = () => {
    if (currentMenu?.parent) {
      setCurrentMenu(currentMenu.parent);
    } else {
      setMenuOpen(false);
    }
  };

  const renderMobileLinks = () => {
    if (!currentMenu) return null;

    return (
      <div className="space-y-2">
        {/* Back Button */}
        {currentMenu.parent && (
          <button
            className="text-black text-sm flex items-center mb-2"
            onClick={handleBack}
          >
            ← Back to {currentMenu.parent.title}
          </button>
        )}

        {/* Title */}
        <h3 className="font-bold text-lg mb-2">{currentMenu.title}</h3>

        {/* Links */}
        <ul className="space-y-2">
          {currentMenu.links.map((item: any) => {
            // If submenu
            if ("columns" in item || "links" in item) {
              return (
                <li key={item.title || item.name}>
                  <button
                    className="w-full text-left text-black py-2 border-b"
                    onClick={() => handleNavigate(item, currentMenu)}
                  >
                    {item.name || item.title}
                  </button>
                </li>
              );
            }

            // If external link
            if (item.external && item.url) {
              return (
                <li key={item.label}>
                  <a
                    href={item.url}
                    rel="noopener noreferrer"
                    className="block text-black hover:text-green-600 text-sm"
                  >
                    {item.label} ↗
                  </a>

                </li>
              );
            }

            // If internal link
            return (
              <li key={item.label}>
                <Link
                  to={item.path || "#"}
                  className="block text-black hover:text-green-600 text-sm"
                >
                  {item.label}
                </Link>

              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // ---------- RENDER ----------
  return (
    <nav className="bg-gradient-to-br from-green-300 to-white shadow-md sticky top-0 z-50 w-full text-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={navbarData.logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-black">
          {navbarData.links.map((link) => renderLink(link))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 border-t h-screen overflow-y-auto overflow-x-hidden w-screen">
          {renderMobileLinks()}
        </div>
      )}

    </nav>
  );
}
