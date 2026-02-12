import { query } from "@/lib/db.server";

export type StatusRow = {
  id: string;
  name: string;
};

/**
 * Fetches all available content statuses.
 */
export async function getAllStatuses(): Promise<StatusRow[]> {
  return query<StatusRow>("SELECT id, name FROM statuses ORDER BY name ASC");
}
