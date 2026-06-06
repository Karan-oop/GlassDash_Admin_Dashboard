import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

const summaryCards = [
  {
    label: "Total Orders",
    value: "128",
    delta: "+12%",
    tone: "tan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h8" />
      </svg>
    ),
  },
  {
    label: "Saved Coupons",
    value: "14",
    delta: "+3",
    tone: "tan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2 2 2 0 0 0 0 4 2 2 0 0 1 0 4 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4 2 2 0 0 1 0-4 2 2 0 0 0 0-4z" />
      </svg>
    ),
  },
  {
    label: "Wishlist Items",
    value: "37",
    delta: "6 pending",
    tone: "red",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 4.6c-1.5-1.8-4.3-2.1-6.2-.5L12 5.9l-2.6-1.8c-1.9-1.6-4.7-1.3-6.2.5-1.8 2-1.7 5 .2 6.9L12 20l8.6-8.5c1.9-1.9 2-4.9.2-6.9Z" />
      </svg>
    ),
  },
  {
    label: "Account Status",
    value: "Verified",
    delta: "Active now",
    tone: "tan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Reward Points",
    value: "8,450",
    delta: "+860 this month",
    tone: "tan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.9 6 6.6.9-4.8 4.5 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5-4.8-4.5 6.6-.9L12 2z" />
      </svg>
    ),
  },
];

const recentActivity = [
  { title: "Completed order #GD-2048", desc: "Delivered to your default address", time: "12 mins ago" },
  { title: "Coupon saved to wallet", desc: "Added SUMMER20 to your coupon list", time: "1 hour ago" },
  { title: "Wishlist item restocked", desc: "Black Leather Jacket is available again", time: "3 hours ago" },
  { title: "Password updated", desc: "Security settings were refreshed", time: "Yesterday" },
];

const securityItems = [
  { label: "Two-factor authentication", value: "Enabled" },
  { label: "Login devices", value: "3 trusted devices" },
  { label: "Last password change", value: "18 days ago" },
];

const notificationPrefs = [
  "Order updates",
  "Promo emails",
  "Wishlist restocks",
  "Security alerts",
];

function OverviewIcon({ children }) {
  return <div className="user-overview-icon">{children}</div>;
}

export default function User() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    "Order updates": true,
    "Promo emails": false,
    "Wishlist restocks": true,
    "Security alerts": true,
  });
  const [logoutPending, setLogoutPending] = useState(false);

  const activePrefs = useMemo(
    () => notificationPrefs.filter((pref) => prefs[pref]).length,
    [prefs]
  );

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    setLogoutPending(true);
    window.setTimeout(() => {
      setLogoutPending(false);
      navigate("/login");
    }, 900);
  };

  return (
    <div className="pg-page user-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">User</span>
      </div>

      <div className="user-hero glass-card">
        <div className="user-hero-copy">
          <div className="section-title">User Hub</div>
          <h1 className="user-hero-title">Manage profile, orders, security, and account preferences.</h1>
          <p className="user-hero-subtitle">
            A premium account dashboard with the same GlassDash look and feel as the rest of the app.
          </p>
        </div>

        <div className="user-hero-actions">
          <button type="button" className="pg-btn-primary" onClick={() => navigate("/user/profile")}>
            Open Profile
          </button>
          <button type="button" className="user-secondary-btn" onClick={() => navigate("/user/orders")}>
            View Orders
          </button>
        </div>
      </div>

      <div className="user-summary-grid">
        {summaryCards.map((card, index) => (
          <article key={card.label} className="glass-card user-summary-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <OverviewIcon>{card.icon}</OverviewIcon>
            <div className="user-summary-label">{card.label}</div>
            <div className="user-summary-value">{card.value}</div>
            <div className={`user-summary-delta ${card.tone}`}>{card.delta}</div>
          </article>
        ))}
      </div>

      <div className="user-main-grid">
        <section className="glass-card user-panel">
          <div className="section-header">
            <div>
              <div className="section-title">Recent Activity</div>
              <div className="section-sub">Latest actions linked to your account</div>
            </div>
          </div>

          <div className="user-activity-list">
            {recentActivity.map((item) => (
              <div key={item.title} className="user-activity-item">
                <div className="user-activity-dot" />
                <div className="user-activity-copy">
                  <div className="user-activity-title">{item.title}</div>
                  <div className="user-activity-desc">{item.desc}</div>
                </div>
                <div className="user-activity-time">{item.time}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card user-panel">
          <div className="section-header">
            <div>
              <div className="section-title">Account Security</div>
              <div className="section-sub">Track the protection of your account</div>
            </div>
          </div>

          <div className="user-security-list">
            {securityItems.map((item) => (
              <div key={item.label} className="user-security-row">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="user-security-meter">
            <div className="user-security-meter-head">
              <span>Security score</span>
              <strong>92%</strong>
            </div>
            <div className="user-security-track">
              <div className="user-security-fill" style={{ width: "92%" }} />
            </div>
          </div>
        </section>

        <section className="glass-card user-panel">
          <div className="section-header">
            <div>
              <div className="section-title">Notification Preferences</div>
              <div className="section-sub">{activePrefs} of {notificationPrefs.length} enabled</div>
            </div>
          </div>

          <div className="user-pref-list">
            {notificationPrefs.map((pref) => (
              <label key={pref} className="user-pref-item">
                <span>{pref}</span>
                <button
                  type="button"
                  className={`user-toggle ${prefs[pref] ? "active" : ""}`}
                  onClick={() => handleToggle(pref)}
                  aria-pressed={prefs[pref]}
                >
                  <span className="user-toggle-knob" />
                </button>
              </label>
            ))}
          </div>

          <div className="user-logout-wrap">
            <button type="button" className="user-logout-btn" onClick={handleLogout} disabled={logoutPending}>
              {logoutPending ? "Signing out..." : "Logout"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
