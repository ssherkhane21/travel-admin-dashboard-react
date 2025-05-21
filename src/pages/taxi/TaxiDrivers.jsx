
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye, Plus } from 'lucide-react';

// Sample data
const taxiDriversData = [
  { id: 1, name: 'John Smith', mobile: '+1-234-567-8901', email: 'john@example.com', status: 'Approved', experience: 5 },
  { id: 2, name: 'Mike Johnson', mobile: '+1-234-567-8902', email: 'mike@example.com', status: 'Pending', experience: 3 },
  { id: 3, name: 'Sarah Brown', mobile: '+1-234-567-8903', email: 'sarah@example.com', status: 'Approved', experience: 7 },
  { id: 4, name: 'Emily Davis', mobile: '+1-234-567-8904', email: 'emily@example.com', status: 'Rejected', experience: 2 },
  { id: 5, name: 'Robert Wilson', mobile: '+1-234-567-8905', email: 'robert@example.com', status: 'Approved', experience: 8 },
  { id: 6, name: 'Lisa Miller', mobile: '+1-234-567-8906', email: 'lisa@example.com', status: 'Submitted', experience: 4 },
  { id: 7, name: 'David Lee', mobile: '+1-234-567-8907', email: 'david@example.com', status: 'Approved', experience: 6 },
  { id: 8, name: 'Karen Thompson', mobile: '+1-234-567-8908', email: 'karen@example.com', status: 'Blocked', experience: 1 },
  { id: 9, name: 'Michael Adams', mobile: '+1-234-567-8909', email: 'michael@example.com', status: 'Approved', experience: 9 },
  { id: 10, name: 'Jennifer Evans', mobile: '+1-234-567-8910', email: 'jennifer@example.com', status: 'Pending', experience: 3 },
];

const TaxiDrivers = () => {
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
      header: 'Action',
      accessor: '',
      render: (row) => (
        <button 
          onClick={() => navigate(`/taxi/drivers/${row.id}`)}
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
        title="Taxi Drivers"
        description="Manage all taxi drivers and their details."
        action={
          <button 
            onClick={() => navigate('/taxi/drivers/new')}
            className="flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Taxi Driver
          </button>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          columns={columns}
          data={taxiDriversData}
        />
      </div>
    </div>
  );
};

export default TaxiDrivers;
