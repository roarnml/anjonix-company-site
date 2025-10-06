// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Anjonix Global Limited. All rights reserved.
      </div>
    </footer>
  );
}
