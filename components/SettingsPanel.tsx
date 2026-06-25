"use client";

interface SettingsPanelProps {
  headingSize: number;
  bodySize: number;
  lineHeight: number;
  isDark: boolean;
  onHeadingSize: (v: number) => void;
  onBodySize: (v: number) => void;
  onLineHeight: (v: number) => void;
  onToggleDark: () => void;
}

export default function SettingsPanel({
  headingSize,
  bodySize,
  lineHeight,
  isDark,
  onHeadingSize,
  onBodySize,
  onLineHeight,
  onToggleDark,
}: SettingsPanelProps) {
  const borderColor = isDark ? "#222" : "#e5e7eb";
  const panelBg = isDark ? "#111" : "#f9fafb";
  const labelColor = isDark ? "#71717a" : "#9ca3af";
  const valueColor = isDark ? "#e4e4e7" : "#374151";
  const trackBg = isDark ? "#27272a" : "#e5e7eb";

  const sliderStyle = {
    accentColor: "#f59e0b",
  } as React.CSSProperties;

  return (
    <div
      style={{ backgroundColor: panelBg, borderColor: borderColor }}
      className="rounded-2xl border px-8 py-5 flex flex-wrap gap-6 items-center justify-between transition-colors duration-300"
    >
      {/* Heading size */}
      <div className="flex flex-col gap-1.5 min-w-[160px]">
        <div className="flex justify-between">
          <label style={{ color: labelColor }} className="text-xs font-semibold uppercase tracking-wider">
            Heading Size
          </label>
          <span style={{ color: valueColor }} className="text-xs font-mono font-bold">
            {headingSize}px
          </span>
        </div>
        <input
          type="range"
          min={24}
          max={96}
          value={headingSize}
          onChange={(e) => onHeadingSize(Number(e.target.value))}
          style={{ ...sliderStyle, background: trackBg }}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        />
      </div>

      {/* Body size */}
      <div className="flex flex-col gap-1.5 min-w-[160px]">
        <div className="flex justify-between">
          <label style={{ color: labelColor }} className="text-xs font-semibold uppercase tracking-wider">
            Body Size
          </label>
          <span style={{ color: valueColor }} className="text-xs font-mono font-bold">
            {bodySize}px
          </span>
        </div>
        <input
          type="range"
          min={12}
          max={24}
          value={bodySize}
          onChange={(e) => onBodySize(Number(e.target.value))}
          style={{ ...sliderStyle, background: trackBg }}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        />
      </div>

      {/* Line height */}
      <div className="flex flex-col gap-1.5 min-w-[160px]">
        <div className="flex justify-between">
          <label style={{ color: labelColor }} className="text-xs font-semibold uppercase tracking-wider">
            Line Height
          </label>
          <span style={{ color: valueColor }} className="text-xs font-mono font-bold">
            {lineHeight.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={20}
          value={lineHeight * 10}
          onChange={(e) => onLineHeight(Number(e.target.value) / 10)}
          style={{ ...sliderStyle, background: trackBg }}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        />
      </div>

      {/* Dark/light toggle */}
      <button
        onClick={onToggleDark}
        style={{
          backgroundColor: isDark ? "#f59e0b" : "#1a1a1a",
          color: isDark ? "#0a0a0a" : "#f9fafb",
        }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-80 cursor-pointer"
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
