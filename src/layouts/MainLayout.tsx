import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ToastContainer } from '@/components/feedback/Toast';
import { EnquiryModal } from '@/components/modals/EnquiryModal';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      <EnquiryModal />
    </div>
  );
}
