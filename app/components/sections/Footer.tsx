export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 text-sm text-muted-foreground">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-foreground">Impresiones Postales S. de R.L.</p>
              <p>Calle Paseo El Country #1702, Comayagüela, Tegucigalpa, Honduras</p>
            </div>
          </div>
          <div>
            <p><span className="text-foreground">Tel:</span> (504) 2227-7076</p>
            <p>
              Facebook: <a className="underline underline-offset-4" href="https://www.facebook.com/iPostales" target="_blank" rel="noreferrer">@iPostales</a>
            </p>
            <p>
              Instagram: <a className="underline underline-offset-4" href="https://www.instagram.com/impresionespostales/" target="_blank" rel="noreferrer">@impresionespostales</a>
            </p>
            <p>
              WhatsApp: <a className="underline underline-offset-4" href="https://wa.me/50495811405" target="_blank" rel="noreferrer">+504 9581-1405</a>
            </p>
          </div>
          <div className="sm:col-span-2 lg:col-span-1 space-y-3">
            <p>Profesionales en impresión.</p>
            <img 
              src="/logo-wide.png" 
              alt="Impresiones Postales" 
              className="h-16 dark:bg-white dark:bg-opacity-90 bg-transparent rounded-lg py-1"
            />
          </div>
        </div>
        <div className="mt-6">© 2025 Impresiones Postales</div>
      </div>
    </footer>
  );
}


