import { Link } from "react-router";

const stats = [
  { label: "Proyectos", value: "1,200+" },
  { label: "Clientes activos", value: "180+" },
  { label: "Entrega nacional", value: "24h" },
];

export function Hero() {
  return (
    <section id="top" className="edge-stripes relative overflow-hidden pb-16 pt-30 sm:pb-24 sm:pt-36">
      <div className="container mx-auto px-4">
        <div className="paper-panel reveal-up mx-auto grid max-w-6xl gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-foreground">
              Impresión profesional en Honduras
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                ¿Planeas <span className="text-primary">imprimir</span>? Llegaste al lugar correcto.
              </h1>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                Creamos material impreso que comunica la esencia de tu marca, con acabados finos y tiempos reales para empresas, instituciones y emprendimientos que quieren destacar.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="#cotizar"
                className="pulse-glow rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Solicitar cotización
              </Link>
              <Link
                to="#portafolio"
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/85 transition hover:border-primary/30 hover:text-primary"
              >
                Ver portafolio
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((item, index) => (
                <div key={item.label} className="rounded-2xl border border-border/80 bg-muted/70 px-4 py-4">
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[430px]">
            <div className="float-soft absolute -right-2 top-2 w-[72%] overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl sm:w-[70%]">
              <img src="/assets/product_6.jpg" alt="Muestra de impresión" className="h-56 w-full object-cover sm:h-64" />
            </div>

            <div className="float-soft absolute bottom-8 left-0 w-[58%] overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg [animation-delay:1.3s]">
              <video
                src="/assets/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-44 w-full object-cover sm:h-48"
                aria-label="Video de muestra de impresión"
              />
            </div>

            <div className="absolute left-[38%] top-[50%] w-[44%] -translate-y-1/2 rounded-2xl border border-primary/20 bg-card/95 p-4 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/80">Calidad verificada</p>
              <p className="mt-2 text-sm font-semibold text-foreground">Color consistente, detalle fino y entrega puntual.</p>
            </div>

            <div className="absolute bottom-0 right-2 h-14 w-14 rounded-xl bg-[color:var(--brand-red-soft)]" aria-hidden />
            <div className="absolute left-4 top-0 h-10 w-10 rounded-lg bg-[color:var(--brand-blue-soft)]" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
