"use client";

import { motion } from "motion/react";
import { education, skills } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-6xl">Con qué trabajo</h2>
        </Reveal>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.group}
              className="bg-black p-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
            >
              <dt className="font-display text-lg">{skill.group}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-graphite-2 px-3 py-1 text-sm transition-colors duration-200 hover:bg-champagne hover:text-black"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
          <motion.div
            className="bg-black p-7"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: skills.length * 0.07, duration: 0.6 }}
          >
            <dt className="font-display text-lg">Formación</dt>
            <dd className="mt-4 leading-relaxed text-muted">
              {education.title}. {education.place}, {education.period}.
            </dd>
          </motion.div>
        </dl>
      </div>
    </section>
  );
}
