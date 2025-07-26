// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, Input, Button, Typography, Alert } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('Attempting login with:', formData.email); // Debug log

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', response.status, data); // Debug log

      if (response.ok) {
        console.log('Login successful, user data:', data.user); // Debug log
        
        // Always redirect to /write page (both admin and SEO users)
        console.log('Redirecting to /write'); // Debug log
        
        // Use window.location.replace for immediate redirect
        window.location.replace('/write');
        
      } else {
        console.log('Login failed:', data.message); // Debug log
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setForgotMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotMessage('Password reset link sent to your email!');
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotEmail('');
          setForgotMessage('');
        }, 3000);
      } else {
        setForgotMessage(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      setForgotMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Assignments Help Provider</title>
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
              User Login
            </Typography>
          </div>

          {!showForgotPassword ? (
            /* Login Form */
            <Card className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <Alert color="red" className="mb-4">
                    {error}
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
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  color="blue"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  className="mt-6"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                <div className="text-center space-y-2 mt-4">
                  <Typography variant="small" color="gray">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                      Sign up here
                    </Link>
                  </Typography>
                </div>
              </form>
            </Card>
          ) : (
            /* Forgot Password Form */
            <Card className="p-8">
              <div className="text-center mb-6">
                <Typography variant="h5" color="blue-gray" className="font-bold">
                  Forgot Your Password?
                </Typography>
                <Typography variant="small" color="gray" className="mt-2">
                  Enter your username and we will send you instructions to reset your password.
                </Typography>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-6">
                {forgotMessage && (
                  <Alert color={forgotMessage.includes('sent') ? 'green' : 'red'} className="mb-4">
                    {forgotMessage}
                  </Alert>
                )}

                <div>
                  <Input
                    type="email"
                    label="Email Address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="focus:ring-0"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outlined"
                    color="gray"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotEmail('');
                      setForgotMessage('');
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    color="blue"
                    size="lg"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Continue'}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}