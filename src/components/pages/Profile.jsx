import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { getUserProfileById } from "./UserData";

const fieldOrder = [
  "fullName",
  "emailAddress",
  "mobileNumber",
  "language",
  "timezone",
  "bio",
  "dateOfBirth",
  "gender",
  "accountCreatedDate",
  "houseFlatNo",
  "buildingApartmentName",
  "streetRoadName",
  "areaLocalityColony",
  "landmark",
  "cityTownVillage",
  "state",
  "country",
  "pinCode",
];

const completionFieldOrder = fieldOrder.filter(
  (key) => !["buildingApartmentName", "landmark"].includes(key)
);

const indianStatesAndUnionTerritories = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const fieldLabels = {
  fullName: "Full Name",
  emailAddress: "Email Address",
  mobileNumber: "Mobile Number",
  language: "Language",
  timezone: "GMT / Timezone",
  bio: "Bio",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  accountCreatedDate: "Account Created Date",
  houseFlatNo: "House / Flat No.",
  buildingApartmentName: "Building / Apartment Name",
  streetRoadName: "Street / Road Name",
  areaLocalityColony: "Area / Locality / Colony",
  landmark: "Landmark",
  cityTownVillage: "City / Town / Village",
  state: "State",
  country: "Country",
  pinCode: "PIN Code",
};

const fieldTypes = {
  emailAddress: "email",
  mobileNumber: "tel",
  dateOfBirth: "date",
  accountCreatedDate: "date",
};

const fieldPlaceholders = {
  fullName: "Enter full name",
  emailAddress: "name@example.com",
  mobileNumber: "+1 555 000 0000",
  language: "English",
  timezone: "GMT-4 (America/New_York)",
  bio: "Short intro about the user",
  houseFlatNo: "House / Flat No.",
  buildingApartmentName: "Building / Apartment Name",
  streetRoadName: "Street / Road Name",
  areaLocalityColony: "Area / Locality / Colony",
  landmark: "Nearby landmark",
  cityTownVillage: "City / Town / Village",
  pinCode: "6-digit PIN Code",
};

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

function buildErrors(profile) {
  const errors = {};
  if (!profile.fullName.trim()) errors.fullName = "Full name is required";
  if (!profile.emailAddress.trim()) {
    errors.emailAddress = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.emailAddress)) {
    errors.emailAddress = "Enter a valid email address";
  }
  if (!profile.mobileNumber.trim()) errors.mobileNumber = "Mobile number is required";
  if (!profile.language.trim()) errors.language = "Language is required";
  if (!profile.timezone.trim()) errors.timezone = "Timezone is required";
  if (!profile.bio.trim()) errors.bio = "Bio is required";
  if (!profile.dateOfBirth.trim()) errors.dateOfBirth = "Date of birth is required";
  if (!profile.gender.trim()) errors.gender = "Gender is required";
  if (!profile.accountCreatedDate.trim()) errors.accountCreatedDate = "Created date is required";
  if (!profile.houseFlatNo.trim()) errors.houseFlatNo = "House / Flat No. is required";
  if (!profile.streetRoadName.trim()) errors.streetRoadName = "Street / Road Name is required";
  if (!profile.areaLocalityColony.trim()) {
    errors.areaLocalityColony = "Area / Locality / Colony is required";
  }
  if (!profile.cityTownVillage.trim()) errors.cityTownVillage = "City / Town / Village is required";
  if (!profile.state.trim()) errors.state = "State is required";
  if (!profile.country.trim()) errors.country = "Country is required";
  if (!profile.pinCode.trim()) {
    errors.pinCode = "PIN Code is required";
  } else if (!/^\d{6}$/.test(profile.pinCode)) {
    errors.pinCode = "PIN Code must contain exactly 6 numeric digits";
  }
  return errors;
}

