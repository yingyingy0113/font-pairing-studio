"use client";

import { useState } from "react";
import VibePicker from "@/components/VibePicker";
import PairingCard from "@/components/PairingCard";
import SettingsPanel from "@/components/SettingsPanel";
import { Vibe, VIBES } from "@/data/pairings";

export default function Home() {
  const [selectedVibe, setSelectedVibe] = useState<Vibe>("editorial");
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [isDark, setIsDark] = useState(true);

  const vibeData = VIBES[selectedVibe];
  const pageBg = isDark ? "#0a0a0a" : "#f5f5f4";
  const headingColor = isDark ? "#fafafa" : "#0a0a0a";
  const subColor = isDark ? "#52525b" : "#9ca3af";
  const dividerColor = isDark ? "#1a1a1a" : "#e5e7eb";

  return (
    <div
      style={{
        backgroundColor: pageBg,
        minHeight: "100vh",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Ambient gradient blob */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: `radial-gradient(ellipse at center, ${vibeData.accent}18 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "background 0.6s ease",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-14">
          <div className="mb-3 inline-flex items-center gap-2">
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: vibeData.accent,
                borderRadius: "50%",
                display: "inline-block",
                boxShadow: `0 0 12px ${vibeData.accent}`,
                transition: "background-color 0.4s, box-shadow 0.4s",
              }}
            />
            <span
              style={{
                color: vibeData.accent,
                fontSize: "11px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "color 0.4s",
              }}
            >
              Typography Explorer
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: headingColor,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: "1rem",
              transition: "color 0.4s",
            }}
          >
            Font Studio
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.125rem",
              color: subColor,
              transition: "color 0.4s",
            }}
          >
            Find your perfect pairing
          </p>
        </header>

        {/* Vibe picker */}
        <div className="mb-12">
          <VibePicker
            selected={selectedVibe}
            onChange={setSelectedVibe}
            isDark={isDark}
          />
        </div>

        {/* Vibe description */}
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              color: subColor,
              letterSpacing: "0.05em",
              transition: "color 0.4s",
            }}
          >
            {vibeData.description} — showing 3 curated pairings
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderColor: dividerColor }} className="border-t mb-10 transition-colors duration-300" />

        {/* Pairing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {vibeData.pairings.map((pairing, i) => (
            <PairingCard
              key={`${selectedVibe}-${i}`}
              pairing={pairing}
              index={i}
              headingSize={headingSize}
              bodySize={bodySize}
              lineHeight={lineHeight}
              accent={vibeData.accent}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Settings panel */}
        <SettingsPanel
          headingSize={headingSize}
          bodySize={bodySize}
          lineHeight={lineHeight}
          isDark={isDark}
          onHeadingSize={setHeadingSize}
          onBodySize={setBodySize}
          onLineHeight={setLineHeight}
          onToggleDark={() => setIsDark((d) => !d)}
        />

        {/* Footer */}
        <footer className="text-center mt-16">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: isDark ? "#3f3f46" : "#d1d5db",
              letterSpacing: "0.05em",
            }}
          >
            Powered by Google Fonts · Built with Next.js 14
          </p>
        </footer>
      </div>
    </div>
  );
}
