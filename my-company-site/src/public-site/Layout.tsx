// src/components/Layout.tsx
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Outlet } from 'react-router-dom'
import { type ReactNode } from "react";

interface PublicLayoutProps {
  children?: ReactNode;
  variant?: "tech" | "agric" | "edutech" | "user" | "admin" | "public-site"; // add admin/user if needed
}

export default function PublicLayout({ children, variant = "public-site" }: PublicLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-auto bg-slate-900">
      <Navbar variant={variant} />
      <main className="flex-grow">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
