"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Eye, EyeOff, Search, Briefcase, Clock } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { useData } from "@/context/DataContext";
import { cn } from "@/lib/utils";

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

export default function ServicesPage() {
  const {
    services,
    categories,
    isLoading,
    loadServices,
    loadCategories,
    toggleService,
  } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleModal, setToggleModal] = useState<{
    isOpen: boolean;
    serviceId: string | null;
    serviceName: string;
    isActive: boolean;
  }>({
    isOpen: false,
    serviceId: null,
    serviceName: "",
    isActive: false,
  });

  useEffect(() => {
    loadServices();
    loadCategories();
  }, [loadServices, loadCategories]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryById = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleToggleClick = (id: string, name: string, isActive: boolean) => {
    setToggleModal({
      isOpen: true,
      serviceId: id,
      serviceName: name,
      isActive,
    });
  };

  const handleConfirmToggle = () => {
    if (toggleModal.serviceId) {
      toggleService(toggleModal.serviceId);
    }
  };

  return (
    <DashboardLayout title="Mis Servicios">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Link href="/services/new">
            <Button className="bg-primary-green hover:bg-secondary-green text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Servicio
            </Button>
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} variant="service" />
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={searchQuery ? "Sin resultados" : "No hay servicios"}
            description={
              searchQuery
                ? "No encontramos servicios con ese nombre"
                : "Crea tu primer servicio para comenzar a recibir reservas"
            }
            actionLabel={!searchQuery ? "Crear servicio" : undefined}
            onAction={
              !searchQuery
                ? () => (window.location.href = "/services/new")
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
              {filteredServices.map((service) => {
                const category = getCategoryById(service.categoryId);
                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={cn(
                      "bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all",
                      !service.isActive && "opacity-60"
                    )}
                  >
                    {/* Gradient Header */}
                    <div
                      className="h-24"
                      style={{
                        background: `linear-gradient(135deg, ${category?.accentColor || "#22543D"} 0%, ${category?.accentColor || "#22543D"}cc 100%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {service.name}
                        </h3>
                        <StatusBadge
                          status={service.isActive ? "active" : "inactive"}
                        />
                      </div>

                      {category && (
                        <span
                          className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: category.accentColor }}
                        >
                          {category.name}
                        </span>
                      )}

                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {formatPrice(service.price)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {service.duration} min
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                        <Link href={`/services/${service.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Pencil className="h-3.5 w-3.5 mr-1.5" />
                            Editar
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleToggleClick(
                              service.id,
                              service.name,
                              service.isActive
                            )
                          }
                        >
                          {service.isActive ? (
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
        onClose={() => setToggleModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmToggle}
        title={toggleModal.isActive ? "Desactivar servicio" : "Activar servicio"}
        description={`¿Estás seguro de que quieres ${toggleModal.isActive ? "desactivar" : "activar"} el servicio "${toggleModal.serviceName}"?`}
        confirmLabel={toggleModal.isActive ? "Desactivar" : "Activar"}
        variant={toggleModal.isActive ? "warning" : "default"}
      />
    </DashboardLayout>
  );
}