export default function Profile() {
  const { userId } = useParams();
  const fileInputRef = useRef(null);
  const selectedProfile = useMemo(() => getUserProfileById(userId || 1), [userId]);
  const [profile, setProfile] = useState(selectedProfile);
  const [draft, setDraft] = useState(selectedProfile);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setProfile(selectedProfile);
    setDraft(selectedProfile);
    setAvatar("");
    setAvatarPreview("");
    setIsEditing(false);
    setIsSaving(false);
    setErrors({});
    setMessage({ type: "", text: "" });
  }, [selectedProfile]);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const completion = useMemo(() => {
    const filled = completionFieldOrder.filter((key) => String(profile[key] || "").trim()).length;
    return Math.round((filled / completionFieldOrder.length) * 100);
  }, [profile]);

  const avatarLabel = useMemo(() => {
    if (profile.fullName.trim()) {
      return profile.fullName
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  }, [profile.fullName]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    window.clearTimeout(window.__profileToastTimer);
    window.__profileToastTimer = window.setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 2600);
  };

  const handleEdit = () => {
    setDraft(profile);
    setErrors({});
    setIsEditing(true);
    showMessage("info", "Edit mode enabled");
  };

  const handleCancel = () => {
    setDraft(profile);
    setErrors({});
    setIsEditing(false);
    showMessage("info", "Changes discarded");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "pinCode" ? value.replace(/\D/g, "").slice(0, 6) : value;
    setDraft((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMessage("error", "Please upload an image file");
      return;
    }

    try {
      const nextAvatar = await readFileAsDataUrl(file);
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatar(nextAvatar);
      setAvatarPreview(nextAvatar);
      showMessage("success", "Profile photo updated");
    } catch {
      showMessage("error", "Unable to load image");
    } finally {
      event.target.value = "";
    }
  };

  const handleRemoveAvatar = () => {
    if (avatarPreview.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatar("");
    setAvatarPreview("");
    showMessage("success", "Profile photo removed");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const nextErrors = buildErrors(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showMessage("error", "Please fix the highlighted fields");
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setProfile(draft);
    setIsEditing(false);
    setIsSaving(false);
    showMessage("success", "Profile updated successfully");
  };

  const handleField = (key) => {
    const value = isEditing ? draft[key] : profile[key];
    const error = errors[key];

    if (key === "bio") {
      return (
        <div className="profile-field-block" key={key}>
          <label className="pg-label" htmlFor={`profile-${key}`}>{fieldLabels[key]}</label>
          <textarea
            id={`profile-${key}`}
            name={key}
            value={value}
            onChange={handleChange}
            className={`pg-input pg-textarea profile-input ${error ? "has-error" : ""}`}
            placeholder={fieldPlaceholders[key]}
            readOnly={!isEditing}
          />
          {error && <div className="profile-error">{error}</div>}
        </div>
      );
    }

    if (key === "gender") {
      return (
        <div className="profile-field-block" key={key}>
          <label className="pg-label" htmlFor={`profile-${key}`}>{fieldLabels[key]}</label>
          <select
            id={`profile-${key}`}
            name={key}
            value={value}
            onChange={handleChange}
            className={`pg-input pg-select profile-input ${error ? "has-error" : ""}`}
            disabled={!isEditing}
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {error && <div className="profile-error">{error}</div>}
        </div>
      );
    }

    if (key === "language") {
      return (
        <div className="profile-field-block" key={key}>
          <label className="pg-label" htmlFor={`profile-${key}`}>{fieldLabels[key]}</label>
          <select
            id={`profile-${key}`}
            name={key}
            value={value}
            onChange={handleChange}
            className={`pg-input pg-select profile-input ${error ? "has-error" : ""}`}
            disabled={!isEditing}
          >
            <option value="">Select language</option>
            <option value="English">English (IN)</option>
            <option value="English">English (US)</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Arabic">Arabic</option>
            
          </select>
          {error && <div className="profile-error">{error}</div>}
        </div>
      );
    }

    if (key === "state") {
      return (
        <div className="profile-field-block" key={key}>
          <label className="pg-label" htmlFor={`profile-${key}`}>{fieldLabels[key]}</label>
          <select
            id={`profile-${key}`}
            name={key}
            value={value}
            onChange={handleChange}
            className={`pg-input pg-select profile-input ${error ? "has-error" : ""}`}
            disabled={!isEditing}
          >
            <option value="">Select state</option>
            {indianStatesAndUnionTerritories.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
          {error && <div className="profile-error">{error}</div>}
        </div>
      );
    }

    return (
      <div className="profile-field-block" key={key}>
        <label className="pg-label" htmlFor={`profile-${key}`}>{fieldLabels[key]}</label>
        <input
          id={`profile-${key}`}
          type={fieldTypes[key] || "text"}
          name={key}
          value={value}
          onChange={handleChange}
          className={`pg-input profile-input ${error ? "has-error" : ""}`}
          placeholder={fieldPlaceholders[key] || fieldLabels[key]}
          inputMode={key === "pinCode" ? "numeric" : undefined}
          maxLength={key === "pinCode" ? 6 : undefined}
          pattern={key === "pinCode" ? "\\d{6}" : undefined}
          readOnly={!isEditing}
        />
        {error && <div className="profile-error">{error}</div>}
      </div>
    );
  };

  return (
    <div className="pg-page profile-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-link">User</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Profile</span>
      </div>

      <div className="profile-hero glass-card">
        <div className="profile-avatar-shell">
          <div className="profile-avatar-frame">
            {avatar || avatarPreview ? (
              <img
                src={avatar || avatarPreview}
                alt="Profile avatar"
                className="profile-avatar-image"
              />
            ) : (
              <div className="profile-avatar-fallback">{avatarLabel}</div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="profile-hidden-input"
          />

          <div className="profile-avatar-actions">
            <button type="button" className="profile-avatar-btn" onClick={handleAvatarClick}>
              Upload Photo
            </button>
            <button type="button" className="profile-avatar-btn secondary" onClick={handleAvatarClick}>
              Change Photo
            </button>
            <button
              type="button"
              className="profile-avatar-btn danger"
              onClick={handleRemoveAvatar}
              disabled={!avatar && !avatarPreview}
            >
              Remove Photo
            </button>
          </div>
        </div>

        <div className="profile-hero-copy">
          <div className="section-title">Profile Management</div>
          <h1 className="profile-hero-title">{profile.fullName}</h1>
          <div className="profile-hero-subtitle">{profile.emailAddress}</div>

          <div className="profile-completion">
            <div className="profile-completion-head">
              <span>Profile completion</span>
              <strong>{completion}%</strong>
            </div>
            <div className="profile-completion-track">
              <div className="profile-completion-fill" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card glass-card">
        <div className="section-header">
          <div>
            <div className="section-title">User Information</div>
            <div className="section-sub">
              {isEditing ? "Edit the fields below and save your changes." : "Read-only profile overview. Click edit to update."}
            </div>
          </div>

          <div className="profile-mode-pill">{isEditing ? "Edit Mode" : "Read Only"}</div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="profile-grid-2">
            {["fullName", "emailAddress", "mobileNumber", "language", "timezone"].map((key) =>
              handleField(key)
            )}
          </div>

          <div className="profile-form-group-title">
            <div className="section-title">Address Line 1</div>
          </div>

          <div className="profile-grid-2">
            {["houseFlatNo", "buildingApartmentName"].map((key) => handleField(key))}
          </div>

          <div className="profile-form-group-title">
            <div className="section-title">Address Line 2</div>
          </div>

          <div className="profile-grid-2">
            {["streetRoadName", "areaLocalityColony"].map((key) => handleField(key))}
          </div>

          <div className="profile-grid-2">
            {["landmark", "cityTownVillage", "state", "country", "pinCode"].map((key) => handleField(key))}
          </div>

          <div className="profile-grid-2">
            {["bio", "dateOfBirth", "gender", "accountCreatedDate"].map((key) => handleField(key))}
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button type="button" className="pg-btn-primary" onClick={handleEdit}>
                Edit Profile
              </button>
            ) : (
              <>
                <button type="button" className="profile-secondary-btn" onClick={handleCancel} disabled={isSaving}>
                  Cancel
                </button>
                <button type="submit" className="pg-btn-primary profile-save-btn" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {message.text && (
        <div className={`profile-toast ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
