// PO Admin Dashboard

import React, { useState, useEffect } from 'react';
import {  Card } from '../components/ui';
import { MainLayout } from '../components/Layout';
import { getAdminWills } from '../utils/db';
import { useNavigate } from 'react-router-dom';
import type { User, Will } from '../types';

const AdminDashboard: React.FC = () => {
  const [wills, setWills] = useState<Will[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getAdminWills();
      setWills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Will['status']): string => {
    switch(status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Fully Paid': return 'bg-green-100 text-green-800';
      case 'Ready for Review': return 'bg-purple-100 text-purple-800';
      case 'Finalized': return 'bg-slate-800 text-white';
      default: return 'bg-gray-100';
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="icon-loader animate-spin text-4xl text-[var(--primary-color)]"></div></div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500">Monitor and review all Will applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="!p-4 bg-blue-50 border-blue-100">
          <div className="text-blue-600 text-sm font-semibold mb-1">Total Applications</div>
          <div className="text-3xl font-bold text-slate-800">{wills.length}</div>
        </Card>
        <Card className="!p-4 bg-green-50 border-green-100">
          <div className="text-green-600 text-sm font-semibold mb-1">Completed / Paid</div>
          <div className="text-3xl font-bold text-slate-800">{wills.filter(w => w.payment_status === 'Paid').length}</div>
        </Card>
        <Card className="!p-4 bg-purple-50 border-purple-100">
          <div className="text-purple-600 text-sm font-semibold mb-1">Ready for Review</div>
          <div className="text-3xl font-bold text-slate-800">{wills.filter(w => w.status === 'Ready for Review').length}</div>
        </Card>
        <Card className="!p-4 bg-orange-50 border-orange-100">
          <div className="text-orange-600 text-sm font-semibold mb-1">Pending Drafts</div>
          <div className="text-3xl font-bold text-slate-800">{wills.filter(w => w.status === 'Draft').length}</div>
        </Card>
      </div>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Application ID</th>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {wills.map(will => (
                <tr key={will.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{will.id.slice(-6)}</td>
                  <td className="px-6 py-4">{will.user_id.slice(-6)}...</td>
                  <td className="px-6 py-4">{will.language}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(will.status)}`}>
                      {will.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${will.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {will.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{will.createdAt ? new Date(will.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--primary-color)] hover:underline font-medium">Review</button>
                  </td>
                </tr>
              ))}
              {wills.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <MainLayout user={user} onLogout={handleLogout}>
      <AdminDashboard />
    </MainLayout>
  );
};

