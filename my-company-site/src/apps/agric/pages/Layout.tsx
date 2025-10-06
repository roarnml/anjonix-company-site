// src/components/Layout.tsx
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/navbar/Footer";
import { Outlet } from 'react-router-dom'
import { type ReactNode } from "react";

interface PublicLayoutProps {
  children?: ReactNode;
  variant?: "tech" | "agric" | "edutech" | "user" | "admin" | "public-site"; // add admin/user if needed
}

export default function PublicLayout({ children, variant = "agric" }: PublicLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-auto">
      <Navbar variant={variant} />
      <main className="flex-grow">
        {children ?? <Outlet />}
      </main>
      <Footer variant={variant} />
    </div>
  );
}
