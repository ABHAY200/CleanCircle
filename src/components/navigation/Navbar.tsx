import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser, selectIsAuthenticated, logout } from '@/redux/auth/authSlice';
import { setMobileMenuOpen, selectMobileMenuOpen } from '@/redux/ui/uiSlice';
import { Button } from '@/components/buttons/Button';
import { Logo } from '@/components/common/Logo';
import { AppImage } from '@/components/common/AppImage';
import { cn } from '@/utils';

const publicLinks = [
  { label: TEXT.NAV.HOME, href: ROUTES.HOME },
  { label: TEXT.NAV.SEARCH, href: ROUTES.SEARCH },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const mobileOpen = useAppSelector(selectMobileMenuOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dashboardRoute =
    user?.role === ROLES.CLEANER
      ? ROUTES.CLEANER.DASHBOARD
      : user?.role === ROLES.ADMIN
        ? ROUTES.ADMIN.DASHBOARD
        : ROUTES.CUSTOMER.DASHBOARD;

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
    setDropdownOpen(false);
  };

  const isDashboard = location.pathname.includes('/customer') ||
    location.pathname.includes('/cleaner') ||
    location.pathname.includes('/admin');

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="sm" />

          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.href ? 'text-primary' : 'text-text-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <AppImage src={user.avatar} alt={user.firstName} className="h-8 w-8 rounded-full object-cover" />
                  <span className="text-sm font-medium">{user.firstName}</span>
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-border py-1"
                    >
                      <Link
                        to={dashboardRoute}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50"
                      >
                        <User className="h-4 w-4" />
                        {TEXT.NAV.DASHBOARD}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4" />
                        {TEXT.NAV.LOGOUT}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">{TEXT.NAV.LOGIN}</Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm">{TEXT.NAV.REGISTER}</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
            onClick={() => dispatch(setMobileMenuOpen(!mobileOpen))}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => dispatch(setMobileMenuOpen(false))}
                  className="block py-2 text-sm font-medium text-text-muted hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardRoute} onClick={() => dispatch(setMobileMenuOpen(false))}>
                      <Button fullWidth variant="outline">{TEXT.NAV.DASHBOARD}</Button>
                    </Link>
                    <Button fullWidth variant="ghost" onClick={handleLogout}>{TEXT.NAV.LOGOUT}</Button>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} onClick={() => dispatch(setMobileMenuOpen(false))}>
                      <Button fullWidth variant="outline">{TEXT.NAV.LOGIN}</Button>
                    </Link>
                    <Link to={ROUTES.REGISTER} onClick={() => dispatch(setMobileMenuOpen(false))}>
                      <Button fullWidth>{TEXT.NAV.REGISTER}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
