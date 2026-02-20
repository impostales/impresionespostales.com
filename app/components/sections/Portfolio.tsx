import CircularGallery from "~/components/CircularGallery";

const portfolioItems = Array.from({ length: 14 }, (_, index) => ({
  image: `/assets/product_${index + 1}.jpg`,
  text: "",
}));

export function Portfolio() {
  return (
    <section id="portafolio" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trabajos recientes con movimiento y color real</h2>
          <p className="mt-4 text-muted-foreground">
            Explora piezas producidas para distintos rubros. Este carrusel 3D te deja ver acabados, composición y diversidad de formatos.
          </p>
        </div>
        <div className="paper-panel relative mt-10 h-[420px] overflow-hidden p-3 sm:h-[520px] lg:h-[620px]">
          <CircularGallery
            items={portfolioItems}
            bend={1}
            wavePattern="gentle"
            borderRadius={0.08}
            font='600 28px "Sora", "Avenir Next", sans-serif'
            scrollSpeed={3.2}
            scrollEase={0.03}
          />
        </div>
      </div>
    </section>
  );
}
