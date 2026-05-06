import React, { useState, useEffect, useRef } from 'react';
import { toggleSidebar } from './Sidebar';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen]);

  // Apply theme to document
  const applyTheme = (isDark) => {
    const body = document.body;
    if (isDark) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      applyTheme(newMode);
      return newMode;
    });
  };

  return (
    <nav className="navbar">

      {/* ── Left side — title always visible ── */}
      <div className="navbar-left">

        {/* Hamburger — only on mobile */}
        <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Title — protected by flex-shrink: 0 and min-width: max-content */}
        <div className="navbar-title">
          <h2>Dashboard Overview</h2>
          <p>Welcome back, Karan</p>
        </div>
      </div>

      {/* ── Right side — fixed size, cannot crush left ── */}
      <div className="navbar-right">

        <div className="search-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search anything..." />
        </div>

        <button 
          className="icon-btn notification-btn" 
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          aria-label="Notifications"
          title="Notifications"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="notif-dot"/>
        </button>

        {/* Notification Panel */}
        {isNotificationOpen && (
          <div ref={notificationRef}>
            <NotificationPanel onClose={() => setIsNotificationOpen(false)} />
          </div>
        )}

        {/* Theme Toggle Button */}
        <button 
          className="icon-btn theme-toggle-btn" 
          onClick={handleThemeToggle}
          aria-label="Toggle dark/light mode"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            // Moon icon (dark mode)
            <svg className="theme-icon moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            // Sun icon (light mode)
            <svg className="theme-icon sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </button>

        <div className="profile-btn">
          <div className="profile-avatar">K.C</div>
          <span className="profile-name">Karan Chandra Kothari</span>
        </div>

      </div>
    </nav>
  );
}
