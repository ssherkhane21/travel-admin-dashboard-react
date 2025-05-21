
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const TaxiBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking details - in a real app, fetch this based on the ID
  const booking = {
    id: id,
    customer: 'John Doe',
    driver: 'Mike Smith',
    from: 'Airport',
    to: 'Downtown',
    rideDate: '2025-05-25',
    vehicleType: 'Sedan',
    amount: '$35.00',
    pickupTime: '14:30',
    distance: '12.5 miles',
    duration: '25 minutes',
    customerPhone: '+1-234-567-8901',
    customerEmail: 'john@example.com',
    driverPhone: '+1-234-567-8922',
    paymentMethod: 'Credit Card',
    bookingDate: '2025-05-20',
    status: 'Completed'
  };

  return (
    <div>
      <PageHeader
        title={`Taxi Booking Details: ${id}`}
        description="View detailed information about this taxi booking."
        action={
          <Button variant="outline" onClick={() => navigate('/taxi/bookings')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
        }
      />

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Ride Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Booking ID:</dt>
                <dd>{booking.id}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Pickup Location:</dt>
                <dd>{booking.from}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Dropoff Location:</dt>
                <dd>{booking.to}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Ride Date:</dt>
                <dd>{booking.rideDate}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Pickup Time:</dt>
                <dd>{booking.pickupTime}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Distance:</dt>
                <dd>{booking.distance}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Duration:</dt>
                <dd>{booking.duration}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Vehicle Type:</dt>
                <dd>{booking.vehicleType}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Customer & Driver Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Customer Name:</dt>
                <dd>{booking.customer}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Customer Phone:</dt>
                <dd>{booking.customerPhone}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Customer Email:</dt>
                <dd>{booking.customerEmail}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Driver Name:</dt>
                <dd>{booking.driver}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="font-medium text-gray-500">Driver Phone:</dt>
                <dd>{booking.driverPhone}</dd>
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

export default TaxiBookingDetails;
