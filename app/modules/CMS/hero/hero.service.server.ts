import * as HeroModel from "./hero.model.server";

/**
 * Logic for managing Hero content.
 * Validates inputs and ensures business rules are followed.
 */

/**
 * Retrieves the most recent Hero section configuration for public display.
 * Filters for 'published' status by default.
 * @returns {Promise<HeroModel.HeroRow | null>}
 */
export async function getHero(): Promise<HeroModel.HeroRow | null> {
  const heroes = await HeroModel.getHeroData(true);
  return heroes[0] || null;
}

/**
 * Saves or updates Hero section data from a form submission.
 * Handles the mapping between Form/Service keys and Model keys.
 * * @param {string | null} id - The UUID of the hero section (null for new).
 * @param {FormData} formData - The submitted form data.
 */
export async function saveHero(id: string | null, formData: FormData) {
  const payload = {
    title: formData.get("title") as string,
    emphasis: formData.get("emphasis") as string,
    description: formData.get("description") as string,
    imageUrl: formData.get("imageUrl") as string,
    category: formData.get("category") as string,
    link: formData.get("link") as string,
    status_id: formData.get("status_id") as string,
  };

  if (!payload.title || !payload.status_id) {
    throw new Error("Title and Visibility Status are required.");
  }

  if (id && id !== "null") {
    return HeroModel.updateHero(id, payload);
  } else {
    return HeroModel.createHero(payload);
  }
}
