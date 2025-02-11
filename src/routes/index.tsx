import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './root';
import LandingPage from '@/components/landing/LandingPage';
import BookingForm from '@/components/booking/BookingForm';
import { SecureAccess } from '@/components/secure/SecureAccess';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'booking',
        element: <BookingForm />,
      },
      {
        path: 'secure',
        element: <SecureAccess />,
      },
      {
        path: 'secure/dashboard',
        element: <AdminDashboard />,
      }
    ]
  }
]);
