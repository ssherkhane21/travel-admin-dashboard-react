
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/ui/PageHeader';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch customer data
    setTimeout(() => {
      // Mock customer data
      setCustomer({
        id: parseInt(id),
        name: 'John Doe',
        mobile: '9876543210',
        email: 'john.doe@example.com',
        address: '123 Main Street, Anytown, USA',
        registeredOn: '2023-01-15',
        totalBookings: 12,
        lastActive: '2023-05-10',
        walletBalance: '$120.50'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleViewHistory = () => {
    navigate(`/customers/${id}/history`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900">Customer not found</h3>
        <p className="mt-2 text-gray-500">The customer you're looking for doesn't exist or has been removed.</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => navigate('/customers')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Customer Details" 
        description="View detailed information about the customer"
        action={
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/customers')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleViewHistory}
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </Button>
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-500">Personal Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-medium">{customer.mobile}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{customer.address}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Account Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Registered On</p>
                  <p className="font-medium">{customer.registeredOn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="font-medium">{customer.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="font-medium">{customer.lastActive}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wallet Balance</p>
                  <p className="font-medium">{customer.walletBalance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
