import { redirect } from "react-router";
import { getUserFromSession } from "./session.server";

/**
 * Middleware: Protects routes by ensuring a user is authenticated and authorized.
 * * @param request - The incoming fetch Request object.
 * @param requiredPermission - Optional. The permission key required (e.g., 'portfolio:edit').
 * * @throws {Response} 302 Redirect to signin if the user is not logged in.
 * @throws {Response} 403 Forbidden if the user lacks the required permission.
 * * @returns {Promise<SessionUser>} The authenticated user object from the session.
 */
export async function requireUser(request: Request, requiredPermission?: string) {
  const user = await getUserFromSession(request);

  // 1. Authentication Check
  if (!user) {
    throw redirect("/admin/signin");
  }

  // 2. Authorization Check
  if (requiredPermission) {
    const isAuthorized =
      user.permissions.includes("system:super") ||
      user.permissions.includes(requiredPermission);

    if (!isAuthorized) {
      throw new Response("Forbidden: You do not have permission to access this resource.", {
        status: 403,
        statusText: "Forbidden",
      });
    }
  }

  return user;
}
