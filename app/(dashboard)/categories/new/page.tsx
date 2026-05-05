"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconPicker } from "@/components/IconPicker";
import { ColorSwatch } from "@/components/ColorSwatch";
import { useData } from "@/context/DataContext";

export default function NewCategoryPage() {
  const router = useRouter();
  const { addCategory } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Star",
    accentColor: "#22C55E",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await addCategory({
      ...formData,
      isActive: true,
    });

    router.push("/categories");
  };

  return (
    <DashboardLayout title="Nueva Categoría">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de categoría</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej: Salud y médico"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe brevemente esta categoría..."
                rows={3}
              />
            </div>

            {/* Icon Picker */}
            <div className="space-y-2">
              <Label>Icono</Label>
              <IconPicker
                value={formData.icon}
                onChange={(icon) =>
                  setFormData((prev) => ({ ...prev, icon }))
                }
                accentColor={formData.accentColor}
              />
            </div>

            {/* Color Swatch */}
            <div className="space-y-2">
              <Label>Color de acento</Label>
              <ColorSwatch
                value={formData.accentColor}
                onChange={(accentColor) =>
                  setFormData((prev) => ({ ...prev, accentColor }))
                }
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/categories")}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary-green hover:bg-secondary-green text-white"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Guardar"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
