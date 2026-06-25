export type Vibe =
  | "editorial"
  | "minimal"
  | "playful"
  | "romantic"
  | "bold"
  | "retro"
  | "newspaper"
  | "gothic"
  | "typewriter";

export interface Pairing {
  heading: string;
  body: string;
  featured?: boolean;
  tags: string[];
  keywords: string[];
  description: string;
}

// Keep legacy alias so existing imports of FontPairing still compile
export type FontPairing = Pairing;

export interface VibeData {
  label: string;
  emoji: string;
  accent: string;
  description: string;
  pairings: Pairing[];
}

export const VIBES: Record<Vibe, VibeData> = {
  editorial: {
    label: "Editorial",
    emoji: "📰",
    description: "Classic magazine elegance",
    accent: "#f59e0b",
    pairings: [
      {
        heading: "Playfair Display",
        body: "DM Sans",
        featured: true,
        tags: ["editorial", "magazine", "elegant"],
        keywords: [
          "editorial", "magazine", "newspaper", "fashion", "vogue", "elegant",
          "serif", "classic", "refined", "high-end", "luxury", "print", "journal",
        ],
        description: "Regal serif meets clean geometric sans",
      },
      {
        heading: "Libre Baskerville",
        body: "Source Sans Pro",
        tags: ["editorial", "print", "refined"],
        keywords: [
          "editorial", "magazine", "print", "journal", "refined", "classic",
          "newspaper", "elegant", "literary", "academic", "scholarly",
        ],
        description: "Traditional Baskerville with a modern body companion",
      },
      {
        heading: "EB Garamond",
        body: "Karla",
        tags: ["editorial", "luxury", "fashion"],
        keywords: [
          "editorial", "fashion", "luxury", "vogue", "high-end", "elegant",
          "garamond", "renaissance", "humanist", "refined", "magazine",
        ],
        description: "Renaissance elegance with a contemporary body",
      },
      {
        heading: "Merriweather",
        body: "Inter",
        tags: ["editorial", "digital", "crisp"],
        keywords: [
          "editorial", "digital", "crisp", "warm", "serif", "magazine", "readable",
          "clean", "modern", "blog", "journalism", "web",
        ],
        description: "Warm serif meets crisp digital",
      },
      {
        heading: "Spectral",
        body: "Mulish",
        tags: ["editorial", "literary", "refined"],
        keywords: [
          "editorial", "literary", "refined", "magazine", "elegant", "serif",
          "book", "reading", "scholarly", "classical", "clean",
        ],
        description: "Literary and refined",
      },
    ],
  },

  minimal: {
    label: "Minimal",
    emoji: "◻️",
    description: "Clean weight contrast",
    accent: "#6366f1",
    pairings: [
      {
        heading: "Inter",
        body: "Inter",
        featured: true,
        tags: ["minimal", "clean", "modern"],
        keywords: [
          "minimal", "clean", "simple", "modern", "swiss", "corporate", "tech",
          "startup", "ui", "app", "sans-serif", "contemporary", "flat",
        ],
        description: "The gold standard of UI typography",
      },
      {
        heading: "Plus Jakarta Sans",
        body: "Plus Jakarta Sans",
        tags: ["minimal", "corporate", "swiss"],
        keywords: [
          "minimal", "corporate", "startup", "product", "app", "tech",
          "clean", "modern", "contemporary", "sans-serif", "neutral",
        ],
        description: "Geometric precision with friendly warmth",
      },
      {
        heading: "Outfit",
        body: "Outfit",
        tags: ["minimal", "modern", "tech"],
        keywords: [
          "minimal", "clean", "modern", "tech", "startup", "ui", "interface",
          "contemporary", "swiss", "product", "flat", "digital",
        ],
        description: "Versatile geometric sans for digital products",
      },
      {
        heading: "DM Sans",
        body: "DM Sans",
        tags: ["minimal", "hierarchy", "clean"],
        keywords: [
          "minimal", "hierarchy", "clean", "modern", "sans-serif", "product", "ui",
          "tech", "neutral", "swiss", "flat", "contemporary",
        ],
        description: "One family, pure hierarchy",
      },
      {
        heading: "Manrope",
        body: "Manrope",
        tags: ["minimal", "geometric", "balanced"],
        keywords: [
          "minimal", "geometric", "balanced", "modern", "clean", "sans-serif",
          "startup", "app", "product", "tech", "ui", "neutral",
        ],
        description: "Geometric and balanced",
      },
    ],
  },

  playful: {
    label: "Playful",
    emoji: "🎉",
    description: "Fun and expressive",
    accent: "#ec4899",
    pairings: [
      {
        heading: "Fredoka One",
        body: "Nunito",
        featured: true,
        tags: ["playful", "fun", "bubbly"],
        keywords: [
          "playful", "fun", "happy", "kids", "bubbly", "friendly", "casual",
          "cheerful", "party", "celebration", "game", "colorful", "youthful",
        ],
        description: "Rounded and friendly from title to body",
      },
      {
        heading: "Righteous",
        body: "Quicksand",
        tags: ["playful", "kids", "colorful"],
        keywords: [
          "playful", "fun", "kids", "bubbly", "youthful", "casual",
          "cheerful", "game", "colorful", "friendly", "happy", "soft",
        ],
        description: "Retro flair meets soft geometric body",
      },
      {
        heading: "Pacifico",
        body: "Poppins",
        tags: ["playful", "casual", "friendly"],
        keywords: [
          "playful", "casual", "fun", "friendly", "surf", "beach", "script",
          "youthful", "cheerful", "bubbly", "colorful", "celebration",
        ],
        description: "Script warmth paired with geometric clarity",
      },
      {
        heading: "Baloo 2",
        body: "Nunito Sans",
        tags: ["playful", "round", "energetic"],
        keywords: [
          "playful", "round", "energetic", "fun", "kids", "bubbly", "friendly",
          "cheerful", "casual", "colorful", "game", "happy",
        ],
        description: "Round and energetic",
      },
      {
        heading: "Comfortaa",
        body: "Varela Round",
        tags: ["playful", "soft", "approachable"],
        keywords: [
          "playful", "soft", "approachable", "friendly", "round", "casual",
          "kids", "fun", "bubbly", "cheerful", "happy", "colorful",
        ],
        description: "Soft and approachable",
      },
    ],
  },

  romantic: {
    label: "Romantic",
    emoji: "🌸",
    description: "Soft and refined",
    accent: "#e879f9",
    pairings: [
      {
        heading: "Cormorant Garamond",
        body: "Lato",
        featured: true,
        tags: ["romantic", "wedding", "elegant"],
        keywords: [
          "romantic", "wedding", "love", "feminine", "soft", "delicate", "bridal",
          "floral", "garden", "whimsical", "gentle", "graceful",
        ],
        description: "Delicate serif elegance with airy body text",
      },
      {
        heading: "Gilda Display",
        body: "Raleway",
        tags: ["romantic", "soft", "feminine"],
        keywords: [
          "romantic", "feminine", "soft", "wedding", "delicate", "graceful",
          "bridal", "floral", "gentle", "whimsical", "love", "garden",
        ],
        description: "Refined display with elegant geometric body",
      },
      {
        heading: "Playfair Display",
        body: "Jost",
        tags: ["romantic", "elegant", "wedding"],
        keywords: [
          "romantic", "wedding", "elegant", "love", "feminine", "soft",
          "luxury", "bridal", "graceful", "refined", "classic",
        ],
        description: "Timeless serif romance with a modern companion",
      },
      {
        heading: "Libre Baskerville",
        body: "Crimson Pro",
        tags: ["romantic", "classic", "serif"],
        keywords: [
          "romantic", "classic", "serif", "love", "elegant", "literary",
          "wedding", "feminine", "graceful", "refined", "bridal", "delicate",
        ],
        description: "Classic romance in serif",
      },
      {
        heading: "Sorts Mill Goudy",
        body: "Lato",
        tags: ["romantic", "refined", "timeless"],
        keywords: [
          "romantic", "refined", "timeless", "elegant", "classic", "literary",
          "feminine", "graceful", "delicate", "wedding", "love", "bridal",
        ],
        description: "Refined and timeless",
      },
    ],
  },

  bold: {
    label: "Bold",
    emoji: "💥",
    description: "Strong and impactful",
    accent: "#ef4444",
    pairings: [
      {
        heading: "Bebas Neue",
        body: "Space Mono",
        featured: true,
        tags: ["bold", "impact", "streetwear"],
        keywords: [
          "bold", "strong", "impact", "streetwear", "sports", "powerful", "loud",
          "attention", "headline", "poster", "graphic", "masculine", "heavy",
        ],
        description: "Maximum impact display with techy mono body",
      },
      {
        heading: "Black Han Sans",
        body: "IBM Plex Mono",
        tags: ["bold", "strong", "graphic"],
        keywords: [
          "bold", "heavy", "strong", "graphic", "poster", "headline", "impact",
          "streetwear", "masculine", "powerful", "loud", "attention",
        ],
        description: "Ultra-heavy sans with structured mono body",
      },
      {
        heading: "Anton",
        body: "Roboto",
        tags: ["bold", "poster", "masculine"],
        keywords: [
          "bold", "poster", "masculine", "impact", "headline", "sports",
          "powerful", "strong", "graphic", "heavy", "advertisement", "loud",
        ],
        description: "Condensed poster power meets neutral clarity",
      },
      {
        heading: "Oswald",
        body: "Source Sans 3",
        tags: ["bold", "condensed", "powerful"],
        keywords: [
          "bold", "condensed", "powerful", "strong", "headline", "poster", "impact",
          "sports", "masculine", "graphic", "heavy", "advertisement",
        ],
        description: "Condensed power",
      },
      {
        heading: "Teko",
        body: "Hind",
        tags: ["bold", "devanagari", "impact"],
        keywords: [
          "bold", "devanagari", "impact", "headline", "strong", "powerful",
          "graphic", "poster", "heavy", "condensed", "sports", "masculine",
        ],
        description: "Indian-influenced bold",
      },
    ],
  },

  retro: {
    label: "Retro",
    emoji: "🕰️",
    description: "Vintage typographic feel",
    accent: "#10b981",
    pairings: [
      {
        heading: "Syne",
        body: "IBM Plex Serif",
        featured: true,
        tags: ["retro", "vintage", "70s"],
        keywords: [
          "retro", "vintage", "70s", "80s", "nostalgic", "warm", "old",
          "classic", "throwback", "analog", "film", "groovy",
        ],
        description: "Geometric display with an editorial serif body",
      },
      {
        heading: "Josefin Sans",
        body: "Cardo",
        tags: ["retro", "nostalgic", "warm"],
        keywords: [
          "retro", "vintage", "nostalgic", "art deco", "20s", "30s", "warm",
          "classic", "throwback", "analog", "film", "geometric",
        ],
        description: "Art-deco geometry with classical body type",
      },
      {
        heading: "DM Serif Display",
        body: "Jost",
        tags: ["retro", "groovy", "editorial"],
        keywords: [
          "retro", "groovy", "70s", "vintage", "warm", "nostalgic", "analog",
          "film", "throwback", "serif", "editorial", "classic",
        ],
        description: "High-contrast serif with clean modern body",
      },
      {
        heading: "Abril Fatface",
        body: "Poppins",
        tags: ["retro", "maximalist", "headline"],
        keywords: [
          "retro", "maximalist", "headline", "vintage", "bold", "nostalgic",
          "70s", "warm", "graphic", "poster", "groovy", "classic",
        ],
        description: "Maximalist retro headline",
      },
      {
        heading: "Alfa Slab One",
        body: "Lora",
        tags: ["retro", "slab", "editorial"],
        keywords: [
          "retro", "slab", "editorial", "heavy", "vintage", "nostalgic",
          "serif", "warm", "analog", "throwback", "classic", "bold",
        ],
        description: "Heavy slab meets flowing serif",
      },
    ],
  },

  newspaper: {
    label: "Newspaper",
    emoji: "🗞️",
    description: "Old broadsheet gravitas",
    accent: "#8B7355",
    pairings: [
      {
        heading: "Unna",
        body: "PT Sans",
        featured: true,
        tags: ["newspaper", "print", "journalism"],
        keywords: [
          "newspaper", "print", "journalism", "broadsheet", "gazette", "press",
          "ink", "printed", "tabloid", "editorial", "column", "article", "news",
          "vintage newspaper", "old paper", "typewriter adjacent",
        ],
        description: "Workhorse newsprint serif with a reliable sans",
      },
      {
        heading: "Libre Baskerville",
        body: "Libre Franklin",
        tags: ["newspaper", "broadsheet", "editorial"],
        keywords: [
          "newspaper", "broadsheet", "gazette", "editorial", "journalism",
          "press", "print", "news", "column", "article", "ink", "printed",
          "tabloid", "old paper", "vintage newspaper",
        ],
        description: "Classic broadsheet pairing, born for columns",
      },
      {
        heading: "Playfair Display SC",
        body: "Source Serif Pro",
        tags: ["newspaper", "vintage", "print"],
        keywords: [
          "newspaper", "vintage newspaper", "old paper", "print", "gazette",
          "broadsheet", "editorial", "press", "ink", "journalism", "column",
          "tabloid", "news", "printed", "typewriter adjacent", "retro print",
        ],
        description: "Small-caps grandeur with authoritative body serif",
      },
      {
        heading: "Playfair Display SC",
        body: "PT Serif",
        tags: ["newspaper", "broadsheet", "authority"],
        keywords: [
          "newspaper", "broadsheet", "authority", "classic", "print", "gazette",
          "editorial", "journalism", "press", "ink", "news", "column",
        ],
        description: "Classic broadsheet authority",
      },
      {
        heading: "Lora",
        body: "Source Sans 3",
        tags: ["newspaper", "modern", "editorial"],
        keywords: [
          "newspaper", "modern", "editorial", "journalism", "print", "news",
          "article", "column", "broadsheet", "press", "readable", "clean",
        ],
        description: "Modern editorial grace",
      },
    ],
  },

  gothic: {
    label: "Gothic",
    emoji: "🖤",
    description: "Dark and dramatic blackletter",
    accent: "#6B6B8A",
    pairings: [
      {
        heading: "UnifrakturMaguntia",
        body: "IM Fell English",
        featured: true,
        tags: ["gothic", "dark", "blackletter"],
        keywords: [
          "gothic", "dark", "medieval", "blackletter", "mysterious", "horror",
          "witch", "fantasy", "ancient", "manuscript", "dramatic", "occult",
        ],
        description: "Fraktur blackletter with antique English body",
      },
      {
        heading: "Cinzel",
        body: "Cormorant Garamond",
        tags: ["gothic", "medieval", "mysterious"],
        keywords: [
          "gothic", "medieval", "ancient", "roman", "classical", "dramatic",
          "mysterious", "fantasy", "dark", "occult", "manuscript", "historical",
        ],
        description: "Roman inscriptions meet Renaissance elegance",
      },
      {
        heading: "IM Fell English",
        body: "Libre Baskerville",
        tags: ["gothic", "vintage", "dramatic"],
        keywords: [
          "gothic", "dark", "vintage", "dramatic", "mysterious", "historical",
          "antique", "manuscript", "horror", "fantasy", "literary", "occult",
        ],
        description: "Fell type irregularity with classical body",
      },
      {
        heading: "Cinzel Decorative",
        body: "IM Fell English",
        tags: ["gothic", "ceremonial", "ancient"],
        keywords: [
          "gothic", "ceremonial", "ancient", "dark", "fantasy", "medieval",
          "dramatic", "occult", "mysterious", "historical", "manuscript", "horror",
        ],
        description: "Ceremonial and ancient",
      },
      {
        heading: "Almendra",
        body: "Crimson Text",
        tags: ["gothic", "fantasy", "manuscript"],
        keywords: [
          "gothic", "fantasy", "manuscript", "dark", "medieval", "mysterious",
          "occult", "horror", "ancient", "blackletter", "dramatic", "historical",
        ],
        description: "Dark fantasy manuscript",
      },
    ],
  },

  typewriter: {
    label: "Typewriter",
    emoji: "⌨️",
    description: "Literary, worn, and analog",
    accent: "#8B6914",
    pairings: [
      {
        heading: "Courier Prime",
        body: "Lato",
        featured: true,
        tags: ["typewriter", "vintage", "printed"],
        keywords: [
          "typewriter", "vintage", "printed", "retro", "literary", "manuscript",
          "writer", "author", "old machine", "worn", "aged", "paper", "ink",
          "analog", "journalism", "noir", "detective",
        ],
        description: "Classic courier elegance with a clean modern body",
      },
      {
        heading: "Special Elite",
        body: "Merriweather",
        tags: ["typewriter", "retro", "literary"],
        keywords: [
          "typewriter", "retro", "literary", "worn", "aged", "paper", "ink",
          "analog", "journalism", "noir", "detective", "manuscript", "writer",
          "vintage", "printed", "old machine",
        ],
        description: "Worn typeface texture meets legible editorial body",
      },
      {
        heading: "Cutive Mono",
        body: "PT Serif",
        tags: ["typewriter", "literary", "analog"],
        keywords: [
          "typewriter", "analog", "literary", "manuscript", "author", "vintage",
          "printed", "ink", "worn", "aged", "paper", "noir", "detective",
          "retro", "journalist", "old machine",
        ],
        description: "Mono typewriter aesthetic with a refined serif body",
      },
      {
        heading: "Courier Prime",
        body: "EB Garamond",
        tags: ["typewriter", "vintage", "literary"],
        keywords: [
          "typewriter", "vintage", "literary", "worn", "aged", "manuscript",
          "analog", "noir", "detective", "writer", "author", "ink", "paper",
        ],
        description: "Vintage meets literary",
      },
      {
        heading: "Inconsolata",
        body: "Merriweather",
        tags: ["typewriter", "mono", "warm"],
        keywords: [
          "typewriter", "mono", "warm", "literary", "precision", "analog",
          "vintage", "ink", "paper", "manuscript", "writer", "noir",
        ],
        description: "Mono precision, warm body",
      },
    ],
  },
};

export const VIBE_KEYS = Object.keys(VIBES) as Vibe[];
