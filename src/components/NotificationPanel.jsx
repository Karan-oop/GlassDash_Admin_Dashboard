import React, { useState } from 'react';

export default function NotificationPanel({ onClose }) {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'update',
      title: 'System Update',
      message: 'A new version is available',
      timestamp: '5 minutes ago',
      read: false,
      icon: '🔧'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Security Alert',
      message: 'New login from Chrome on Windows',
      timestamp: '2 hours ago',
      read: false,
      icon: '🔐'
    },
    {
      id: 3,
      type: 'info',
      title: 'Meeting Reminder',
      message: 'Team standup in 30 minutes',
      timestamp: '45 minutes ago',
      read: true,
      icon: '📅'
    },
    {
      id: 4,
      type: 'success',
      title: 'Task Completed',
      message: 'Your export has finished',
      timestamp: '1 days ago',
      read: true,
      icon: '✓'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Storage Warning',
      message: 'You are using 70% of storage',
      timestamp: '3 days ago',
      read: false,
      icon: '⚠️'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-panel">
      {/* Header */}
      <div className="notification-header">
        <h3>Notifications</h3>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
        <button 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close notifications"
        >
          ✕
        </button>
      </div>

      {/* User Profile Section */}
      <div className="notification-profile">
        <div className="profile-avatar-large">K.C</div>
        <div className="profile-info">
          <h4>Karan Chandra Kothari</h4>
          <p>kotharikaran07@gmail.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="notification-divider"></div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`notification-item ${notif.read ? 'read' : 'unread'} ${notif.type}`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="notif-icon">{notif.icon}</div>
              
              <div className="notif-content">
                <div className="notif-title">{notif.title}</div>
                <div className="notif-message">{notif.message}</div>
                <div className="notif-time">{notif.timestamp}</div>
              </div>

              <button
                className="notif-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notif.id);
                }}
                aria-label="Delete notification"
              >
                ✕
              </button>

              {!notif.read && <div className="notif-indicator"></div>}
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <div className="empty-icon">📬</div>
            <p>No notifications</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="notification-footer">
          <button className="view-all-btn">View All Notifications</button>
        </div>
      )}
    </div>
  );
}
