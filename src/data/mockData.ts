// Mock data for development/testing

import type { User, Will } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'admin@mailinator.com',
    password: 'admin@123',
    role: 'PO',
    aadhaar: '123456789012',
    pan: 'ABCDE1234F'
  },
  {
    id: 'user-2',
    username: 'user@will.com',
    password: 'user123',
    role: 'WA',
    aadhaar: '987654321098',
    pan: 'FGHIJ5678K'
  },
  {
    id: 'user-3',
    username: '9876543210',
    password: 'test123',
    role: 'WA',
    aadhaar: '111122223333',
    pan: 'LMNOP9012Q'
  }
];

export const mockWills: Will[] = [
  {
    id: 'will-1',
    user_id: 'user-2',
    language: 'English',
    status: 'Draft',
    payment_status: 'Pending',
    form_data: '{}',
    createdAt: new Date('2025-01-15').toISOString()
  },
  {
    id: 'will-2',
    user_id: 'user-2',
    language: 'Marathi',
    status: 'Submitted',
    payment_status: 'Paid',
    form_data: '{}',
    createdAt: new Date('2025-01-10').toISOString()
  },
  {
    id: 'will-3',
    user_id: 'user-3',
    language: 'English',
    status: 'Ready for Review',
    payment_status: 'Paid',
    form_data: '{}',
    createdAt: new Date('2025-01-12').toISOString()
  },
  {
    id: 'will-4',
    user_id: 'user-3',
    language: 'Marathi',
    status: 'Finalized',
    payment_status: 'Paid',
    form_data: '{}',
    createdAt: new Date('2025-01-08').toISOString()
  }
];

