
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const weeklyData = [
  { name: 'Mon', hotel: 20, bus: 15, taxi: 10, bike: 5 },
  { name: 'Tue', hotel: 15, bus: 20, taxi: 12, bike: 8 },
  { name: 'Wed', hotel: 25, bus: 18, taxi: 15, bike: 10 },
  { name: 'Thu', hotel: 22, bus: 23, taxi: 18, bike: 12 },
  { name: 'Fri', hotel: 30, bus: 25, taxi: 20, bike: 15 },
  { name: 'Sat', hotel: 40, bus: 30, taxi: 25, bike: 20 },
  { name: 'Sun', hotel: 35, bus: 28, taxi: 22, bike: 18 },
];

const monthlyData = [
  { name: 'Jan', hotel: 100, bus: 80, taxi: 60, bike: 40 },
  { name: 'Feb', hotel: 120, bus: 90, taxi: 70, bike: 45 },
  { name: 'Mar', hotel: 140, bus: 100, taxi: 80, bike: 50 },
  { name: 'Apr', hotel: 160, bus: 110, taxi: 90, bike: 55 },
  { name: 'May', hotel: 180, bus: 120, taxi: 100, bike: 60 },
  { name: 'Jun', hotel: 200, bus: 130, taxi: 110, bike: 65 },
  { name: 'Jul', hotel: 220, bus: 140, taxi: 120, bike: 70 },
  { name: 'Aug', hotel: 240, bus: 150, taxi: 130, bike: 75 },
  { name: 'Sep', hotel: 260, bus: 160, taxi: 140, bike: 80 },
  { name: 'Oct', hotel: 280, bus: 170, taxi: 150, bike: 85 },
  { name: 'Nov', hotel: 300, bus: 180, taxi: 160, bike: 90 },
  { name: 'Dec', hotel: 320, bus: 190, taxi: 170, bike: 95 },
];

const yearlyData = [
  { name: '2020', hotel: 1200, bus: 900, taxi: 700, bike: 500 },
  { name: '2021', hotel: 1400, bus: 1100, taxi: 850, bike: 600 },
  { name: '2022', hotel: 1600, bus: 1300, taxi: 1000, bike: 700 },
  { name: '2023', hotel: 1800, bus: 1500, taxi: 1150, bike: 800 },
  { name: '2024', hotel: 2000, bus: 1700, taxi: 1300, bike: 900 },
];

const AnalyticsChart = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  
  const getChartData = () => {
    switch(timeRange) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      case 'yearly': return yearlyData;
      default: return weeklyData;
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Booking Analytics</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'weekly' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'monthly' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeRange('yearly')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === 'yearly' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getChartData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hotel" name="Hotel" fill="#4f46e5" />
            <Bar dataKey="bus" name="Bus" fill="#10b981" />
            <Bar dataKey="taxi" name="Taxi" fill="#f59e0b" />
            <Bar dataKey="bike" name="Bike" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm flex items-center">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default AnalyticsChart;
