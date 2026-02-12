/**
 * Logout action for the Alliance Admin Portal.
 * Destroys the cookie and clears user permissions from the browser.
 */
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { destroySession } from '@/modules/auth/session.server';

/**
 * Handles POST requests (e.g., from the Sidebar logout button)
 */
export async function action({ request }: ActionFunctionArgs) {
  return destroySession(request);
}

/**
 * Handles direct GET requests.
 * Even if someone just types /admin/signout in the URL, we should kick them out.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  return destroySession(request);
}

export default function AdminSignout() {
  return null;
}
