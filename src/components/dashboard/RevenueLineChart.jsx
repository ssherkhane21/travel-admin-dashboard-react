
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const RevenueLineChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Revenue Overview</h2>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#4f46e5" 
              activeDot={{ r: 8 }} 
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <span className="text-sm text-gray-600">Total Revenue</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600">Total Expenses</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm flex items-center">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default RevenueLineChart;
