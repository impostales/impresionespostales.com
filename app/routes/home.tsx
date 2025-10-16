// import type { Route } from "./+types/home";
import { Hero } from "~/components/sections/Hero";
import { Navbar } from "~/components/sections/Navbar";
import { Services } from "~/components/sections/Services";
import { Portfolio } from "~/components/sections/Portfolio";
import { About } from "~/components/sections/About";
import { QuoteForm } from "~/components/sections/QuoteForm";
import { Shipping } from "~/components/sections/Shipping";
import { Testimonials } from "~/components/sections/Testimonials";
import { FinalCTA } from "~/components/sections/FinalCTA";
import { Footer } from "~/components/sections/Footer";
import { ContactAnchor } from "~/components/sections/ContactAnchor";

export function meta({}: any) {
  return [
    { title: "Impresiones Postales — Impresión en Honduras" },
    {
      name: "description",
      content:
        "Imprenta en Tegucigalpa: etiquetas, cajas, libros, catálogos y más. Asesoría y entregas en toda Honduras.",
    },
    { name: "keywords", content: "impresión en Honduras, imprenta en Tegucigalpa, impresiones personalizadas, material corporativo" },
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const { validateQuoteForm } = await import("~/components/sections/QuoteForm");
  const { fieldErrors, values } = validateQuoteForm(formData);

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  try {
    const { saveQuote, saveUploadedImage } = await import("~/server/quotes");
    const raw = formData.get("referenceImage");
    const file = raw instanceof File ? raw : null;
    const referenceImagePath = await saveUploadedImage(file);
    const { file: _omit, ...rest } = values as any;
    await saveQuote({ ...rest, referenceImagePath });
    return { ok: true };
  } catch (e) {
    return { ok: false, fieldErrors: {}, formError: "No se pudo guardar tu solicitud. Intenta de nuevo." };
  }
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <QuoteForm />
      <Shipping />
      <Testimonials />
      <FinalCTA />
      <ContactAnchor />
      <Footer />
    </>
  );
}
