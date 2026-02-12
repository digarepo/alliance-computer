import {
  useLoaderData,
  useNavigation,
  Link,
  redirect,
  useActionData,
  useSearchParams,
} from 'react-router';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import {
  Drill,
  Server,
  ArrowRight,
  Settings2,
  CheckCircle2,
} from 'lucide-react';
import { requireUser } from '@/modules/auth/require-user.server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SectorForm } from '@/components/admin/sectors/SectorForm';
import { Badge } from '@/components/ui/badge';

export async function loader({ request }: LoaderFunctionArgs) {
  const { getSectorBySlug } =
    await import('@/modules/CMS/sectors/sector.model.server');
  const { getStatuses } =
    await import('@/modules/CMS/services/service.model.server');
  await requireUser(request, 'services:manage');

  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const [statuses] = await Promise.all([getStatuses()]);

  let selectedSector = null;
  if (type) {
    selectedSector = await getSectorBySlug(type);
  }

  return { selectedSector, statuses, activeType: type };
}

export async function action({ request }: ActionFunctionArgs) {
  const { saveSector } =
    await import('@/modules/CMS/sectors/sector.service.server');
  await requireUser(request, 'services:manage');

  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const formData = await request.formData();

  try {
    await saveSector(type!, formData);
    // Use 'success=1' for a shorter, cleaner check
    return redirect(`/admin/sectors?type=${type}&success=1`);
  } catch (error: any) {
    return { error: error.message || 'Failed to save changes' };
  }
}

export default function AdminSectors() {
  const { selectedSector, statuses, activeType } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<any>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const sectorConfigs = [
    {
      id: 'geophysical',
      name: 'Geophysical Instrumentation',
      desc: 'Groundwater, mineral exploration & borehole systems.',
      icon: Drill,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'it-infrastructure',
      name: 'IT Infrastructure',
      desc: 'Servers, networking & datacenter hardware.',
      icon: Server,
      color: 'text-blue-600 bg-blue-50',
    },
  ];

  return (
    <div className="container mx-auto py-4 md:py-8 space-y-8 px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Sector Page Management
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage singleton content for specialized industry sectors.
        </p>
      </div>

      {!activeType ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {sectorConfigs.map((sector) => (
            <Link key={sector.id} to={`?type=${sector.id}`} className="group">
              <Card className="h-full border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className={`p-3 rounded-xl ${sector.color}`}>
                    <sector.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{sector.name}</CardTitle>
                    <CardDescription>Singleton Page</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {sector.desc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex items-center gap-3">
              <Link
                to="/admin/sectors"
                className="p-2 hover:bg-background rounded-md transition-colors border shadow-sm"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Link>
              <div>
                <span className="text-[10px] uppercase font-bold text-primary/60 block tracking-widest">
                  Active Sector
                </span>
                <span className="font-black capitalize text-lg">
                  {activeType.replace('-', ' ')}
                </span>
              </div>
            </div>
            <Badge variant="outline" className="bg-background gap-2 px-3 py-1">
              <Settings2 className="h-3 w-3" /> CMS Singleton
            </Badge>
          </div>

          <SectorForm
            defaultValues={selectedSector}
            statuses={statuses}
            isSubmitting={isSubmitting}
            actionData={actionData}
            type={activeType}
          />
        </div>
      )}
    </div>
  );
}
