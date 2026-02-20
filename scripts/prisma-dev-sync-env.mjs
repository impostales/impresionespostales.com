import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const envPath = resolve(process.cwd(), ".env");

function upsertEnv(content, key, value) {
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }
  const trimmed = content.trimEnd();
  return `${trimmed}\n${line}\n`;
}

function removeEnvKey(content, key) {
  return content
    .split("\n")
    .filter((line) => !line.startsWith(`${key}=`))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

let envContent = "";
try {
  envContent = readFileSync(envPath, "utf8");
} catch {
  envContent = "";
}

const prismaDevInfoRaw = execFileSync("node", [resolve(process.cwd(), "scripts/prisma-dev-url.mjs")], {
  encoding: "utf8",
}).trim();
const prismaDevInfo = JSON.parse(prismaDevInfoRaw);
const databaseUrl = prismaDevInfo.prismaUrl;

let nextContent = upsertEnv(envContent, "DATABASE_URL", databaseUrl);
nextContent = removeEnvKey(nextContent, "SHADOW_DATABASE_URL");

writeFileSync(envPath, nextContent, "utf8");
process.stdout.write(`Updated .env with Prisma Dev DATABASE_URL for instance "${process.env.PRISMA_DEV_INSTANCE || "impresionespostales"}".\n`);
