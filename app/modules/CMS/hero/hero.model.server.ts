/**
 * Database operations for the Hero section.
 * Aligned with the Alliance Home Page slider requirements.
 */
import { query } from "@/lib/db.server";
import crypto from "crypto";

export type HeroRow = {
  id: string;
  category: string;      // maps to button_text in DB
  title: string;         // maps to title in DB
  emphasis: string;      // maps to emphasis in DB
  description: string;   // maps to subtitle in DB
  imageUrl: string;      // maps to image_url in DB
  link: string;          // maps to button_link in DB
  status_id: string;
  status_name?: string;
  created_at: string;
};

/**
 * Fetches the Hero section data, joining with statuses.
 * @param {boolean} onlyPublished - If true, filters by 'published' status (Public site).
 * If false, returns all records (Admin panel).
 */
export async function getHeroData(onlyPublished = false): Promise<HeroRow[]> {
  const whereClause = onlyPublished ? "WHERE s.name = 'published'" : "";

  return query<HeroRow>(
    `SELECT
      h.id,
      h.button_text AS category,
      h.title,
      h.emphasis,
      h.subtitle AS description,
      h.image_url AS imageUrl,
      h.button_link AS link,
      h.status_id,
      s.name AS status_name,
      h.created_at
     FROM hero_sections h
     JOIN statuses s ON h.status_id = s.id
     ${whereClause}
     ORDER BY h.created_at ASC`
  );
}

/**
 * Fetches all available statuses for selection in the Hero form.
 */
export async function getStatuses(): Promise<{ id: string; name: string }[]> {
  return query<{ id: string; name: string }>(
    "SELECT id, name FROM statuses ORDER BY name ASC"
  );
}

/**
 * Updates an existing Hero section.
 */
export async function updateHero(id: string, data: Partial<HeroRow>) {
  return query(
    `UPDATE hero_sections SET
      title = ?, emphasis = ?, subtitle = ?,
      image_url = ?, button_text = ?, button_link = ?, status_id = ?
     WHERE id = ?`,
    [
      data.title, data.emphasis, data.description,
      data.imageUrl, data.category, data.link,
      data.status_id, id
    ]
  );
}

/**
 * Creates a new Hero section with a fresh UUID.
 */
export async function createHero(data: Omit<HeroRow, 'id' | 'created_at'>) {
  const id = crypto.randomUUID();
  return query(
    `INSERT INTO hero_sections
      (id, title, emphasis, subtitle, image_url, button_text, button_link, status_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, data.title, data.emphasis, data.description,
      data.imageUrl, data.category, data.link, data.status_id
    ]
  );
}

/**
 * Deletes a Hero section record.
 */
export async function deleteHero(id: string) {
  return query("DELETE FROM hero_sections WHERE id = ?", [id]);
}
