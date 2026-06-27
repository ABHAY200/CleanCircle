import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { CustomerLayout, CleanerLayout, AdminLayout } from '@/layouts/DashboardLayouts';
import { ROUTES } from '@/constants/routes';

import { Home } from '@/pages/public/Home/Home';
import { Search } from '@/pages/public/Search/Search';
import { ServiceDetails } from '@/pages/public/ServiceDetails/ServiceDetails';
import { CleanerProfile } from '@/pages/public/CleanerProfile/CleanerProfile';
import { Login } from '@/pages/public/Login/Login';
import { Register } from '@/pages/public/Register/Register';

import { CustomerDashboard } from '@/pages/customer/Dashboard/Dashboard';
import { CustomerEnquiries } from '@/pages/customer/Enquiries/Enquiries';
import { MessagesPage as CustomerMessages } from '@/pages/customer/Messages/Messages';
import { CustomerFavorites } from '@/pages/customer/Favorites/Favorites';
import { CustomerProfile } from '@/pages/customer/Profile/Profile';

import { CleanerDashboard } from '@/pages/cleaner/Dashboard/Dashboard';
import { MyServices } from '@/pages/cleaner/MyServices/MyServices';
import { CleanerEnquiries } from '@/pages/cleaner/Enquiries/Enquiries';
import { CleanerMessages } from '@/pages/cleaner/Messages/Messages';
import { BusinessProfile } from '@/pages/cleaner/BusinessProfile/BusinessProfile';
import { CleanerReviews } from '@/pages/cleaner/Reviews/Reviews';

import { AdminDashboard } from '@/pages/admin/Dashboard/Dashboard';
import { AdminUsers } from '@/pages/admin/Users/Users';
import { AdminServices } from '@/pages/admin/Services/Services';
import { AdminReports } from '@/pages/admin/Reports/Reports';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.SEARCH, element: <Search /> },
      { path: ROUTES.SERVICE_DETAILS, element: <ServiceDetails /> },
      { path: ROUTES.CLEANER_PROFILE, element: <CleanerProfile /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
    ],
  },
  {
    element: <CustomerLayout />,
    children: [
      { path: ROUTES.CUSTOMER.DASHBOARD, element: <CustomerDashboard /> },
      { path: ROUTES.CUSTOMER.ENQUIRIES, element: <CustomerEnquiries /> },
      { path: ROUTES.CUSTOMER.MESSAGES, element: <CustomerMessages /> },
      { path: ROUTES.CUSTOMER.FAVORITES, element: <CustomerFavorites /> },
      { path: ROUTES.CUSTOMER.PROFILE, element: <CustomerProfile /> },
    ],
  },
  {
    element: <CleanerLayout />,
    children: [
      { path: ROUTES.CLEANER.DASHBOARD, element: <CleanerDashboard /> },
      { path: ROUTES.CLEANER.MY_SERVICES, element: <MyServices /> },
      { path: ROUTES.CLEANER.ENQUIRIES, element: <CleanerEnquiries /> },
      { path: ROUTES.CLEANER.MESSAGES, element: <CleanerMessages /> },
      { path: ROUTES.CLEANER.BUSINESS_PROFILE, element: <BusinessProfile /> },
      { path: ROUTES.CLEANER.REVIEWS, element: <CleanerReviews /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: ROUTES.ADMIN.DASHBOARD, element: <AdminDashboard /> },
      { path: ROUTES.ADMIN.USERS, element: <AdminUsers /> },
      { path: ROUTES.ADMIN.SERVICES, element: <AdminServices /> },
      { path: ROUTES.ADMIN.REPORTS, element: <AdminReports /> },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
