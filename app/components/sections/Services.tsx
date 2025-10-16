import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const services = [
  {
    title: "Cajas y empaques personalizados",
    description:
      "Diseñados a la medida con materiales duraderos y acabados profesionales.",
  },
  {
    title: "Etiquetas adhesivas y material promocional",
    description: "Adhesivos de alta calidad, stickers y piezas promocionales.",
  },
  {
    title: "Libros, revistas y catálogos",
    description: "Tirajes cortos y largos con colores precisos y encuadernado.",
  },
  {
    title: "Papelería corporativa",
    description: "Facturas, sobres, tarjetas, carpetas y más para tu empresa.",
  },
  {
    title: "Material educativo y publicitario",
    description: "Guías, folletos, afiches y recursos para instituciones y marcas.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Todo lo que tu marca necesita, impreso con excelencia.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Soluciones integrales de impresión digital y offset, adaptadas a tus necesidades. Desde tirajes cortos hasta grandes volúmenes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Asesoría gratuita antes de imprimir",
            "Entregas puntuales en todo el país",
            "Materiales de primera calidad",
            "Soporte personalizado para empresas",
          ].map((b) => (
            <div key={b} className="rounded-lg border border-border bg-card p-4 text-sm">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


