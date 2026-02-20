import { execSync } from "node:child_process";

const DEFAULT_INSTANCE = "impresionespostales";
const targetInstance = process.env.PRISMA_DEV_INSTANCE || DEFAULT_INSTANCE;

function decodeApiKeyPayload(url) {
  const parsed = new URL(url);
  const apiKey = parsed.searchParams.get("api_key");
  if (!apiKey) return null;
  try {
    const json = Buffer.from(apiKey, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function extractPrismaUrls(output) {
  const urls = output.match(/prisma\+postgres:\/\/[^\s\x07]+/g) || [];
  return urls
    .map((url) => ({ url, payload: decodeApiKeyPayload(url) }))
    .filter((entry) => !!entry.payload?.databaseUrl && !!entry.payload?.name);
}

function pickUrl(urls, instanceName) {
  for (const entry of urls) {
    const { payload } = entry;
    if (payload?.name === instanceName) {
      return entry;
    }
  }
  return null;
}

function getPrismaDevUrl(instanceName) {
  const output = execSync("pnpm prisma dev ls", { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const urls = extractPrismaUrls(output);
  if (!urls.length) {
    throw new Error("No Prisma Dev URL found. Start it with `pnpm prisma:dev`.");
  }

  const instance = pickUrl(urls, instanceName);
  if (instance) {
    return {
      prismaUrl: instance.url,
      databaseUrl: instance.payload.databaseUrl,
      shadowDatabaseUrl: instance.payload.shadowDatabaseUrl ?? null,
    };
  }

  throw new Error(
    `No Prisma Dev URL found for instance "${instanceName}". Set PRISMA_DEV_INSTANCE or run \`pnpm prisma dev -d -n ${instanceName}\`.`
  );
}

try {
  process.stdout.write(JSON.stringify(getPrismaDevUrl(targetInstance)));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
