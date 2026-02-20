import { promises as fs } from "fs";
import path from "path";
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

