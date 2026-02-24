import { createCookie } from "react-router";

const ADMIN_SESSION_COOKIE_NAME = "__admin_session";
const SESSION_TTL_SECONDS = 60 * 15;

type AdminSessionPayload = {
  authenticated: true;
  expiresAt: number;
};

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("Set ADMIN_PASSWORD (and ideally ADMIN_SESSION_SECRET) to enable /admin access.");
  }
  return secret;
}

function getAdminPassword() {
  const value = process.env.ADMIN_PASSWORD;
  if (!value) {
    throw new Error("ADMIN_PASSWORD is not set.");
  }
  return value;
}

function getAdminSessionCookie() {
  return createCookie(ADMIN_SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    secrets: [getAdminSessionSecret()],
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function isValidAdminPassword(password: string) {
  return password === getAdminPassword();
}

export async function readAdminSession(request: Request): Promise<AdminSessionPayload | null> {
  const adminSessionCookie = getAdminSessionCookie();
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const parsed = (await adminSessionCookie.parse(cookieHeader)) as AdminSessionPayload | undefined;
  if (!parsed || parsed.authenticated !== true) return null;
  if (parsed.expiresAt <= Date.now()) return null;
  return parsed;
}

export async function createAdminSessionCookie() {
  const adminSessionCookie = getAdminSessionCookie();
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  return adminSessionCookie.serialize({ authenticated: true, expiresAt });
}

export async function destroyAdminSessionCookie() {
  const adminSessionCookie = getAdminSessionCookie();
  return adminSessionCookie.serialize("", { maxAge: 0, expires: new Date(0) });
}
