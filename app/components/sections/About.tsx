import { Link } from "react-router";

export function About() {
  return (
    <section id="nosotros" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="paper-panel mx-auto grid max-w-5xl gap-8 p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Nuestra imprenta</p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Palabras que definen cómo trabajamos: <span className="text-primary">detalle</span>, velocidad y compromiso.
            </h2>
            <p className="text-muted-foreground">
              Más de 10 años apoyando marcas hondureñas con materiales que elevan su presencia. Contamos con respaldo para proyectos privados e institucionales.
            </p>
            <Link to="#contacto" className="inline-flex rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/80">
              Solicitar presentación
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border/80">
              <img src="/assets/product_10.jpg" alt="Mesa de trabajo" className="h-[300px] w-full object-cover sm:h-[360px]" />
            </div>
            <div className="absolute -bottom-4 -left-4 max-w-[220px] rounded-2xl border border-border bg-card/95 p-4 shadow-lg">
              <p className="text-sm font-semibold text-foreground">ONCAE y atención nacional</p>
              <p className="mt-1 text-xs text-muted-foreground">Procesos claros para instituciones y empresas en crecimiento.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
