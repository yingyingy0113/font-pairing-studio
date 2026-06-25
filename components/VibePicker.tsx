"use client";

import { Vibe, VIBES, VIBE_KEYS } from "@/data/pairings";

interface VibePickerProps {
  selected: Vibe;
  onChange: (vibe: Vibe) => void;
  isDark: boolean;
}

export default function VibePicker({ selected, onChange, isDark }: VibePickerProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {VIBE_KEYS.map((vibe) => {
        const isActive = vibe === selected;
        const { label, accent } = VIBES[vibe];
        return (
          <button
            key={vibe}
            onClick={() => onChange(vibe)}
            style={
              isActive
                ? {
                    backgroundColor: accent,
                    borderColor: accent,
                    color: "#0a0a0a",
                    boxShadow: `0 0 20px ${accent}55`,
                  }
                : {
                    backgroundColor: "transparent",
                    borderColor: isDark ? "#333" : "#d1d5db",
                    color: isDark ? "#a1a1aa" : "#6b7280",
                  }
            }
            className="px-5 py-2 rounded-full border text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
