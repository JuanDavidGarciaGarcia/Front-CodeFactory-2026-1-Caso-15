"use client";

import { motion } from "framer-motion";
import { Calendar, Bell, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Feature {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Calendar className="h-5 w-5 text-white" />,
    iconBg: "bg-feature-blue",
    title: "Agenda en tiempo real",
    description: "Disponibilidad actualizada al instante",
  },
  {
    icon: <Bell className="h-5 w-5 text-white" />,
    iconBg: "bg-feature-yellow",
    title: "Notificaciones automáticas",
    description: "Recordatorios para clientes y proveedores",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-white" />,
    iconBg: "bg-feature-red",
    title: "Reportes de ocupación",
    description: "Métricas para tomar mejores decisiones",
  },
];

interface SplitScreenLayoutProps {
  children: React.ReactNode;
}

export function SplitScreenLayout({ children }: SplitScreenLayoutProps) {
  const pathname = usePathname();
  const isLogin = pathname === "/" || pathname === "/login";

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Hero/Marketing */}
      <div className="hidden lg:flex lg:w-[65%] bg-gradient-to-br from-primary-green to-secondary-green flex-col relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-8 lg:p-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-white text-xl font-semibold">ReservaFácil</span>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight text-balance">
              Gestiona tu agenda,{" "}
              <span className="italic font-medium">sin complicaciones.</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              La plataforma más completa para gestionar reservas y servicios.
              Conecta con tus clientes de manera eficiente y profesional.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${feature.iconBg} flex items-center justify-center shrink-0`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 lg:w-[35%] flex flex-col bg-white">
        {/* Top Nav */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-2 h-2 rounded-full bg-primary-green" />
            <span className="text-primary-green text-lg font-semibold">
              ReservaFácil
            </span>
          </div>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isLogin
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                !isLogin
                  ? "bg-primary-green text-white hover:bg-secondary-green"
                  : "bg-primary-green text-white hover:bg-secondary-green"
              }`}
            >
              Registrarse
            </Link>
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 overflow-y-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
