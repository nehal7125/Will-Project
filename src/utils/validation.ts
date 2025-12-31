// Validation utilities

export const Validators = {
  isValidAadhaar: (num: string): boolean => {
    return /^\d{12}$/.test(num);
  },
  
  isValidPAN: (num: string): boolean => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(num);
  },
  
  isValidMobile: (num: string): boolean => {
    return /^[0-9]{10}$/.test(num);
  },
  
  isValidEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};

