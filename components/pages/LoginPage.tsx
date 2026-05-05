"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

type RoleType = "client" | "provider";

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<RoleType>("provider");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password, selectedRole);
    if (success) {
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-8 lg:px-12">
      <div className="max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Bienvenido de nuevo
          </h1>
          <p className="text-muted-foreground mt-1">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={() => setSelectedRole("client")}
            className={cn(
              "flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm",
              selectedRole === "client"
                ? "border-primary-green bg-secondary text-secondary-foreground"
                : "border-border hover:border-muted-foreground/30"
            )}
          >
            <User className="h-4 w-4" />
            <span className="font-medium">Cliente</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("provider")}
            className={cn(
              "flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm",
              selectedRole === "provider"
                ? "border-primary-green bg-primary-green text-white"
                : "border-border hover:border-muted-foreground/30"
            )}
          >
            <Building2 className="h-4 w-4" />
            <span className="font-medium">Proveedor</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary-green hover:bg-secondary-green text-white rounded-lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-muted-foreground">
              ¿No tienes cuenta?
            </span>
          </div>
        </div>

        {/* Secondary Action */}
        <Link href="/register">
          <Button variant="outline" className="w-full h-11 rounded-lg">
            Crear cuenta nueva
          </Button>
        </Link>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Eres proveedor?{" "}
          <Link
            href="/register"
            className="text-primary-green hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
