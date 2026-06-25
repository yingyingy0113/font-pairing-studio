"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import VibePicker from "@/components/VibePicker";
import PairingCard from "@/components/PairingCard";
import SettingsPanel from "@/components/SettingsPanel";
import SearchInput from "@/components/SearchInput";
import { Vibe, VIBES } from "@/data/pairings";
import { getAllPairings, searchPairings } from "@/lib/search";

const ALL_PAIRINGS = getAllPairings();

export default function Home() {
  const [selectedVibe, setSelectedVibe] = useState<Vibe>("editorial");
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [isDark, setIsDark] = useState(true);
  const [query, setQuery] = useState("");

  // Dynamically load fonts for ALL pairings in the current vibe (or search results)
  useEffect(() => {
    const pairings = VIBES[selectedVibe].pairings;
    const families = new Set<string>();
    pairings.forEach(p => {
      families.add(p.heading.replace(/ /g, "+") + ":wght@300;400;600;700");
      families.add(p.body.replace(/ /g, "+") + ":wght@300;400;600;700");
    });
    const url = `https://fonts.googleapis.com/css2?${[...families].map(f => `family=${f}`).join("&")}&display=swap`;
    const id = `font-vibe-${selectedVibe}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = id;
      link.href = url;
      document.head.appendChild(link);
    }
  }, [selectedVibe]);

  // Debounce the search query so we don't recompute on every keystroke
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 200);
  }, []);

  const searchResults = useMemo(
    () => searchPairings(debouncedQuery, ALL_PAIRINGS),
    [debouncedQuery]
  );

  const isSearching = debouncedQuery.trim().length > 0;

  const vibeData = VIBES[selectedVibe];
  const pageBg = isDark ? "#0a0a0a" : "#f5f5f4";
  const headingColor = isDark ? "#fafafa" : "#0a0a0a";
  const subColor = isDark ? "#52525b" : "#9ca3af";
  const dividerColor = isDark ? "#1a1a1a" : "#e5e7eb";
  const accentColor = isSearching ? "#f59e0b" : vibeData.accent;

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
          background: `radial-gradient(ellipse at center, ${accentColor}18 0%, transparent 70%)`,
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
                backgroundColor: accentColor,
                borderRadius: "50%",
                display: "inline-block",
                boxShadow: `0 0 12px ${accentColor}`,
                transition: "background-color 0.4s, box-shadow 0.4s",
              }}
            />
            <span
              style={{
                color: accentColor,
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

        {/* Search input */}
        <SearchInput
          query={query}
          onChange={handleQueryChange}
          isDark={isDark}
          accentColor={accentColor}
          resultCount={searchResults.length}
        />

        {/* --- SEARCH MODE --- */}
        {isSearching ? (
          <>
            {/* Search results header */}
            <div className="text-center mb-10">
              {searchResults.length > 0 ? (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: subColor,
                    letterSpacing: "0.05em",
                    transition: "color 0.4s",
                  }}
                >
                  <span style={{ color: accentColor, fontWeight: 600 }}>
                    {searchResults.length}
                  </span>{" "}
                  pairing{searchResults.length !== 1 ? "s" : ""} found for{" "}
                  <span style={{ color: headingColor }}>&quot;{debouncedQuery}&quot;</span>
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: subColor,
                  }}
                >
                  No matches — try{" "}
                  <span style={{ color: accentColor }}>&apos;vintage&apos;</span>,{" "}
                  <span style={{ color: accentColor }}>&apos;bold&apos;</span>, or{" "}
                  <span style={{ color: accentColor }}>&apos;minimal&apos;</span>
                </p>
              )}
            </div>

            {/* Divider */}
            <div
              style={{ borderColor: dividerColor }}
              className="border-t mb-10 transition-colors duration-300"
            />

            {/* Results grid */}
            {searchResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {searchResults.map((pairing, i) => (
                  <PairingCard
                    key={`search-${pairing.vibe}-${pairing.heading}-${i}`}
                    pairing={pairing}
                    index={i}
                    headingSize={headingSize}
                    bodySize={bodySize}
                    lineHeight={lineHeight}
                    accent={pairing.accent}
                    isDark={isDark}
                    vibeBadge={`${pairing.vibeEmoji} ${pairing.vibeLabel}`}
                    vibeBadgeAccent={pairing.accent}
                    vibe={pairing.vibe}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* --- BROWSE MODE --- */
          <>
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
                {vibeData.description} — showing {vibeData.pairings.length} curated pairings
              </p>
            </div>

            {/* Divider */}
            <div
              style={{ borderColor: dividerColor }}
              className="border-t mb-10 transition-colors duration-300"
            />

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
                  vibe={selectedVibe}
                />
              ))}
            </div>
          </>
        )}

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
