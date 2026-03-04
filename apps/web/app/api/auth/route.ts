import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "md_auth_token";
const ONE_DAY_SECONDS = 60 * 60 * 24;

function getEnvCredentials() {
  const username = process.env.AUTH_USERNAME ?? "";
  const password = process.env.AUTH_PASSWORD ?? "";
  return { username, password };
}

function signToken(username: string, password: string) {
  return createHmac("sha256", password).update(username).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const { username, password } = getEnvCredentials();

  if (!token || !username || !password) return false;

  const expectedToken = signToken(username, password);
  return safeEqual(token, expectedToken);
}

export async function GET() {
  return NextResponse.json({ authenticated: await isAuthenticated() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = body?.username;
  const password = body?.password;
  const envCredentials = getEnvCredentials();

  if (!envCredentials.username || !envCredentials.password) {
    return NextResponse.json(
      { message: "Server auth credentials are not configured." },
      { status: 500 },
    );
  }

  if (
    username !== envCredentials.username ||
    password !== envCredentials.password
  ) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: signToken(envCredentials.username, envCredentials.password),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
