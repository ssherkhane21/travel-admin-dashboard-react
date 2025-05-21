
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { ArrowLeft, Upload, Save, Plus, Trash } from 'lucide-react';

// Sample data
const managerData = {
  id: 1,
  profilePhoto: null,
  name: 'Grand Plaza Hotel',
  manager: 'Robert Johnson',
  mobile: '+1-234-567-8901',
  email: 'robert@grandplaza.com',
  status: 'Approved',
  hotelName: 'Grand Plaza Hotel',
  businessLicense: null,
  hotelPhotos: [],
  address: '123 Main Street',
  city: 'New York',
  locality: 'Downtown',
  landmark: 'Near Central Park',
  pincode: '10001',
  totalRooms: 120,
  standardRooms: {
    price: 150,
    count: 80,
    amenities: 'Wi-Fi, TV, AC, Hot Water',
    photos: []
  },
  luxuryRooms: {
    price: 250,
    count: 40,
    amenities: 'Wi-Fi, TV, AC, Hot Water, Mini Bar, Balcony',
    photos: []
  },
  checkinTime: '14:00',
  checkoutTime: '12:00',
  amenities: 'Swimming Pool, Restaurant, Gym, Spa, Conference Room',
  policyDocuments: null,
  bankName: 'National Bank',
  accountHolderName: 'Grand Plaza Hotel Inc.',
  bankAccountNumber: '1234567890',
  bankAccountDetails: null,
  idCardFront: null,
  idCardBack: null
};

const HotelManagerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [formData, setFormData] = useState(isNew ? {
    standardRooms: { photos: [] },
    luxuryRooms: { photos: [] },
    hotelPhotos: []
  } : managerData);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    
    if (nameParts.length > 1) {
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload the file to a server
      // For now, we'll just update the state with a fake URL
      if (field === 'hotelPhotos' || field === 'standardRooms.photos' || field === 'luxuryRooms.photos') {
        const nameParts = field.split('.');
        if (nameParts.length > 1) {
          setFormData({
            ...formData,
            [nameParts[0]]: {
              ...formData[nameParts[0]],
              [nameParts[1]]: [...formData[nameParts[0]][nameParts[1]], URL.createObjectURL(file)]
            }
          });
        } else {
          setFormData({
            ...formData,
            [field]: [...formData[field], URL.createObjectURL(file)]
          });
        }
      } else {
        setFormData({
          ...formData,
          [field]: URL.createObjectURL(file)
        });
      }
    }
  };
  
  const handleRemovePhoto = (field, index) => {
    const nameParts = field.split('.');
    if (nameParts.length > 1) {
      const newPhotos = [...formData[nameParts[0]][nameParts[1]]];
      newPhotos.splice(index, 1);
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: newPhotos
        }
      });
    } else {
      const newPhotos = [...formData[field]];
      newPhotos.splice(index, 1);
      setFormData({
        ...formData,
        [field]: newPhotos
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send the data to your backend
    console.log('Submitting form data:', formData);
    navigate('/hotel/managers');
  };
  
  return (
    <div>
      <PageHeader
        title={isNew ? 'Add Hotel Manager' : 'Hotel Manager Details'}
        description={isNew ? 'Create a new hotel manager' : 'View and edit hotel manager details'}
        action={
          <button 
            onClick={() => navigate('/hotel/managers')}
            className="flex items-center px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </button>
        }
      />
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4">Basic Information</h2>
            </div>
            
            {/* Profile Photo */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
              <div className="mt-1 flex items-center">
                {formData.profilePhoto ? (
                  <div className="relative">
                    <img
                      src={formData.profilePhoto}
                      alt="Profile"
                      className="h-32 w-32 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, profilePhoto: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('profilePhoto').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="profilePhoto"
                      name="profilePhoto"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('profilePhoto', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
          
            {/* Name */}
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Mobile */}
            <div className="col-span-1">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Email */}
            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Status */}
            <div className="col-span-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
                <option value="Rejected">Rejected</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            
            {/* Hotel Details */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Hotel Details</h2>
            </div>
            
            {/* Hotel Name */}
            <div className="col-span-1">
              <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">Hotel Name</label>
              <input
                type="text"
                id="hotelName"
                name="hotelName"
                value={formData.hotelName || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Business License */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Business License</label>
              <div className="mt-1 flex items-center">
                {formData.businessLicense ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, businessLicense: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('businessLicense').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="businessLicense"
                      name="businessLicense"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('businessLicense', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
            
            {/* Hotel Photos */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Photos</label>
              <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {formData.hotelPhotos && formData.hotelPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Hotel ${index + 1}`}
                      className="h-24 w-32 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemovePhoto('hotelPhotos', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('hotelPhotos').click()}
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                  <input
                    id="hotelPhotos"
                    name="hotelPhotos"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => handleFileUpload('hotelPhotos', e)}
                  />
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Location</h2>
            </div>
            
            {/* Address */}
            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* City */}
            <div className="col-span-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Locality */}
            <div className="col-span-1">
              <label htmlFor="locality" className="block text-sm font-medium text-gray-700">Locality</label>
              <input
                type="text"
                id="locality"
                name="locality"
                value={formData.locality || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Landmark */}
            <div className="col-span-1">
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Pin Code */}
            <div className="col-span-1">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pin Code</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Room Information */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Room Information</h2>
            </div>
            
            {/* Total Rooms */}
            <div className="col-span-1">
              <label htmlFor="totalRooms" className="block text-sm font-medium text-gray-700">Total Rooms</label>
              <input
                type="number"
                id="totalRooms"
                name="totalRooms"
                min="0"
                value={formData.totalRooms || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
          
            {/* Standard Rooms */}
            <div className="col-span-full">
              <h3 className="text-md font-medium mb-2">Standard Rooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="standardRooms.price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    id="standardRooms.price"
                    name="standardRooms.price"
                    min="0"
                    value={formData.standardRooms?.price || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="standardRooms.count" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                  <input
                    type="number"
                    id="standardRooms.count"
                    name="standardRooms.count"
                    min="0"
                    value={formData.standardRooms?.count || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="standardRooms.amenities" className="block text-sm font-medium text-gray-700">Amenities</label>
                  <input
                    type="text"
                    id="standardRooms.amenities"
                    name="standardRooms.amenities"
                    value={formData.standardRooms?.amenities || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Photos</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {formData.standardRooms?.photos && formData.standardRooms.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Room ${index + 1}`}
                        className="h-24 w-32 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemovePhoto('standardRooms.photos', index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('standardRoomPhotos').click()}
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                    <input
                      id="standardRoomPhotos"
                      name="standardRoomPhotos"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg"
                      onChange={(e) => handleFileUpload('standardRooms.photos', e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          
            {/* Luxury Rooms */}
            <div className="col-span-full">
              <h3 className="text-md font-medium mb-2">Luxury Rooms</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="luxuryRooms.price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    id="luxuryRooms.price"
                    name="luxuryRooms.price"
                    min="0"
                    value={formData.luxuryRooms?.price || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="luxuryRooms.count" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                  <input
                    type="number"
                    id="luxuryRooms.count"
                    name="luxuryRooms.count"
                    min="0"
                    value={formData.luxuryRooms?.count || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="luxuryRooms.amenities" className="block text-sm font-medium text-gray-700">Amenities</label>
                  <input
                    type="text"
                    id="luxuryRooms.amenities"
                    name="luxuryRooms.amenities"
                    value={formData.luxuryRooms?.amenities || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Photos</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {formData.luxuryRooms?.photos && formData.luxuryRooms.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Room ${index + 1}`}
                        className="h-24 w-32 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemovePhoto('luxuryRooms.photos', index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('luxuryRoomPhotos').click()}
                  >
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                    <input
                      id="luxuryRoomPhotos"
                      name="luxuryRoomPhotos"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg"
                      onChange={(e) => handleFileUpload('luxuryRooms.photos', e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Policy */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Policy</h2>
            </div>
            
            {/* Check-in Time */}
            <div className="col-span-1">
              <label htmlFor="checkinTime" className="block text-sm font-medium text-gray-700">Check-in Time</label>
              <input
                type="time"
                id="checkinTime"
                name="checkinTime"
                value={formData.checkinTime || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Check-out Time */}
            <div className="col-span-1">
              <label htmlFor="checkoutTime" className="block text-sm font-medium text-gray-700">Check-out Time</label>
              <input
                type="time"
                id="checkoutTime"
                name="checkoutTime"
                value={formData.checkoutTime || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Amenities */}
            <div className="col-span-full">
              <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities</label>
              <textarea
                id="amenities"
                name="amenities"
                rows={3}
                value={formData.amenities || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Policy Documents */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Documents</label>
              <div className="mt-1 flex items-center">
                {formData.policyDocuments ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, policyDocuments: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('policyDocuments').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="policyDocuments"
                      name="policyDocuments"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('policyDocuments', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
            
            {/* Bank Details */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Bank Details</h2>
            </div>
            
            {/* Bank Name */}
            <div className="col-span-1">
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Account Holder Name */}
            <div className="col-span-1">
              <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={formData.accountHolderName || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Bank Account Number */}
            <div className="col-span-1">
              <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Bank Account Number</label>
              <input
                type="text"
                id="bankAccountNumber"
                name="bankAccountNumber"
                value={formData.bankAccountNumber || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Bank Account Details Document */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Details</label>
              <div className="mt-1 flex items-center">
                {formData.bankAccountDetails ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, bankAccountDetails: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('bankAccountDetails').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="bankAccountDetails"
                      name="bankAccountDetails"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('bankAccountDetails', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
            
            {/* ID Card Front */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Card Front</label>
              <div className="mt-1 flex items-center">
                {formData.idCardFront ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, idCardFront: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('idCardFront').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="idCardFront"
                      name="idCardFront"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('idCardFront', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
            
            {/* ID Card Back */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Card Back</label>
              <div className="mt-1 flex items-center">
                {formData.idCardBack ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, idCardBack: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('idCardBack').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="idCardBack"
                      name="idCardBack"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('idCardBack', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/hotel/managers')}
              className="px-4 py-2 rounded-md mr-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelManagerDetails;
