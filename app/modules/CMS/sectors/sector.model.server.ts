import { query } from "@/lib/db.server";
import crypto from "crypto";

export async function getSectorBySlug(slug: string) {
  const sectors = await query<any>(`
    SELECT
      sd.*,
      s.name as status_label
    FROM sector_details sd
    LEFT JOIN statuses s ON sd.status_id = s.id
    WHERE sd.slug = ?`,
    [slug]
  );

  if (sectors.length === 0) return null;
  const sector = sectors[0];

  const sections = await query<any>(
    `SELECT * FROM sector_sections WHERE sector_id = ? ORDER BY order_index ASC`,
    [sector.id]
  );

  return {
    ...sector,
    sections: sections.map(sec => ({
      ...sec,
      features: typeof sec.features === 'string' ? JSON.parse(sec.features) : (sec.features || [])
    }))
  };
}

export async function updateSector(slug: string, data: any, sections: any[]) {
  const existing = await query<any>(`SELECT id FROM sector_details WHERE slug = ?`, [slug]);
  let sectorId = existing[0]?.id;

  if (!sectorId) {
    sectorId = crypto.randomUUID();
    await query(
      `INSERT INTO sector_details (id, slug, hero_title_main, hero_title_italic, hero_description, hero_image, hero_eyebrow, portfolio_title, portfolio_description, status_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sectorId, slug, data.hero_title_main, data.hero_title_italic, data.hero_description, data.hero_image, data.hero_eyebrow, data.portfolio_title, data.portfolio_description, data.status_id]
    );
  } else {
    await query(
      `UPDATE sector_details SET
        hero_title_main=?,
        hero_title_italic=?,
        hero_description=?,
        hero_image=?,
        hero_eyebrow=?,
        portfolio_title=?,
        portfolio_description=?,
        status_id=?
       WHERE id=?`,
      [
        data.hero_title_main,
        data.hero_title_italic,
        data.hero_description,
        data.hero_image,
        data.hero_eyebrow,
        data.portfolio_title,
        data.portfolio_description,
        data.status_id,
        sectorId
      ]
    );
  }

  await query(`DELETE FROM sector_sections WHERE sector_id = ?`, [sectorId]);

  for (const [index, sec] of sections.entries()) {
    await query(
      `INSERT INTO sector_sections (id, sector_id, title, description, image_url, features, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), sectorId, sec.title, sec.description, sec.image_url, JSON.stringify(sec.features), index]
    );
  }
}
