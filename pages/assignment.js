// pages/assignment.js
import { useState, useEffect, useRef } from 'react';
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
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [showWriterSuggestions, setShowWriterSuggestions] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [searchingClients, setSearchingClients] = useState(false);
  const [searchingWriters, setSearchingWriters] = useState(false);
  
  // Refs for suggestion dropdowns
  const clientSuggestionsRef = useRef(null);
  const writerSuggestionsRef = useRef(null);
  
  // Debounce timers
  const clientSearchTimer = useRef(null);
  const writerSearchTimer = useRef(null);
  
  const [currencies] = useState([
    'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY', 'SGD', 'AED',
    'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RUB', 'BRL', 'MXN'
  ]);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (clientSearchTimer.current) {
        clearTimeout(clientSearchTimer.current);
      }
      if (writerSearchTimer.current) {
        clearTimeout(writerSearchTimer.current);
      }
    };
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (clientSuggestionsRef.current && !clientSuggestionsRef.current.contains(event.target)) {
        setShowClientSuggestions(false);
      }
      if (writerSuggestionsRef.current && !writerSuggestionsRef.current.contains(event.target)) {
        setShowWriterSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Search clients with debouncing
  const searchClients = async (query) => {
    if (query.length < 2) {
      setClientSuggestions([]);
      setShowClientSuggestions(false);
      return;
    }

    setSearchingClients(true);
    
    try {
      const response = await fetch(`/api/assignment/search-clients?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setClientSuggestions(data.clients || []);
        setShowClientSuggestions(true);
      } else {
        console.error('Failed to search clients:', response.statusText);
        setClientSuggestions([]);
        setShowClientSuggestions(false);
      }
    } catch (error) {
      console.error('Error searching clients:', error);
      setClientSuggestions([]);
      setShowClientSuggestions(false);
    } finally {
      setSearchingClients(false);
    }
  };

  // Search writers with debouncing
  const searchWriters = async (query) => {
    if (query.length < 2) {
      setWriterSuggestions([]);
      setShowWriterSuggestions(false);
      return;
    }

    setSearchingWriters(true);
    
    try {
      const response = await fetch(`/api/assignment/search-writers?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setWriterSuggestions(data.writers || []);
        setShowWriterSuggestions(true);
      } else {
        console.error('Failed to search writers:', response.statusText);
        setWriterSuggestions([]);
        setShowWriterSuggestions(false);
      }
    } catch (error) {
      console.error('Error searching writers:', error);
      setWriterSuggestions([]);
      setShowWriterSuggestions(false);
    } finally {
      setSearchingWriters(false);
    }
  };

  // Debounced search for clients
  const debouncedClientSearch = (query) => {
    if (clientSearchTimer.current) {
      clearTimeout(clientSearchTimer.current);
    }
    
    clientSearchTimer.current = setTimeout(() => {
      searchClients(query);
    }, 300); // 300ms delay
  };

  // Debounced search for writers
  const debouncedWriterSearch = (query) => {
    if (writerSearchTimer.current) {
      clearTimeout(writerSearchTimer.current);
    }
    
    writerSearchTimer.current = setTimeout(() => {
      searchWriters(query);
    }, 300); // 300ms delay
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setFormData(prev => ({
      ...prev,
      clientName: client.name,
      clientNumber: client.phone || '',
      clientCode: generateClientCode(client.client_id || client.id, (client.assignment_count || 0) + 1)
    }));
    setShowClientSuggestions(false);
  };

  const handleWriterSelect = (writer) => {
    setSelectedWriter(writer);
    setFormData(prev => ({
      ...prev,
      writerName: writer.name,
      writerEmail: writer.email
    }));
    setShowWriterSuggestions(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle client name changes
    if (name === 'clientName') {
      setSelectedClient(null); // Clear selected client when manually typing
      
      if (value.trim().length >= 2) {
        debouncedClientSearch(value.trim());
      } else {
        setClientSuggestions([]);
        setShowClientSuggestions(false);
        // Clear client code when client name is cleared
        setFormData(prev => ({
          ...prev,
          clientCode: '',
          clientNumber: ''
        }));
      }
    }

    // Handle writer name changes
    if (name === 'writerName') {
      setSelectedWriter(null); // Clear selected writer when manually typing
      
      if (value.trim().length >= 2) {
        debouncedWriterSearch(value.trim());
      } else {
        setWriterSuggestions([]);
        setShowWriterSuggestions(false);
        // Clear writer email when writer name is cleared
        setFormData(prev => ({
          ...prev,
          writerEmail: ''
        }));
      }
    }

    // Handle writer email changes - search by email too
    if (name === 'writerEmail') {
      setSelectedWriter(null);
      
      if (value.trim().length >= 2) {
        debouncedWriterSearch(value.trim());
      } else {
        setWriterSuggestions([]);
        setShowWriterSuggestions(false);
      }
    }

    // Clear messages when user types
    setError('');
    setSuccess('');
  };

  const generateClientCode = (clientId, taskSequence) => {
    if (!clientId) return '';
    
    const paddedClientId = String(clientId).padStart(2, '0');
    const paddedTaskSequence = String(taskSequence).padStart(4, '0');
    
    return `AHPX${paddedClientId}X${paddedTaskSequence}`;
  };

  const formatAmount = (value) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
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

  const handleAmountBlur = (e) => {
    let value = e.target.value;
    if (value && !value.includes('.')) {
      value = value + '.00';
    } else if (value && value.includes('.') && value.split('.')[1].length === 1) {
      value = value + '0';
    }
    setFormData(prev => ({
      ...prev,
      amount: value
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
          addedBy: user.email,
          selectedClientId: selectedClient?.id || null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Assignment created successfully! Assignment ID: ${data.assignmentId}`);
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
        setSelectedClient(null);
        setSelectedWriter(null);
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
    setSelectedClient(null);
    setSelectedWriter(null);
    setClientSuggestions([]);
    setWriterSuggestions([]);
    setShowClientSuggestions(false);
    setShowWriterSuggestions(false);
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
                    <div className="relative" ref={clientSuggestionsRef}>
                      <Input
                        name="clientName"
                        label="Client Name *"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        required
                      />
                      {/* Loading indicator for client search */}
                      {searchingClients && (
                        <div className="absolute right-3 top-3">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                      {/* Client Suggestions Dropdown */}
                      {showClientSuggestions && clientSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {clientSuggestions.map((client, index) => (
                            <div
                              key={client.id || index}
                              className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleClientSelect(client)}
                            >
                              <div className="font-medium text-gray-900">{client.name}</div>
                              {client.phone && (
                                <div className="text-sm text-gray-600">{client.phone}</div>
                              )}
                              <div className="text-xs text-blue-600">
                                {client.assignment_count || 0} assignments completed
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* No results message */}
                      {showClientSuggestions && clientSuggestions.length === 0 && !searchingClients && formData.clientName.length >= 2 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3">
                          <div className="text-gray-500 text-sm">
                            No existing clients found. New client will be created.
                          </div>
                        </div>
                      )}
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
                        onBlur={handleAmountBlur}
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
                    <div className="relative" ref={writerSuggestionsRef}>
                      <Input
                        name="writerName"
                        label="Writer Name *"
                        value={formData.writerName}
                        onChange={handleInputChange}
                        className="focus:ring-0"
                        required
                      />
                      {/* Loading indicator for writer search */}
                      {searchingWriters && (
                        <div className="absolute right-3 top-3">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                      {/* Writer Suggestions Dropdown */}
                      {showWriterSuggestions && writerSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {writerSuggestions.map((writer, index) => (
                            <div
                              key={writer.id || index}
                              className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleWriterSelect(writer)}
                            >
                              <div className="font-medium text-gray-900">{writer.name}</div>
                              <div className="text-sm text-gray-600">{writer.email}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* No results message */}
                      {showWriterSuggestions && writerSuggestions.length === 0 && !searchingWriters && formData.writerName.length >= 2 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3">
                          <div className="text-gray-500 text-sm">
                            No existing writers found. New writer will be created.
                          </div>
                        </div>
                      )}
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