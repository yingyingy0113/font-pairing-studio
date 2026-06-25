"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { VIBES, Vibe, VIBE_KEYS } from "@/data/pairings";

// ──────────────────────────────────────────────────────────────────────────────
// Mini copy button used in the code section
// ──────────────────────────────────────────────────────────────────────────────
function CopyBtn({ text, accent }: { text: string; accent: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      style={{
        backgroundColor: copied ? "#10b981" : "transparent",
        borderColor: copied ? "#10b981" : accent,
        color: copied ? "#fff" : accent,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        padding: "4px 12px",
        borderRadius: "8px",
        border: "1px solid",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────────────────────────
export default function PairingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  // ── Dark mode ──────────────────────────────────────────────────────────────
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("font-studio-dark");
      if (saved !== null) setIsDark(saved === "true");
    } catch {/* ignore */}
  }, []);
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    try { localStorage.setItem("font-studio-dark", String(next)); } catch {/* ignore */}
  };

  // ── Parse slug → vibe + index ─────────────────────────────────────────────
  const parsed = (() => {
    if (!slug) return null;
    // slug = "{vibe}-{index}"  — vibe may contain hyphens (none currently, but safe)
    const lastDash = slug.lastIndexOf("-");
    if (lastDash === -1) return null;
    const vibeKey = slug.slice(0, lastDash) as Vibe;
    const idx = parseInt(slug.slice(lastDash + 1), 10);
    if (!VIBE_KEYS.includes(vibeKey) || isNaN(idx)) return null;
    const vibeData = VIBES[vibeKey];
    if (idx < 0 || idx >= vibeData.pairings.length) return null;
    return { vibeKey, vibeData, pairing: vibeData.pairings[idx], idx };
  })();

  // ── Try-it state ──────────────────────────────────────────────────────────
  const [tryText, setTryText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // ── Colours ───────────────────────────────────────────────────────────────
  const pageBg    = isDark ? "#0a0a0a" : "#f5f5f4";
  const surface   = isDark ? "#111111" : "#ffffff";
  const surface2  = isDark ? "#161616" : "#f9fafb";
  const border    = isDark ? "#222222" : "#e5e7eb";
  const textMain  = isDark ? "#fafafa"  : "#0a0a0a";
  const textMuted = isDark ? "#52525b"  : "#9ca3af";
  const textBody  = isDark ? "#a1a1aa"  : "#4b5563";
  const codeBg    = isDark ? "#0f0f0f"  : "#f3f4f6";
  const codeColor = isDark ? "#71717a"  : "#6b7280";

  if (!parsed) {
    return (
      <div style={{ backgroundColor: pageBg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: textMuted }}>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Pairing not found</p>
          <button
            onClick={() => router.push("/")}
            style={{ color: "#f59e0b", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", fontFamily: "'DM Sans', sans-serif" }}
          >
            ← Back to Font Studio
          </button>
        </div>
      </div>
    );
  }

  const { vibeKey, vibeData, pairing, idx } = parsed;
  const accent = vibeData.accent;
  const headingFont = `'${pairing.heading}', serif`;
  const bodyFont    = `'${pairing.body}', sans-serif`;

  // Other pairings from same vibe (exclude current)
  const otherPairings = vibeData.pairings
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => i !== idx)
    .slice(0, 2);

  // CSS code snippets
  const cssVars = `:root {
  --font-heading: '${pairing.heading}', serif;
  --font-body: '${pairing.body}', sans-serif;
}`;

  const tailwindSnippet = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ["${pairing.heading}", "serif"],
        body: ["${pairing.body}", "sans-serif"],
      },
    },
  },
};`;

  const gfLink = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(pairing.heading).replace(/%20/g, "+")}:wght@400;700&family=${encodeURIComponent(pairing.body).replace(/%20/g, "+")}:wght@400;600&display=swap"
  rel="stylesheet"
/>`;

  // ── Shared section styles ─────────────────────────────────────────────────
  const sectionLabel = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: accent,
    marginBottom: "1.5rem",
  };

  const dividerStyle = {
    borderTop: `1px solid ${border}`,
    margin: "3rem 0",
  };

  return (
    <div
      style={{
        backgroundColor: pageBg,
        minHeight: "100vh",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Ambient blob */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background: `radial-gradient(ellipse at center, ${accent}14 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1.5rem 6rem",
        }}
      >
        {/* ── Nav bar ─────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              background: "none",
              border: `1px solid ${border}`,
              borderRadius: "10px",
              padding: "8px 16px",
              cursor: "pointer",
              color: textMuted,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              transition: "color 0.2s, border-color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = textMain;
              (e.currentTarget as HTMLButtonElement).style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = textMuted;
              (e.currentTarget as HTMLButtonElement).style.borderColor = border;
            }}
          >
            ← Back
          </button>

          <button
            onClick={toggleDark}
            style={{
              background: "none",
              border: `1px solid ${border}`,
              borderRadius: "10px",
              padding: "8px 16px",
              cursor: "pointer",
              color: textMuted,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = textMain;
              (e.currentTarget as HTMLButtonElement).style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = textMuted;
              (e.currentTarget as HTMLButtonElement).style.borderColor = border;
            }}
          >
            {isDark ? "☀ Light" : "☾ Dark"}
          </button>
        </div>

        {/* ── Hero: font names ─────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              color: textMain,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            {pairing.heading}
            <span style={{ color: accent, margin: "0 0.5rem", fontFamily: "'DM Sans', sans-serif" }}>×</span>
            <span style={{ fontFamily: bodyFont }}>{pairing.body}</span>
          </h1>

          <p
            style={{
              fontFamily: bodyFont,
              color: textBody,
              fontSize: "1.05rem",
              fontStyle: "italic",
              marginTop: "0.75rem",
            }}
          >
            {pairing.description}
          </p>

          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1.25rem", flexWrap: "wrap" }}>
            <span
              style={{
                backgroundColor: accent + "22",
                color: accent,
                borderColor: accent + "44",
                border: "1px solid",
                borderRadius: "999px",
                padding: "4px 14px",
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: bodyFont,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: accent, display: "inline-block" }} />
              {vibeData.emoji} {vibeData.label}
            </span>
            {pairing.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: isDark ? "#1f1f1f" : "#f3f4f6",
                  color: textMuted,
                  borderRadius: "999px",
                  padding: "4px 12px",
                  fontSize: "0.72rem",
                  fontFamily: bodyFont,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={dividerStyle} />

        {/* ── Try it yourself ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: "0.5rem" }}>
          <p style={sectionLabel}>Try it yourself</p>

          <textarea
            ref={textareaRef}
            value={tryText}
            onChange={(e) => setTryText(e.target.value)}
            placeholder="Type your sentence here…"
            style={{
              width: "100%",
              minHeight: "120px",
              backgroundColor: surface,
              border: `1px solid ${border}`,
              borderRadius: "14px",
              padding: "1rem 1.25rem",
              color: textMain,
              fontFamily: bodyFont,
              fontSize: "1.05rem",
              lineHeight: 1.6,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = accent; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = border; }}
          />

          {tryText && (
            <div style={{ marginTop: "2rem" }}>
              <p
                style={{
                  fontFamily: headingFont,
                  fontSize: "64px",
                  color: textMain,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                  wordBreak: "break-word",
                }}
              >
                {tryText}
              </p>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: "24px",
                  color: textBody,
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                }}
              >
                {tryText}
              </p>
            </div>
          )}
        </section>

        <div style={dividerStyle} />

        {/* ── Preview ─────────────────────────────────────────────────────── */}
        <section>
          <p style={sectionLabel}>Preview</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            {/* Left: heading sizes */}
            <div>
              {[72, 48, 32, 24].map((size) => (
                <p
                  key={size}
                  style={{
                    fontFamily: headingFont,
                    fontSize: `${size}px`,
                    color: textMain,
                    lineHeight: 1.1,
                    marginBottom: "1rem",
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              ))}
            </div>

            {/* Right: body sizes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: "18px",
                  color: textBody,
                  lineHeight: 1.7,
                }}
              >
                Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
              </p>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: "14px",
                  color: textBody,
                  lineHeight: 1.6,
                }}
              >
                Good typography is invisible. It guides the reader effortlessly through the content without drawing attention to itself. The best pairings create harmony — the heading sets the tone, the body sustains it. Together they tell a visual story before a single word is read.
              </p>
            </div>
          </div>
        </section>

        <div style={dividerStyle} />

        {/* ── Get the code ─────────────────────────────────────────────────── */}
        <section>
          <p style={sectionLabel}>Get the code</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* CSS Variables */}
            <div
              style={{
                backgroundColor: surface2,
                border: `1px solid ${border}`,
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderBottom: `1px solid ${border}`,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: textMuted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>CSS Variables</span>
                <CopyBtn text={cssVars} accent={accent} />
              </div>
              <pre style={{ backgroundColor: codeBg, color: codeColor, padding: "1rem 1.25rem", margin: 0, fontSize: "0.8rem", fontFamily: "monospace", lineHeight: 1.7, overflowX: "auto" }}>
                {cssVars}
              </pre>
            </div>

            {/* Tailwind config */}
            <div
              style={{
                backgroundColor: surface2,
                border: `1px solid ${border}`,
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderBottom: `1px solid ${border}`,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: textMuted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Tailwind Config</span>
                <CopyBtn text={tailwindSnippet} accent={accent} />
              </div>
              <pre style={{ backgroundColor: codeBg, color: codeColor, padding: "1rem 1.25rem", margin: 0, fontSize: "0.8rem", fontFamily: "monospace", lineHeight: 1.7, overflowX: "auto" }}>
                {tailwindSnippet}
              </pre>
            </div>

            {/* Google Fonts link */}
            <div
              style={{
                backgroundColor: surface2,
                border: `1px solid ${border}`,
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderBottom: `1px solid ${border}`,
                }}
              >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: textMuted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Google Fonts Import</span>
                <CopyBtn text={gfLink} accent={accent} />
              </div>
              <pre style={{ backgroundColor: codeBg, color: codeColor, padding: "1rem 1.25rem", margin: 0, fontSize: "0.8rem", fontFamily: "monospace", lineHeight: 1.7, overflowX: "auto" }}>
                {gfLink}
              </pre>
            </div>
          </div>
        </section>

        <div style={dividerStyle} />

        {/* ── More from this vibe ───────────────────────────────────────────── */}
        {otherPairings.length > 0 && (
          <section>
            <p style={sectionLabel}>More from {vibeData.label}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {otherPairings.map(({ p, i }) => (
                <a
                  key={i}
                  href={`/pairing/${vibeKey}-${i}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      backgroundColor: surface,
                      border: `1px solid ${border}`,
                      borderRadius: "14px",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = accent + "88";
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = border;
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                    }}
                  >
                    <p
                      style={{
                        fontFamily: `'${p.heading}', serif`,
                        fontSize: "1.5rem",
                        color: textMain,
                        lineHeight: 1.15,
                        marginBottom: "0.4rem",
                      }}
                    >
                      The quick brown fox
                    </p>
                    <p
                      style={{
                        fontFamily: `'${p.body}', sans-serif`,
                        fontSize: "0.85rem",
                        color: textBody,
                        lineHeight: 1.5,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {p.description}
                    </p>
                    <p style={{ fontFamily: `'${p.body}', sans-serif`, fontSize: "0.7rem", color: textMuted }}>
                      {p.heading} / {p.body}
                    </p>
                    <p
                      style={{
                        fontFamily: `'${p.body}', sans-serif`,
                        fontSize: "0.7rem",
                        color: accent,
                        fontWeight: 600,
                        marginTop: "0.5rem",
                      }}
                    >
                      → Explore
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
