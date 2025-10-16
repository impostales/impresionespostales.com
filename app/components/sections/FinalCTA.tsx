import { Link } from "react-router";
import { cn } from "~/lib/utils";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center rounded-2xl border border-border bg-card p-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            ¿Listo para imprimir con nosotros?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hacemos que tus ideas se materialicen en impresiones de alta calidad, sin complicaciones.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="#cotizar"
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              Solicitar cotización ahora
            </Link>
            <Link
              to="#contacto"
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              Escríbenos por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


