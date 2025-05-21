
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const HotelBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking details - in a real app, fetch this based on the ID
  const booking = {
    id: id,
    hotelId: 'H123',
    hotelName: 'Grand Hotel',
    customerName: 'John Doe',
    phone: '+1-234-567-8901',
    email: 'john@example.com',
    checkInDate: '2025-05-25',
    checkOutDate: '2025-05-27',
    roomType: 'Deluxe',
    numberOfRooms: 1,
    numberOfGuests: 2,
    amount: '$245.00',
    paymentMethod: 'Credit Card',
    bookingDate: '2025-05-20',
    specialRequests: 'Early check-in if possible',
    status: 'Confirmed'
  };

  return (
    <div>
      <PageHeader
        title={`Hotel Booking Details: ${id}`}
        description="View detailed information about this hotel booking."
        action={
          <Button variant="outline" onClick={() => navigate('/hotel/bookings')}>
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
                <dt className="font-medium text-gray-500">Hotel ID:</dt>
                <dd>{booking.hotelId}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Hotel Name:</dt>
                <dd>{booking.hotelName}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Check-in Date:</dt>
                <dd>{booking.checkInDate}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Check-out Date:</dt>
                <dd>{booking.checkOutDate}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Room Type:</dt>
                <dd>{booking.roomType}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Number of Rooms:</dt>
                <dd>{booking.numberOfRooms}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Number of Guests:</dt>
                <dd>{booking.numberOfGuests}</dd>
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
                <dt className="font-medium text-gray-500">Special Requests:</dt>
                <dd>{booking.specialRequests}</dd>
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

export default HotelBookingDetails;
