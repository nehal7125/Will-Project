// Signup Page

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Card, Alert } from '../components/ui';
import { MainLayout } from '../components/Layout';
import { registerUser } from '../utils/db';
import { Validators } from '../utils/validation';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '', // email or mobile
    password: '',
    confirmPassword: '',
    aadhaar: '',
    pan: '',
    termsAccepted: false
  });
  const [otp, setOtp] = useState('');

  // Validation
  const validateStep1 = (): string | null => {
    if (!formData.username) return "Username is required";
    if (!Validators.isValidEmail(formData.username) && !Validators.isValidMobile(formData.username)) {
      return "Please enter a valid Email or 10-digit Mobile Number";
    }
    if (!formData.aadhaar) return "Aadhaar is required";
    if (!Validators.isValidAadhaar(formData.aadhaar)) return "Aadhaar must be 12 digits";
    if (!formData.pan) return "PAN is required";
    if (!Validators.isValidPAN(formData.pan)) return "Invalid PAN format (e.g. ABCDE1234F)";
    return null;
  };

  const handleSendOTP = async () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setLoading(true);
    
    // Simulate API call for OTP
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') {
      setStep(3);
      setError('');
    } else {
      setError('Invalid OTP. Try 1234.');
    }
  };

  const handleRegister = async () => {
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.termsAccepted) {
      setError('Please accept Terms & Conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await registerUser({
        username: formData.username,
        password: formData.password,
        aadhaar: formData.aadhaar,
        pan: formData.pan
      });

      if (result.success && result.user) {
        // Auto login
        sessionStorage.setItem('user', JSON.stringify({ ...result.user.objectData, id: result.user.objectId }));
        navigate('/dashboard');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500">Start your journey to secure your legacy</p>
        </div>

        <Card className="shadow-lg relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <div 
              className="h-full bg-[var(--primary-color)] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <div className="pt-4 space-y-6">
            {error && <Alert type="error" message={error} />}

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-semibold text-slate-800">1. Verification Details</h3>
                <Input 
                  label="Email ID or Mobile Number"
                  placeholder="e.g. user@example.com or 9876543210"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Aadhaar Number"
                    placeholder="12-digit number"
                    value={formData.aadhaar}
                    maxLength={12}
                    onChange={(e) => setFormData({...formData, aadhaar: e.target.value.replace(/\D/g,'')})}
                    required
                  />
                  <Input 
                    label="PAN Number"
                    placeholder="ABCDE1234F"
                    value={formData.pan}
                    maxLength={10}
                    onChange={(e) => setFormData({...formData, pan: e.target.value.toUpperCase()})}
                    required
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                  <div className="flex gap-2 items-start">
                    <div className="icon-upload text-blue-600 mt-0.5"></div>
                    <p>Please keep your Aadhaar and PAN cards ready for verification later.</p>
                  </div>
                </div>
                <Button className="w-full py-3" onClick={handleSendOTP} isLoading={loading}>
                  Verify & Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                <h3 className="text-lg font-semibold text-slate-800">2. Enter OTP</h3>
                <p className="text-slate-600 text-sm">We sent a verification code to <strong>{formData.username}</strong></p>
                
                <div className="flex justify-center">
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="1234"
                    className="text-center text-3xl font-bold tracking-widest w-40 py-2 border-b-2 border-slate-300 focus:border-[var(--primary-color)] outline-none bg-transparent"
                    maxLength={4}
                  />
                </div>
                <div className="text-xs text-slate-400">Hint: Use 1234</div>
                
                <Button className="w-full py-3" onClick={handleVerifyOTP} disabled={otp.length !== 4}>
                  Verify OTP
                </Button>
                <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-800">Back to Details</button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-semibold text-slate-800">3. Set Password</h3>
                <Input 
                  label="Create Password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <Input 
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                
                <label className="flex items-start gap-2 cursor-pointer text-sm text-slate-600 p-2 hover:bg-slate-50 rounded">
                  <input 
                    type="checkbox" 
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                    className="mt-1 rounded border-slate-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" 
                  />
                  <span>I accept the <a href="#" className="text-[var(--primary-color)] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[var(--primary-color)] hover:underline">Disclaimer</a>.</span>
                </label>

                <Button className="w-full py-3" onClick={handleRegister} isLoading={loading}>
                  Create Account
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center mt-6 text-slate-600">
          Already have an account? 
          <Link to="/" className="text-[var(--primary-color)] font-semibold hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Signup: React.FC = () => {
  return (
    <MainLayout>
      <SignupPage />
    </MainLayout>
  );
};

