import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './root';
import BookingForm from '@/components/booking/BookingForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootLayout.ErrorBoundary />,
    children: [
      {
        index: true,
        element: <BookingForm />,
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});
