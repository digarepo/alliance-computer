import { query } from "@/lib/db.server";
import crypto from "crypto";

export interface ServiceSection {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon_name: string; // Hardcoded in logic now
  features: string[];
  is_reversed: boolean; // Managed by index now
  order_index: number;
}

export interface ServiceRow {
  id: string;
  name: string;
  eyebrow: string;
  emphasis: string;
  description: string;
  hero_image: string;
  status_id: string;
  status_label?: string;
  sections?: ServiceSection[];
  created_at?: string;
}

export async function getAllServices(): Promise<ServiceRow[]> {
  return query<ServiceRow>(
    `SELECT s.*, st.name as status_label
     FROM services s
     JOIN statuses st ON s.status_id = st.id
     ORDER BY s.created_at DESC`
  );
}

export async function getServiceById(id: string): Promise<ServiceRow | null> {
  const services = await query<ServiceRow>(`SELECT * FROM services WHERE id = ?`, [id]);
  if (services.length === 0) return null;
  const service = services[0];

  const sections = await query<any>(
    `SELECT * FROM service_sections WHERE service_id = ? ORDER BY order_index ASC`,
    [id]
  );

  return {
    ...service,
    sections: sections.map(sec => ({
      ...sec,
      features: typeof sec.features === 'string' ? JSON.parse(sec.features) : (sec.features || []),
      is_reversed: Boolean(sec.is_reversed)
    }))
  };
}

export async function createService(data: any, sections: any[]) {
  const serviceId = crypto.randomUUID();

  await query(
    `INSERT INTO services (id, name, eyebrow, emphasis, description, hero_image, status_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [serviceId, data.name, data.eyebrow, data.emphasis, data.description, data.hero_image, data.status_id]
  );

  for (const [index, section] of sections.entries()) {
    const sectionId = crypto.randomUUID();
    // Logic: Section 1 is Drill/Standard, Section 2 is Server/Reversed
    const icon_name = index === 0 ? 'Drill' : 'Server';
    const is_reversed = index === 1;

    await query(
      `INSERT INTO service_sections (id, service_id, title, description, image_url, icon_name, features, order_index, is_reversed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sectionId, serviceId, section.title, section.description, section.image_url, icon_name, JSON.stringify(section.features), index, is_reversed]
    );
  }
}

export async function updateService(id: string, data: any, sections: any[]) {
  await query(
    `UPDATE services SET name = ?, eyebrow = ?, emphasis = ?, description = ?, hero_image = ?, status_id = ? WHERE id = ?`,
    [data.name, data.eyebrow, data.emphasis, data.description, data.hero_image, data.status_id, id]
  );

  await query(`DELETE FROM service_sections WHERE service_id = ?`, [id]);

  for (const [index, section] of sections.entries()) {
    const sectionId = crypto.randomUUID();
    const icon_name = index === 0 ? 'Drill' : 'Server';
    const is_reversed = index === 1;

    await query(
      `INSERT INTO service_sections (id, service_id, title, description, image_url, icon_name, features, order_index, is_reversed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sectionId, id, section.title, section.description, section.image_url, icon_name, JSON.stringify(section.features), index, is_reversed]
    );
  }
}

export async function deleteService(id: string) {
  return query("DELETE FROM services WHERE id = ?", [id]);
}

export async function getStatuses() {
  return query<{ id: string; name: string }>("SELECT id, name FROM statuses ORDER BY name ASC");
}
