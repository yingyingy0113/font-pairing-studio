import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Font Studio — Find Your Perfect Pairing",
  description: "Discover beautiful Google Font pairings for your next project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Batch 1: Editorial, Minimal, Romantic */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Playfair+Display+SC:wght@400;700&family=DM+Sans:ital,wght@0,400;0,500;0,700&family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@300;400;600&family=Lato:wght@300;400&family=EB+Garamond:wght@400;600&family=Karla:wght@400;500&family=Merriweather:wght@300;400&family=Spectral:wght@300;400;600&family=Mulish:wght@400;500;600&family=Libre+Baskerville:wght@400;700&family=Crimson+Pro:wght@400;600&family=Lora:wght@400;600&family=Raleway:wght@300;400;600&family=Gilda+Display&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {/* Batch 2: Playful, Bold */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600&family=Nunito+Sans:wght@400;600&family=Righteous&family=Quicksand:wght@400;600&family=Pacifico&family=Baloo+2:wght@400;600;700&family=Comfortaa:wght@400;600;700&family=Varela+Round&family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Anton&family=Black+Han+Sans&family=Oswald:wght@400;600;700&family=Source+Sans+3:wght@300;400;600&family=Teko:wght@400;500;600&family=Hind:wght@400;500;600&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Batch 3: Retro, Newspaper, Typewriter, Gothic */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=IBM+Plex+Serif:wght@300;400&family=IBM+Plex+Mono:wght@400;700&family=Josefin+Sans:wght@300;400;600&family=Cardo:wght@400;700&family=Abril+Fatface&family=Alfa+Slab+One&family=Plus+Jakarta+Sans:wght@400;600&family=Outfit:wght@300;400;600&family=Manrope:wght@400;500;600;700&family=Unna:wght@400;700&family=PT+Sans:wght@400;700&family=PT+Serif:wght@400;700&family=Libre+Franklin:wght@400;500&family=Courier+Prime:wght@400;700&family=Special+Elite&family=Cutive+Mono&family=Inconsolata:wght@400;600&family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=Almendra:wght@400;700&family=Crimson+Text:wght@400;600&family=UnifrakturMaguntia&family=Sorts+Mill+Goudy:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
