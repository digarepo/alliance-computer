/**
 * @file app/routes/admin/services.index.tsx
 */

import * as React from 'react';
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
  Link,
  redirect,
} from 'react-router';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { toast } from 'sonner';
import { Drill, Plus, ArrowLeft } from 'lucide-react';

import { requireUser } from '@/modules/auth/require-user.server';
import { Button } from '@/components/ui/button';

import { ServiceTable } from '@/components/admin/services/ServiceTable';
import { ServiceForm } from '@/components/admin/services/ServiceForm';

export async function loader({ request }: LoaderFunctionArgs) {
  // Added getServiceById to imports
  const { getAllServices, getServiceById, getStatuses } =
    await import('@/modules/CMS/services/service.model.server');
  await requireUser(request, 'services:manage');

  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const isNew = url.searchParams.has('new');

  const [services, statuses] = await Promise.all([
    getAllServices(),
    getStatuses(),
  ]);

  // FIX: Fetch the FULL object from the DB if an ID exists
  // to ensure sections are included for the form.
  let selectedService = null;
  if (id) {
    selectedService = await getServiceById(id);
  }

  return { services, selectedService, statuses, isEditing: !!id || isNew };
}

export async function action({ request }: ActionFunctionArgs) {
  const { saveService } =
    await import('@/modules/CMS/services/service.service.server');
  const { deleteService } =
    await import('@/modules/CMS/services/service.model.server');
  await requireUser(request, 'services:manage');

  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id') as string | null;

  try {
    if (intent === 'delete' && id) {
      await deleteService(id);
      return redirect('/admin/services?success=deleted');
    }
    await saveService(id, formData);
    return redirect('/admin/services?success=saved');
  } catch (error: any) {
    // Return error message so toast can catch it
    return { error: error.message };
  }
}

export default function AdminServices() {
  const data = useLoaderData<typeof loader>();
  // Handle action data for error reporting
  const { services, selectedService, statuses, isEditing } = data;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  React.useEffect(() => {
    const successAction = searchParams.get('success');

    if (successAction) {
      // Clear the loading toast immediately
      toast.dismiss('service-save');

      if (successAction === 'saved')
        toast.success('Service updated successfully');
      if (successAction === 'deleted') toast.error('Service removed');

      setSearchParams(
        (prev) => {
          prev.delete('success');
          return prev;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="container mx-auto py-4 md:py-8 space-y-6 px-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Drill className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            {isEditing ? 'Service Details' : 'Sectors & Services'}
          </h1>
        </div>

        {!isEditing ? (
          <Button asChild size="sm">
            <Link to="/admin/services?new">
              <Plus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">New Service</span>
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/services">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Link>
          </Button>
        )}
      </div>

      {isEditing ? (
        <ServiceForm
          defaultValues={selectedService}
          statuses={statuses}
          isSubmitting={isSubmitting}
        />
      ) : (
        <ServiceTable data={services} />
      )}
    </div>
  );
}
