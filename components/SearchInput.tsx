"use client";

import { useRef } from "react";

interface SearchInputProps {
  query: string;
  onChange: (value: string) => void;
  isDark: boolean;
  accentColor: string;
  resultCount: number;
}

const SUGGESTED_TAGS = [
  "newspaper",
  "vintage",
  "wedding",
  "minimal",
  "bold",
  "gothic",
  "typewriter",
  "playful",
  "retro",
  "editorial",
  "dark",
  "elegant",
];

export default function SearchInput({
  query,
  onChange,
  isDark,
  accentColor,
  resultCount,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const bg = isDark ? "#141414" : "#ffffff";
  const border = isDark ? "#2a2a2a" : "#e5e7eb";
  const textColor = isDark ? "#f4f4f5" : "#111827";
  const placeholderColor = isDark ? "#52525b" : "#9ca3af";
  const tagBg = isDark ? "#1f1f1f" : "#f3f4f6";
  const tagText = isDark ? "#71717a" : "#6b7280";
  const tagHoverBg = accentColor + "22";

  function appendTag(tag: string) {
    const current = query.trim();
    // Avoid duplicating the same tag
    if (current.toLowerCase().includes(tag)) return;
    onChange(current ? `${current}, ${tag}` : tag);
    inputRef.current?.focus();
  }

  return (
    <div className="w-full mb-8">
      {/* Input row */}
      <div
        style={{
          backgroundColor: bg,
          borderColor: border,
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        className="relative flex items-center rounded-2xl border group focus-within:shadow-lg"
        // Dynamic focus ring applied via inline style below — Tailwind can't do dynamic colours
      >
        {/* Focus ring overlay */}
        <style>{`
          .search-wrapper:focus-within {
            border-color: ${accentColor}88 !important;
            box-shadow: 0 0 0 3px ${accentColor}22 !important;
          }
        `}</style>

        {/* Sparkle / search icon */}
        <div className="absolute left-5 pointer-events-none" style={{ color: query ? accentColor : placeholderColor, transition: "color 0.2s" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M11 8v6M8 11h6" strokeWidth="1.8" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your vibe… e.g. 'vintage newspaper, printed, old ink'"
          className="search-wrapper w-full bg-transparent outline-none py-4 pl-14 pr-36 text-base"
          style={{
            color: textColor,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
          }}
          spellCheck={false}
          autoComplete="off"
        />

        {/* Right badge */}
        <div className="absolute right-4 flex items-center gap-2">
          {query && (
            <>
              <span
                style={{
                  backgroundColor: accentColor + "22",
                  color: accentColor,
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
              >
                {resultCount} result{resultCount !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => { onChange(""); inputRef.current?.focus(); }}
                style={{ color: placeholderColor }}
                className="hover:opacity-70 transition-opacity text-lg leading-none"
                aria-label="Clear search"
              >
                ×
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tag suggestion pills */}
      <div className="flex flex-wrap gap-2 mt-3 px-1">
        <span
          style={{ fontFamily: "'DM Sans', sans-serif", color: placeholderColor, fontSize: "0.75rem" }}
          className="self-center mr-1 select-none"
        >
          Try:
        </span>
        {SUGGESTED_TAGS.map((tag) => {
          const isActive = query.toLowerCase().includes(tag);
          return (
            <button
              key={tag}
              onClick={() => appendTag(tag)}
              style={{
                backgroundColor: isActive ? accentColor + "33" : tagBg,
                color: isActive ? accentColor : tagText,
                borderColor: isActive ? accentColor + "66" : "transparent",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background-color 0.15s, color 0.15s",
              }}
              className="text-xs px-3 py-1 rounded-full border cursor-pointer hover:opacity-80 transition-opacity select-none"
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = tagHoverBg;
                  (e.currentTarget as HTMLButtonElement).style.color = accentColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = tagBg;
                  (e.currentTarget as HTMLButtonElement).style.color = tagText;
                }
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
