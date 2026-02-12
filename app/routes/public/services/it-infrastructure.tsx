import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { Server, Network, Database, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { BottomCTA } from '@/components/public/bottom-cta';

const STATIC_IT = {
  hero_eyebrow: 'Digital Architecture',
  hero_title_main: 'Enterprise',
  hero_title_italic: 'Infrastructure',
  hero_description:
    'Equipping organizations with high-performance servers, networking, and storage hardware required for mission-critical operations.',
  hero_image:
    'https://www.tglobalcorp.com/upload/news_solutions_b/enL_news_solutions_24B01_uf64JrbpW0.webp',
  portfolio_title: 'Hardware Solutions',
  portfolio_description:
    '"Authentic hardware from globally trusted vendors including Dell, HPE, and Cisco."',
  sections: [
    {
      title: 'Enterprise Server Systems',
      description: 'Mission-critical computing power...',
      image_url:
        'https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/product-photography/learn/what-is-in-a-data-center-body-1920x1080.jpg',
      features: [
        'Dell PowerEdge & HPE ProLiant Supply',
        'High-Density Computing Nodes',
        'Scalable Storage-Rich Servers',
      ],
    },
    {
      title: 'Networking & Connectivity',
      description: 'The backbone of digital communication...',
      image_url:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000',
      features: [
        'Layer 3 Managed Switching',
        'High-Capacity Core Routers',
        'Enterprise Firewall Appliances',
      ],
    },
    {
      title: 'Datacenter & Storage',
      description: 'Scalable storage and rack infrastructure...',
      image_url:
        'https://www.cisco.com/content/dam/cisco-cdc/site/images/photography/lifestyle-photography/learn/modern-data-center-body-1920x1080.jpg',
      features: [
        'All-Flash Storage Arrays',
        'Structured Cabling Systems',
        'Rack & Power Infrastructure',
      ],
    },
  ],
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { getSectorBySlug } =
    await import('@/modules/CMS/sectors/sector.model.server');
  const data = await getSectorBySlug('it-infrastructure');

  const isPublished = data?.status_label?.toLowerCase() === 'published';
  return { sector: isPublished ? data : STATIC_IT };
}

export default function ITInfrastructurePage() {
  const { sector } = useLoaderData<typeof loader>();
  const icons = [Server, Network, Database];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <section className="relative h-[65vh] md:h-[80vh] w-full flex items-center overflow-hidden">
        <img
          src={sector.hero_image}
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/40 to-transparent" />
        <div className="container max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.4em] text-[10px] uppercase">
              <Cpu className="h-3 w-3 fill-primary" />
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
          <p className="text-muted-foreground max-w-sm text-sm italic">
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
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
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
                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />{' '}
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
        title="Infrastructure Quotation"
        description="Ready to scale your digital architecture?"
      />
    </div>
  );
}
