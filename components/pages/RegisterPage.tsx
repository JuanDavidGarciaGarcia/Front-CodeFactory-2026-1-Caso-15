"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building2,
  Eye,
  EyeOff,
  Heart,
  Sparkles,
  Dumbbell,
  Briefcase,
  BookOpen,
  Grid3X3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

type AccountType = "client" | "provider";

const serviceCategories = [
  { id: "health", label: "Salud y médico", icon: Heart },
  { id: "beauty", label: "Belleza y spa", icon: Sparkles },
  { id: "fitness", label: "Deportes y fitness", icon: Dumbbell },
  { id: "consulting", label: "Consultoría", icon: Briefcase },
  { id: "education", label: "Educación", icon: BookOpen },
  { id: "other", label: "Otro", icon: Grid3X3 },
];

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Débil", color: "bg-destructive" };
  if (score === 2) return { score: 2, label: "Media", color: "bg-warning" };
  if (score >= 3) return { score: 3, label: "Fuerte", color: "bg-success" };
  return { score: 0, label: "", color: "bg-muted" };
}

export function RegisterPage() {
  const [accountType, setAccountType] = useState<AccountType>("provider");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("fitness");
  const { register } = useAuth();
  const router = useRouter();

  // Form fields
  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    documentId: "",
    password: "",
    confirmPassword: "",
  });

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) return;

  setIsLoading(true);

  const success = await register(
    {
      email: formData.email,
      name: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      businessName: accountType === "provider" ? formData.businessName : undefined,
      documentId: accountType === "client" ? formData.documentId : undefined,
      role: accountType,
    },
    formData.password   //segundo parámetro
  );

  if (success) router.push("/dashboard");
  setIsLoading(false);
};

  return (
    <div className="flex-1 flex flex-col px-6 py-8 lg:px-12">
      <div className="max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
          <p className="text-muted-foreground mt-1">
            Selecciona tu tipo de cuenta para continuar
          </p>
        </div>

        {/* Account Type Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setAccountType("client")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium",
              accountType === "client"
                ? "border-primary-green bg-primary-green text-white"
                : "border-border hover:border-muted-foreground/30 text-foreground"
            )}
          >
            <User className="h-4 w-4" />
            Soy cliente
          </button>
          <button
            type="button"
            onClick={() => setAccountType("provider")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium",
              accountType === "provider"
                ? "border-primary-green bg-primary-green text-white"
                : "border-border hover:border-muted-foreground/30 text-foreground"
            )}
          >
            <Building2 className="h-4 w-4" />
            Soy proveedor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={accountType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {accountType === "provider" ? (
                <>
                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Nombre del negocio
                    </Label>
                    <Input
                      name="businessName"
                      placeholder="Zapatería Don Juan"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Nombre del responsable
                      </Label>
                      <Input
                        name="firstName"
                        placeholder="Juan"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="h-11 rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Apellido
                      </Label>
                      <Input
                        name="lastName"
                        placeholder="Pérez"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="h-11 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Email */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Correo del negocio
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="negocio@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Teléfono de contacto
                    </Label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Dirección
                    </Label>
                    <Input
                      name="address"
                      placeholder="Calle 123 #45-67, Medellín"
                      value={formData.address}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>

                  {/* Service Category */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Categoría de servicios
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceCategories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-sm",
                              isSelected
                                ? "border-selected-green bg-selected-green text-white"
                                : "border-border bg-secondary/50 text-foreground hover:border-muted-foreground/30"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="truncate">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Client Form */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Nombre
                      </Label>
                      <Input
                        name="firstName"
                        placeholder="María"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="h-11 rounded-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Apellido
                      </Label>
                      <Input
                        name="lastName"
                        placeholder="González"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="h-11 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Correo electrónico
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="maria@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Teléfono
                    </Label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+57 300 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Documento de identidad
                    </Label>
                    <Input
                      name="documentId"
                      placeholder="1234567890"
                      value={formData.documentId}
                      onChange={handleChange}
                      className="h-11 rounded-lg"
                      required
                    />
                  </div>
                </>
              )}

              {/* Password Fields - Common for both */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
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
                {formData.password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          passwordStrength.color
                        )}
                        style={{
                          width: `${(passwordStrength.score / 3) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Legal Text */}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Acepta los{" "}
            <Link href="#" className="text-primary-green hover:underline">
              Términos de Uso
            </Link>{" "}
            y la{" "}
            <Link href="#" className="text-primary-green hover:underline">
              Política de privacidad
            </Link>
            .{" "}
            {accountType === "provider" &&
              "Ten en cuenta que tu negocio será verificado antes de activarse."}
          </p>

          {/* Submit Button */}
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
            ) : accountType === "provider" ? (
              "Crear cuenta de proveedor"
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </form>

        {/* Link to login */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-primary-green hover:underline font-medium"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
