
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye } from 'lucide-react';

// Sample data
const bookingsData = [
  { id: 'HTL-1001', hotelId: 'H123', customerName: 'John Doe', phone: '+1-234-567-8901', email: 'john@example.com', checkInDate: '2025-05-25', checkOutDate: '2025-05-27', amount: '$245.00' },
  { id: 'HTL-1002', hotelId: 'H456', customerName: 'Jane Smith', phone: '+1-234-567-8902', email: 'jane@example.com', checkInDate: '2025-05-26', checkOutDate: '2025-05-29', amount: '$355.00' },
  { id: 'HTL-1003', hotelId: 'H789', customerName: 'Mike Johnson', phone: '+1-234-567-8903', email: 'mike@example.com', checkInDate: '2025-05-27', checkOutDate: '2025-05-28', amount: '$135.00' },
  { id: 'HTL-1004', hotelId: 'H123', customerName: 'Sarah Wilson', phone: '+1-234-567-8904', email: 'sarah@example.com', checkInDate: '2025-05-28', checkOutDate: '2025-06-01', amount: '$540.00' },
  { id: 'HTL-1005', hotelId: 'H456', customerName: 'Robert Brown', phone: '+1-234-567-8905', email: 'robert@example.com', checkInDate: '2025-05-29', checkOutDate: '2025-05-30', amount: '$150.00' },
  { id: 'HTL-1006', hotelId: 'H789', customerName: 'Emily Davis', phone: '+1-234-567-8906', email: 'emily@example.com', checkInDate: '2025-05-30', checkOutDate: '2025-06-02', amount: '$438.00' },
  { id: 'HTL-1007', hotelId: 'H123', customerName: 'David Lee', phone: '+1-234-567-8907', email: 'david@example.com', checkInDate: '2025-05-31', checkOutDate: '2025-06-01', amount: '$142.00' },
  { id: 'HTL-1008', hotelId: 'H456', customerName: 'Lisa Miller', phone: '+1-234-567-8908', email: 'lisa@example.com', checkInDate: '2025-06-01', checkOutDate: '2025-06-03', amount: '$336.00' },
  { id: 'HTL-1009', hotelId: 'H789', customerName: 'Mark Wilson', phone: '+1-234-567-8909', email: 'mark@example.com', checkInDate: '2025-06-02', checkOutDate: '2025-06-04', amount: '$344.00' },
  { id: 'HTL-1010', hotelId: 'H123', customerName: 'Karen Thompson', phone: '+1-234-567-8910', email: 'karen@example.com', checkInDate: '2025-06-03', checkOutDate: '2025-06-05', amount: '$247.00' },
];

const HotelBookings = () => {
  const navigate = useNavigate();
  
  const columns = [
    {
      header: 'Booking ID',
      accessor: 'id',
    },
    {
      header: 'Hotel ID',
      accessor: 'hotelId',
    },
    {
      header: 'Customer Name',
      accessor: 'customerName',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Check-in Date',
      accessor: 'checkInDate',
    },
    {
      header: 'Check-out Date',
      accessor: 'checkOutDate',
    },
    {
      header: 'Amount',
      accessor: 'amount',
    },
    {
      header: 'Action',
      accessor: '',
      render: (row) => (
        <button 
          onClick={() => navigate(`/hotel/bookings/${row.id}`)}
          className="flex items-center px-2 py-1 text-sm rounded-md bg-secondary hover:bg-secondary/80"
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </button>
      ),
    },
  ];
  
  return (
    <div>
      <PageHeader
        title="Hotel Bookings"
        description="Manage all hotel bookings and their details."
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="hotelId" className="block text-sm font-medium text-gray-700 mb-1">Hotel ID</label>
              <input
                type="text"
                id="hotelId"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by hotel ID"
              />
            </div>
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <input
                type="text"
                id="customerName"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Name, phone or email"
              />
            </div>
            <div>
              <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <input
                type="date"
                id="checkInDate"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <input
                type="date"
                id="checkOutDate"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            <div className="flex items-end">
              <button className="px-4 py-2 w-full bg-primary text-white rounded-md text-sm hover:bg-primary/90">
                Search
              </button>
            </div>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={bookingsData}
        />
      </div>
    </div>
  );
};

export default HotelBookings;
