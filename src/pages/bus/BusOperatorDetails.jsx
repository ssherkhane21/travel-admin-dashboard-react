
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { ArrowLeft, Upload, Save } from 'lucide-react';

// Sample data
const operatorData = {
  id: 1,
  profilePhoto: null,
  name: 'Express Travels',
  mobile: '+1-234-567-8901',
  email: 'info@expresstravels.com',
  status: 'Approved',
  address: '123 Transport Street, Bus City, BC 12345',
  identityCard: null,
  businessLicense: null,
  bankAccountNumber: '1234567890',
  bankName: 'National Bank',
  accountHolderName: 'Express Travels Inc.',
  bankAccountDetails: null,
  idCardFront: null,
  idCardBack: null
};

const BusOperatorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [formData, setFormData] = useState(isNew ? {} : operatorData);
  
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
      setFormData({
        ...formData,
        [field]: URL.createObjectURL(file)
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send the data to your backend
    console.log('Submitting form data:', formData);
    navigate('/bus/operators');
  };
  
  return (
    <div>
      <PageHeader
        title={isNew ? 'Add Bus Operator' : 'Bus Operator Details'}
        description={isNew ? 'Create a new bus operator' : 'View and edit bus operator details'}
        action={
          <button 
            onClick={() => navigate('/bus/operators')}
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
            
            {/* Documentation */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Documentation</h2>
            </div>
            
            {/* Identity Card */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Identity Card</label>
              <div className="mt-1 flex items-center">
                {formData.identityCard ? (
                  <div className="relative">
                    <div className="h-24 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-sm">Document</span>
                    </div>
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setFormData({ ...formData, identityCard: null })}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('identityCard').click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      id="identityCard"
                      name="identityCard"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                      onChange={(e) => handleFileUpload('identityCard', e)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
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
          
            {/* Banking Information */}
            <div className="col-span-full">
              <h2 className="text-lg font-medium border-b pb-2 mb-4 mt-4">Banking Information</h2>
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
              onClick={() => navigate('/bus/operators')}
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

export default BusOperatorDetails;
