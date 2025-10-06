// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* CTA Bar */}
      <div className="bg-blue-600 text-white py-4 px-6 text-center md:flex md:justify-between md:items-center">
        <p className="text-lg font-semibold mb-2 md:mb-0">
          Ready to transform your school or business with smart tech?
        </p>
        <div className="space-x-4">
          <a href="/demo" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            Request a Demo
          </a>
          <a href="/consultation" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-600">
            Book a Consultation
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        {/* 1. Brand & Mission */}
        <div>
          <img src="/logo-anjonix.png" alt="Anjonix Logo" className="h-12 mb-4" />
          <p className="text-sm text-gray-400">
            Empowering communities and institutions with smart, secure, and sustainable solutions across technology, education, and infrastructure.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-bold mb-2 text-white">Solutions</h3>
            <ul className="space-y-1">
              <li><a href="/solutions/energy">Energy</a></li>
              <li><a href="/solutions/security">Security</a></li>
              <li><a href="/solutions/it">IT</a></li>
              <li><a href="/solutions/training">Training</a></li>
              <li><a href="/solutions/smart-education">Smart Education</a></li>
              <li><a href="/solutions/digital">Digital Presence</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-white">Resources</h3>
            <ul className="space-y-1">
              <li><a href="/partners">Partners</a></li>
              <li><a href="/developers">Developers</a></li>
              <li><a href="/downloads">Brochures</a></li>
              <li><a href="/industries">Industries Served</a></li>
              <li><a href="/catalog">Service Catalog</a></li>
            </ul>
          </div>
        </div>

        {/* 3. Contact Info + Newsletter */}
        <div className="text-sm">
          <h3 className="font-bold mb-2 text-white">Contact Us</h3>
          <p>📞 <a href="tel:+2349075734956">+234 907 573</a></p>
          <p>✉️ <a href="mailto:edtech@anjonixgloballimited.com">edtech@anjonixgloballimited.com</a></p>
          <p>🌐 <a href="https://www.anjonixgloballimited.com">www.anjonixgloballimited.com</a></p>
          <p>🏢 Lagos, Nigeria</p>

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
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">YouTube</a>
          </div>

          <h4 className="font-bold mb-2 text-white">Legal</h4>
          <ul className="space-y-1">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
            <li><a href="/sitemap">Sitemap</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
          </ul>

          <div className="mt-4">
            <a
              href="https://wa.me/2349075734956"
              target="_blank"
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
