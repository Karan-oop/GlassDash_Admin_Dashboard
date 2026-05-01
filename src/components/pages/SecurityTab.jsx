import { useState } from "react";
import "./SettingsTabs.css";

export default function SecurityTab() {
  const [smsAuth, setSmsAuth] = useState(true);
  const [authApp, setAuthApp] = useState(false);
  const [enable2FA, setEnable2FA] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const sessions = [
    { id: 1, device: "Chrome on MacOS", location: "San Francisco, CA", time: "Current session", active: true },
    { id: 2, device: "Safari on iPhone", location: "San Francisco, CA", time: "2 hours ago", active: false },
    { id: 3, device: "Firefox on Windows", location: "New York, NY", time: "3 days ago", active: false },
  ];

  return (
    <div className="tab-content fade-in">
      
      {/* Change Password */}
      <section className="settings-section">
        <h2 className="section-title">Change Password</h2>
        <div className="form-group full-width">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter current password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter new password"
              value={passwords.newPass}
              onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm new password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* 2FA */}
      <section className="settings-section">
        <h2 className="section-title">Two-Factor Authentication</h2>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">Enable 2FA</span>
            <span className="toggle-desc">Add an extra layer of security to your account</span>
          </div>
          <button
            className={`toggle-switch ${enable2FA ? "on" : ""}`}
            onClick={() => setEnable2FA(!enable2FA)}
            aria-label="Toggle 2FA"
          />
        </div>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">SMS Authentication</span>
            <span className="toggle-desc">Receive codes via SMS</span>
          </div>
          <button
            className={`toggle-switch ${smsAuth ? "on" : ""}`}
            onClick={() => setSmsAuth(!smsAuth)}
            aria-label="Toggle SMS Auth"
          />
        </div>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">Authenticator App</span>
            <span className="toggle-desc">Use Google Authenticator or similar</span>
          </div>
          <button
            className={`toggle-switch ${authApp ? "on" : ""}`}
            onClick={() => setAuthApp(!authApp)}
            aria-label="Toggle Authenticator App"
          />
        </div>
      </section>

      {/* Active Sessions */}
      <section className="settings-section">
        <h2 className="section-title">Active Sessions</h2>
        <div className="sessions-list">
          {sessions.map((s) => (
            <div key={s.id} className="session-item glass-card">
              <div className="session-info">
                <span className="session-device">{s.device}</span>
                <span className="session-meta">{s.location} · {s.time}</span>
              </div>
              {s.active ? (
                <span className="badge-active">● Active</span>
              ) : (
                <button className="btn-revoke">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="btn-row">
        <button className="btn-primary">Update Password</button>
        <button className="btn-ghost">Cancel</button>
      </div>
    </div>
  );
}
