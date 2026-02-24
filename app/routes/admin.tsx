import { Form, Link, redirect, useActionData, useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  createAdminSessionCookie,
  destroyAdminSessionCookie,
  isValidAdminPassword,
  readAdminSession,
} from "~/server/admin-session";
import { listAdminQuotes, updateQuoteStatus } from "~/server/quotes";

const PRODUCT_OPTIONS = ["etiquetas", "cajas", "libros", "otros"] as const;

type LoaderData =
  | { authenticated: false }
  | {
      authenticated: true;
      quotes: Awaited<ReturnType<typeof listAdminQuotes>>["quotes"];
      products: string[];
      page: number;
      pageSize: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      search: string;
      product: string;
      sort: "oldest" | "newest";
    };

type ActionData =
  | { ok: false; authError: string }
  | { ok: false; formError: string };

function parseAdminQuery(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || "1") || 1);
  const pageSize = 25;
  const search = (url.searchParams.get("q") || "").trim();
  const product = (url.searchParams.get("product") || "").trim();
  const sort: "oldest" | "newest" = url.searchParams.get("sort") === "newest" ? "newest" : "oldest";
  return { page, pageSize, search, product, sort };
}

export async function loader({ request }: { request: Request }): Promise<LoaderData> {
  const session = await readAdminSession(request);
  if (!session) {
    return { authenticated: false };
  }

  const query = parseAdminQuery(request);
  const data = await listAdminQuotes(query);

  return {
    authenticated: true,
    quotes: data.quotes,
    products: query.product
      ? Array.from(new Set([...PRODUCT_OPTIONS, query.product]))
      : [...PRODUCT_OPTIONS],
    page: data.page,
    pageSize: data.pageSize,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    search: query.search,
    product: query.product,
    sort: query.sort,
  };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = (formData.get("intent") || "").toString();

  if (intent === "login") {
    const password = (formData.get("password") || "").toString();
    if (!isValidAdminPassword(password)) {
      return { ok: false, authError: "Contraseña incorrecta." } satisfies ActionData;
    }
    return redirect("/admin", {
      headers: { "Set-Cookie": await createAdminSessionCookie() },
    });
  }

  if (intent === "logout") {
    return redirect("/admin", {
      headers: { "Set-Cookie": await destroyAdminSessionCookie() },
    });
  }

  const session = await readAdminSession(request);
  if (!session) {
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
    const from = (formData.get("from") || "").toString();
    const safeRedirect = from.startsWith("/admin") ? from : "/admin";
    return redirect(safeRedirect, {
      headers: { "Set-Cookie": await createAdminSessionCookie() },
    });
  }

  return { ok: false, formError: "Acción no soportada." } satisfies ActionData;
}

function StatusBadge({ status }: { status: "pending" | "reviewed" }) {
  if (status === "reviewed") {
    return <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">Revisada</span>;
  }
  return <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">Pendiente</span>;
}

