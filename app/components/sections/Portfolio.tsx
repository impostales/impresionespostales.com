import CircularGallery from "~/components/CircularGallery";

const portfolioItems = Array.from({ length: 14 }, (_, index) => ({
  image: `/assets/product_${index + 1}.jpg`,
  text: "",
}));

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
        <div className="relative mt-10 h-[420px] overflow-hidden rounded-xl border border-border bg-muted sm:h-[520px] lg:h-[600px]">
          <CircularGallery
            items={portfolioItems}
            bend={1}
            wavePattern="gentle"
            borderRadius={0.05}
            font='600 28px "Inter", "Helvetica Neue", Arial, sans-serif'
            scrollSpeed={3.3}
            scrollEase={0.03}
          />
        </div>
      </div>
    </section>
  );
}
