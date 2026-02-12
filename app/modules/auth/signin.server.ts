/**
 * Signin related database operations for Alliance.
 * Aggregates Roles and Permissions into the session for RBAC enforcement.
 */

import { query } from "../../lib/db.server";
import { verifyPassword } from "./password.server";
import type { SessionUser } from "./session.server";

/**
 * Raw row result from the MariaDB query.
 */
type SignInUserRow = {
  id: string;
  email: string;
  full_name: string;
  password_hash: string;
  permission_list: string;
};

/**
 * Authenticates a user and prepares the SessionUser object.
 * * @param email - User's login email
 * @param password - Plaintext password from login form
 * @returns {Promise<SessionUser | null>} User data for session or null if failed
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const rows = await query<SignInUserRow>(
    `
    SELECT
      u.id,
      u.full_name,
      u.email,
      u.password_hash,
      GROUP_CONCAT(DISTINCT p.name) AS permission_list
    FROM users u
    LEFT JOIN user_roles ur ON ur.user_id = u.id
    LEFT JOIN role_permissions rp ON rp.role_id = ur.role_id
    LEFT JOIN permissions p ON p.id = rp.permission_id
    WHERE u.email = ? AND u.is_active = 1
    GROUP BY u.id
    `,
    [email]
  );

  if (rows.length === 0) return null;

  const user = rows[0];

  // 1. Verify credentials using Argon2
  const isValid = await verifyPassword(user.password_hash, password);
  if (!isValid) return null;

  // 2. Format and return the session-ready object
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    // Split the comma-separated permissions or return empty array
    permissions: user.permission_list ? user.permission_list.split(",") : [],
  };
}
