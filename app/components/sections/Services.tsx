import {
  BadgeCheck,
  BookOpenText,
  Package,
  Palette,
  Sticker,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Cajas y empaques",
    description: "Estructuras personalizadas con acabados premium y protección real.",
  },
  {
    icon: Sticker,
    title: "Etiquetas adhesivas",
    description: "Vinil, papel y sintéticos con impresión nítida para cualquier tiraje.",
  },
  {
    icon: BookOpenText,
    title: "Libros y catálogos",
    description: "Encuadernados, grapas y formatos editoriales para marcas e instituciones.",
  },
  {
    icon: Palette,
    title: "Papelería corporativa",
    description: "Tarjetas, sobres, facturas y kits de marca con consistencia visual.",
  },
  {
    icon: Truck,
    title: "Producción + logística",
    description: "Planeamos tiempos, producimos y entregamos en todo Honduras.",
  },
  {
    icon: BadgeCheck,
    title: "Asesoría técnica",
    description: "Acompañamiento en materiales, medidas y optimización de costos.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="paper-panel p-7 sm:p-8">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Amplio rango de <span className="text-primary">servicios</span> para impresión comercial.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Trabajamos desde piezas pequeñas hasta campañas completas con una mezcla de calidad técnica, diseño funcional y ejecución rápida.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>- Producción digital y offset según objetivo.</li>
              <li>- Control de color y pruebas previas a tirajes grandes.</li>
              <li>- Opciones de acabados mate, brillante, troquelado y más.</li>
            </ul>
          </div>

          <div className="paper-panel grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group rounded-2xl border border-border/70 bg-card/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-secondary p-2 text-primary transition group-hover:bg-primary/12">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
