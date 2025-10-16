export function Testimonials() {
  return (
    <section id="testimonios" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <blockquote className="rounded-lg border border-border bg-card p-6 text-left">
              <p className="text-base">“Excelente calidad y atención personalizada, recibimos nuestras etiquetas a tiempo y con un acabado impecable.”</p>
              <footer className="mt-4 text-sm text-muted-foreground">— Bee Lovely, Tegucigalpa</footer>
            </blockquote>
            <blockquote className="rounded-lg border border-border bg-card p-6 text-left">
              <p className="text-base">“Nos apoyaron en todo el proceso de impresión institucional, muy profesionales.”</p>
              <footer className="mt-4 text-sm text-muted-foreground">— Empresa privada, Comayagüela</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}


