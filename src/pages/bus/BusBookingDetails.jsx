
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const BusBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking details - in a real app, fetch this based on the ID
  const booking = {
    id: id,
    busRegNumber: 'ABC-123',
    customerName: 'John Doe',
    phone: '+1-234-567-8901',
    email: 'john@example.com',
    from: 'New York',
    to: 'Boston',
    journeyDate: '2025-05-25',
    amount: '$45.00',
    departureTime: '08:30 AM',
    arrivalTime: '12:30 PM',
    seats: ['A1', 'A2', 'A3'],
    paymentMethod: 'Credit Card',
    bookingDate: '2025-05-20',
    status: 'Confirmed'
  };

  return (
    <div>
      <PageHeader
        title={`Booking Details: ${id}`}
        description="View detailed information about this bus booking."
        action={
          <Button variant="outline" onClick={() => navigate('/bus/bookings')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
        }
      />

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Booking Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Booking ID:</dt>
                <dd>{booking.id}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Bus Reg Number:</dt>
                <dd>{booking.busRegNumber}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Journey Date:</dt>
                <dd>{booking.journeyDate}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Departure Time:</dt>
                <dd>{booking.departureTime}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Arrival Time:</dt>
                <dd>{booking.arrivalTime}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">From:</dt>
                <dd>{booking.from}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">To:</dt>
                <dd>{booking.to}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Seats:</dt>
                <dd>{booking.seats.join(', ')}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Customer Name:</dt>
                <dd>{booking.customerName}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Phone:</dt>
                <dd>{booking.phone}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Email:</dt>
                <dd>{booking.email}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Amount:</dt>
                <dd className="font-semibold">{booking.amount}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Payment Method:</dt>
                <dd>{booking.paymentMethod}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Booking Date:</dt>
                <dd>{booking.bookingDate}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Status:</dt>
                <dd>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {booking.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusBookingDetails;
