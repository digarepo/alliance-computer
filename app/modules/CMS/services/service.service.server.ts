import * as ServiceModel from "./service.model.server";

export async function saveService(id: string | null, formData: FormData) {
  const servicePayload = {
    name: formData.get("name") as string,
    eyebrow: formData.get("eyebrow") as string,
    emphasis: formData.get("emphasis") as string,
    description: formData.get("description") as string,
    hero_image: formData.get("hero_image") as string,
    status_id: formData.get("status_id") as string,
  };

  // Validation: Slug removed, eyebrow and name are now the keys
  if (!servicePayload.name || !servicePayload.eyebrow || !servicePayload.status_id) {
    throw new Error("Title, Eyebrow text, and Visibility status are required.");
  }

  const sectionsRaw = formData.get("sections_json") as string;
  let sections = [];
  try {
    sections = sectionsRaw ? JSON.parse(sectionsRaw) : [];
  } catch (e) {
    console.error("Failed to parse sections JSON", e);
  }

  if (id && id !== "null" && id !== "") {
    return ServiceModel.updateService(id, servicePayload, sections);
  } else {
    return ServiceModel.createService(servicePayload, sections);
  }
}
