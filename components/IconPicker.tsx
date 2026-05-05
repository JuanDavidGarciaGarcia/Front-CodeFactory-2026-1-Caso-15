"use client";

import {
  Scissors,
  Heart,
  Dumbbell,
  BookOpen,
  Briefcase,
  Camera,
  Music,
  Coffee,
  Car,
  Home,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [
  { name: "Scissors", icon: Scissors },
  { name: "Heart", icon: Heart },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "BookOpen", icon: BookOpen },
  { name: "Briefcase", icon: Briefcase },
  { name: "Camera", icon: Camera },
  { name: "Music", icon: Music },
  { name: "Coffee", icon: Coffee },
  { name: "Car", icon: Car },
  { name: "Home", icon: Home },
  { name: "Star", icon: Star },
  { name: "Zap", icon: Zap },
];

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  accentColor?: string;
}

export function IconPicker({ value, onChange, accentColor }: IconPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {icons.map(({ name, icon: Icon }) => {
        const isSelected = value === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={cn(
              "flex items-center justify-center p-3 rounded-lg border-2 transition-all",
              isSelected
                ? "border-selected-green"
                : "border-border hover:border-muted-foreground/30"
            )}
            style={{
              backgroundColor: isSelected
                ? `${accentColor || "#276749"}20`
                : undefined,
            }}
          >
            <Icon
              className="h-5 w-5"
              style={{
                color: isSelected ? accentColor || "#276749" : undefined,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export function getIconComponent(iconName: string) {
  const iconData = icons.find((i) => i.name === iconName);
  return iconData?.icon || Star;
}
