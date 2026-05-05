"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { categories, services, bookings, loadCategories, loadServices, loadBookings } =
    useData();

  useEffect(() => {
    loadCategories();
    loadServices();
    loadBookings();
  }, [loadCategories, loadServices, loadBookings]);

  const isProvider = user?.role === "provider";
  const activeServices = services.filter((s) => s.isActive).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;

  const providerStats = [
    {
      title: "Servicios Activos",
      value: activeServices,
      icon: Briefcase,
      color: "text-feature-blue",
      bgColor: "bg-feature-blue/10",
    },
    {
      title: "Reservas Pendientes",
      value: pendingBookings,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Reservas Confirmadas",
      value: confirmedBookings,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Categorías",
      value: categories.filter((c) => c.isActive).length,
      icon: TrendingUp,
      color: "text-feature-purple",
      bgColor: "bg-feature-purple/10",
    },
  ];

  const clientStats = [
    {
      title: "Mis Reservas",
      value: bookings.length,
      icon: Calendar,
      color: "text-feature-blue",
      bgColor: "bg-feature-blue/10",
    },
    {
      title: "Servicios Disponibles",
      value: activeServices,
      icon: Briefcase,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Proveedores",
      value: 1,
      icon: Users,
      color: "text-feature-purple",
      bgColor: "bg-feature-purple/10",
    },
  ];

  const stats = isProvider ? providerStats : clientStats;

  return (
    <DashboardLayout title="Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-foreground">
            ¡Hola, {user?.name}!
          </h2>
          <p className="text-muted-foreground mt-1">
            {isProvider
              ? "Aquí tienes un resumen de tu negocio"
              : "Aquí tienes un resumen de tus reservas"}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No hay actividad reciente
                </p>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => {
                    const service = services.find(
                      (s) => s.id === booking.serviceId
                    );
                    return (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {service?.name || "Servicio"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} a las {booking.time}
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-success/10 text-success"
                              : booking.status === "pending"
                                ? "bg-warning/10 text-warning"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {booking.status === "confirmed"
                            ? "Confirmado"
                            : booking.status === "pending"
                              ? "Pendiente"
                              : booking.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
