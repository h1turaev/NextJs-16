"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import "./gooey-nav.css";

type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  initialActiveIndex?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
};

function colorByCode(code: number): string {
  switch (code) {
    case 1:
      return "#60a5fa";
    case 2:
      return "#34d399";
    case 3:
      return "#f472b6";
    case 4:
      return "#fbbf24";
    default:
      return "#a78bfa";
  }
}

export default function GooeyNav({
  items,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  initialActiveIndex = 0,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: GooeyNavProps) {
  const pathname = usePathname();
  const matchedIndex = useMemo(() => {
    const i = items.findIndex(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    );
    return i >= 0 ? i : initialActiveIndex;
  }, [items, pathname, initialActiveIndex]);

  const [active, setActive] = useState(matchedIndex);

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => {
        const angle = (Math.PI * 2 * i) / particleCount;
        const d =
          particleDistances[1] +
          ((particleDistances[0] - particleDistances[1]) * (i % 5)) / 4;
        const size = Math.max(4, particleR / 22 + (i % 3) * 2);
        const duration = animationTime + ((i * 37) % Math.max(timeVariance, 1));
        return {
          key: i,
          x: Math.cos(angle) * d,
          y: Math.sin(angle) * d,
          size,
          duration,
          color: colorByCode(colors[i % colors.length] ?? 1),
        };
      }),
    [
      particleCount,
      particleDistances,
      particleR,
      animationTime,
      timeVariance,
      colors,
    ],
  );

  return (
    <div className="w-full border-b border-white/10 bg-neutral-950/85 px-4 py-3 backdrop-blur-md md:px-8">
      <nav className="mx-auto flex max-w-5xl items-center justify-center">
        <ul className="relative flex items-center gap-2 rounded-full bg-black/90 p-1.5">
          {items.map((item, i) => {
            const isActive = i === active || i === matchedIndex;
            return (
              <li key={item.href} className="relative">
                {isActive ? (
                  <span className="pointer-events-none absolute inset-0 z-0 rounded-full bg-white" />
                ) : null}
                <Link
                  href={item.href}
                  onMouseEnter={() => setActive(i)}
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-black" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>

                {isActive ? (
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-0 w-0">
                    {particles.map((p) => (
                      <span
                        key={p.key}
                        className="gooey-pop-particle absolute rounded-full opacity-80"
                        style={{
                          width: `${p.size}px`,
                          height: `${p.size}px`,
                          background: p.color,
                          transform: `translate(${p.x.toFixed(4)}px, ${p.y.toFixed(4)}px)`,
                          filter: "blur(1px)",
                          animationDuration: `${p.duration}ms`,
                        }}
                      />
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
