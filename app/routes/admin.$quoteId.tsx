import { Form, Link, redirect, useActionData, useLoaderData } from "react-router";
import { Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  createAdminSessionCookie,
  destroyAdminSessionCookie,
  readAdminSession,
} from "~/server/admin-session";
import { getQuoteById, updateQuoteStatus } from "~/server/quotes";

type LoaderData = {
  quote: NonNullable<Awaited<ReturnType<typeof getQuoteById>>>;
  backTo: string;
};

type ActionData = { ok: false; formError: string };

export async function loader({ request, params }: { request: Request; params: { quoteId?: string } }) {
  const session = await readAdminSession(request);
  if (!session) {
    return redirect("/admin");
  }

  const quoteId = params.quoteId;
  if (!quoteId) {
    throw new Response("Cotización no encontrada", { status: 404 });
  }

  const quote = await getQuoteById(quoteId);
  if (!quote) {
    throw new Response("Cotización no encontrada", { status: 404 });
  }

  const url = new URL(request.url);
  const backTo = url.searchParams.get("from");

  return {
    quote,
    backTo: backTo && backTo.startsWith("/admin") ? backTo : "/admin",
  };
}

export async function action({ request }: { request: Request }) {
  const session = await readAdminSession(request);
  if (!session) {
    return redirect("/admin", {
      headers: { "Set-Cookie": await destroyAdminSessionCookie() },
    });
  }

  const formData = await request.formData();
  const intent = (formData.get("intent") || "").toString();

  if (intent === "logout") {
    return redirect("/admin", {
      headers: { "Set-Cookie": await destroyAdminSessionCookie() },
    });
  }

  if (intent === "set-status") {
    const quoteId = (formData.get("quoteId") || "").toString();
    const status = (formData.get("status") || "").toString();
    if (!quoteId || (status !== "pending" && status !== "reviewed")) {
      return { ok: false, formError: "Solicitud inválida." } satisfies ActionData;
    }
    await updateQuoteStatus(quoteId, status);
    return redirect(new URL(request.url).pathname, {
      headers: { "Set-Cookie": await createAdminSessionCookie() },
    });
  }

  return { ok: false, formError: "Acción no soportada." } satisfies ActionData;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <p className="mt-1 whitespace-pre-wrap break-words">{value || "—"}</p>
    </div>
  );
}

export default function AdminQuoteDetailRoute() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();

  const quote = data.quote;
  const createdAt = new Intl.DateTimeFormat("es-HN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(quote.createdAt));

  return (
    <main className="min-h-screen py-10 sm:py-14">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="paper-panel p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Panel interno</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Detalle de cotización</h1>
              <p className="mt-2 text-sm text-muted-foreground">ID: {quote.id}</p>
            </div>
            <Form method="post">
              <input type="hidden" name="intent" value="logout" />
              <Button type="submit" variant="secondary">
                Cerrar sesión
              </Button>
            </Form>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={data.backTo} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
              Volver al listado
            </Link>
            <Form method="post">
              <input type="hidden" name="intent" value="set-status" />
              <input type="hidden" name="quoteId" value={quote.id} />
              <input type="hidden" name="status" value={quote.status === "pending" ? "reviewed" : "pending"} />
              <Button type="submit">
                {quote.status === "pending" ? "Marcar revisada" : "Marcar pendiente"}
              </Button>
            </Form>
          </div>

          {actionData?.formError && (
            <p className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {actionData.formError}
            </p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Field label="Estado" value={quote.status === "reviewed" ? "Revisada" : "Pendiente"} />
            <Field label="Fecha de creación" value={createdAt} />
            <Field label="Nombre" value={quote.name} />
            <Field label="Empresa / Negocio" value={quote.company ?? ""} />
            <Field label="Correo electrónico" value={quote.email} />
            <Field label="Teléfono / WhatsApp" value={quote.phone} />
            <Field label="Tipo de producto" value={quote.product} />
            <Field label="Cantidad estimada" value={String(quote.quantity)} />
            <Field label="Instagram" value={quote.instagram ?? ""} />
            <Field label="Facebook" value={quote.facebook ?? ""} />
            <Field label="TikTok" value={quote.tiktok ?? ""} />
            <div className="sm:col-span-2">
              <Field label="Comentarios / especificaciones" value={quote.notes ?? ""} />
            </div>
            {quote.referenceImagePath && (
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Imagen de referencia
                </p>
                <a
                  href={`/admin/download/${quote.id}`}
                  download
                  className="group relative block overflow-hidden rounded-xl border border-border/80"
                >
                  <img
                    src={`/admin/download/${quote.id}?mode=preview`}
                    alt="Imagen de referencia de la cotización"
                    className="max-h-[520px] w-full bg-muted object-contain"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-foreground">
                      <Download className="h-4 w-4" />
                      Descargar archivo
                    </span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
