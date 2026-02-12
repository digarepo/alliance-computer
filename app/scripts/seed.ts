import { hash } from "argon2";
import { query } from "@/lib/db.server";
import crypto from "crypto";

async function seed() {
  // Config
  const users = [
    { email: "admin@alliancecomputer.co", name: "Alliance Admin", pass: "Admin@2026", role: "admin" },
    { email: "staff@alliancecomputer.co", name: "Field Staff", pass: "Staff@2026", role: "staff" }
  ];

  console.log("🚀 Starting seed...");

  // 1. Setup Roles
  await query(`INSERT IGNORE INTO roles (id, name, description) VALUES
    (UUID(), 'admin', 'System Administrator - Full Access'),
    (UUID(), 'staff', 'Operations Staff - Limited Access')`);

  // 2. Setup Permissions
  const perms = [
    "dashboard:access",
    "hero:manage",
    "services:manage",
    "users:manage",
    "settings:access"
  ];

  for (const permName of perms) {
    await query(`INSERT IGNORE INTO permissions (id, name, description) VALUES (UUID(), ?, ?)`,
    [permName, `Allows ${permName.replace(':', ' ')}`]);
  }

  // 3. Link Permissions to Roles
  // Admin gets everything
  await query(`INSERT IGNORE INTO role_permissions (role_id, permission_id)
               SELECT r.id, p.id FROM roles r CROSS JOIN permissions p WHERE r.name = 'admin'`);

  // Staff gets only Hero and Dashboard
  await query(`INSERT IGNORE INTO role_permissions (role_id, permission_id)
               SELECT r.id, p.id FROM roles r CROSS JOIN permissions p
               WHERE r.name = 'staff' AND p.name IN ('dashboard:access', 'hero:manage')`);

  // 4. Create Users & Assign Roles
  for (const u of users) {
    const passwordHash = await hash(u.pass);
    const userId = crypto.randomUUID();

    // Check if user exists
    const existing = await query("SELECT id FROM users WHERE email = ?", [u.email]);
    if (existing.length === 0) {
      await query(`INSERT INTO users (id, full_name, email, password_hash, is_active) VALUES (?, ?, ?, ?, 1)`,
        [userId, u.name, u.email, passwordHash]);

      await query(`INSERT INTO user_roles (user_id, role_id)
                   SELECT ?, id FROM roles WHERE name = ?`, [userId, u.role]);

      console.log(`✅ Created ${u.role}: ${u.email} / ${u.pass}`);
    } else {
      console.log(`⏩ User ${u.email} already exists, skipping.`);
    }
  }
}

seed().catch(console.error);
