"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { education, skills } from "@/data/profile";
import { Reveal } from "./Reveal";

const BARS = 24;

// Alturas fijas (no aleatorias) para que el servidor y el navegador
// rendericen lo mismo.
const heights = Array.from({ length: BARS }, (_, i) => 30 + ((i * 37) % 70));

export function Skills() {
  const eqRef = useRef<HTMLDivElement>(null);
  // El ecualizador solo se mueve mientras está en pantalla.
  const playing = useInView(eqRef, { margin: "-10% 0px" });

  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="font-wide text-4xl sm:text-6xl">Con qué trabajo</h2>
          </Reveal>
          <div
            ref={eqRef}
            aria-hidden
            className={`flex h-16 items-end gap-[5px] ${playing ? "eq-on" : ""}`}
          >
            {heights.map((h, i) => (
              <span
                key={i}
                className="eq-bar w-[5px] rounded-full bg-champagne"
                style={{ height: `${h}%`, animationDelay: `${(i % 7) * -0.17}s`, opacity: 0.5 + (h / 100) * 0.5 }}
              />
            ))}
          </div>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.group}
              className="bg-black p-7"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <dt className="font-wide text-lg">{skill.group}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-graphite-2 px-3 py-1 text-sm transition-colors hover:bg-champagne hover:text-black"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
          <motion.div
            className="bg-black p-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: skills.length * 0.08, duration: 0.6 }}
          >
            <dt className="font-wide text-lg">Formación</dt>
            <dd className="mt-4 leading-relaxed text-muted">
              {education.title}. {education.place}, {education.period}.
            </dd>
          </motion.div>
        </dl>
      </div>
    </section>
  );
}
