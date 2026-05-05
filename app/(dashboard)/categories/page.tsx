"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Eye, EyeOff, Tag } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { getIconComponent } from "@/components/IconPicker";
import { useData } from "@/context/DataContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type FilterType = "active" | "inactive";

export default function CategoriesPage() {
  const { categories, isLoading, loadCategories, toggleCategory } = useData();
  const [filter, setFilter] = useState<FilterType>("active");
  const [toggleModal, setToggleModal] = useState<{
    isOpen: boolean;
    categoryId: string | null;
    categoryName: string;
    isActive: boolean;
  }>({
    isOpen: false,
    categoryId: null,
    categoryName: "",
    isActive: false,
  });

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filteredCategories = categories.filter((cat) =>
    filter === "active" ? cat.isActive : !cat.isActive
  );

  const handleToggleClick = (
    id: string,
    name: string,
    isActive: boolean
  ) => {
    setToggleModal({
      isOpen: true,
      categoryId: id,
      categoryName: name,
      isActive,
    });
  };

  const handleConfirmToggle = () => {
    if (toggleModal.categoryId) {
      toggleCategory(toggleModal.categoryId);
    }
  };

  return (
    <DashboardLayout title="Gestión de Categorías">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            {(["active", "inactive"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors"
              >
                {filter === tab && (
                  <motion.div
                    layoutId="category-tab-indicator"
                    className="absolute inset-0 bg-card shadow-sm rounded-md"
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  />
                )}
                <span
                  className={`relative z-10 ${filter === tab ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {tab === "active" ? "Activas" : "Inactivas"}
                </span>
              </button>
            ))}
          </div>

          <Link href="/categories/new">
            <Button className="bg-primary-green hover:bg-secondary-green text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Categoría
            </Button>
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="No hay categorías"
            description={
              filter === "active"
                ? "Crea tu primera categoría para empezar a organizar tus servicios"
                : "No tienes categorías inactivas"
            }
            actionLabel={filter === "active" ? "Crear categoría" : undefined}
            onAction={
              filter === "active"
                ? () => (window.location.href = "/categories/new")
                : undefined
            }
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((category) => {
                const Icon = getIconComponent(category.icon);
                return (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${category.accentColor}20` }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: category.accentColor }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <StatusBadge
                        status={category.isActive ? "active" : "inactive"}
                      />
                      <div className="flex gap-1">
                        <Link href={`/categories/${category.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleToggleClick(
                              category.id,
                              category.name,
                              category.isActive
                            )
                          }
                        >
                          {category.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={toggleModal.isOpen}
        onClose={() =>
          setToggleModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={handleConfirmToggle}
        title={
          toggleModal.isActive
            ? "Desactivar categoría"
            : "Activar categoría"
        }
        description={`¿Estás seguro de que quieres ${toggleModal.isActive ? "desactivar" : "activar"} la categoría "${toggleModal.categoryName}"?`}
        confirmLabel={toggleModal.isActive ? "Desactivar" : "Activar"}
        variant={toggleModal.isActive ? "warning" : "default"}
      />
    </DashboardLayout>
  );
}
