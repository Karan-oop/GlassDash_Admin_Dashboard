import React from 'react';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, Karan</p>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          <SearchIcon />
          <input type="text" placeholder="Search anything..." />
        </div>
        <button className="icon-btn" title="Notifications">
          <BellIcon />
          <span className="notif-dot" />
        </button>
        <button className="icon-btn" title="Toggle theme">
          <MoonIcon />
        </button>
        <div className="profile-btn">
          <div className="profile-avatar">KC</div>
          <span>Karan Chandra Kothari</span>
        </div>
      </div>
    </nav>
  );
}
