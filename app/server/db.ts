import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

function decodePrismaDevDatabaseUrl(url: string): string {
  if (!url.startsWith("prisma+postgres://")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const apiKey = parsed.searchParams.get("api_key");
    if (!apiKey) {
      throw new Error("Missing api_key");
    }

    const payload = JSON.parse(Buffer.from(apiKey, "base64").toString("utf8")) as {
      databaseUrl?: string;
    };
    if (!payload.databaseUrl) {
      throw new Error("Missing databaseUrl in api_key payload");
    }

    return payload.databaseUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid Prisma Dev DATABASE_URL: ${message}`);
  }
}

const adapter = new PrismaPg({ connectionString: decodePrismaDevDatabaseUrl(connectionString) });

export const prisma =
  globalThis.__prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
