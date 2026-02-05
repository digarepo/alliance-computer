import { Footer } from '@/components/public/footer';
import { Navbar } from '@/components/public/navbar';
import { Outlet } from 'react-router';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
