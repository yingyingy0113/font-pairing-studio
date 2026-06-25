"use client";

import { FontPairing } from "@/data/pairings";
import CopyButton from "./CopyButton";

interface PairingCardProps {
  pairing: FontPairing;
  index: number;
  headingSize: number;
  bodySize: number;
  lineHeight: number;
  accent: string;
  isDark: boolean;
}

export default function PairingCard({
  pairing,
  index,
  headingSize,
  bodySize,
  lineHeight,
  accent,
  isDark,
}: PairingCardProps) {
  const cssOutput = `:root {
  --font-heading: '${pairing.heading}', serif;
  --font-body: '${pairing.body}', sans-serif;
  --font-size-base: ${bodySize}px;
  --line-height-base: ${lineHeight};
}`;

  const cardBg = isDark ? "#141414" : "#ffffff";
  const borderColor = isDark ? "#222" : "#e5e7eb";
  const mutedColor = isDark ? "#52525b" : "#9ca3af";
  const textColor = isDark ? "#f4f4f5" : "#111827";
  const bodyTextColor = isDark ? "#a1a1aa" : "#4b5563";
  const tagBg = isDark ? "#1f1f1f" : "#f3f4f6";

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderColor: borderColor,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      className="relative rounded-2xl border p-7 flex flex-col gap-5 group hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Top row: tag + featured badge */}
      <div className="flex items-center justify-between">
        <span
          style={{ backgroundColor: tagBg, color: mutedColor }}
          className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
        >
          Option {index + 1}
        </span>
        {pairing.featured && (
          <span
            style={{ backgroundColor: accent + "22", color: accent, borderColor: accent + "44" }}
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
          >
            ★ Featured
          </span>
        )}
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
          fontFamily: `'${pairing.body}', sans-serif`,
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

      {/* Font names */}
      <p style={{ color: mutedColor }} className="text-xs font-mono tracking-wide">
        {pairing.heading} / {pairing.body}
      </p>

      {/* CSS preview */}
      <pre
        style={{
          backgroundColor: isDark ? "#0f0f0f" : "#f9fafb",
          color: isDark ? "#71717a" : "#6b7280",
          borderColor: borderColor,
        }}
        className="text-xs rounded-xl p-3 border overflow-x-auto font-mono leading-relaxed"
      >
        {cssOutput}
      </pre>

      {/* Copy button */}
      <CopyButton css={cssOutput} accent={accent} />
    </div>
  );
}
