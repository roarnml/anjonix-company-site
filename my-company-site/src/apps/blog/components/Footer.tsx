// src/components/Footer.tsx
import {
  footerBrand,
  footerLinks,
  footerContact,
} from "../constants/footerData";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        {/* 1. Brand & Mission */}
        <div>
          <img src={footerBrand.logo} alt="Anjonix Logo" className="h-12 mb-4" />
          <p className="text-sm text-gray-400">{footerBrand.description}</p>
        </div>

        {/* 2. Quick Links */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-bold mb-2 text-white">Solutions</h3>
            <ul className="space-y-1">
              {footerLinks.solutions.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-white">Resources</h3>
            <ul className="space-y-1">
              {footerLinks.resources.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Contact Info + Newsletter */}
        <div className="text-sm">
          <h3 className="font-bold mb-2 text-white">Contact Us</h3>
          <p>
            📞 <a href={`tel:${footerContact.phone}`} className="hover:underline">{footerContact.phone}</a>
          </p>
          <p>
            ✉️ <a href={`mailto:${footerContact.email}`} className="hover:underline">{footerContact.email}</a>
          </p>
          <p>
            🌐 <a href={footerContact.website} className="hover:underline">{footerContact.website}</a>
          </p>
          <p>🏢 {footerContact.location}</p>

          <div className="mt-4">
            <h4 className="font-bold text-white mb-2">Newsletter</h4>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded text-black"
              />
              <button className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-1">
              Stay informed about new services, tech insights, and special offers.
            </p>
          </div>
        </div>

        {/* 4. Social Media & Legal */}
        <div className="text-sm">
          <h3 className="font-bold mb-2 text-white">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            {footerLinks.social.map((platform) => (
              <a href="#" key={platform} className="hover:text-white">
                {platform}
              </a>
            ))}
          </div>

          <h4 className="font-bold mb-2 text-white">Legal</h4>
          <ul className="space-y-1">
            {footerLinks.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <a
              href={footerContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 py-4 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} Anjonix. All rights reserved.
      </div>
    </footer>
  );
}
