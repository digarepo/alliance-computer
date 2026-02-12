import * as SectorModel from "./sector.model.server";

export async function saveSector(slug: string, formData: FormData) {
  // Extracting fields - prioritizing the hidden status_id input
  const payload = {
    hero_title_main: formData.get("hero_title_main") as string,
    hero_title_italic: formData.get("hero_title_italic") as string,
    hero_description: formData.get("hero_description") as string,
    hero_image: formData.get("hero_image") as string,
    hero_eyebrow: formData.get("hero_eyebrow") as string,
    portfolio_title: formData.get("portfolio_title") as string,
    portfolio_description: formData.get("portfolio_description") as string,
    status_id: (formData.get("status_id") || formData.get("status_id_select")) as string,
  };

  // Validation
  if (!payload.hero_title_main || !payload.status_id) {
    throw new Error("Hero Title and Visibility status are required.");
  }

  const sectionsRaw = formData.get("sections_json") as string;
  let sections = [];
  try {
    sections = sectionsRaw ? JSON.parse(sectionsRaw) : [];
  } catch (e) {
    console.error("Failed to parse sections JSON", e);
    throw new Error("Invalid format for category sections.");
  }

  return SectorModel.updateSector(slug, payload, sections);
}
