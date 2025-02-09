import { useState, useEffect } from 'react';

export const useHealthCheck = () => {
  const [status, setStatus] = useState<'loading' | 'healthy' | 'error'>('loading');
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
      if (!response.ok) throw new Error('Health check failed');
      const data = await response.json();
      setStatus('healthy');
      setLastChecked(data.timestamp);
    } catch (err) {
      console.error('Health check error:', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { status, lastChecked, checkHealth };
};
