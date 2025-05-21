
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye, Plus } from 'lucide-react';

// Sample data
const bikeRidersData = [
  { id: 1, name: 'Alex Rodriguez', mobile: '+1-234-567-8901', email: 'alex@example.com', status: 'Approved', experience: 3 },
  { id: 2, name: 'Jessica Miller', mobile: '+1-234-567-8902', email: 'jessica@example.com', status: 'Pending', experience: 2 },
  { id: 3, name: 'Tyler Johnson', mobile: '+1-234-567-8903', email: 'tyler@example.com', status: 'Approved', experience: 5 },
  { id: 4, name: 'Samantha Brown', mobile: '+1-234-567-8904', email: 'samantha@example.com', status: 'Rejected', experience: 1 },
  { id: 5, name: 'Chris Wilson', mobile: '+1-234-567-8905', email: 'chris@example.com', status: 'Approved', experience: 4 },
  { id: 6, name: 'Emma Davis', mobile: '+1-234-567-8906', email: 'emma@example.com', status: 'Submitted', experience: 2 },
  { id: 7, name: 'Logan Lee', mobile: '+1-234-567-8907', email: 'logan@example.com', status: 'Approved', experience: 3 },
  { id: 8, name: 'Sophie Thompson', mobile: '+1-234-567-8908', email: 'sophie@example.com', status: 'Blocked', experience: 1 },
  { id: 9, name: 'Noah Adams', mobile: '+1-234-567-8909', email: 'noah@example.com', status: 'Approved', experience: 6 },
  { id: 10, name: 'Olivia Evans', mobile: '+1-234-567-8910', email: 'olivia@example.com', status: 'Pending', experience: 2 },
];

const BikeRiders = () => {
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
          onClick={() => navigate(`/bike/riders/${row.id}`)}
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
        title="Bike Riders"
        description="Manage all bike riders and their details."
        action={
          <button 
            onClick={() => navigate('/bike/riders/new')}
            className="flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Bike Rider
          </button>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          columns={columns}
          data={bikeRidersData}
        />
      </div>
    </div>
  );
};

export default BikeRiders;
