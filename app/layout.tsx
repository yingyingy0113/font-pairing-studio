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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500&family=Fredoka+One&family=Nunito:wght@400;600&family=Cormorant+Garamond:wght@300;400;600&family=Lato:wght@300;400&family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&family=IBM+Plex+Serif:wght@300;400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
