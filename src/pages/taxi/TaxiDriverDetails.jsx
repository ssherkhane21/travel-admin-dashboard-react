
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { ArrowLeft, Upload, Save, Plus } from 'lucide-react';

// Sample data
const driverData = {
  id: 1,
  profilePhoto: null,
  name: 'John Smith',
  age: 35,
  address: '123 Driver Street, Car City, CC 12345',
  experience: 5,
  mobile: '+1-234-567-8901',
  email: 'john@example.com',
  status: 'Approved',
  vehicleType: 'Car',
  vehicleRegistrationNumber: 'ABC-123',
  vehicleInsurance: null,
  vehicleRegistrationCertificate: null,
  vehiclePhotos: [],
  idCardFront: null,
  idCardBack: null,
  drivingLicense: null,
};

const TaxiDriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [formData, setFormData] = useState(isNew ? { vehiclePhotos: [] } : driverData);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload the file to a server
      // For now, we'll just update the state with a fake URL
      if (field === 'vehiclePhotos') {
        setFormData({
          ...formData,
          [field]: [...formData[field], URL.createObjectURL(file)]
        });
      } else {
        setFormData({
          ...formData,
          [field]: URL.createObjectURL(file)
        });
      }
    }
  };
  
  const handleRemovePhoto = (field, index) => {
    const newPhotos = [...formData[field]];
    newPhotos.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newPhotos
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send the data to your backend
    console.log('Submitting form data:', formData);
    navigate('/taxi/drivers');
  };
  
  return (
    <div>
      <PageHeader
        title={isNew ? 'Add Taxi Driver' : 'Taxi Driver Details'}
        description={isNew ? 'Create a new taxi driver' : 'View and edit taxi driver details'}
        action={
          <button 
            onClick={() => navigate('/taxi/drivers')}
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
            
            {/* Age */}
            <div className="col-span-1">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="70"
                value={formData.age || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
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
            
            {/* Driving Experience */}
            <div className="col-span-1">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Driving Experience (Years)</label>
              <input
                type="number"
                id="experience"
                name="experience"
                min="0"
                value={formData.experience || ''}
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
            
            {/* Vehicle Details */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Vehicle Details</h2>
            </div>
            
            {/* Vehicle Type */}
            <div className="col-span-1">
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>
            
            {/* Vehicle Registration Number */}
            <div className="col-span-1">
              <label htmlFor="vehicleRegistrationNumber" className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
              <input
                type="text"
                id="vehicleRegistrationNumber"
                name="vehicleRegistrationNumber"
                value={formData.vehicleRegistrationNumber || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border px-3 py-2"
              />
            </div>
            
            {/* Vehicle Insurance */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Insurance</label>
              <div className="mt-1 flex items-center">
                {formData.vehicleInsurance ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, vehicleInsurance: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('vehicleInsurance').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="vehicleInsurance"
                      name="vehicleInsurance"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('vehicleInsurance', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
            
            {/* Vehicle Registration Certificate */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration Certificate</label>
              <div className="mt-1 flex items-center">
                {formData.vehicleRegistrationCertificate ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, vehicleRegistrationCertificate: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('vehicleRegistrationCertificate').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="vehicleRegistrationCertificate"
                      name="vehicleRegistrationCertificate"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('vehicleRegistrationCertificate', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
            </div>
            
            {/* Vehicle Photos */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Photos</label>
              <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {formData.vehiclePhotos && formData.vehiclePhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Vehicle ${index + 1}`}
                      className="h-24 w-32 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemovePhoto('vehiclePhotos', index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('vehiclePhotos').click()}
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                  <input
                    id="vehiclePhotos"
                    name="vehiclePhotos"
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    onChange={(e) => handleFileUpload('vehiclePhotos', e)}
                  />
                </div>
              </div>
            </div>
            
            {/* ID Proofs */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">ID Proofs</h2>
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
            
            {/* Driving License */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Driving License</label>
              <div className="mt-1 flex items-center">
                {formData.drivingLicense ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, drivingLicense: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('drivingLicense').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="drivingLicense"
                      name="drivingLicense"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('drivingLicense', e)}
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
              onClick={() => navigate('/taxi/drivers')}
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

export default TaxiDriverDetails;
