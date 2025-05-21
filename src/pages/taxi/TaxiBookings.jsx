
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye } from 'lucide-react';

// Sample data
const bookingsData = [
  { id: 'TXI-1001', customer: 'John Doe', driver: 'Mike Smith', from: 'Airport', to: 'Downtown', rideDate: '2025-05-25', vehicleType: 'Sedan', amount: '$35.00' },
  { id: 'TXI-1002', customer: 'Jane Smith', driver: 'Robert Johnson', from: 'Hotel Plaza', to: 'Shopping Mall', rideDate: '2025-05-26', vehicleType: 'SUV', amount: '$45.00' },
  { id: 'TXI-1003', customer: 'Mike Johnson', driver: 'Sarah Williams', from: 'Convention Center', to: 'Restaurant Row', rideDate: '2025-05-27', vehicleType: 'Sedan', amount: '$30.00' },
  { id: 'TXI-1004', customer: 'Sarah Wilson', driver: 'David Brown', from: 'Business Park', to: 'Airport', rideDate: '2025-05-28', vehicleType: 'Van', amount: '$55.00' },
  { id: 'TXI-1005', customer: 'Robert Brown', driver: 'Lisa Miller', from: 'City Center', to: 'University', rideDate: '2025-05-29', vehicleType: 'Sedan', amount: '$25.00' },
  { id: 'TXI-1006', customer: 'Emily Davis', driver: 'Michael Garcia', from: 'Residential Area', to: 'Stadium', rideDate: '2025-05-30', vehicleType: 'SUV', amount: '$40.00' },
  { id: 'TXI-1007', customer: 'David Lee', driver: 'Jennifer Lee', from: 'Train Station', to: 'Hotel', rideDate: '2025-05-31', vehicleType: 'Sedan', amount: '$32.00' },
  { id: 'TXI-1008', customer: 'Lisa Miller', driver: 'Robert Davis', from: 'Shopping Mall', to: 'Residential Area', rideDate: '2025-06-01', vehicleType: 'Hatchback', amount: '$28.00' },
  { id: 'TXI-1009', customer: 'Mark Wilson', driver: 'Laura Martinez', from: 'Hospital', to: 'Retirement Home', rideDate: '2025-06-02', vehicleType: 'SUV', amount: '$38.00' },
  { id: 'TXI-1010', customer: 'Karen Thompson', driver: 'James Wilson', from: 'Beach Resort', to: 'Airport', rideDate: '2025-06-03', vehicleType: 'Van', amount: '$60.00' },
];

const TaxiBookings = () => {
  const navigate = useNavigate();
  
  const columns = [
    {
      header: 'ID',
      accessor: 'id',
    },
    {
      header: 'Customer',
      accessor: 'customer',
    },
    {
      header: 'Driver',
      accessor: 'driver',
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
      header: 'Ride Date',
      accessor: 'rideDate',
    },
    {
      header: 'Vehicle Type',
      accessor: 'vehicleType',
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
          onClick={() => navigate(`/taxi/bookings/${row.id}`)}
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
        title="Taxi Bookings"
        description="Manage all taxi bookings and their details."
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <input
                type="text"
                id="customer"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by customer"
              />
            </div>
            <div>
              <label htmlFor="driver" className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
              <input
                type="text"
                id="driver"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by driver"
              />
            </div>
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="text"
                id="from"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by origin"
              />
            </div>
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="text"
                id="to"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by destination"
              />
            </div>
            <div>
              <label htmlFor="rideDate" className="block text-sm font-medium text-gray-700 mb-1">Ride Date</label>
              <input
                type="date"
                id="rideDate"
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

export default TaxiBookings;
