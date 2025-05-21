
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

  useEffect(() => {
    // Simulating API call to fetch customer data and booking history
    setTimeout(() => {
      // Mock customer data
      setCustomer({
        id: parseInt(id),
        name: 'John Doe',
      });
      
      // Mock booking history
      setBookings([
        { id: 1, type: 'Hotel', date: '2023-05-01', amount: '$120.00', status: 'Completed' },
        { id: 2, type: 'Bus', date: '2023-04-15', amount: '$45.00', status: 'Completed' },
        { id: 3, type: 'Taxi', date: '2023-04-10', amount: '$25.50', status: 'Completed' },
        { id: 4, type: 'Bike', date: '2023-03-22', amount: '$18.75', status: 'Cancelled' },
        { id: 5, type: 'Hotel', date: '2023-03-05', amount: '$150.00', status: 'Completed' },
      ]);
      
      setLoading(false);
    }, 500);
  }, [id]);

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
          <Button 
            variant="outline" 
            onClick={() => navigate(`/customers/${id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customer
          </Button>
        }
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">#{booking.id}</TableCell>
                <TableCell>{booking.type}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerHistory;
