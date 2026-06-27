import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquare, Heart, User, FileText, Menu, X,
  LogOut, Wrench, Star, ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser, logout } from '@/redux/auth/authSlice';
import { ToastContainer } from '@/components/feedback/Toast';
import { EnquiryModal } from '@/components/modals/EnquiryModal';
import { AppImage } from '@/components/common/AppImage';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/utils';

interface SidebarLayoutProps {
  links: { label: string; href: string; icon: typeof LayoutDashboard }[];
  title: string;
}

function SidebarLayout({ links, title }: SidebarLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-border fixed h-full">
        <div className="p-6 border-b border-border">
          <Logo size="sm" />
          <p className="text-xs text-text-muted mt-2">{title}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-gray-100 hover:text-text'
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <AppImage src={user?.avatar} alt={user?.firstName} className="h-9 w-9 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-muted hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {TEXT.NAV.LOGOUT}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold text-sm">{title}</span>
          <Link to={ROUTES.HOME} className="p-2 rounded-lg hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-white flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Logo size="sm" showText={false} linkToHome={false} />
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const active = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                        active ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-gray-100'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </div>

      <ToastContainer />
      <EnquiryModal />
    </div>
  );
}

const customerLinks = [
  { label: TEXT.NAV.DASHBOARD, href: ROUTES.CUSTOMER.DASHBOARD, icon: LayoutDashboard },
  { label: TEXT.NAV.ENQUIRIES, href: ROUTES.CUSTOMER.ENQUIRIES, icon: FileText },
  { label: TEXT.NAV.MESSAGES, href: ROUTES.CUSTOMER.MESSAGES, icon: MessageSquare },
  { label: TEXT.NAV.FAVORITES, href: ROUTES.CUSTOMER.FAVORITES, icon: Heart },
  { label: TEXT.NAV.PROFILE, href: ROUTES.CUSTOMER.PROFILE, icon: User },
];

const cleanerLinks = [
  { label: TEXT.NAV.DASHBOARD, href: ROUTES.CLEANER.DASHBOARD, icon: LayoutDashboard },
  { label: TEXT.NAV.MY_SERVICES, href: ROUTES.CLEANER.MY_SERVICES, icon: Wrench },
  { label: TEXT.NAV.ENQUIRIES, href: ROUTES.CLEANER.ENQUIRIES, icon: FileText },
  { label: TEXT.NAV.MESSAGES, href: ROUTES.CLEANER.MESSAGES, icon: MessageSquare },
  { label: TEXT.NAV.BUSINESS_PROFILE, href: ROUTES.CLEANER.BUSINESS_PROFILE, icon: User },
  { label: TEXT.NAV.REVIEWS, href: ROUTES.CLEANER.REVIEWS, icon: Star },
];

const adminLinks = [
  { label: TEXT.NAV.DASHBOARD, href: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
  { label: TEXT.NAV.USERS, href: ROUTES.ADMIN.USERS, icon: User },
  { label: TEXT.NAV.SERVICES, href: ROUTES.ADMIN.SERVICES, icon: Wrench },
  { label: TEXT.NAV.REPORTS, href: ROUTES.ADMIN.REPORTS, icon: FileText },
];

export function CustomerLayout() {
  return <SidebarLayout links={customerLinks} title={TEXT.NAV.CUSTOMER_DASHBOARD} />;
}

export function CleanerLayout() {
  return <SidebarLayout links={cleanerLinks} title={TEXT.NAV.CLEANER_DASHBOARD} />;
}

export function AdminLayout() {
  return <SidebarLayout links={adminLinks} title={TEXT.NAV.ADMIN_DASHBOARD} />;
}
