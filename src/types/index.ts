// Type definitions for the Will Creation System

export interface User {
  id: string;
  username: string;
  password?: string;
  role: 'WA' | 'PO';
  aadhaar: string;
  pan: string;
}

export interface Will {
  id: string;
  user_id: string;
  language: 'English' | 'Marathi';
  status: 'Draft' | 'Submitted' | 'Fully Paid' | 'Ready for Review' | 'Finalized';
  payment_status: 'Pending' | 'Paid';
  form_data?: string;
  createdAt?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  message?: string;
}

export interface RegisterResult {
  success: boolean;
  user?: {
    objectId: string;
    objectData: User;
  };
  message?: string;
}

export interface RegisterUserData {
  username: string;
  password: string;
  aadhaar: string;
  pan: string;
}

