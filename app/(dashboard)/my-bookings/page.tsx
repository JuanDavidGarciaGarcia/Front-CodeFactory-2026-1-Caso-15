"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Monitor } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent } from "@/components/ui/card";
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

export default function MyBookingsPage() {
  const router = useRouter();
  const { bookings, services, categories, loadBookings, loadServices, loadCategories } =
    useData();

  useEffect(() => {
    loadBookings();
    loadServices();
    loadCategories();
  }, [loadBookings, loadServices, loadCategories]);

  const getServiceById = (serviceId: string) => {
    return services.find((s) => s.id === serviceId);
  };

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

  const getStatusForBadge = (status: string) => {
    switch (status) {
      case "pending": return "pending";
      case "confirmed": return "confirmed";
      case "completed": return "completed";
      case "cancelled": return "cancelled";
      default: return "inactive";
    }
  };

  return (
    <DashboardLayout title="Mis Reservas">
      <div className="space-y-6">
        {bookings.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Sin reservas"
            description="Aún no tienes reservas. Explora los servicios disponibles para hacer tu primera reserva."
            actionLabel="Ver servicios"
            onAction={() => router.push("/services/available")}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {bookings.map((booking) => {
              const service = getServiceById(booking.serviceId);
              const category = service ? getCategoryById(service.categoryId) : null;

              return (
                <motion.div key={booking.id} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div
                          className="h-2 sm:h-auto sm:w-2"
                          style={{ backgroundColor: category?.accentColor || "#22543D" }}
                        />
                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">
                                  {service?.name || "Servicio"}
                                </h3>
                                <StatusBadge status={getStatusForBadge(booking.status)} />
                              </div>
                              {category && (
                                <span
                                  className="inline-block text-xs px-2 py-0.5 rounded-full text-white"
                                  style={{ backgroundColor: category.accentColor }}
                                >
                                  {category.name}
                                </span>
                              )}
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="h-4 w-4" />
                                  {booking.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="h-4 w-4" />
                                  {booking.time}
                                </span>
                                {service && (
                                  <span className="flex items-center gap-1.5">
                                    {service.modality === "presencial" ? (
                                      <MapPin className="h-4 w-4" />
                                    ) : (
                                      <Monitor className="h-4 w-4" />
                                    )}
                                    {service.modality === "presencial" ? "Presencial" : "Virtual"}
                                  </span>
                                )}
                              </div>
                            </div>
                            {service && (
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-xl font-bold text-foreground">
                                  {formatPrice(service.price)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}