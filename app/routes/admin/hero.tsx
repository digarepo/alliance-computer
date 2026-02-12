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
import { Layout, Plus, ArrowLeft } from 'lucide-react';

// Logic & Auth
import { requireUser } from '@/modules/auth/require-user.server';

// Components
import { Button } from '@/components/ui/button';
import {
  HeroTable,
  type HeroRow,
} from '@/components/admin/hero/heroTableModule';
import { HeroForm } from '@/components/admin/hero/HeroForm';

/**
 * Loader for the Hero Admin route.
 * Orchestrates data fetching via the Model layer.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const { getHeroData, getStatuses } =
    await import('@/modules/CMS/hero/hero.model.server');

  await requireUser(request, 'hero:manage');

  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const isNew = url.searchParams.has('new');

  // Fetch data: Admin panel needs all slides (onlyPublished = false)
  const [heroesRaw, statuses] = await Promise.all([
    getHeroData(false),
    getStatuses(),
  ]);

  /**
   * Map database row structure to the frontend Table's expected HeroRow format.
   */
  const heroes: HeroRow[] = heroesRaw.map((h) => ({
    id: h.id,
    title: h.title,
    emphasis: h.emphasis,
    category: h.category,
    statusKey: h.status_name || 'Draft',
    image_url: h.imageUrl,
    link: h.link,
    updated_at: h.created_at,
  }));

  const selectedHero = id ? heroesRaw.find((h) => h.id === id) : null;

  return { heroes, selectedHero, statuses, isEditing: !!id || isNew };
}

/**
 * Action handler for Hero management.
 * Delegates database writes to Service and Model layers.
 */
export async function action({ request }: ActionFunctionArgs) {
  const { saveHero } = await import('@/modules/CMS/hero/hero.service.server');
  const { deleteHero } = await import('@/modules/CMS/hero/hero.model.server');

  await requireUser(request, 'hero:manage');

  const formData = await request.formData();
  const intent = formData.get('intent');
  const id = formData.get('id') as string | null;

  try {
    if (intent === 'delete' && id) {
      await deleteHero(id);
      return redirect('/admin/hero?success=deleted');
    }

    await saveHero(id, formData);
    return redirect('/admin/hero?success=saved');
  } catch (error: any) {
    return { error: error.message };
  }
}

/**
 * AdminHero Component.
 * Master-Detail view for Hero Slide management.
 */
export default function AdminHero() {
  const { heroes, selectedHero, statuses, isEditing } =
    useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Handle Success Toasts via URL params
  React.useEffect(() => {
    const successAction = searchParams.get('success');
    if (successAction) {
      if (successAction === 'saved') toast.success('Slide saved successfully');
      if (successAction === 'deleted') toast.error('Slide deleted permanently');

      // Clean URL after toast triggers
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
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
            <Layout className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight truncate">
              {isEditing
                ? selectedHero
                  ? 'Edit Slide'
                  : 'New Slide'
                : 'Hero Slider'}
            </h1>
            {!isEditing && (
              <p className="hidden sm:block text-xs text-muted-foreground font-medium">
                Manage landing page sector highlights
              </p>
            )}
          </div>
        </div>

        {!isEditing ? (
          <Button asChild size="sm">
            <Link to="/admin/hero?new">
              <Plus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Add Slide</span>
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/hero">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Link>
          </Button>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="max-w-4xl mx-auto">
          <HeroForm
            defaultValues={selectedHero}
            statuses={statuses}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <div className="w-full">
          <HeroTable data={heroes} />
        </div>
      )}
    </div>
  );
}
