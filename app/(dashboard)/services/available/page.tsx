"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Clock, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ServiceDrawer } from "@/components/ServiceDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/context/DataContext";
import type { Service } from "@/types";

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

export default function AvailableServicesPage() {
  const { services, categories, isLoading, loadServices, loadCategories } =
    useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    loadServices();
    loadCategories();
  }, [loadServices, loadCategories]);

  // Show skeleton for 1.5s
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const activeServices = services.filter((s) => s.isActive);

  const filteredServices = activeServices.filter((service) => {
    const matchesSearch = (service.name ?? "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  return (
    <DashboardLayout title="Servicios Disponibles">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories
                .filter((c) => c.isActive)
                .map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        {isLoading || showSkeleton ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} variant="service" />
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Sin resultados"
            description="No encontramos servicios que coincidan con tu búsqueda"
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices.map((service) => {
              const category = getCategoryById(service.categoryId);
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl border border-border overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => handleViewDetails(service)}
                >
                  {/* Gradient Header */}
                  <div
                    className="h-28"
                    style={{
                      background: `linear-gradient(135deg, ${category?.accentColor || "#22543D"} 0%, ${category?.accentColor || "#22543D"}99 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {service.name}
                    </h3>

                    {category && (
                      <span
                        className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: category.accentColor }}
                      >
                        {category.name}
                      </span>
                    )}

                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div>
                        <span className="font-bold text-foreground">
                          {formatPrice(service.price)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Clock className="h-3 w-3" />
                          {service.duration} min
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary-green hover:bg-secondary-green text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(service);
                        }}
                      >
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Service Drawer */}
      <ServiceDrawer
        service={selectedService}
        category={
          selectedService ? getCategoryById(selectedService.categoryId) || null : null
        }
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </DashboardLayout>
  );
}
