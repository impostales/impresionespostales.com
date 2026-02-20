import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { isValidEmail, isValidPhone } from "~/lib/utils";

type ActionData =
  | { ok: true }
  | { ok: false; fieldErrors: Partial<Record<string, string>>; formError?: string };

export function QuoteForm() {
  const actionData = useActionData<ActionData>();
  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [product, setProduct] = useState("etiquetas");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (nav.state === "idle" && actionData?.ok && formRef.current) {
      formRef.current.reset();
      setTouched({});
      setProduct("etiquetas");
    }
  }, [nav.state, actionData]);

  return (
    <section id="cotizar" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Cotización</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">¿Quieres una cotización rápida?</h2>
          <p className="mt-4 text-muted-foreground">
            Completa el formulario y uno de nuestros asesores se comunicará contigo para ayudarte a definir materiales, tiempos y precios.
          </p>
        </div>

        <div className="paper-panel mx-auto mt-10 max-w-3xl p-6 sm:p-8">
          {actionData && !actionData.ok && actionData.formError && (
            <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-foreground">
              {actionData.formError}
            </div>
          )}
          {actionData && actionData.ok && (
            <div className="mb-4 rounded-md border border-ring bg-ring/10 p-3 text-sm text-foreground">
              ¡Gracias! Hemos recibido tu solicitud.
            </div>
          )}
          <Form ref={formRef} method="post" replace encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                />
                {actionData && !actionData.ok && actionData.fieldErrors.name && (
                  <p className="text-sm text-destructive">{actionData.fieldErrors.name}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="company">Empresa / Negocio (opcional)</Label>
                <Input id="company" name="company" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onBlur={(e) => setTouched((t) => ({ ...t, email: true }))}
                />
                {touched.email && (
                  <p className="text-sm text-muted-foreground">
                    {" "}
                  </p>
                )}
                {actionData && !actionData.ok && actionData.fieldErrors.email && (
                  <p className="text-sm text-destructive">{actionData.fieldErrors.email}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                <Input id="phone" name="phone" required onBlur={() => setTouched((t) => ({ ...t, phone: true }))} />
                {actionData && !actionData.ok && actionData.fieldErrors.phone && (
                  <p className="text-sm text-destructive">{actionData.fieldErrors.phone}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="product">Tipo de producto</Label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger id="product" className="w-full">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="etiquetas">Etiquetas</SelectItem>
                    <SelectItem value="cajas">Cajas</SelectItem>
                    <SelectItem value="libros">Libros</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="product" value={product} />
                {actionData && !actionData.ok && actionData.fieldErrors.product && (
                  <p className="text-sm text-destructive">{actionData.fieldErrors.product}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="quantity">Cantidad estimada</Label>
                <Input id="quantity" name="quantity" type="number" required min={1} />
                {actionData && !actionData.ok && actionData.fieldErrors.quantity && (
                  <p className="text-sm text-destructive">{actionData.fieldErrors.quantity}</p>
                )}
              </div>
              <div className="sm:col-span-2 space-y-1">
                <Label htmlFor="notes">Comentarios / especificaciones</Label>
                <Textarea id="notes" name="notes" rows={4} />
              </div>
              <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="instagram">Instagram (opcional)</Label>
                  <Input id="instagram" name="instagram" placeholder="https://www.instagram.com/tu_cuenta" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="facebook">Facebook (opcional)</Label>
                  <Input id="facebook" name="facebook" placeholder="https://www.facebook.com/tu_pagina" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tiktok">TikTok (opcional)</Label>
                  <Input id="tiktok" name="tiktok" placeholder="https://www.tiktok.com/@tu_usuario" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="referenceImage">Imagen de referencia (máx 5MB)</Label>
                  <Input id="referenceImage" name="referenceImage" type="file" accept="image/*" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar cotización"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}

export function validateQuoteForm(formData: FormData) {
  const name = (formData.get("name") || "").toString().trim();
  const company = (formData.get("company") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const product = (formData.get("product") || "").toString().trim();
  const quantity = Number(formData.get("quantity") || 0);
  const notes = (formData.get("notes") || "").toString().trim();
  const instagram = (formData.get("instagram") || "").toString().trim();
  const facebook = (formData.get("facebook") || "").toString().trim();
  const tiktok = (formData.get("tiktok") || "").toString().trim();
  let file = formData.get("referenceImage");
  if (file instanceof File && file.size === 0) {
    file = null;
  }

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "El nombre es obligatorio";
  if (!isValidEmail(email)) fieldErrors.email = "Correo inválido";
  if (!isValidPhone(phone)) fieldErrors.phone = "Teléfono inválido";
  if (!product) fieldErrors.product = "Seleccione un producto";
  if (!quantity || quantity < 1) fieldErrors.quantity = "Ingrese una cantidad válida";

  if (file && file instanceof File) {
    console.log("file", file);
    if (file.size > 5 * 1024 * 1024) {
      fieldErrors.referenceImage = "La imagen debe ser menor o igual a 5MB";
    }
    if (!file.type.startsWith("image/")) {
      fieldErrors.referenceImage = "El archivo debe ser una imagen";
    }
  }

  return {
    values: { name, company, email, phone, product, quantity, notes, instagram, facebook, tiktok, file },
    fieldErrors,
  };
}

