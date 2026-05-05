"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const colors = [
  { name: "green", value: "#22C55E" },
  { name: "blue", value: "#3B82F6" },
  { name: "purple", value: "#8B5CF6" },
  { name: "orange", value: "#F59E0B" },
  { name: "pink", value: "#EC4899" },
  { name: "red", value: "#EF4444" },
];

interface ColorSwatchProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorSwatch({ value, onChange }: ColorSwatchProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => {
        const isSelected = value === color.value;
        return (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(color.value)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-transform",
              isSelected && "ring-2 ring-offset-2 ring-foreground scale-110"
            )}
            style={{ backgroundColor: color.value }}
          >
            {isSelected && <Check className="h-4 w-4 text-white" />}
          </button>
        );
      })}
    </div>
  );
}
