import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function Hero() {
  return (
    <section id="top" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Imprime calidad, proyecta confianza.
            </h1>
            <p className="text-lg text-muted-foreground">
              En <span className="font-semibold">Impresiones Postales</span> transformamos tus ideas en materiales impresos profesionales: etiquetas, cajas, catálogos, libros y más.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="#cotizar"
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                Solicitar cotización inmediata
              </Link>
              <Link
                to="#contacto"
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                Hablar con un asesor
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted" aria-hidden>
              {/* Placeholder visual: replace with industry-related collage in V2 */}
              <div className="h-full w-full grid place-items-center text-muted-foreground">
                Imagen de portafolio (placeholder)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


