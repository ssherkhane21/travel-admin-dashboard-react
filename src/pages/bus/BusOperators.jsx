
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye, Plus } from 'lucide-react';

// Sample data
const busOperatorsData = [
  { id: 1, name: 'Express Travels', mobile: '+1-234-567-8901', email: 'info@expresstravels.com', status: 'Approved', busCount: 12 },
  { id: 2, name: 'City Link', mobile: '+1-234-567-8902', email: 'contact@citylink.com', status: 'Pending', busCount: 8 },
  { id: 3, name: 'Metro Bus Co.', mobile: '+1-234-567-8903', email: 'info@metrobus.com', status: 'Approved', busCount: 15 },
  { id: 4, name: 'Roadway Express', mobile: '+1-234-567-8904', email: 'contact@roadway.com', status: 'Rejected', busCount: 0 },
  { id: 5, name: 'Golden Bus Lines', mobile: '+1-234-567-8905', email: 'info@goldenbus.com', status: 'Approved', busCount: 10 },
  { id: 6, name: 'Urban Transport', mobile: '+1-234-567-8906', email: 'contact@urbantransport.com', status: 'Submitted', busCount: 5 },
  { id: 7, name: 'Interstate Bus', mobile: '+1-234-567-8907', email: 'info@interstatebus.com', status: 'Approved', busCount: 20 },
  { id: 8, name: 'Swift Travels', mobile: '+1-234-567-8908', email: 'contact@swifttravels.com', status: 'Blocked', busCount: 0 },
  { id: 9, name: 'Alpine Bus Co.', mobile: '+1-234-567-8909', email: 'info@alpinebus.com', status: 'Approved', busCount: 7 },
  { id: 10, name: 'Pacific Routes', mobile: '+1-234-567-8910', email: 'contact@pacificroutes.com', status: 'Pending', busCount: 3 },
];

const BusOperators = () => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Approved': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Blocked': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };
  
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Mobile',
      accessor: 'mobile',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => getStatusBadge(row.status),
    },
    {
      header: 'Number of Buses',
      accessor: 'busCount',
      render: (row) => (
        <button 
          className="text-primary hover:underline"
          onClick={() => navigate(`/bus/operators/${row.id}/buses`)}
        >
          {row.busCount}
        </button>
      ),
    },
    {
      header: 'Action',
      accessor: '',
      render: (row) => (
        <button 
          onClick={() => navigate(`/bus/operators/${row.id}`)}
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
        title="Bus Operators"
        description="Manage all bus operators and their details."
        action={
          <button 
            onClick={() => navigate('/bus/operators/new')}
            className="flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Bus Operator
          </button>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          columns={columns}
          data={busOperatorsData}
        />
      </div>
    </div>
  );
};

export default BusOperators;
