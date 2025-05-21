
import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, changeType }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className={`flex items-center mt-2 ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="text-xs font-medium">
                {changeType === 'increase' ? '+' : '-'}{change}%
              </span>
              <span className="text-xs text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className="bg-primary/10 p-3 rounded-full">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
