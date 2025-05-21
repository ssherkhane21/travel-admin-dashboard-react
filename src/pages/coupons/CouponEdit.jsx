
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const CouponEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    service: '',
    discountType: '',
    value: '',
    startDate: '',
    endDate: '',
    status: '',
  });
  
  // Mock fetching coupon data
  useEffect(() => {
    // In a real application, you would fetch coupon data from an API
    const couponData = {
      1: { 
        id: 1, 
        name: 'SUMMER2023', 
        code: 'SUM23', 
        service: 'Hotel Booking', 
        discountType: 'Percentage',
        value: '15',
        startDate: '2023-06-01',
        endDate: '2023-08-31',
        status: 'Active' 
      },
      2: { 
        id: 2, 
        name: 'TAXIDEAL', 
        code: 'TAXI50', 
        service: 'Taxi Booking', 
        discountType: 'Fixed',
        value: '5',
        startDate: '2023-05-01',
        endDate: '2023-06-30',
        status: 'Active' 
      },
      3: { 
        id: 3, 
        name: 'BIKERIDE', 
        code: 'BIKE10', 
        service: 'Bike Booking', 
        discountType: 'Percentage',
        value: '10',
        startDate: '2023-05-15',
        endDate: '2023-07-15',
        status: 'Active' 
      },
      4: { 
        id: 4, 
        name: 'BUSJOURNEY', 
        code: 'BUS20', 
        service: 'Bus Booking', 
        discountType: 'Percentage',
        value: '20',
        startDate: '2023-04-01',
        endDate: '2023-05-31',
        status: 'Expired' 
      },
    }[id];
    
    if (couponData) {
      setFormData(couponData);
    }
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would make an API call to update the coupon
    console.log('Updated coupon data:', formData);
    
    // Show success toast
    toast({
      title: "Coupon updated",
      description: "Coupon has been updated successfully.",
      variant: "default",
    });
    
    // Navigate back to coupons list
    navigate('/coupons');
  };
  
  return (
    <div>
      <PageHeader
        title="Edit Coupon"
        description="Modify coupon details and settings"
        action={
          <Button variant="outline" onClick={() => navigate('/coupons')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Coupons
          </Button>
        }
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Coupon Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select service</option>
                  <option value="Hotel Booking">Hotel Booking</option>
                  <option value="Bus Booking">Bus Booking</option>
                  <option value="Taxi Booking">Taxi Booking</option>
                  <option value="Bike Booking">Bike Booking</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
                  Discount Type
                </label>
                <select
                  id="discountType"
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select discount type</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed Amount</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                  {formData.discountType === 'Percentage' ? 'Discount (%)' : 'Discount Amount ($)'}
                </label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CouponEdit;
