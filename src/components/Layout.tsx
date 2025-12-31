// Layout Wrappers

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Logo } from './ui';
import type { User } from '../types';

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="h-[var(--header-height)] bg-white border-b border-slate-200 fixed top-0 w-full z-50 px-6 flex items-center justify-between">
      <Link to={user ? (user.role === 'PO' ? '/admin' : '/dashboard') : '/'} className="hover:opacity-80 transition-opacity">
        <Logo />
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
              <div className="icon-user text-slate-400"></div>
              <span className="font-medium text-slate-800">{user.username}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">{user.role}</span>
            </div>
            <Button variant="secondary" onClick={onLogout} className="!py-1.5 !px-3 text-sm">
              <div className="icon-log-out text-sm"></div>
              Sign Out
            </Button>
          </>
        ) : (
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="secondary" className="!py-1.5 !px-3 text-sm">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="!py-1.5 !px-3 text-sm">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
        <p>&copy; 2025 WillSecure Systems. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-[var(--primary-color)]">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--primary-color)]">Terms of Service</a>
          <a href="#" className="hover:text-[var(--primary-color)]">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
  fullWidth?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, user, onLogout, fullWidth = false }) => {
  return (
    <div className="min-h-screen flex flex-col pt-[var(--header-height)]">
      <Header user={user} onLogout={onLogout} />
      <main className={`flex-1 ${fullWidth ? '' : 'container mx-auto px-4 py-8'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { Header, Footer };

