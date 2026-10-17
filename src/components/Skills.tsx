import { education, skills } from "@/data/profile";

export function Skills() {
  return (
    <section className="border-y border-line bg-surface py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Con qué trabajo</h2>

        <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.group}>
              <dt className="font-display text-xl font-bold">{skill.group}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{skill.items.join(", ")}</dd>
            </div>
          ))}
          <div>
            <dt className="font-display text-xl font-bold">Formación</dt>
            <dd className="mt-2 leading-relaxed text-muted">
              {education.title}, {education.place} ({education.period})
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
