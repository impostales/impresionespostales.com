import { promises as fs } from "fs";
import path from "path";
import { Prisma, type QuoteStatus } from "@prisma/client";
import { prisma } from "~/server/db";

type Quote = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  product: string;
  quantity: number;
  notes?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  referenceImagePath?: string;
};

const DATA_DIR = path.join(process.cwd(), "temp");

function toNullableString(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function saveQuote(input: Quote) {
  return prisma.quoteSubmission.create({
    data: {
      name: input.name,
      company: toNullableString(input.company),
      email: input.email,
      phone: input.phone,
      product: input.product,
      quantity: input.quantity,
      notes: toNullableString(input.notes),
      instagram: toNullableString(input.instagram),
      facebook: toNullableString(input.facebook),
      tiktok: toNullableString(input.tiktok),
      referenceImagePath: toNullableString(input.referenceImagePath),
    },
  });
}

export async function saveUploadedImage(file: File | null): Promise<string | undefined> {
  if (!file) return undefined;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = path.join(DATA_DIR, "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
  const fullPath = path.join(uploadsDir, safeName);
  await fs.writeFile(fullPath, buffer);
  return path.relative(process.cwd(), fullPath);
}

type ListAdminQuotesInput = {
  page: number;
  pageSize: number;
  search?: string;
  product?: string;
  sort?: "oldest" | "newest";
};

export async function listAdminQuotes(input: ListAdminQuotesInput) {
  const page = Math.max(1, input.page);
  const pageSize = Math.min(100, Math.max(1, input.pageSize));
  const search = input.search?.trim() ?? "";
  const product = input.product?.trim() ?? "";
  const sort = input.sort === "newest" ? "newest" : "oldest";
  const searchNumber = Number(search);
  const searchDate = search ? new Date(search) : null;

  const where: Prisma.QuoteSubmissionWhereInput = {
    ...(product ? { product } : {}),
    ...(search
      ? {
          OR: [
            { id: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { company: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { product: { contains: search, mode: "insensitive" } },
            { notes: { contains: search, mode: "insensitive" } },
            { instagram: { contains: search, mode: "insensitive" } },
            { facebook: { contains: search, mode: "insensitive" } },
            { tiktok: { contains: search, mode: "insensitive" } },
            { referenceImagePath: { contains: search, mode: "insensitive" } },
            ...(Number.isFinite(searchNumber) ? [{ quantity: Math.trunc(searchNumber) }] : []),
            ...(search.toLowerCase() === "pending" || search.toLowerCase() === "pendiente"
              ? [{ status: "pending" as QuoteStatus }]
              : []),
            ...(search.toLowerCase() === "reviewed" || search.toLowerCase() === "revisada"
              ? [{ status: "reviewed" as QuoteStatus }]
              : []),
            ...(searchDate && !Number.isNaN(searchDate.getTime())
              ? [
                  {
                    createdAt: {
                      gte: new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate()),
                      lt: new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate() + 1),
                    },
                  },
                ]
              : []),
          ],
        }
      : {}),
  };

  const quotesWithSentinel = await prisma.quoteSubmission.findMany({
    where,
    orderBy: { createdAt: sort === "newest" ? "desc" : "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize + 1,
    select: {
      id: true,
      name: true,
      company: true,
      email: true,
      phone: true,
      product: true,
      quantity: true,
      status: true,
      createdAt: true,
    },
  });

  const hasNextPage = quotesWithSentinel.length > pageSize;
  const quotes = hasNextPage ? quotesWithSentinel.slice(0, pageSize) : quotesWithSentinel;

  return {
    page,
    pageSize,
    hasPrevPage: page > 1,
    hasNextPage,
    quotes,
  };
}

export async function getQuoteById(id: string) {
  return prisma.quoteSubmission.findUnique({ where: { id } });
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  return prisma.quoteSubmission.update({
    where: { id },
    data: { status },
  });
}
