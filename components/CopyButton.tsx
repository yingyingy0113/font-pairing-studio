"use client";

import { useState } from "react";

interface CopyButtonProps {
  css: string;
  accent: string;
}

export default function CopyButton({ css, accent }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = css;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={
        copied
          ? { backgroundColor: "#10b981", borderColor: "#10b981", color: "#fff" }
          : { backgroundColor: "transparent", borderColor: accent, color: accent }
      }
      className="w-full py-2.5 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-80 cursor-pointer"
    >
      {copied ? "✓ Copied!" : "Copy CSS"}
    </button>
  );
}
