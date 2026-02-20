export function Testimonials() {
  return (
    <section id="testimonios" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="paper-panel mx-auto max-w-5xl p-6 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Testimonios</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Lo que nuestros clientes dicen</h2>
            </div>
            <p className="text-sm text-muted-foreground">Calificación promedio: 4.9/5</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <blockquote className="rounded-2xl border border-border/80 bg-secondary/45 p-6">
              <p className="text-base text-foreground">
                "Excelente calidad y atención personalizada. Nos produjeron bolsas de cartón para entregar nuestros productos, con un acabado impecable y listas a tiempo."
              </p>
              <footer className="mt-4 text-sm font-medium text-muted-foreground">Bee Lovely, Tegucigalpa</footer>
            </blockquote>
            <blockquote className="rounded-2xl border border-primary/20 bg-[color:var(--brand-blue)] p-6 text-primary-foreground">
              <p className="text-base">
                "Nos ayudaron a ordenar todo el proceso institucional, desde la selección de material hasta la entrega final."
              </p>
              <footer className="mt-4 text-sm font-medium text-primary-foreground/85">Cliente corporativo, Comayagüela</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
