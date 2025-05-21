
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, History } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '../../components/ui/table';

const CustomersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock customer data
  const customers = [
    { id: 1, name: 'John Doe', mobile: '9876543210', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', mobile: '8765432109', email: 'jane.smith@example.com' },
    { id: 3, name: 'Robert Johnson', mobile: '7654321098', email: 'robert.j@example.com' },
    { id: 4, name: 'Emily Davis', mobile: '6543210987', email: 'emily.d@example.com' },
    { id: 5, name: 'Michael Brown', mobile: '5432109876', email: 'michael.b@example.com' },
  ];

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mobile.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleViewHistory = (customerId) => {
    navigate(`/customers/${customerId}/history`);
  };

  return (
    <div>
      <PageHeader 
        title="Customer Management" 
        description="View and manage all customer accounts" 
      />

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, mobile or email..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewDetails(customer.id)}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(customer.id);
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="p-1.5 bg-green-50 rounded-md text-green-600 hover:bg-green-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewHistory(customer.id);
                      }}
                    >
                      <History size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersList;
