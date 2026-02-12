/**
 * @file app/routes/admin/services.preview.tsx
 * @description Admin-only preview for Service pages.
 * Mimics the public directory layout with live database content.
 */

import * as React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Globe, Drill, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import { requireUser } from '@/modules/auth/require-user.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request, 'services:manage');
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) throw new Response('Service ID Required', { status: 400 });

  const { getServiceById } =
    await import('@/modules/CMS/services/service.model.server');

  // Fetch full detail directly via the new ID-based detail query
  const service = await getServiceById(id);

  if (!service) throw new Response('Service Not Found', { status: 404 });

  return { service };
}

export default function ServicePreview() {
  const { service } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-100 bg-background flex flex-col overflow-hidden font-sans">
      {/* --- ADMINISTRATIVE OVERLAY --- */}
      <header className="shrink-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-slate-900 text-white border-b border-white/10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 h-9 px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Exit Preview
          </Button>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <span className="hidden sm:inline text-[10px] tracking-widest uppercase font-bold opacity-60">
            Preview Mode: {service.name}
          </span>
        </div>
        <Badge
          variant="outline"
          className="border-primary/40 text-primary uppercase text-[10px] tracking-widest px-3"
        >
          Live Render
        </Badge>
      </header>

      {/* --- PREVIEW CANVAS --- */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
          {/* HERO SECTION */}
          <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="container max-w-7xl mx-auto px-6 lg:px-8">
              <div className="max-w-2xl">
                <nav className="flex items-center gap-2 mb-4 text-primary font-bold tracking-[0.2em] text-[10px] uppercase">
                  <Globe className="h-3 w-3" />
                  <span>{service.eyebrow}</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
                  {service.name} <br />
                  <span className="text-primary italic">
                    {service.emphasis}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* DYNAMIC SECTIONS MAPPING */}
          {service.sections?.map((section, index) => (
            <React.Fragment key={section.id || index}>
              <section
                className={cn(
                  index % 2 !== 0 ? 'bg-muted/20' : 'bg-background',
                )}
              >
                <div
                  className={cn(
                    'flex flex-col lg:items-stretch',
                    section.is_reversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
                  )}
                >
                  {/* Image Column */}
                  <div className="w-full lg:w-[60%] relative h-75 md:h-125 lg:h-150">
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-20 relative py-12 md:py-24">
                    <div className="max-w-md">
                      <div className="h-1 w-12 bg-primary mb-8" />

                      {/* Hardcoded icons based on section order to ensure design consistency */}
                      {index === 0 ? (
                        <Drill className="h-8 w-8 text-primary mb-4" />
                      ) : (
                        <Server className="h-8 w-8 text-primary mb-4" />
                      )}

                      <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                        {section.description}
                      </p>

                      {/* Features List */}
                      {section.features && section.features.length > 0 && (
                        <ul className="grid grid-cols-1 gap-3 mb-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                          {section.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-center gap-2"
                            >
                              <div className="h-1 w-1 bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Button
                        variant="outline"
                        className="rounded-full border-primary text-primary h-12 px-8 text-xs uppercase tracking-[0.2em] font-bold pointer-events-none"
                      >
                        <span className="flex items-center gap-2">
                          Explore Sector <ArrowRight className="h-3 w-3" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
              <Separator className="opacity-50" />
            </React.Fragment>
          ))}

          {/* PREVIEW FOOTER PLACEHOLDER */}
          <div className="bg-slate-50 p-12 text-center">
            <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase font-bold">
              End of Page Preview
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
