import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const navItems = [
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Trabajos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Reseñas" },
];

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 w-[min(1100px,calc(100%-1.5rem))] rounded-full border border-border/90 bg-card/50 px-4 py-2 shadow-lg backdrop-blur-xs">
        <nav className="flex items-center justify-between gap-3">
          <Link to="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="Impresiones Postales" className="h-10 w-10 rounded-lg bg-[color:var(--logo-chip-bg)] p-1" />
            <span className="hidden text-sm font-semibold text-foreground/90 sm:block">Impresiones Postales</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="#cotizar"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Cotizar
            </Link>
            <button
              type="button"
              aria-label="Abrir menú"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
