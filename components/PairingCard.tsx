"use client";

import Link from "next/link";
import { Pairing } from "@/data/pairings";

interface PairingCardProps {
  pairing: Pairing;
  index: number;
  headingSize: number;
  bodySize: number;
  lineHeight: number;
  accent: string;
  isDark: boolean;
  /** When set, shows a small "● VibeLabel" badge in the top-right (search mode) */
  vibeBadge?: string;
  vibeBadgeAccent?: string;
  /** Required for the link — the vibe key e.g. "editorial" */
  vibe: string;
}

export default function PairingCard({
  pairing,
  index,
  headingSize,
  bodySize,
  lineHeight,
  accent,
  isDark,
  vibeBadge,
  vibeBadgeAccent,
  vibe,
}: PairingCardProps) {
  const cardBg = isDark ? "#141414" : "#ffffff";
  const borderColor = isDark ? "#222" : "#e5e7eb";
  const mutedColor = isDark ? "#52525b" : "#9ca3af";
  const textColor = isDark ? "#f4f4f5" : "#111827";
  const bodyTextColor = isDark ? "#a1a1aa" : "#4b5563";
  const tagBg = isDark ? "#1f1f1f" : "#f3f4f6";
  const descriptionColor = isDark ? "#71717a" : "#9ca3af";

  const badgeAccent = vibeBadgeAccent ?? accent;

  // Show at most 3 tags
  const displayTags = pairing.tags.slice(0, 3);

  const bodyFont = `'${pairing.body}', sans-serif`;
  const slug = `${vibe}-${index}`;

  return (
    <Link
      href={`/pairing/${slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor,
          transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
          cursor: "pointer",
        }}
        className="relative rounded-2xl border p-7 flex flex-col gap-5 group hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = accent + "88";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = borderColor;
        }}
      >
        {/* Top row: option label + vibe badge (search) or featured badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            style={{ backgroundColor: tagBg, color: mutedColor, fontFamily: bodyFont }}
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full shrink-0"
          >
            Option {index + 1}
          </span>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {vibeBadge && (
              <span
                style={{
                  backgroundColor: badgeAccent + "22",
                  color: badgeAccent,
                  borderColor: badgeAccent + "44",
                  fontFamily: bodyFont,
                }}
                className="text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 whitespace-nowrap"
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: badgeAccent,
                    display: "inline-block",
                  }}
                />
                {vibeBadge}
              </span>
            )}

            {pairing.featured && !vibeBadge && (
              <span
                style={{
                  backgroundColor: accent + "22",
                  color: accent,
                  borderColor: accent + "44",
                  fontFamily: bodyFont,
                }}
                className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              >
                ★ Featured
              </span>
            )}
          </div>
        </div>

        {/* Heading preview */}
        <div className="flex-1">
          <h2
            style={{
              fontFamily: `'${pairing.heading}', serif`,
              fontSize: `${headingSize}px`,
              color: textColor,
              lineHeight: 1.1,
              transition: "font-size 0.2s ease",
            }}
          >
            The quick brown fox
          </h2>
        </div>

        {/* Body preview */}
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: `${bodySize}px`,
            lineHeight: lineHeight,
            color: bodyTextColor,
            transition: "font-size 0.2s ease, line-height 0.2s ease",
          }}
        >
          Jumps over the lazy dog. Typography is the art and technique of arranging type to make
          written language legible, readable and appealing.
        </p>

        {/* Divider */}
        <div style={{ borderColor: borderColor }} className="border-t" />

        {/* Font names + one-line description */}
        <div className="flex flex-col gap-1">
          <p style={{ color: mutedColor, fontFamily: bodyFont }} className="text-xs font-mono tracking-wide">
            {pairing.heading} / {pairing.body}
          </p>
          {pairing.description && (
            <p
              style={{
                color: descriptionColor,
                fontFamily: bodyFont,
                fontSize: "0.75rem",
                fontStyle: "italic",
              }}
            >
              {pairing.description}
            </p>
          )}
        </div>

        {/* Tag pills + Explore label row */}
        <div className="flex items-center justify-between gap-2">
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: tagBg,
                    color: mutedColor,
                    fontFamily: bodyFont,
                  }}
                  className="text-xs px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Explore label */}
          <span
            style={{
              color: accent,
              fontFamily: bodyFont,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              opacity: 0.8,
              transition: "opacity 0.2s ease",
            }}
            className="ml-auto group-hover:opacity-100"
          >
            → Explore
          </span>
        </div>
      </div>
    </Link>
  );
}
