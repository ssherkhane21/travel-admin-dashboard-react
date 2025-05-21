
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Eye, Plus } from 'lucide-react';

// Sample data
const hotelManagersData = [
  { id: 1, name: 'Grand Plaza Hotel', manager: 'Robert Johnson', mobile: '+1-234-567-8901', email: 'robert@grandplaza.com', status: 'Approved' },
  { id: 2, name: 'City View Inn', manager: 'Sarah Miller', mobile: '+1-234-567-8902', email: 'sarah@cityview.com', status: 'Pending' },
  { id: 3, name: 'Ocean Blue Resort', manager: 'Michael Brown', mobile: '+1-234-567-8903', email: 'michael@oceanblue.com', status: 'Approved' },
  { id: 4, name: 'Mountain Lodge', manager: 'Emily Wilson', mobile: '+1-234-567-8904', email: 'emily@mountainlodge.com', status: 'Rejected' },
  { id: 5, name: 'Sunset Hotel', manager: 'David Lee', mobile: '+1-234-567-8905', email: 'david@sunsethotel.com', status: 'Approved' },
  { id: 6, name: 'River View Hotel', manager: 'Lisa Green', mobile: '+1-234-567-8906', email: 'lisa@riverview.com', status: 'Submitted' },
  { id: 7, name: 'Central Park Inn', manager: 'James Taylor', mobile: '+1-234-567-8907', email: 'james@centralpark.com', status: 'Approved' },
  { id: 8, name: 'Royal Suites', manager: 'Amanda Davis', mobile: '+1-234-567-8908', email: 'amanda@royalsuites.com', status: 'Blocked' },
  { id: 9, name: 'Heritage Hotel', manager: 'Daniel White', mobile: '+1-234-567-8909', email: 'daniel@heritage.com', status: 'Approved' },
  { id: 10, name: 'Lakeside Resort', manager: 'Jennifer Black', mobile: '+1-234-567-8910', email: 'jennifer@lakeside.com', status: 'Pending' },
];

const HotelManagers = () => {
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
      header: 'Manager',
      accessor: 'manager',
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
          onClick={() => navigate(`/hotel/managers/${row.id}`)}
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
        title="Hotel Managers"
        description="Manage all hotel managers and their details."
        action={
          <button 
            onClick={() => navigate('/hotel/managers/new')}
            className="flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hotel Manager
          </button>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          columns={columns}
          data={hotelManagersData}
        />
      </div>
    </div>
  );
};

export default HotelManagers;
