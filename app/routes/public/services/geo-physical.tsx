import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { Drill, Layers, Database, CheckCircle2, Zap } from 'lucide-react';
import { BottomCTA } from '@/components/public/bottom-cta';

// Static Fallback
const STATIC_GEO = {
  hero_eyebrow: 'Technical Excellence',
  hero_title_main: 'Advanced',
  hero_title_italic: 'Geophysical',
  hero_description:
    'From groundwater detection to deep mineral exploration, we provide the instrumentation that defines subsurface clarity.',
  hero_image:
    'https://guidelinegeo.com/wp-content/uploads/2025/08/ABEM-Terrameter-LS-2-heroimage-3-morgans-terrameter-green-fields-and-forest-944x763-1.jpg?v=1764938001',
  portfolio_title: 'Our Equipment Portfolio',
  portfolio_description:
    'Sourcing high-performance field instruments for engineering, research, and exploration.',
  sections: [
    {
      title: 'Resistivity & Terrameter Systems',
      description: 'The gold standard for electrical imaging...',
      image_url:
        'https://guidelinegeo.com/wp-content/uploads/2025/08/PowerAdapter1_web-1536x866-1.png',
      features: [
        'ABEM Terrameter LS2 Supply',
        'Advanced Multi-electrode Imaging',
        'High-Power Signal Processing',
      ],
    },
    {
      title: 'Magnetics & Gradiometers',
      description: 'Ultra-sensitive magnetic survey instruments...',
      image_url:
        'https://www.geometrics.com/wp-content/uploads/2020/01/Front-Angle-1.jpg',
      features: [
        'Proton Precession Sensors',
        'Overhauser Magnetometers',
        'Real-time Field Visualization',
      ],
    },
    {
      title: 'Borehole Logging Systems',
      description: 'Integrated subsurface data acquisition...',
      image_url:
        'https://iirnrwxhlkrk5q.leadongcdn.com/cloud/lnBqkKoiSRnloqmloriq/5.png',
      features: [
        'Slimline Digital Probes',
        'Electric & Manual Winch Systems',
        'Multi-parameter Data Collection',
      ],
    },
  ],
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { getSectorBySlug } =
    await import('@/modules/CMS/sectors/sector.model.server');

  // 1. Fetch the data by slug
  const data = await getSectorBySlug('geophysical');

  // 2. Check if the returned record is published
  // (Note: This requires the model to JOIN the statuses table to get status_label)
  const isPublished = data?.status_label?.toLowerCase() === 'published';

  // 3. Return DB content if published, otherwise return Static Fallback
  return {
    sector: isPublished ? data : STATIC_GEO,
  };
}

export default function GeoPhysicalPage() {
  const { sector } = useLoaderData<typeof loader>();
  const icons = [Layers, Drill, Database];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-center overflow-hidden">
        <img
          src={sector.hero_image}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />
        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
              <Zap className="h-3 w-3 fill-primary" />
              <span>{sector.hero_eyebrow}</span>
            </nav>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
              {sector.hero_title_main} <br />
              <span className="text-primary italic underline decoration-white/20 underline-offset-8">
                {sector.hero_title_italic}
              </span>{' '}
              Supply.
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              {sector.hero_description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/5">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {sector.portfolio_title}
          </h2>
          <div className="h-px flex-1 bg-border hidden md:block mx-12" />
          <p className="text-muted-foreground max-w-sm text-sm">
            {sector.portfolio_description}
          </p>
        </div>
      </section>

      {sector.sections?.map((cat: any, idx: number) => {
        const Icon = icons[idx % icons.length];
        const isReverse = idx % 2 !== 0;
        return (
          <section key={idx} className="relative overflow-hidden group">
            <div
              className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}
            >
              <div className="w-full lg:w-[55%] relative h-100 md:h-137.5 lg:h-175 overflow-hidden">
                <img
                  src={cat.image_url}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={cat.title}
                />
              </div>
              <div
                className={`w-full lg:w-[45%] flex flex-col justify-center p-8 md:p-16 lg:p-24 ${isReverse ? 'bg-muted/10' : 'bg-background'}`}
              >
                <div className="max-w-md mx-auto lg:mx-0">
                  <Icon className="h-10 w-10 text-primary mb-8 opacity-80" />
                  <h3 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="space-y-4 mb-12">
                    {cat.features.map((f: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-foreground/80"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />{' '}
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <BottomCTA
        title="Technical Procurement"
        description="Connect with our specialists for detailed equipment specifications."
      />
    </div>
  );
}
