const PARTNERS = [
  {
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg',
  },
  {
    name: 'HPE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Hewlett_Packard_Enterprise_logo.svg',
  },
  {
    name: 'Cisco',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
  },
  {
    name: 'Fortinet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Fortinet_logo.svg',
  },
  {
    name: 'Huawei',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Huawei_AppGallery.svg',
  },
  {
    name: 'Abem',
    logo: '/images/abem.jpg',
  },
  {
    name: 'Dolang',
    logo: '/images/dolang.jpg',
  },
  {
    name: 'Eco',
    logo: '/images/eco.jpg',
  },
  {
    name: 'Fuji',
    logo: '/images/fuji.jpg',
  },
  {
    name: 'Gem',
    logo: '/images/gem.jpg',
  },
  {
    name: 'Mount Sopris',
    logo: '/images/mount-sopris.jpg',
  },
];

const CLIENTS = [
  { name: 'EEU', logo: '/images/eeu.png' },
  { name: 'ewti', logo: '/images/ewti.png' },
  { name: 'edf', logo: '/images/edf.webp' },
  { name: 'efp', logo: '/images/efp.png' },
];

export function LogoCarousel() {
  return (
    <div className="py-24 bg-muted/20 border-y overflow-hidden">
      <div className="container mb-12 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-muted-foreground">
          Our Partners
        </p>
      </div>

      {/* Seamless Wrapper */}
      <div className="group relative flex overflow-hidden">
        {/* The first set and duplicated set must be identical for the loop to be seamless */}
        <div className="flex items-center gap-16 whitespace-nowrap py-4 animate-marquee group-hover:paused">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-37.5"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicating the row once more ensures no "empty string" gap on ultra-wide screens */}
        <div
          className="flex items-center gap-16 whitespace-nowrap py-4 animate-marquee group-hover:paused"
          aria-hidden="true"
        >
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div
              key={`dup-${i}`}
              className="flex items-center justify-center min-w-37.5"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function ClientCarousel() {
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
  return (
    <div className="py-24 bg-muted/20 border-y overflow-hidden">
      <div className="container mb-12 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-muted-foreground">
          Our Clients
        </p>
      </div>

      {/* Seamless Wrapper */}
      <div className="group relative flex overflow-hidden">
        {/* The first set and duplicated set must be identical for the loop to be seamless */}
        <div className="flex items-center gap-16 whitespace-nowrap py-4 animate-marqueed group-hover:paused">
          {items.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-37.5"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-14 md:h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Duplicating the row once more ensures no "empty string" gap on ultra-wide screens */}
        <div
          className="flex items-center gap-16 whitespace-nowrap py-4 animate-marqueed group-hover:paused"
          aria-hidden="true"
        >
          {items.map((client, i) => (
            <div
              key={`dup-${i}`}
              className="flex items-center justify-center min-w-37.5"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-14 md:h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
