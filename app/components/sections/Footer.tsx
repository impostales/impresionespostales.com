export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card/70 py-12">
      <div className="container mx-auto px-4 text-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <img src="/logo-wide.png" alt="Impresiones Postales" className="h-14 rounded-md bg-[color:var(--logo-chip-bg)] px-2 py-1" />
            <p className="mt-4 max-w-xs text-muted-foreground">Impresión comercial con acompañamiento técnico y entregas puntuales en todo Honduras.</p>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">Contacto</p>
            <p>Tel: (504) 2227-7076</p>
            <p>
              WhatsApp: <a className="underline underline-offset-4" href="https://wa.me/50495811405" target="_blank" rel="noreferrer">+504 9581-1405</a>
            </p>
            <p>Calle Paseo El Country #1702, Comayagüela, Tegucigalpa</p>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">Redes</p>
            <p>
              Facebook: <a className="underline underline-offset-4" href="https://www.facebook.com/iPostales" target="_blank" rel="noreferrer">@iPostales</a>
            </p>
            <p>
              Instagram: <a className="underline underline-offset-4" href="https://www.instagram.com/impresionespostales/" target="_blank" rel="noreferrer">@impresionespostales</a>
            </p>
            <p className="pt-4 text-xs">© 2026 Impresiones Postales</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
