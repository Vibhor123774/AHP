// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Card, Input, Button, Typography, Alert } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

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

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Please contact admin to set your role. Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Assignments Help Provider</title>
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
              Create Account
            </Typography>
            <Typography variant="small" color="gray" className="mt-2">
              Join Assignments Help Provider team
            </Typography>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSignup} className="space-y-6">
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

              <div>
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-0"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
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

              {/* Important Note */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <Typography variant="small" color="amber" className="font-medium mb-1">
                  Important Note:
                </Typography>
                <Typography variant="small" color="gray">
                  After signup, please contact the administrator to assign your role (Admin or SEO) to access the system features.
                </Typography>
              </div>

              <Button
                type="submit"
                color="blue"
                size="lg"
                fullWidth
                disabled={isLoading || !formData.email || !formData.password || !formData.confirmPassword}
                className="mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center space-y-2">
                <Typography variant="small" color="gray">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign in here
                  </Link>
                </Typography>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}