import { Clock3, MapPinned, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Entrega nacional", text: "Despachamos a todo Honduras con aliados de mensajería." },
  { icon: Clock3, title: "Respuesta rápida", text: "Confirmamos tiempos de producción desde la cotización." },
  { icon: ShieldCheck, title: "Empaque seguro", text: "Protección por tipo de producto y volumen." },
  { icon: MapPinned, title: "Cobertura local", text: "Atendemos Tegucigalpa y Comayagüela con seguimiento cercano." },
];

export function Shipping() {
  return (
    <section id="envios" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Logística que acompaña tu producción</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Más que imprimir, cuidamos que tu pedido llegue bien y a tiempo.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-border/80 bg-card/80 p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
