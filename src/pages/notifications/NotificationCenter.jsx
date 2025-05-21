
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash, Bell } from 'lucide-react';
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

const NotificationCenter = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock notifications data
  const notifications = [
    { 
      id: 1, 
      title: 'System Maintenance', 
      target: 'All Users', 
      sentAt: '2023-05-15 09:30', 
      status: 'Sent',
      readCount: '245/300' 
    },
    { 
      id: 2, 
      title: 'New Feature Announcement', 
      target: 'Customers', 
      sentAt: '2023-05-12 14:45', 
      status: 'Sent',
      readCount: '178/250'
    },
    { 
      id: 3, 
      title: 'Taxi Driver Onboarding', 
      target: 'Taxi Drivers', 
      sentAt: '2023-05-10 11:20', 
      status: 'Scheduled',
      readCount: 'N/A'
    },
    { 
      id: 4, 
      title: 'Hotel Partner Promotion', 
      target: 'Hotel Managers', 
      sentAt: '2023-05-08 16:30', 
      status: 'Draft',
      readCount: 'N/A'
    },
  ];

  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNotification = () => {
    navigate('/notifications/create');
  };

  return (
    <div>
      <PageHeader 
        title="Notification Center" 
        description="Manage and send notifications to users"
        action={
          <Button onClick={handleCreateNotification}>
            <Plus className="h-4 w-4 mr-2" />
            Create Notification
          </Button>
        }
      />

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
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
              <TableHead>Title</TableHead>
              <TableHead>Target Audience</TableHead>
              <TableHead>Sent At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Read Count</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell>{notification.target}</TableCell>
                <TableCell>{notification.sentAt}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    notification.status === 'Sent' 
                      ? 'bg-green-100 text-green-800' 
                      : notification.status === 'Scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {notification.status}
                  </span>
                </TableCell>
                <TableCell>{notification.readCount}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100"
                      onClick={() => console.log('Edit notification', notification.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100"
                      onClick={() => console.log('Delete notification', notification.id)}
                    >
                      <Trash size={16} />
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

export default NotificationCenter;
