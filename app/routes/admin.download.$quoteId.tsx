import { promises as fs } from "fs";
import path from "path";
import { redirect } from "react-router";
import { readAdminSession } from "~/server/admin-session";
import { getQuoteById } from "~/server/quotes";

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

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
  if (!quote || !quote.referenceImagePath) {
    throw new Response("Archivo no encontrado", { status: 404 });
  }

  const root = process.cwd();
  const absolutePath = path.resolve(root, quote.referenceImagePath);
  if (!absolutePath.startsWith(`${root}${path.sep}`)) {
    throw new Response("Ruta inválida", { status: 400 });
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(absolutePath);
  } catch {
    throw new Response("Archivo no encontrado", { status: 404 });
  }

  const filename = path.basename(absolutePath);
  const url = new URL(request.url);
  const isPreview = url.searchParams.get("mode") === "preview";
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": getContentType(absolutePath),
      "Content-Disposition": isPreview ? `inline; filename="${filename}"` : `attachment; filename="${filename}"`,
      "Cache-Control": "private, max-age=60",
    },
  });
}
