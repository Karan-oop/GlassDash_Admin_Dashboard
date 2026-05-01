// Settings.jsx — Final Version
// Location: src/components/pages/Settings.jsx

import { useState } from "react";
import SecurityTab from "../settings/SecurityTab";
import NotificationsTab from "../settings/NotificationsTab";
import AppearanceTab from "../settings/AppearanceTab";
import BillingTab from "../settings/BillingTab";
import "../settings/SettingsTabs.css";

// ── Profile tab ─────────────────────────────────────────────────────────────
function ProfileTab() {
  const [profile, setProfile] = useState({
    firstName: "Karan Chandra",
    lastName: " Kothari",
    email: "karan.kothari07@gmail.com",
    phone: "+91 92679 33722",
    bio: "Frontend developer and web design enthusiast. Building beautiful interfaces for modern applications using HTML, CSS, JavaScript and React using modern techniques.",
  });

  const [language, setLanguage] = useState("English (IN)");
  const [timezone, setTimezone] = useState("GMT+5:30 (IST)");

  return (
    <div className="tab-content fade-in">
      {/* Avatar */}
      <div className="profile-avatar-row">
        <div className="avatar-circle">KC</div>
        <div>
          <p className="profile-name-lg">Karan Chandra Kothari</p>
          <p className="profile-role-sm">karan.kothari07@gmail.com · Administrator</p>
        </div>
      </div>

      {/* Profile Information */}
      <section className="settings-section">
        <h2 className="section-title">Profile Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group full-width">
          <label className="form-label">Bio</label>
          <textarea
            className="form-input"
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            style={{ resize: "vertical" }}
          />
        </div>
      </section>

      {/* Preferences */}
      <section className="settings-section">
        <h2 className="section-title">Preferences</h2>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">Language</span>
            <span className="toggle-desc">Select your preferred language</span>
          </div>
          <select
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English (IN)</option>
            <option>English (US)</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">Timezone</span>
            <span className="toggle-desc">Set your local timezone</span>
          </div>
          <select
            className="form-select"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option>UTC+5:30 (IST)</option>
            <option>UTC-5 (EST)</option>
            <option>UTC+0 (GMT)</option>
            <option>UTC-8 (PST)</option>
            <option>UTC+8 (CST)</option>
          </select>
        </div>
      </section>

      <div className="btn-row">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-ghost">Cancel</button>
      </div>
    </div>
  );
}

// ── Tab config ──────────────────────────────────────────────────────────────
const TABS = [
  { id: "profile",       label: "Profile",       icon: "𐀪𐀪" },
  { id: "security",      label: "Security",      icon: "🔒︎" },
  { id: "notifications", label: "Notifications", icon: "🕭" },
  { id: "appearance",    label: "Appearance",    icon: "🀦" },
  { id: "billing",       label: "Billing",       icon: "🂡" },
];

// ── Main Settings page ──────────────────────────────────────────────────────
export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "profile":       return <ProfileTab />;
      case "security":      return <SecurityTab />;
      case "notifications": return <NotificationsTab />;
      case "appearance":    return <AppearanceTab />;
      case "billing":       return <BillingTab />;
      default:              return <ProfileTab />;
    }
  };

  return (
    <div className="settings-page">
      {/* Page header */}
      <div className="settings-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="breadcrumb">Dashboard / Settings</p>
        </div>
        
        {/* Mobile hamburger */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle settings menu"
        >
          ☰
        </button>
      </div>

      {/* Layout */}
      <div className="settings-layout">
        {/* Left sidebar */}
        <aside className={`settings-sidebar glass-panel ${sidebarOpen ? "open" : ""}`}>
          <nav className="sidebar-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`sidebar-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
              >
                <span className="sidebar-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right content */}
        <main className="settings-content glass-panel">
          {renderTab()}
        </main>
      </div>
    </div>
  );
}