import { useState } from "react";
import "./SettingsTabs.css";

export default function NotificationsTab() {
  const [emailToggles, setEmailToggles] = useState({
    accountActivity: true,
    newFeatures: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  const [pushToggles, setPushToggles] = useState({
    desktop: true,
    mobilePush: true,
    sound: false,
  });

  const toggleEmail = (key) =>
    setEmailToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const togglePush = (key) =>
    setPushToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetDefaults = () => {
    setEmailToggles({ accountActivity: true, newFeatures: true, weeklyReports: false, marketingEmails: false });
    setPushToggles({ desktop: true, mobilePush: true, sound: false });
  };

  return (
    <div className="tab-content fade-in">
      <section className="settings-section">
        <h2 className="section-title">Email Notifications</h2>
        {[
          { key: "accountActivity", label: "Account Activity", desc: "Get notified about sign-ins and security changes" },
          { key: "newFeatures", label: "New Features", desc: "Learn about new features and updates" },
          { key: "weeklyReports", label: "Weekly Reports", desc: "Receive weekly analytics summary" },
          { key: "marketingEmails", label: "Marketing Emails", desc: "Receive news about promotions and offers" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="toggle-row">
            <div className="toggle-info">
              <span className="toggle-title">{label}</span>
              <span className="toggle-desc">{desc}</span>
            </div>
            <button
              className={`toggle-switch ${emailToggles[key] ? "on" : ""}`}
              onClick={() => toggleEmail(key)}
              aria-label={`Toggle ${label}`}
            />
          </div>
        ))}
      </section>

      <section className="settings-section">
        <h2 className="section-title">Push Notifications</h2>
        {[
          { key: "desktop", label: "Desktop Notifications", desc: "Show notifications on your desktop" },
          { key: "mobilePush", label: "Mobile Push", desc: "Receive push notifications on mobile" },
          { key: "sound", label: "Sound", desc: "Play sound for notifications" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="toggle-row">
            <div className="toggle-info">
              <span className="toggle-title">{label}</span>
              <span className="toggle-desc">{desc}</span>
            </div>
            <button
              className={`toggle-switch ${pushToggles[key] ? "on" : ""}`}
              onClick={() => togglePush(key)}
              aria-label={`Toggle ${label}`}
            />
          </div>
        ))}
      </section>

      <div className="btn-row">
        <button className="btn-primary">Save Preferences</button>
        <button className="btn-ghost" onClick={resetDefaults}>Reset to Default</button>
      </div>
    </div>
  );
}
