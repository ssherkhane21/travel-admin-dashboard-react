
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash } from 'lucide-react';
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
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

const UsersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Manager One', email: 'manager1@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Subadmin User', email: 'subadmin@example.com', role: 'Subadmin', status: 'Active' },
    { id: 4, name: 'Manager Two', email: 'manager2@example.com', role: 'Manager', status: 'Inactive' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleEditUser = (userId) => {
    console.log('Edit user', userId);
    navigate(`/users/edit/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user', userId);
    // Filter out the deleted user
    setUsers(users.filter(user => user.id !== userId));
    // Show success toast
    toast({
      title: "User deleted",
      description: "User has been deleted successfully.",
      variant: "default",
    });
    // Close the dialog
    setDeleteDialogOpen(false);
  };

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  return (
    <div>
      <PageHeader 
        title="User Management" 
        description="Create and manage admin users with different roles"
        action={
          <Button onClick={handleCreateUser}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        }
      />

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email or role..."
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
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : user.role === 'Subadmin'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-1.5 bg-red-50 rounded-md text-red-600 hover:bg-red-100"
                      onClick={() => openDeleteDialog(user)}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user {userToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDeleteUser(userToDelete?.id)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersList;
