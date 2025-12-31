// WA Dashboard

import React, { useState, useEffect } from 'react';
import { Button, Card } from '../components/ui';
import { MainLayout } from '../components/Layout';
import { getUserWills, createDraftWill } from '../utils/db';
import { useNavigate } from 'react-router-dom';
import type { User, Will } from '../types';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [wills, setWills] = useState<Will[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(userData) as User;
    setUser(parsedUser);
    loadWills(parsedUser.id);
  }, [navigate]);

  const loadWills = async (userId: string) => {
    try {
      const data = await getUserWills(userId);
      setWills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWill = async (lang: 'English' | 'Marathi') => {
    if (!user) return;
    if (!confirm(`Start a new Will in ${lang}?`)) return;
    try {
      await createDraftWill(user.id, lang);
      alert('New Draft Created! Redirecting to editor...'); // Placeholder for routing to editor
      loadWills(user.id);
    } catch (err) {
      alert('Failed to create will');
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="icon-loader animate-spin text-4xl text-[var(--primary-color)]"></div></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-500">Manage your Will applications</p>
        </div>
        {wills.length === 0 && (
          <div className="flex gap-2">
            <Button onClick={() => handleCreateWill('English')} variant="primary">
              <div className="icon-plus"></div> New Will (English)
            </Button>
            <Button onClick={() => handleCreateWill('Marathi')} variant="secondary">
              <div className="icon-plus"></div> New Will (Marathi)
            </Button>
          </div>
        )}
      </div>

      {wills.length === 0 ? (
        <Card className="text-center py-16 bg-slate-50 border-dashed">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-scroll-text text-3xl"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No Wills Created Yet</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            Start securing your future today. Create a new Will in your preferred language.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => handleCreateWill('English')}>Create in English</Button>
            <Button variant="secondary" onClick={() => handleCreateWill('Marathi')}>Create in Marathi</Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {wills.map(will => (
            <Card key={will.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">Last Will & Testament</h3>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {will.language}
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <div className="icon-calendar w-4 h-4"></div>
                    <span>Created: {will.createdAt ? new Date(will.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="icon-info w-4 h-4"></div>
                    <span>Status: <span className="font-semibold text-slate-700">{will.status}</span></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="secondary" className="flex-1 md:flex-none">
                  <div className="icon-eye"></div> View
                </Button>
                <Button className="flex-1 md:flex-none">
                  <div className="icon-pencil"></div> Continue Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = sessionStorage.getItem('user');
    if(u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <MainLayout user={user} onLogout={handleLogout}>
      <Dashboard />
    </MainLayout>
  );
};

