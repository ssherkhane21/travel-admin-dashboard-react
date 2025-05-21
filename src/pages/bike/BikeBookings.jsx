
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye } from 'lucide-react';

// Sample data
const bookingsData = [
  { id: 'BKE-1001', customer: 'John Doe', rider: 'Alex Rodriguez', from: 'City Center', to: 'Beach', rideDate: '2025-05-25', vehicleType: 'Sport', amount: '$25.00' },
  { id: 'BKE-1002', customer: 'Jane Smith', rider: 'Jessica Miller', from: 'Beach Resort', to: 'Market Square', rideDate: '2025-05-26', vehicleType: 'Cruiser', amount: '$30.00' },
  { id: 'BKE-1003', customer: 'Mike Johnson', rider: 'Tyler Johnson', from: 'Hotel Zone', to: 'Old Town', rideDate: '2025-05-27', vehicleType: 'Sport', amount: '$22.00' },
  { id: 'BKE-1004', customer: 'Sarah Wilson', rider: 'Samantha Brown', from: 'Airport', to: 'Hotel Zone', rideDate: '2025-05-28', vehicleType: 'Scooter', amount: '$35.00' },
  { id: 'BKE-1005', customer: 'Robert Brown', rider: 'Chris Wilson', from: 'Downtown', to: 'University', rideDate: '2025-05-29', vehicleType: 'Sport', amount: '$20.00' },
  { id: 'BKE-1006', customer: 'Emily Davis', rider: 'Emma Davis', from: 'Shopping Mall', to: 'Beach', rideDate: '2025-05-30', vehicleType: 'Cruiser', amount: '$28.00' },
  { id: 'BKE-1007', customer: 'David Lee', rider: 'Logan Lee', from: 'City Park', to: 'Concert Hall', rideDate: '2025-05-31', vehicleType: 'Standard', amount: '$24.00' },
  { id: 'BKE-1008', customer: 'Lisa Miller', rider: 'Sophie Thompson', from: 'Beach', to: 'Restaurant Row', rideDate: '2025-06-01', vehicleType: 'Sport', amount: '$26.00' },
  { id: 'BKE-1009', customer: 'Mark Wilson', rider: 'Noah Adams', from: 'Hotel', to: 'Night Club', rideDate: '2025-06-02', vehicleType: 'Cruiser', amount: '$32.00' },
  { id: 'BKE-1010', customer: 'Karen Thompson', rider: 'Olivia Evans', from: 'Concert Hall', to: 'Hotel', rideDate: '2025-06-03', vehicleType: 'Sport', amount: '$27.00' },
];

const BikeBookings = () => {
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
      header: 'Rider',
      accessor: 'rider',
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
          onClick={() => navigate(`/bike/bookings/${row.id}`)}
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
        title="Bike Bookings"
        description="Manage all bike bookings and their details."
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
              <label htmlFor="rider" className="block text-sm font-medium text-gray-700 mb-1">Rider</label>
              <input
                type="text"
                id="rider"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                placeholder="Search by rider"
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

export default BikeBookings;
