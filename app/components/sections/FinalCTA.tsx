import { Link } from "react-router";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-border/80 bg-gradient-to-r from-[color:var(--brand-blue)] to-[color:var(--cta-gradient-to)] p-8 text-primary-foreground sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sube tus archivos y cotiza en minutos</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/85">
                Recibe propuesta de materiales, tiempos y costos con acompañamiento real de nuestro equipo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="#cotizar"
                className="rounded-full bg-[color:var(--cta-btn-bg)] px-6 py-3 text-sm font-semibold text-[color:var(--cta-btn-text)] transition hover:bg-[color:var(--cta-btn-bg-hover)]"
              >
                Empezar cotización
              </Link>
              <Link
                to="https://wa.me/50495811405"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[color:var(--cta-outline-color)] px-6 py-3 text-sm font-semibold text-[color:var(--cta-outline-text)] transition hover:bg-[color:var(--cta-outline-hover)]"
              >
                Hablar por WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