export default function AdminRoute() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();

  if (!data.authenticated) {
    return (
      <main className="min-h-screen py-16">
        <div className="container mx-auto max-w-xl px-4">
          <div className="paper-panel p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Panel interno</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Acceso administrativo</h1>
            <p className="mt-3 text-muted-foreground">
              Ingresa la contraseña para ver y gestionar las cotizaciones creadas.
            </p>
            <Form method="post" className="mt-8 space-y-4">
              <input type="hidden" name="intent" value="login" />
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" name="password" type="password" required autoComplete="current-password" />
              </div>
              {actionData && "authError" in actionData && (
                <p className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {actionData.authError}
                </p>
              )}
              <Button type="submit">Entrar al panel</Button>
            </Form>
          </div>
        </div>
      </main>
    );
  }

  const toggleSort = data.sort === "oldest" ? "newest" : "oldest";
  const searchParams = new URLSearchParams();
  if (data.search) searchParams.set("q", data.search);
  if (data.product) searchParams.set("product", data.product);
  searchParams.set("sort", toggleSort);
  searchParams.set("page", "1");
  const sortHref = `/admin?${searchParams.toString()}`;

  return (
    <main className="min-h-screen py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="paper-panel p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">Panel interno</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Cotizaciones</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Página {data.page} · {data.pageSize} por página
              </p>
            </div>
            <Form method="post">
              <input type="hidden" name="intent" value="logout" />
              <Button type="submit" variant="secondary">
                Cerrar sesión
              </Button>
            </Form>
          </div>

          <Form method="get" className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
            <div className="space-y-1">
              <Label htmlFor="q">Filtro de texto (todos los campos)</Label>
              <Input id="q" name="q" defaultValue={data.search} placeholder="Nombre, email, teléfono, estado, notas..." />
            </div>
            <div className="space-y-1">
              <Label htmlFor="product">Tipo de producto</Label>
              <select
                id="product"
                name="product"
                defaultValue={data.product}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                <option value="">Todos</option>
                {data.products.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>
            </div>
            <input type="hidden" name="sort" value={data.sort} />
            <input type="hidden" name="page" value="1" />
            <div className="sm:self-end">
              <Button type="submit">Aplicar filtros</Button>
            </div>
          </Form>

          {actionData && "formError" in actionData && (
            <p className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {actionData.formError}
            </p>
          )}

          <div className="mt-6 overflow-x-auto rounded-xl border border-border/80">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/60">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Cliente</th>
                  <th className="px-4 py-3 font-semibold">Contacto</th>
                  <th className="px-4 py-3 font-semibold">Producto</th>
                  <th className="px-4 py-3 font-semibold">Cantidad</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                  <th className="px-4 py-3 font-semibold">
                    <Link className="underline decoration-dotted underline-offset-4 hover:text-primary" to={sortHref}>
                      Fecha {data.sort === "oldest" ? "↑" : "↓"}
                    </Link>
                  </th>
                  <th className="px-4 py-3 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.quotes.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No hay cotizaciones que coincidan con los filtros.
                    </td>
                  </tr>
                )}
                {data.quotes.map((quote) => {
                  const from = `/admin?${new URLSearchParams({
                    page: String(data.page),
                    sort: data.sort,
                    q: data.search,
                    product: data.product,
                  }).toString()}`;
                  return (
                    <tr key={quote.id} className="border-t border-border/70 align-top">
                      <td className="px-4 py-3">
                        <p className="font-semibold">{quote.name}</p>
                        <p className="text-muted-foreground">{quote.company || "Sin empresa"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p>{quote.email}</p>
                        <p className="text-muted-foreground">{quote.phone}</p>
                      </td>
                      <td className="px-4 py-3">{quote.product}</td>
                      <td className="px-4 py-3">{quote.quantity}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={quote.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Intl.DateTimeFormat("es-HN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(quote.createdAt))}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-2">
                          <Form method="post">
                            <input type="hidden" name="intent" value="set-status" />
                            <input type="hidden" name="quoteId" value={quote.id} />
                            <input type="hidden" name="status" value="reviewed" />
                            <input type="hidden" name="from" value={from} />
                            <Button type="submit" variant="secondary" size="sm" disabled={quote.status === "reviewed"}>
                              Marcar revisada
                            </Button>
                          </Form>
                          <Link
                            className="text-primary underline decoration-dotted underline-offset-4"
                            to={`/admin/${quote.id}?${new URLSearchParams({ from }).toString()}`}
                          >
                            Ver detalle
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              Mostrando hasta {data.pageSize} filas por página.
            </div>
            <div className="flex items-center gap-2">
              {data.hasPrevPage ? (
                <Link
                  className="rounded-md border border-border px-3 py-1.5 hover:bg-muted"
                  to={`/admin?${new URLSearchParams({
                    page: String(data.page - 1),
                    sort: data.sort,
                    q: data.search,
                    product: data.product,
                  }).toString()}`}
                >
                  Anterior
                </Link>
              ) : (
                <span className="rounded-md border border-border/60 px-3 py-1.5 text-muted-foreground">Anterior</span>
              )}
              {data.hasNextPage ? (
                <Link
                  className="rounded-md border border-border px-3 py-1.5 hover:bg-muted"
                  to={`/admin?${new URLSearchParams({
                    page: String(data.page + 1),
                    sort: data.sort,
                    q: data.search,
                    product: data.product,
                  }).toString()}`}
                >
                  Siguiente
                </Link>
              ) : (
                <span className="rounded-md border border-border/60 px-3 py-1.5 text-muted-foreground">Siguiente</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
