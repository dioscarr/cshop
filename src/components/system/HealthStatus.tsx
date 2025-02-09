import React from 'react';
import { useHealthCheck } from '@/hooks/useHealthCheck';

export const HealthStatus: React.FC = () => {
  const { status, lastChecked } = useHealthCheck();

  const statusColors = {
    loading: 'bg-yellow-500',
    healthy: 'bg-green-500',
    error: 'bg-red-500'
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-full shadow-lg">
      <div 
        className={`w-3 h-3 rounded-full ${statusColors[status]} animate-pulse`}
        title={`API Status: ${status}`}
      />
      {status === 'healthy' && lastChecked && (
        <span className="text-xs text-gray-500">
          Last checked: {new Date(lastChecked).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};
