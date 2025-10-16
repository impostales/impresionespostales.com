import { promises as fs } from "fs";
import path from "path";

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
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "temp");
const DATA_FILE = path.join(DATA_DIR, "quotes.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function saveQuote(input: Omit<Quote, "createdAt">) {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const list: Quote[] = JSON.parse(raw || "[]");
  const quote: Quote = { ...input, createdAt: new Date().toISOString() };
  list.push(quote);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return quote;
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


