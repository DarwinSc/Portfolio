"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Token = { text: string; className?: string };

const key = "text-text";
const str = "text-champagne";
const punct = "text-muted";
const kw = "text-[#8fa8c8]";

// El perfil escrito como código. Cada token tiene su color, como en un editor.
const tokens: Token[] = [
  { text: "const ", className: kw },
  { text: "darwin", className: key },
  { text: " = {\n", className: punct },
  { text: "  rol", className: key },
  { text: ": ", className: punct },
  { text: '"Desarrollador frontend"', className: str },
  { text: ",\n", className: punct },
  { text: "  stack", className: key },
  { text: ": [", className: punct },
  { text: '"React"', className: str },
  { text: ", ", className: punct },
  { text: '"Next.js"', className: str },
  { text: ", ", className: punct },
  { text: '"TypeScript"', className: str },
  { text: "],\n", className: punct },
  { text: "  experiencia", className: key },
  { text: ": ", className: punct },
  { text: '"3+ años"', className: str },
  { text: ",\n", className: punct },
  { text: "  ahora", className: key },
  { text: ": ", className: punct },
  { text: '"DsCash"', className: str },
  { text: ",\n", className: punct },
  { text: "  disponible", className: key },
  { text: ": ", className: punct },
  { text: "true", className: kw },
  { text: ",\n};", className: punct },
];

// Posición donde empieza cada token dentro del texto completo.
const starts = tokens.map((_, i) => tokens.slice(0, i).reduce((n, t) => n + t.text.length, 0));
const total = tokens.reduce((n, t) => n + t.text.length, 0);

export function CodeCard() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const shown = reduce ? total : count;

  // Efecto de tipeo: escribe el código carácter por carácter al cargar.
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= total) clearInterval(id);
      }, 22);
    }, 700);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [reduce]);

  const visible = tokens.map((t, i) => (
    <span key={i} className={t.className}>
      {t.text.slice(0, Math.max(0, shown - starts[i]))}
    </span>
  ));

  return (
    <figure
      className="w-full max-w-[460px] overflow-hidden rounded-2xl border border-line bg-graphite shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
      aria-label="Perfil de Darwin escrito como código"
    >
      <figcaption className="flex items-center justify-between border-b border-line px-5 py-3 text-sm">
        <span className="text-text">darwin.ts</span>
        <span className="text-muted">TypeScript</span>
      </figcaption>
      <pre className="min-h-[220px] sm:min-h-[248px] overflow-x-auto px-5 py-5 text-[13px] leading-6 sm:text-[15px] sm:leading-7">
        <code>
          {visible}
          <span
            aria-hidden
            className={`ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-champagne ${
              shown >= total ? "animate-pulse" : ""
            }`}
          />
        </code>
      </pre>
    </figure>
  );
}
