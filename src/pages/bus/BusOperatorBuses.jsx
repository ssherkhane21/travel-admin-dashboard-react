
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { ArrowLeft, Plus, Eye } from 'lucide-react';

// Sample data
const busesData = [
  { id: 1, registrationNumber: 'ABC-123', model: 'Volvo 9400', capacity: 45, type: 'AC Sleeper', status: 'Active' },
  { id: 2, registrationNumber: 'DEF-456', model: 'Mercedes-Benz O 500', capacity: 40, type: 'AC Seater', status: 'Active' },
  { id: 3, registrationNumber: 'GHI-789', model: 'Scania Metrolink', capacity: 42, type: 'AC Sleeper', status: 'Under Maintenance' },
  { id: 4, registrationNumber: 'JKL-012', model: 'Ashok Leyland Viking', capacity: 50, type: 'Non-AC Seater', status: 'Active' },
  { id: 5, registrationNumber: 'MNO-345', model: 'Tata Starbus', capacity: 36, type: 'AC Seater', status: 'Active' },
  { id: 6, registrationNumber: 'PQR-678', model: 'Eicher Skyline', capacity: 45, type: 'Non-AC Sleeper', status: 'Inactive' },
  { id: 7, registrationNumber: 'STU-901', model: 'Volvo 9400', capacity: 45, type: 'AC Sleeper', status: 'Active' },
  { id: 8, registrationNumber: 'VWX-234', model: 'Mercedes-Benz O 500', capacity: 40, type: 'AC Seater', status: 'Active' },
  { id: 9, registrationNumber: 'YZA-567', model: 'Scania Metrolink', capacity: 42, type: 'AC Sleeper', status: 'Active' },
  { id: 10, registrationNumber: 'BCD-890', model: 'Ashok Leyland Viking', capacity: 50, type: 'Non-AC Seater', status: 'Under Maintenance' },
  { id: 11, registrationNumber: 'EFG-123', model: 'Tata Starbus', capacity: 36, type: 'AC Seater', status: 'Active' },
  { id: 12, registrationNumber: 'HIJ-456', model: 'Eicher Skyline', capacity: 45, type: 'Non-AC Sleeper', status: 'Active' },
];

const BusOperatorBuses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Under Maintenance': 'bg-yellow-100 text-yellow-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };
  
  const columns = [
    {
      header: 'Registration Number',
      accessor: 'registrationNumber',
    },
    {
      header: 'Model',
      accessor: 'model',
    },
    {
      header: 'Capacity',
      accessor: 'capacity',
    },
    {
      header: 'Type',
      accessor: 'type',
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
          onClick={() => navigate(`/bus/operators/${id}/buses/${row.id}`)}
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
        title="Buses"
        description="Manage all buses for this operator."
        action={
          <div className="flex space-x-2">
            <button 
              onClick={() => navigate(`/bus/operators/${id}`)}
              className="flex items-center px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Operator
            </button>
            <button 
              onClick={() => navigate(`/bus/operators/${id}/buses/new`)}
              className="flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Bus
            </button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          columns={columns}
          data={busesData}
        />
      </div>
    </div>
  );
};

export default BusOperatorBuses;
