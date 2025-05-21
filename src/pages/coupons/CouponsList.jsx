
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/ui/PageHeader';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '../../components/ui/table';

const CouponsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock coupons data
  const coupons = [
    { 
      id: 1, 
      name: 'SUMMER2023', 
      code: 'SUM23', 
      service: 'Hotel Booking', 
      discountType: 'Percentage',
      value: '15%',
      expiry: '2023-08-31',
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'TAXIDEAL', 
      code: 'TAXI50', 
      service: 'Taxi Booking', 
      discountType: 'Fixed',
      value: '$5.00',
      expiry: '2023-06-30',
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'BIKERIDE', 
      code: 'BIKE10', 
      service: 'Bike Booking', 
      discountType: 'Percentage',
      value: '10%',
      expiry: '2023-07-15',
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'BUSJOURNEY', 
      code: 'BUS20', 
      service: 'Bus Booking', 
      discountType: 'Percentage',
      value: '20%',
      expiry: '2023-05-31',
      status: 'Expired' 
    },
  ];

  const filteredCoupons = coupons.filter(coupon => 
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCoupon = () => {
    navigate('/coupons/create');
  };

  return (
    <div>
      <PageHeader 
        title="Coupon Management" 
        description="Create and manage discount coupons for various services"
        action={
          <Button onClick={handleCreateCoupon}>
            <Plus className="h-4 w-4 mr-2" />
            Create Coupon
          </Button>
        }
      />

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search coupons..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coupon Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">{coupon.name}</TableCell>
                <TableCell className="font-mono text-sm">{coupon.code}</TableCell>
                <TableCell>{coupon.service}</TableCell>
                <TableCell>{coupon.value}</TableCell>
                <TableCell>{coupon.expiry}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    coupon.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {coupon.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100"
                      onClick={() => console.log('Edit coupon', coupon.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100"
                      onClick={() => console.log('Delete coupon', coupon.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CouponsList;
