"use client";

import { motion } from "motion/react";
import { education, skills, techColors } from "@/data/profile";
import { Container, SectionTitle } from "./ui";

export function Skills() {
  const groups = [
    ...skills,
    { group: "Formación", items: [education.title, education.place, education.period] },
  ];

  return (
    <section className="py-28">
      <Container>
        <SectionTitle>Herramientas</SectionTitle>

        <div className="mt-16 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.group}
              className="border-t border-line-strong pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-muted">{g.group}</h3>
              <ul className="mt-5 space-y-1.5">
                {g.items.map((item) => {
                  // Las tecnologías llevan el color de su logo; los conceptos
                  // (APIs REST, Metodologías ágiles...) un gris neutro.
                  const color =
                    g.group === "Formación" ? undefined : (techColors[item] ?? "#6b6b6b");
                  return (
                    <li
                      key={item}
                      className="group flex items-center gap-3 text-2xl font-semibold tracking-tight transition-transform duration-300 hover:translate-x-2"
                      style={
                        color
                          ? ({
                              "--tech": color,
                              "--tech-text": techColors[item] ?? "var(--fg)",
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {color && (
                        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--tech)] transition-transform duration-300 group-hover:scale-150" />
                      )}
                      <span className={color ? "transition-colors duration-300 group-hover:text-[var(--tech-text)]" : ""}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
