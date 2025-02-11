import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function AdminAccess() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();

  useEffect(() => {
    console.log('AdminAccess mounted');
    if (isAuthenticated) {
      console.log('User is already authenticated, redirecting to dashboard');
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting login with code:', code);
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        await login(data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid access code');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Access Code</label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter access code"
              required
              disabled={loading}
              autoFocus
            />
          </div>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={loading || !code.trim()}
          >
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
