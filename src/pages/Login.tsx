// Login Page

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Card, Alert } from '../components/ui';
import { MainLayout } from '../components/Layout';
import { loginUser } from '../utils/db';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already logged in
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      navigate(userData.role === 'PO' ? '/admin' : '/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(formData.username, formData.password);
      if (result.success && result.user) {
        // Save to session storage (mock auth)
        sessionStorage.setItem('user', JSON.stringify(result.user));
        
        // Redirect based on role
        if (result.user.role === 'PO') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to manage your Will application</p>
        </div>

        <Card className="shadow-lg border-t-4 border-t-[var(--primary-color)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <Alert type="error" message={error} />}
            
            <Input 
              label="Username / Mobile / Email"
              placeholder="Enter your registered ID"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
            
            <Input 
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[var(--accent-color)] hover:underline font-medium">Forgot Password?</a>
            </div>

            <Button type="submit" className="w-full py-3" isLoading={loading}>
              Sign In
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6 text-slate-600">
          Don't have an account? 
          <Link to="/signup" className="text-[var(--primary-color)] font-semibold hover:underline ml-1">
            Create New Will
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Login: React.FC = () => {
  return (
    <MainLayout>
      <LoginPage />
    </MainLayout>
  );
};

