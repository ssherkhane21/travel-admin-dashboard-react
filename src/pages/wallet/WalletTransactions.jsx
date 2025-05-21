
import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '../../components/ui/PageHeader';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '../../components/ui/table';

const WalletTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Mock transaction data
  const transactions = [
    { 
      id: 1, 
      userId: '1001', 
      userName: 'John Doe', 
      type: 'deposit', 
      amount: '$50.00', 
      status: 'completed', 
      date: '2023-05-15' 
    },
    { 
      id: 2, 
      userId: '1002', 
      userName: 'Jane Smith', 
      type: 'withdrawal', 
      amount: '$25.00', 
      status: 'completed', 
      date: '2023-05-14' 
    },
    { 
      id: 3, 
      userId: '1003', 
      userName: 'Robert Johnson', 
      type: 'deposit', 
      amount: '$100.00', 
      status: 'pending', 
      date: '2023-05-13' 
    },
    { 
      id: 4, 
      userId: '1001', 
      userName: 'John Doe', 
      type: 'withdrawal', 
      amount: '$40.00', 
      status: 'failed', 
      date: '2023-05-12' 
    },
    { 
      id: 5, 
      userId: '1004', 
      userName: 'Emily Davis', 
      type: 'deposit', 
      amount: '$75.00', 
      status: 'completed', 
      date: '2023-05-12' 
    },
  ];

  // Apply filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userId.includes(searchTerm) ||
      transaction.amount.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExport = () => {
    console.log('Export wallet transactions');
  };

  return (
    <div>
      <PageHeader 
        title="Wallet Transactions" 
        description="Monitor and manage user wallet activities"
        action={
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        }
      />

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID or amount..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border rounded-md w-full appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="relative flex-1">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border rounded-md w-full appearance-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-xs">#{transaction.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{transaction.userName}</div>
                    <div className="text-xs text-gray-500">ID: {transaction.userId}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`capitalize px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{transaction.amount}</TableCell>
                <TableCell>
                  <span className={`capitalize px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WalletTransactions;
