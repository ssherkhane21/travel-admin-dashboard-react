
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Filter } from 'lucide-react';
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

const CustomerHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulating API call to fetch customer data and booking history
    setTimeout(() => {
      // Mock customer data
      setCustomer({
        id: parseInt(id),
        name: 'John Doe',
        mobile: '9876543210',
        email: 'john.doe@example.com',
        address: '123 Main St, Anytown, USA',
        joinedOn: '2023-01-15',
      });
      
      // Mock booking history with more details
      setBookings([
        { 
          id: 1, 
          type: 'Hotel', 
          date: '2023-05-01', 
          amount: '$120.00', 
          status: 'Completed',
          details: 'Grand Plaza Hotel, Room 302, 2 Adults',
          checkIn: '2023-05-01',
          checkOut: '2023-05-03'
        },
        { 
          id: 2, 
          type: 'Bus', 
          date: '2023-04-15', 
          amount: '$45.00', 
          status: 'Completed',
          details: 'Express Bus, Seat 14B, New York to Boston',
          departureTime: '08:30 AM',
          arrivalTime: '12:45 PM'
        },
        { 
          id: 3, 
          type: 'Taxi', 
          date: '2023-04-10', 
          amount: '$25.50', 
          status: 'Completed',
          details: 'Sedan, Airport to Downtown',
          pickupTime: '14:15 PM',
          distance: '18 miles'
        },
        { 
          id: 4, 
          type: 'Bike', 
          date: '2023-03-22', 
          amount: '$18.75', 
          status: 'Cancelled',
          details: 'Mountain Bike, Central Park',
          duration: '4 hours',
          cancelReason: 'Weather conditions'
        },
        { 
          id: 5, 
          type: 'Hotel', 
          date: '2023-03-05', 
          amount: '$150.00', 
          status: 'Completed',
          details: 'Seaside Resort, Suite 501, 2 Adults, 1 Child',
          checkIn: '2023-03-05',
          checkOut: '2023-03-08'
        },
      ]);
      
      setLoading(false);
    }, 500);
  }, [id]);

  const filteredBookings = bookings.filter(booking => {
    const matchesType = typeFilter === 'all' || booking.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const handleExport = () => {
    console.log('Exporting customer history...');
    // Export functionality would be implemented here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title={`${customer.name}'s Booking History`}
        description="View all bookings made by this customer"
        action={
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/customers/${id}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customer
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        }
      />

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 border rounded-md w-full appearance-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Service Types</option>
            <option value="Hotel">Hotel</option>
            <option value="Bus">Bus</option>
            <option value="Taxi">Taxi</option>
            <option value="Bike">Bike</option>
          </select>
        </div>

        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 border rounded-md w-full appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">#{booking.id}</TableCell>
                <TableCell>{booking.type}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell className="max-w-xs truncate">{booking.details}</TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {filteredBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No booking history found for the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerHistory;
