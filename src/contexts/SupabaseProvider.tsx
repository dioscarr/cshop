import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

const SupabaseContext = createContext(supabase);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Simple test query that doesn't involve storage
        const { data, error } = await supabase
          .from('services')
          .select('count')
          .single();
        
        if (error) {
          console.error('Supabase initialization error:', error);
        } else {
          console.log('Supabase connection successful');
          setIsReady(true);
        }
      } catch (err) {
        console.error('Failed to initialize Supabase:', err);
      }
    };

    initializeSupabase();
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
