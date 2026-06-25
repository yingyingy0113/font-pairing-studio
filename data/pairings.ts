export type Vibe = "editorial" | "minimal" | "playful" | "romantic" | "bold" | "retro";

export interface FontPairing {
  heading: string;
  body: string;
  featured?: boolean;
}

export interface VibeData {
  label: string;
  pairings: FontPairing[];
  accent: string;
  description: string;
}

export const VIBES: Record<Vibe, VibeData> = {
  editorial: {
    label: "Editorial",
    description: "Classic newspaper elegance",
    accent: "#f59e0b",
    pairings: [
      { heading: "Playfair Display", body: "DM Sans", featured: true },
      { heading: "Playfair Display", body: "Lato" },
      { heading: "Cormorant Garamond", body: "DM Sans" },
    ],
  },
  minimal: {
    label: "Minimal",
    description: "Clean weight contrast",
    accent: "#6366f1",
    pairings: [
      { heading: "Inter", body: "Inter", featured: true },
      { heading: "Inter", body: "DM Sans" },
      { heading: "DM Sans", body: "Inter" },
    ],
  },
  playful: {
    label: "Playful",
    description: "Fun and expressive",
    accent: "#ec4899",
    pairings: [
      { heading: "Fredoka One", body: "Nunito", featured: true },
      { heading: "Fredoka One", body: "DM Sans" },
      { heading: "Nunito", body: "Nunito" },
    ],
  },
  romantic: {
    label: "Romantic",
    description: "Soft and refined",
    accent: "#e879f9",
    pairings: [
      { heading: "Cormorant Garamond", body: "Lato", featured: true },
      { heading: "Cormorant Garamond", body: "DM Sans" },
      { heading: "Playfair Display", body: "Lato" },
    ],
  },
  bold: {
    label: "Bold",
    description: "Strong and impactful",
    accent: "#ef4444",
    pairings: [
      { heading: "Bebas Neue", body: "Space Mono", featured: true },
      { heading: "Bebas Neue", body: "DM Sans" },
      { heading: "Syne", body: "Space Mono" },
    ],
  },
  retro: {
    label: "Retro",
    description: "Vintage typographic feel",
    accent: "#10b981",
    pairings: [
      { heading: "Syne", body: "IBM Plex Serif", featured: true },
      { heading: "Syne", body: "Lato" },
      { heading: "IBM Plex Serif", body: "DM Sans" },
    ],
  },
};

export const VIBE_KEYS = Object.keys(VIBES) as Vibe[];
