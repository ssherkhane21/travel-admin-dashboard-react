
import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import RevenueLineChart from '../components/dashboard/RevenueLineChart';
import PageHeader from '../components/ui/PageHeader';
import { Hotel, Bus, Car, Bike, Users, Calendar, CreditCard } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your travel services."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Bookings"
          value="1,234"
          icon={Calendar}
          change="12"
          changeType="increase"
        />
        <StatCard
          title="Revenue"
          value="$24,560"
          icon={CreditCard}
          change="8"
          changeType="increase"
        />
        <StatCard
          title="Total Users"
          value="845"
          icon={Users}
          change="5"
          changeType="increase"
        />
        <StatCard
          title="Providers"
          value="124"
          icon={Users}
          change="3"
          changeType="increase"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnalyticsChart />
        <RevenueLineChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Hotel Bookings"
          value="512"
          icon={Hotel}
        />
        <StatCard
          title="Bus Bookings"
          value="328"
          icon={Bus}
        />
        <StatCard
          title="Taxi Bookings"
          value="245"
          icon={Car}
        />
        <StatCard
          title="Bike Bookings"
          value="149"
          icon={Bike}
        />
      </div>
    </div>
  );
};

export default Dashboard;
