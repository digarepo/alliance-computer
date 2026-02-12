import { Outlet, useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { requireUser } from '@/modules/auth/require-user.server';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';

/**
 * Global protector for all /admin routes.
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request);
  return { user };
};

export default function AdminLayoutRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <AdminLayout user={user}>
      <Outlet />
    </AdminLayout>
  );
}
