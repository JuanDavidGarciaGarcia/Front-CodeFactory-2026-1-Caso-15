"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "provider":
        return { label: "Proveedor", color: "bg-selected-green" };
      case "client":
        return { label: "Cliente", color: "bg-feature-blue" };
      case "admin":
        return { label: "Admin", color: "bg-feature-purple" };
      default:
        return { label: role, color: "bg-muted" };
    }
  };

  const roleBadge = user ? getRoleBadge(user.role) : null;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-foreground ml-12 lg:ml-0">
        {title}
      </h1>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-primary-green flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0) || "U"}
          </div>
          
          {/* Name & Role */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">
              {user?.name} {user?.lastName}
            </span>
            {roleBadge && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full text-white ${roleBadge.color}`}
              >
                {roleBadge.label}
              </span>
            )}
          </div>

          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
              >
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" />
                  Mi perfil
                </button>
                <div className="border-t border-border" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-destructive hover:bg-muted transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
