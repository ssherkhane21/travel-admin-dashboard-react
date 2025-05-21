
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye } from 'lucide-react';

// Sample data
const bookingsData = [
  { id: 'BUS-1001', busRegNumber: 'ABC-123', customerName: 'John Doe', phone: '+1-234-567-8901', email: 'john@example.com', from: 'New York', to: 'Boston', journeyDate: '2025-05-25', amount: '$45.00' },
  { id: 'BUS-1002', busRegNumber: 'DEF-456', customerName: 'Jane Smith', phone: '+1-234-567-8902', email: 'jane@example.com', from: 'Chicago', to: 'Detroit', journeyDate: '2025-05-26', amount: '$55.00' },
  { id: 'BUS-1003', busRegNumber: 'GHI-789', customerName: 'Mike Johnson', phone: '+1-234-567-8903', email: 'mike@example.com', from: 'Seattle', to: 'Portland', journeyDate: '2025-05-27', amount: '$35.00' },
  { id: 'BUS-1004', busRegNumber: 'JKL-012', customerName: 'Sarah Wilson', phone: '+1-234-567-8904', email: 'sarah@example.com', from: 'Miami', to: 'Orlando', journeyDate: '2025-05-28', amount: '$40.00' },
  { id: 'BUS-1005', busRegNumber: 'MNO-345', customerName: 'Robert Brown', phone: '+1-234-567-8905', email: 'robert@example.com', from: 'Dallas', to: 'Houston', journeyDate: '2025-05-29', amount: '$50.00' },
  { id: 'BUS-1006', busRegNumber: 'PQR-678', customerName: 'Emily Davis', phone: '+1-234-567-8906', email: 'emily@example.com', from: 'Los Angeles', to: 'San Diego', journeyDate: '2025-05-30', amount: '$38.00' },
  { id: 'BUS-1007', busRegNumber: 'STU-901', customerName: 'David Lee', phone: '+1-234-567-8907', email: 'david@example.com', from: 'San Francisco', to: 'Sacramento', journeyDate: '2025-05-31', amount: '$42.00' },
  { id: 'BUS-1008', busRegNumber: 'VWX-234', customerName: 'Lisa Miller', phone: '+1-234-567-8908', email: 'lisa@example.com', from: 'Phoenix', to: 'Tucson', journeyDate: '2025-06-01', amount: '$36.00' },
  { id: 'BUS-1009', busRegNumber: 'YZA-567', customerName: 'Mark Wilson', phone: '+1-234-567-8909', email: 'mark@example.com', from: 'Denver', to: 'Colorado Springs', journeyDate: '2025-06-02', amount: '$44.00' },
  { id: 'BUS-1010', busRegNumber: 'BCD-890', customerName: 'Karen Thompson', phone: '+1-234-567-8910', email: 'karen@example.com', from: 'Atlanta', to: 'Savannah', journeyDate: '2025-06-03', amount: '$47.00' },
];

const BusBookings = () => {
  const navigate = useNavigate();
  
  const columns = [
    {
      header: 'Booking ID',
      accessor: 'id',
    },
    {
      header: 'Bus Reg Number',
      accessor: 'busRegNumber',
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
      header: 'From',
      accessor: 'from',
    },
    {
      header: 'To',
      accessor: 'to',
    },
    {
      header: 'Journey Date',
      accessor: 'journeyDate',
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
          onClick={() => navigate(`/bus/bookings/${row.id}`)}
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
        title="Bus Bookings"
        description="Manage all bus bookings and their details."
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700 mb-1">Bus Reg Number</label>
              <input
                type="text"
                id="regNumber"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by reg number"
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
              <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-1">Route</label>
              <input
                type="text"
                id="route"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="From or to"
              />
            </div>
            <div>
              <label htmlFor="journeyDate" className="block text-sm font-medium text-gray-700 mb-1">Journey Date</label>
              <input
                type="date"
                id="journeyDate"
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

export default BusBookings;
