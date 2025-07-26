// pages/change-password.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Alert,
  Navbar 
} from '@material-tailwind/react';
import { 
  EyeIcon, 
  EyeSlashIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      router.push('/login');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswords = () => {
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return false;
    }
    return true;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          router.push('/write');
        }, 2000);
      } else {
        setError(data.message || 'Password change failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Typography variant="h5">Loading...</Typography>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Change Password - Assignments Help Provider</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                <Typography variant="h6" className="font-bold">
                  AHP
                </Typography>
              </div>
              <Typography variant="h6" className="font-bold">
                Change Password
              </Typography>
            </div>
            <Link href="/write">
              <Button variant="outlined" size="sm" className="flex items-center space-x-2">
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Write</span>
              </Button>
            </Link>
          </div>
        </Navbar>
        
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Typography variant="h4" color="blue-gray" className="font-bold">
                Change Password
              </Typography>
              <Typography variant="small" color="gray" className="mt-2">
                Update your account password
              </Typography>
            </div>

            <Card className="p-8">
              <form onSubmit={handleChangePassword} className="space-y-6">
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
                    name="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    label="Current Password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    required
                    className="focus:ring-0"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    label="New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                    className="focus:ring-0"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    label="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="focus:ring-0"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
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
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}