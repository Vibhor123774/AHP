// pages/reset-password.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, Input, Button, Typography, Alert } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      setToken(token);
      // Verify token validity
      verifyToken(token);
    }
  }, [router.query]);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch('/api/auth/verify-reset-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenToVerify }),
      });

      if (response.ok) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
        const data = await response.json();
        setError(data.message || 'Invalid or expired token');
      }
    } catch (error) {
      setTokenValid(false);
      setError('Failed to verify token');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validatePasswords = () => {
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Password reset failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking token
  if (tokenValid === null) {
    return (
      <>
        <Head>
          <title>Reset Password - Assignments Help Provider</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <Typography variant="h6" color="blue-gray">
                Verifying reset token...
              </Typography>
            </div>
          </Card>
        </div>
      </>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <>
        <Head>
          <title>Reset Password - Assignments Help Provider</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
                  <Typography variant="h6" className="font-bold">
                    AHP
                  </Typography>
                </div>
              </div>
              <Typography variant="h4" color="red" className="font-bold">
                Invalid Reset Link
              </Typography>
            </div>

            <Card className="p-8">
              <div className="text-center space-y-4">
                <Typography variant="h6" color="red">
                  This password reset link is invalid or has expired
                </Typography>
                <Typography color="gray">
                  {error || 'The link may have been used already or expired. Please request a new password reset.'}
                </Typography>
                <div className="pt-4">
                  <Button
                    color="blue"
                    size="lg"
                    fullWidth
                    onClick={() => router.push('/login')}
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Valid token - show reset form
  return (
    <>
      <Head>
        <title>Reset Password - Assignments Help Provider</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                <Typography variant="h6" className="font-bold">
                  AHP
                </Typography>
              </div>
            </div>
            <Typography variant="h4" color="blue-gray" className="font-bold">
              Reset Password
            </Typography>
            <Typography variant="small" color="gray" className="mt-2">
              Enter your new password below
            </Typography>
          </div>

          <Card className="p-8">
            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <Alert color="red" className="mb-4">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert color="green" className="mb-4">
                  {success}
                </Alert>
              )}

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="New Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-0"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-0"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="small" color="gray" className="font-medium mb-2">
                  Password Requirements:
                </Typography>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className={`flex items-center ${formData.password.length >= 6 ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{formData.password.length >= 6 ? '✓' : '○'}</span>
                    At least 6 characters long
                  </li>
                  <li className={`flex items-center ${formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? '✓' : '○'}</span>
                    Passwords match
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                color="blue"
                size="lg"
                fullWidth
                disabled={isLoading || !formData.password || !formData.confirmPassword}
                className="mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}