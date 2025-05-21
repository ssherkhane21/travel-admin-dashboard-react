
import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '../../components/ui/table';
import { Plus, Edit, Calendar } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const CommissionSettings = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Mock commission data
  const [commissions, setCommissions] = useState([
    { 
      id: 1, 
      service: 'Hotel Booking', 
      type: 'Percentage', 
      value: '5%', 
      startDate: '2023-05-01', 
      endDate: '2023-12-31' 
    },
    { 
      id: 2, 
      service: 'Bus Booking', 
      type: 'Fixed', 
      value: '$2.00', 
      startDate: '2023-05-01', 
      endDate: '2023-12-31' 
    },
    { 
      id: 3, 
      service: 'Taxi Booking', 
      type: 'Percentage', 
      value: '10%', 
      startDate: '2023-05-01', 
      endDate: '2023-12-31' 
    },
    { 
      id: 4, 
      service: 'Bike Booking', 
      type: 'Fixed', 
      value: '$1.50', 
      startDate: '2023-05-01', 
      endDate: '2023-12-31' 
    }
  ]);

  const form = useForm({
    defaultValues: {
      service: 'Hotel Booking',
      type: 'Percentage',
      value: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit = (data) => {
    if (isEditing && editId) {
      // Update existing commission
      setCommissions(commissions.map(comm => 
        comm.id === editId ? { ...comm, ...data } : comm
      ));
    } else {
      // Add new commission
      const newCommission = {
        id: commissions.length + 1,
        ...data,
        value: data.type === 'Percentage' ? `${data.value}%` : `$${data.value}`
      };
      setCommissions([...commissions, newCommission]);
    }
    
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    form.reset();
  };

  const handleEdit = (commission) => {
    setIsEditing(true);
    setEditId(commission.id);
    
    // Format the value for the form
    const value = commission.type === 'Percentage' 
      ? commission.value.replace('%', '') 
      : commission.value.replace('$', '');
    
    form.reset({
      service: commission.service,
      type: commission.type,
      value: value,
      startDate: commission.startDate,
      endDate: commission.endDate,
    });
    
    setShowForm(true);
  };

  return (
    <div>
      <PageHeader 
        title="Commission Management" 
        description="Configure commission rates for each service"
        action={
          <Button onClick={() => {
            form.reset({
              service: 'Hotel Booking',
              type: 'Percentage',
              value: '',
              startDate: '',
              endDate: '',
            });
            setIsEditing(false);
            setShowForm(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Commission
          </Button>
        }
      />

      {showForm && (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">
              {isEditing ? 'Edit Commission' : 'Add New Commission'}
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="Hotel Booking">Hotel Booking</option>
                            <option value="Bus Booking">Bus Booking</option>
                            <option value="Taxi Booking">Taxi Booking</option>
                            <option value="Bike Booking">Bike Booking</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Type</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="Percentage">Percentage (%)</option>
                            <option value="Fixed">Fixed Amount ($)</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Value</FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder={form.watch('type') === 'Percentage' ? 'e.g. 5' : 'e.g. 2.50'}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="date"
                              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="date"
                              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? 'Update' : 'Save'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Commission Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id}>
                <TableCell className="font-medium">{commission.service}</TableCell>
                <TableCell>{commission.type}</TableCell>
                <TableCell>{commission.value}</TableCell>
                <TableCell>{commission.startDate}</TableCell>
                <TableCell>{commission.endDate}</TableCell>
                <TableCell>
                  <button 
                    className="p-1.5 bg-blue-50 rounded-md text-blue-600 hover:bg-blue-100"
                    onClick={() => handleEdit(commission)}
                  >
                    <Edit size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CommissionSettings;
