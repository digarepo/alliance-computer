import * as React from 'react';
import { Link, useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { ArrowRight, Drill, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BottomCTA } from '@/components/public/bottom-cta';
import { cn } from '@/lib/utils';

// Static Fallback Content
const STATIC_CONTENT = {
  eyebrow: 'Operational Excellence',
  name: 'Equipment &',
  emphasis: 'Infrastructure Supply.',
  description:
    'Alliance provides enterprise-grade technology solutions for geophysical exploration and digital architecture.',
  sections: [
    {
      title: 'Geophysical Instrumentation',
      description:
        'Specialized supply of resistivity meters, seismic sensors, and borehole logging systems for subsurface exploration.',
      image_url:
        'https://guidelinegeo.com/wp-content/uploads/2025/08/PowerAdapter1_web-1536x866-1.png',
      features: ['Resistivity Systems', 'Borehole Logging'],
      is_reversed: false,
    },
    {
      title: 'Enterprise IT Infrastructure',
      description:
        'Hardware supply for modern digital cores. Datacenter server nodes, storage, and networking appliances.',
      image_url:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000',
      features: ['Server Nodes', 'Network Security'],
      is_reversed: true,
    },
  ],
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { getAllServices, getServiceById } =
    await import('@/modules/CMS/services/service.model.server');

  // 1. Get all services to find the published one
  const allServices = await getAllServices();
  const publishedService = allServices.find(
    (s) => s.status_label?.toLowerCase() === 'published',
  );

  // 2. If one is published, fetch full details (including sections)
  if (publishedService) {
    const fullService = await getServiceById(publishedService.id);
    if (fullService) return { service: fullService };
  }

  // 3. Fallback to static if nothing is published
  return { service: STATIC_CONTENT };
}

export default function ServicesPage() {
  const { service } = useLoaderData<typeof loader>();

  return (
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
              <span className="text-primary italic">{service.emphasis}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* DYNAMIC SECTIONS MAPPING */}
      {service.sections?.map((section: any, index: number) => {
        // Hardcoded paths for the two specific sectors
        const sectorPath =
          index === 0 ? '/services/geophysical' : '/services/it-infrastructure';

        return (
          <React.Fragment key={index}>
            <section
              className={cn(index % 2 !== 0 ? 'bg-muted/20' : 'bg-background')}
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
                <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 md:p-16 lg:p-20 relative py-12 md:py-24 overflow-hidden">
                  <div className="max-w-md">
                    <div className="h-1 w-12 bg-primary mb-8" />

                    {index === 0 ? (
                      <Drill className="h-8 w-8 text-primary mb-4" />
                    ) : (
                      <Server className="h-8 w-8 text-primary mb-4" />
                    )}

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight whitespace-pre-line">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Features List */}
                    {section.features && section.features.length > 0 && (
                      <ul className="grid grid-cols-1 gap-3 mb-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {section.features.map(
                          (feature: string, fIndex: number) => (
                            <li
                              key={fIndex}
                              className="flex items-center gap-2"
                            >
                              <div className="h-1 w-1 bg-primary" />
                              {feature}
                            </li>
                          ),
                        )}
                      </ul>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-colors h-12 px-8 text-xs uppercase tracking-[0.2em] font-bold"
                    >
                      <Link to={sectorPath} className="flex items-center gap-2">
                        Explore Sector <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <Separator className="opacity-50" />
          </React.Fragment>
        );
      })}

      <BottomCTA />
    </div>
  );
}
