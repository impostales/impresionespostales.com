import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

function useClientHasScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Navbar() {
  const scrolled = useClientHasScrolled();
  const { hash } = useLocation();
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "backdrop-blur-md border-b transition-colors",
        scrolled ? "border-border/80 bg-background/70" : "border-transparent bg-transparent"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="#top" className="flex items-center">
          {/* Square icon logo */}
          <img 
            src="/logo.png" 
            alt="Impresiones Postales" 
            className="h-10 dark:bg-white dark:bg-opacity-90 bg-transparent rounded-lg p-1"
          />
        </Link>
        <div className="hidden gap-6 md:flex text-sm">
          <Link to="#servicios" className="hover:underline underline-offset-4">
            Servicios
          </Link>
          <Link to="#portafolio" className="hover:underline underline-offset-4">
            Portafolio
          </Link>
          <Link to="#nosotros" className="hover:underline underline-offset-4">
            Nosotros
          </Link>
          <Link to="#cotizar" className="hover:underline underline-offset-4">
            Cotizar
          </Link>
          <Link to="#envios" className="hover:underline underline-offset-4">
            Envíos
          </Link>
          <Link to="#testimonios" className="hover:underline underline-offset-4">
            Testimonios
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeDropdown />
        </div>
      </nav>
    </header>
  );
}

function setDocumentTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  if (theme === "system") {
    root.classList.remove("dark");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) root.classList.add("dark");
    localStorage.setItem("theme", "system");
    return;
  }
  localStorage.setItem("theme", theme);
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function getInitialTheme(): "light" | "dark" | "system" {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark" || saved === "system") return saved;
  return "system";
}

export function ThemeDropdown() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  useEffect(() => {
    const init = getInitialTheme();
    setTheme(init);
    setDocumentTheme(init);
  }, []);
  
  const handleValueChange = (val: string) => {
    const newTheme = val as "light" | "dark" | "system";
    setTheme(newTheme);
    setDocumentTheme(newTheme);
  };
  
  return (
    <Select value={theme} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[140px]" aria-label="Cambiar tema">
        <SelectValue placeholder="Tema" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">Sistema</SelectItem>
        <SelectItem value="light">Claro</SelectItem>
        <SelectItem value="dark">Oscuro</SelectItem>
      </SelectContent>
    </Select>
  );
}


