import './index.css'
import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { SupabaseProvider } from '@/contexts/SupabaseProvider';
import { HealthStatus } from '@/components/system/HealthStatus';

const App: React.FC = () => {
  return (
    <SupabaseProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      }>
        <RouterProvider router={router} />
        <HealthStatus />
      </Suspense>
    </SupabaseProvider>
  );
};

export default App;
