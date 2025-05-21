
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
  });
  
  // Mock fetching user data
  useEffect(() => {
    // In a real application, you would fetch user data from an API
    const userData = {
      1: { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
      2: { id: 2, name: 'Manager One', email: 'manager1@example.com', role: 'Manager', status: 'Active' },
      3: { id: 3, name: 'Subadmin User', email: 'subadmin@example.com', role: 'Subadmin', status: 'Active' },
      4: { id: 4, name: 'Manager Two', email: 'manager2@example.com', role: 'Manager', status: 'Inactive' },
    }[id];
    
    if (userData) {
      setFormData(userData);
    }
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would make an API call to update the user
    console.log('Updated user data:', formData);
    
    // Show success toast
    toast({
      title: "User updated",
      description: "User information has been updated successfully.",
      variant: "default",
    });
    
    // Navigate back to users list
    navigate('/users');
  };
  
  return (
    <div>
      <PageHeader
        title="Edit User"
        description="Modify user information and permissions"
        action={
          <Button variant="outline" onClick={() => navigate('/users')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        }
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Subadmin">Subadmin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserEdit;
