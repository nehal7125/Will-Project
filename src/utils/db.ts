// Database utilities with hardcoded mock data

import type { User, Will, LoginResult, RegisterResult, RegisterUserData } from '../types';
import { mockUsers, mockWills } from '../data/mockData';

// In-memory storage for new users and wills created during session
const sessionUsers: User[] = [...mockUsers];
const sessionWills: Will[] = [...mockWills];

/**
 * Validates user credentials
 */
export const loginUser = async (username: string, password: string): Promise<LoginResult> => {
  try {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = sessionUsers.find(u => 
      (u.username === username || u.username === username) && 
      u.password === password
    );
    
    if (user) {
      // Return user without password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return { 
        success: true, 
        user: userWithoutPassword as User
      };
    }
    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    console.error("Login error", error);
    return { success: false, message: 'System error during login' };
  }
};

/**
 * Register new user
 */
export const registerUser = async (userData: RegisterUserData): Promise<RegisterResult> => {
  try {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists
    const existing = sessionUsers.find(u => u.username === userData.username);
    
    if (existing) {
      throw new Error('User already exists with this email/mobile');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: userData.username,
      password: userData.password,
      role: 'WA',
      aadhaar: userData.aadhaar,
      pan: userData.pan
    };

    // Add to session storage
    sessionUsers.push(newUser);

    return { 
      success: true, 
      user: {
        objectId: newUser.id,
        objectData: newUser
      }
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    return { success: false, message: errorMessage };
  }
};

/**
 * Get user's wills
 */
export const getUserWills = async (userId: string): Promise<Will[]> => {
  try {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const myWills = sessionWills.filter(w => w.user_id === userId);
    return myWills;
  } catch (error) {
    console.error("Fetch wills error", error);
    return [];
  }
};

/**
 * Create a new draft will
 */
export const createDraftWill = async (userId: string, language: 'English' | 'Marathi'): Promise<Will> => {
  try {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newWill: Will = {
      id: `will-${Date.now()}`,
      user_id: userId,
      language: language,
      status: 'Draft',
      payment_status: 'Pending',
      form_data: JSON.stringify({}),
      createdAt: new Date().toISOString()
    };

    // Add to session storage
    sessionWills.push(newWill);
    
    return newWill;
  } catch (error) {
    console.error("Create will error", error);
    throw error;
  }
};

/**
 * Get all wills for admin
 */
export const getAdminWills = async (): Promise<Will[]> => {
  try {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return sessionWills;
  } catch (error) {
    console.error("Admin fetch wills error", error);
    return [];
  }
};
