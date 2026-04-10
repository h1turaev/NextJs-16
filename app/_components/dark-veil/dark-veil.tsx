"use client";

import type { CSSProperties, HTMLAttributes } from "react";

import "./dark-veil.css";

export type DarkVeilProps = {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0,
  className = "",
  style,
  ...rest
}: DarkVeilProps) {
  const clampedNoise = Math.max(0, Math.min(1, noiseIntensity));
  const clampedScanline = Math.max(0, Math.min(1, scanlineIntensity));
  const computedStyle: CSSProperties = {
    filter: `hue-rotate(${hueShift}deg)`,
    transform: `scale(${1 + Math.max(0, warpAmount) * 0.02})`,
    ["--dv-speed" as string]: `${Math.max(0.1, 1.5 / Math.max(speed, 0.05)) * 8}s`,
    ["--dv-scanline-opacity" as string]: `${clampedScanline}`,
    ["--dv-scanline-size" as string]: `${Math.max(2, 14 - scanlineFrequency * 8)}px`,
    ...style,
  };

  return (
    <div
      className={`dark-veil ${className}`.trim()}
      style={computedStyle}
      {...rest}
    >
      {clampedNoise > 0 ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: clampedNoise,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.18) 0.6px, transparent 0.8px)",
            backgroundSize: "3px 3px",
            mixBlendMode: "overlay",
          }}
        />
      ) : null}
    </div>
  );
}
