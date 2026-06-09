import React, { useState } from 'react';

/**
 * AddressInformation Component
 * 
 * Adds a new address section to the User Profile page with validation and responsive layout....
 * Follows the specific requirements for Indian address formatting and validation...
 */

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

const AddressInformation: React.FC = () => {
  const [formData, setFormData] = useState({
    houseNo: '',
    buildingName: '',
    streetName: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    country: 'India',
    pinCode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user begins correcting the input
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.houseNo.trim()) newErrors.houseNo = 'House / Flat No. is required';
    if (!formData.streetName.trim()) newErrors.streetName = 'Street / Road Name is required';
    if (!formData.area.trim()) newErrors.area = 'Area / Locality / Colony is required';
    if (!formData.city.trim()) newErrors.city = 'City / Town / Village is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN Code must contain exactly 6 numeric digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="profile-address-section" style={{ marginTop: '2.5rem', fontFamily: 'inherit' }}>
      <h3 className="section-header" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '1.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem' }}>
        Address Information
      </h3>
      
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        
        {/* 1. Address Line 1 */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            House / Flat No. <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            placeholder="Enter House/Flat No."
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${errors.houseNo ? '#EF4444' : '#D1D5DB'}`, fontSize: '0.875rem' }}
          />
          {errors.houseNo && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.houseNo}</p>}
        </div>

        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Building / Apartment Name (Optional)
          </label>
          <input
            type="text"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleChange}
            placeholder="Enter Building/Apartment Name"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
          />
        </div>

        {/* 2. Address Line 2 */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Street / Road Name <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            placeholder="Enter Street/Road Name"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${errors.streetName ? '#EF4444' : '#D1D5DB'}`, fontSize: '0.875rem' }}
          />
          {errors.streetName && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.streetName}</p>}
        </div>

        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Area / Locality / Colony <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter Area/Locality"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${errors.area ? '#EF4444' : '#D1D5DB'}`, fontSize: '0.875rem' }}
          />
          {errors.area && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.area}</p>}
        </div>

        {/* 3. Landmark */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Landmark (Optional)
          </label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="e.g., Near Main Market"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', fontSize: '0.875rem' }}
          />
        </div>

        {/* 4. City / Town / Village */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            City / Town / Village <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter City/Town/Village"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${errors.city ? '#EF4444' : '#D1D5DB'}`, fontSize: '0.875rem' }}
          />
          {errors.city && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.city}</p>}
        </div>

        {/* 5. State */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            State <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${errors.state ? '#EF4444' : '#D1D5DB'}`, fontSize: '0.875rem', backgroundColor: '#FFF', appearance: 'auto' }}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          {errors.state && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.state}</p>}
        </div>

        {/* 6. Country */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Country <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            readOnly
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', fontSize: '0.875rem', backgroundColor: '#F9FAFB', cursor: 'not-allowed' }}
          />
        </div>

        {/* 7. PIN Code */}
        <div className="form-group">
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            PIN Code <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            maxLength={6}
            placeholder="Enter 6-digit PIN"
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${errors.pinCode ? '#EF4444' : '#D1D5DB'}`, fontSize: '0.875rem' }}
          />
          {errors.pinCode && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.pinCode}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;