"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

const SIZE = 320;
const C = SIZE / 2;
const MAX = 8; // x1000 rpm
const REDLINE = 6.5;
const SWEEP = 240; // grados que recorre la aguja de 0 a MAX

// Ángulo medido desde "arriba", en sentido horario.
const angleFor = (v: number) => -SWEEP / 2 + (v / MAX) * SWEEP;

function point(v: number, r: number) {
  const a = (angleFor(v) * Math.PI) / 180;
  return { x: C + r * Math.sin(a), y: C - r * Math.cos(a) };
}

function arc(from: number, to: number, r: number) {
  const s = point(from, r);
  const e = point(to, r);
  const large = ((to - from) / MAX) * SWEEP > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export function Tachometer({ rpm }: { rpm: MotionValue<number> }) {
  const rotate = useTransform(rpm, angleFor);
  const readout = useTransform(rpm, (v) => Math.round((v * 1000) / 50) * 50);
  const glow = useTransform(rpm, [0, REDLINE, MAX], [0.15, 0.45, 0.9]);

  const ticks = [];
  for (let i = 0; i <= MAX * 2; i++) {
    const v = i / 2;
    const major = Number.isInteger(v);
    const outer = point(v, 132);
    const inner = point(v, major ? 112 : 122);
    ticks.push(
      <line
        key={i}
        x1={outer.x}
        y1={outer.y}
        x2={inner.x}
        y2={inner.y}
        stroke={v >= REDLINE ? "var(--redline)" : "var(--text)"}
        strokeWidth={major ? 3 : 1.5}
        strokeLinecap="round"
        opacity={major ? 1 : 0.5}
      />,
    );
    if (major) {
      const label = point(v, 94);
      ticks.push(
        <text
          key={`l${i}`}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill={v >= REDLINE ? "var(--redline)" : "var(--muted)"}
          fontSize="15"
          fontWeight={700}
          style={{ fontStretch: "125%" }}
        >
          {v}
        </text>,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full max-w-[340px]"
      role="img"
      aria-label="Tacómetro decorativo"
    >
      <defs>
        <radialGradient id="dial" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1d1e22" />
          <stop offset="100%" stopColor="#060607" />
        </radialGradient>
      </defs>

      {/* Bisel metálico y esfera */}
      <circle cx={C} cy={C} r={156} fill="none" stroke="#3a3c42" strokeWidth={4} />
      <circle cx={C} cy={C} r={150} fill="url(#dial)" />

      {/* Luz ambiente que crece con las revoluciones */}
      <motion.circle cx={C} cy={C} r={150} fill="var(--champagne)" style={{ opacity: glow }} className="mix-blend-soft-light" />

      <path d={arc(REDLINE, MAX, 136)} stroke="var(--redline)" strokeWidth={6} fill="none" />
      {ticks}

      <text x={C} y={C + 44} textAnchor="middle" fill="var(--muted)" fontSize="11" letterSpacing="1">
        x1000 rpm
      </text>
      <motion.text
        x={C}
        y={C + 78}
        textAnchor="middle"
        fill="var(--champagne)"
        fontSize="26"
        fontWeight={800}
        style={{ fontStretch: "125%", fontVariantNumeric: "tabular-nums" }}
      >
        {readout}
      </motion.text>

      {/* Aguja */}
      {/* El círculo invisible centra la caja del grupo en el eje de la aguja,
          así Motion la hace girar desde el centro del tacómetro. */}
      <motion.g style={{ rotate }}>
        <circle cx={C} cy={C} r={130} fill="transparent" />
        <path d={`M ${C - 4} ${C + 18} L ${C} ${C - 128} L ${C + 4} ${C + 18} Z`} fill="var(--redline)" />
      </motion.g>
      <circle cx={C} cy={C} r={13} fill="#26282c" stroke="#45484f" strokeWidth={2} />
    </svg>
  );
}
