// Shared UI Components

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button', 
  disabled = false, 
  isLoading = false 
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] shadow-md hover:shadow-lg",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
    outline: "border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-blue-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button 
      type={type} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <div className="icon-loader animate-spin"></div>}
      {children}
    </button>
  );
};

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  error, 
  name, 
  required = false, 
  maxLength 
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
          error 
          ? 'border-red-300 focus:ring-red-100' 
          : 'border-slate-200 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/20'
        }`}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${className}`}>
      {children}
    </div>
  );
};

interface AlertProps {
  type?: 'info' | 'success' | 'error' | 'warning';
  message?: string;
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', message, title }) => {
  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200"
  };

  const icons = {
    info: "icon-info",
    success: "icon-circle-check",
    error: "icon-circle-alert",
    warning: "icon-triangle-alert"
  };

  if (!message) return null;

  return (
    <div className={`rounded-lg p-4 border flex gap-3 ${styles[type]}`}>
      <div className={`${icons[type]} text-lg mt-0.5 shrink-0`}></div>
      <div>
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm opacity-90">{message}</div>
      </div>
    </div>
  );
};

export const Logo: React.FC = () => (
  <div className="flex items-center gap-2 font-bold text-2xl text-[var(--primary-color)]">
    <div className="w-8 h-8 rounded-lg bg-[var(--primary-color)] flex items-center justify-center text-white">
      <div className="icon-scroll-text"></div>
    </div>
    <span>WillSecure</span>
  </div>
);

