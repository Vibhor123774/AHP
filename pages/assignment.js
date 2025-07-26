// pages/assignment.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Card, 
  Input, 
  Button, 
  Typography,
  Select,
  Option,
  Textarea,
  Alert,
  Navbar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  PowerIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function AssignmentForm() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    clientCode: '',
    clientNumber: '',
    dueDate: '',
    amount: '',
    currency: 'USD',
    writerName: '',
    writerEmail: '',
    writerDate: ''
  });

  // Auto-suggestion states
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [writerSuggestions, setWriterSuggestions] = useState([]);
  const [currencies] = useState([
    'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY', 'SGD', 'AED',
    'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RUB', 'BRL', 'MXN'
  ]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // Check if user is admin
        if (userData.role !== 'admin') {
          router.push('/write');
          return;
        }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate client code when client name changes
    if (name === 'clientName') {
      // This would typically search for existing clients
      // For now, we'll generate a placeholder code
      const code = generateClientCode(value);
      setFormData(prev => ({
        ...prev,
        clientCode: code
      }));
    }

    // Clear messages when user types
    setError('');
    setSuccess('');
  };

  const generateClientCode = (clientName) => {
    if (!clientName.trim()) return '';
    
    // Generate a simple code format: AHPX01X0001
    // In a real app, this would check existing clients and generate proper sequential numbers
    const clientId = '01'; // This should come from database
    const taskSequence = '0001'; // This should increment based on existing assignments
    
    return `AHPX${clientId}X${taskSequence}`;
  };

  const formatAmount = (value) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    
    // Add .00 if no decimal
    if (parts.length === 1 && numericValue && !numericValue.includes('.')) {
      return numericValue + '.00';
    }
    
    return numericValue;
  };

  const handleAmountChange = (e) => {
    const formattedAmount = formatAmount(e.target.value);
    setFormData(prev => ({
      ...prev,
      amount: formattedAmount
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'clientName', 'clientNumber', 'dueDate', 'amount', 
      'currency', 'writerName', 'writerEmail', 'writerDate'
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        setError(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
        return false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.writerEmail)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate phone number (basic check)
    if (formData.clientNumber.length < 10) {
      setError('Please enter a valid phone number with country code');
      return false;
    }

    // Validate dates are not in the past
    const today = new Date().toISOString().split('T')[0];
    if (formData.dueDate < today) {
      setError('Due date cannot be in the past');
      return false;
    }
    if (formData.writerDate < today) {
      setError('Writer submission date cannot be in the past');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/assignment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          addedBy: user.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Assignment created successfully!');
        // Reset form
        setFormData({
          clientName: '',
          clientCode: '',
          clientNumber: '',
          dueDate: '',
          amount: '',
          currency: 'USD',
          writerName: '',
          writerEmail: '',
          writerDate: ''
        });
      } else {
        setError(data.message || 'Failed to create assignment');
        console.error('Assignment creation failed:', data);
      }
    } catch (error) {
      console.error('Assignment creation error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      clientName: '',
      clientCode: '',
      clientNumber: '',
      dueDate: '',
      amount: '',
      currency: 'USD',
      writerName: '',
      writerEmail: '',
      writerDate: ''
    });
    setError('');
    setSuccess('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Typography variant="h5">Loading...</Typography>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <>
      <Head>
        <title>Assignment Form - Assignments Help Provider</title>
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
                  Assignment Form
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  Manage client assignments
                </Typography>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Write Link */}
              <Link href="/write">
                <Button variant="outlined" size="sm" className="flex items-center space-x-2">
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Write Blogs</span>
                </Button>
              </Link>

              {/* User Menu */}
              <Menu>
                <MenuHandler>
                  <Button variant="text" className="flex items-center space-x-2 p-2">
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden md:block">{user.role.toUpperCase()}</span>
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => router.push('/change-password')} className="flex items-center space-x-2">
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
          </div>
        </Navbar>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Assignment Form
              </Typography>
              <Typography variant="lead" color="gray">
                Create and manage assignment details for clients and writers
              </Typography>
            </div>

            {/* Form Card */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success/Error Messages */}
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

                {/* Client Information Section */}
                <div className="space-y-4">
                  <Typography variant="h6" color="blue-gray" className="flex items-center">
                    <UserCircleIcon className="h-5 w-5 mr-2" />
                    Client Information
                  </Typography>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="clientName"
                        label="Client Name *"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        name="clientCode"
                        label="Client Code"
                        value={formData.clientCode}
                        disabled
                        className="focus:ring-0 bg-gray-50"
                        placeholder="Auto-generated"
                      />
                    </div>

                    <div>
                      <Input
                        name="clientNumber"
                        label="Client Number *"
                        value={formData.clientNumber}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        placeholder="+91 99999 00000"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        name="dueDate"
                        label="Due Date *"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information Section */}
                <div className="space-y-4">
                  <Typography variant="h6" color="blue-gray" className="flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Payment Information
                  </Typography>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="amount"
                        label="Amount *"
                        value={formData.amount}
                        onChange={handleAmountChange}
                        className="focus:ring-0"
                        placeholder="150.00"
                        required
                      />
                    </div>

                    <div>
                      <Select
                        label="Currency *"
                        value={formData.currency}
                        onChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                      >
                        {currencies.map((currency) => (
                          <Option key={currency} value={currency}>
                            {currency}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Writer Information Section */}
                <div className="space-y-4">
                  <Typography variant="h6" color="blue-gray" className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    Writer Information
                  </Typography>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="writerName"
                        label="Writer Name *"
                        value={formData.writerName}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        name="writerEmail"
                        label="Writer Email *"
                        type="email"
                        value={formData.writerEmail}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        placeholder="writer@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        name="writerDate"
                        label="Writer Submission Date *"
                        type="date"
                        value={formData.writerDate}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outlined"
                    color="gray"
                    onClick={handleClear}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    <XMarkIcon className="h-4 w-4 mr-2" />
                    Clear
                  </Button>

                  <Button
                    type="submit"
                    color="blue"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}