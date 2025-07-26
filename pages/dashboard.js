// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Card, 
  Typography, 
  Button,
  Navbar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar
} from '@material-tailwind/react';
import {
  DocumentTextIcon,
  PencilSquareIcon,
  UserCircleIcon,
  PowerIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Typography variant="h5">Loading...</Typography>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Assignments Help Provider</title>
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
              <div>
                <Typography variant="h6" className="font-bold">
                  Dashboard
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  Welcome back, {user.email}
                </Typography>
              </div>
            </div>

            {/* User Menu */}
            <Menu>
              <MenuHandler>
                <Button variant="text" className="flex items-center space-x-2 p-2">
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="hidden md:block">{user.role.toUpperCase()}</span>
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={handleChangePassword} className="flex items-center space-x-2">
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>Change Password</span>
                </MenuItem>
                <MenuItem onClick={handleLogout} className="flex items-center space-x-2 text-red-500">
                  <PowerIcon className="h-4 w-4" />
                  <span>Logout</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Navbar>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Welcome to Your Dashboard
              </Typography>
              <Typography variant="lead" color="gray">
                {user.role === 'admin' 
                  ? 'Manage assignments and content from here.' 
                  : 'Create and manage blog content from here.'
                }
              </Typography>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {/* Assignment Form Card - Admin Only */}
              {user.role === 'admin' && (
                <Link href="/assignment">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <Typography variant="h5" color="blue-gray" className="font-bold">
                          Assignment Form
                        </Typography>
                        <Typography variant="small" color="gray">
                          Manage client assignments
                        </Typography>
                      </div>
                    </div>
                    <Typography color="gray" className="mb-4">
                      Create and manage assignment details including client information, 
                      writer assignments, due dates, and project specifications.
                    </Typography>
                    <Button color="blue" variant="outlined" size="sm" className="w-fit">
                      Open Assignment Form
                    </Button>
                  </Card>
                </Link>
              )}

              {/* Write Blogs Card - Admin and SEO */}
              <Link href="/write">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <PencilSquareIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <Typography variant="h5" color="blue-gray" className="font-bold">
                        Write Blogs
                      </Typography>
                      <Typography variant="small" color="gray">
                        Content management
                      </Typography>
                    </div>
                  </div>
                  <Typography color="gray" className="mb-4">
                    Create, edit, and publish blog posts and articles. 
                    Manage your content calendar and SEO optimization.
                  </Typography>
                  <Button color="green" variant="outlined" size="sm" className="w-fit">
                    Start Writing
                  </Button>
                </Card>
              </Link>
            </div>

            {/* Role-specific Information */}
            <div className="mt-12">
              <Card className="p-6">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Your Access Level: {user.role.toUpperCase()}
                </Typography>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="h6" color="green" className="mb-2">
                      Available Features:
                    </Typography>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Blog Writing & Management</li>
                      <li>• Content Publishing</li>
                      <li>• SEO Tools</li>
                      {user.role === 'admin' && (
                        <>
                          <li>• Assignment Management</li>
                          <li>• Client Management</li>
                          <li>• Writer Coordination</li>
                          <li>• Full Administrative Access</li>
                        </>
                      )}
                    </ul>
                  </div>
                  {user.role === 'seo' && (
                    <div>
                      <Typography variant="h6" color="amber" className="mb-2">
                        Restricted Features:
                      </Typography>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Assignment Form (Admin Only)</li>
                        <li>• Client Management (Admin Only)</li>
                        <li>• Administrative Settings</li>
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}