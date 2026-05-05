"use client";

import { Clock, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { Service, Category } from "@/types";

interface ServiceDrawerProps {
  service: Service | null;
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDrawer({
  service,
  category,
  isOpen,
  onClose,
}: ServiceDrawerProps) {
  if (!service) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-md">
        {/* Service Image */}
        <div
          className="h-48 w-full"
          style={{
            background: `linear-gradient(135deg, ${category?.accentColor || "#22543D"} 0%, ${category?.accentColor || "#22543D"}aa 100%)`,
          }}
        />

        <DrawerHeader className="px-6">
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span
                className="text-xs px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: category.accentColor }}
              >
                {category.name}
              </span>
            )}
          </div>
          <DrawerTitle className="text-xl">{service.name}</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 px-6 space-y-6">
          <p className="text-muted-foreground">{service.description}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-foreground">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{service.duration} minutos</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              {service.modality === "presencial" ? (
                <>
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Presencial</span>
                </>
              ) : (
                <>
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <span>Virtual</span>
                </>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Precio</p>
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(service.price)}
            </p>
          </div>
        </div>

        <DrawerFooter className="px-6 pb-6">
          <Button className="w-full bg-primary-green hover:bg-secondary-green text-white">
            Reservar ahora
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
