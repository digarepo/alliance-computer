import { createCookieSessionStorage, redirect } from "react-router";
import { query } from "@/lib/db.server";

/**
 * Configure cookie-based session storage.
 */
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__alliance_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET || "default_secret_change_me"],
    maxAge: 60 * 60 * 24 * 7,
  },
});

/**
 * Shape of the user data stored within the session cookie.
 */
export type SessionUser = {
  id: string;
  email: string;
  full_name: string;
  permissions: string[];
  roles?: string[];
};

/**
 * Fetches all unique permission keys for a given user.
 */
export async function getUserPermissions(userId: string): Promise<string[]> {
  const rows = await query<{ name: string }>(
    `SELECT DISTINCT p.name
     FROM permissions p
     JOIN role_permissions rp ON rp.permission_id = p.id
     JOIN user_roles ur ON ur.role_id = rp.role_id
     WHERE ur.user_id = ?`,
    [userId]
  );

  return rows.map(row => row.name);
}

/**
 * Creates a new session, commits the user data to a cookie, and redirects.
 */
export async function createUserSession(user: SessionUser, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("user", user);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

/**
 * Retrieves the session user from the request headers.
 */
export async function getUserFromSession(request: Request): Promise<SessionUser | null> {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);
  const user = session.get("user");

  return user || null;
}

/**
 * Destroys the session and redirects to sign-in.
 */
export async function destroySession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/admin/signin", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
