export function Portfolio() {
  return (
    <section id="portafolio" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Algunos de nuestros trabajos
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada proyecto refleja nuestro compromiso con la calidad y el detalle. Mira algunos de los productos que nuestros clientes ya disfrutan.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
            >
              <div className="grid h-full w-full place-items-center text-sm text-muted-foreground">
                Fotografía del trabajo (placeholder)
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


