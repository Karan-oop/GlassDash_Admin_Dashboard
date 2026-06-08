import React, { useState } from 'react';
import { Clock, Star, UserPlus, Users as UsersIcon } from 'lucide-react';

const userCards = [
  {
    label: 'Total Users',
    value: '24,521',
    change: '+5%',
    positive: true,
    icon: UsersIcon,
    iconColor: '#10B981',
    iconBg: 'rgba(16, 185, 129, 0.12)',
  },
  {
    label: 'Active Now',
    value: '1,204',
    change: '+1.5%',
    positive: true,
    icon: Clock,
    iconColor: '#3B82F6',
    iconBg: 'rgba(59, 130, 246, 0.12)',
  },
  {
    label: 'New Today',
    value: '86',
    change: '-3.1%',
    positive: false,
    icon: UserPlus,
    iconColor: '#F59E0B',
    iconBg: 'rgba(245, 158, 11, 0.12)',
  },
  {
    label: 'Premium Users',
    value: '3,847',
    change: '+18.7%',
    positive: true,
    icon: Star,
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139, 92, 246, 0.12)',
  },
];

const usersData = [
  { initials: 'JD', color: '#6E011A', name: 'John Deere', email: 'john.dee@example.com', role: 'Admin in Chief', status: 'Active', joined: 'Jan 15, 2024', lastActive: '2 mins ago' },
  { initials: 'AS', color: '#8c6534', name: 'Anna Smith', email: 'smith.anna@gmail.com', role: 'Editor', status: 'Active', joined: 'Feb 22, 2024', lastActive: '15 mins ago' },
  { initials: 'MJ', color: '#3b6e5a', name: 'Mike Johnson', email: 'mike.john@gmail.com', role: 'User', status: 'Away', joined: 'Mar 10, 2024', lastActive: '2 hours ago' },
  { initials: 'EW', color: '#6e5a3b', name: 'Emily White', email: 'emily.white@gmail.com', role: 'Moderator', status: 'Active', joined: 'Apr 5, 2024', lastActive: '30 mins ago' },
  { initials: 'RB', color: '#4a3b6e', name: 'Robert Brown', email: 'robert.bro@gmail.com', role: 'User', status: 'Offline', joined: 'May 18, 2024', lastActive: '3 days ago' },
  { initials: 'SL', color: '#6e3b3b', name: 'Sarah Lee', email: 'sarah.lee@gmail.com', role: 'Editor', status: 'Active', joined: 'Jun 8, 2024', lastActive: '5 mins ago' },
  { initials: 'DK', color: '#3b5a6e', name: 'David Kim', email: 'david.kim@gmail.com', role: 'User', status: 'Active', joined: 'Jul 22, 2024', lastActive: '1 hour ago' },
  { initials: 'LM', color: '#5a3b6e', name: 'Lisa Martinez', email: 'lisa.martinez@gmail.com', role: 'Moderator', status: 'Away', joined: 'Aug 14, 2024', lastActive: '4 hours ago' },
];

const statusClass = { Active: 'ust-active', Away: 'ust-away', Offline: 'ust-offline' };

export default function Users() {
  const [search, setSearch] = useState('');

  const filtered = usersData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pg-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Users</span>
      </div>
      <h1 className="pg-title">Users</h1>

      <div className="premium-cards-grid">
        {userCards.map((card) => {
          const IconComponent = card.icon;

          return (
            <div key={card.label} className="premium-card">
              <div className="premium-card-content">
                <div className="premium-card-text">
                  <span className="premium-card-label">{card.label}</span>
                  <span className="premium-card-value">{card.value}</span>
                  <span className={`premium-card-trend ${card.positive ? 'trend-up' : 'trend-down'}`}>
                    <span className="trend-arrow">{card.positive ? '\u2191' : '\u2193'}</span>
                    {' '}{card.change}{' '}
                    <span className="trend-separator">·</span>
                    {' '}Last 30 days
                  </span>
                </div>
                <div className="premium-card-icon-wrap" style={{ background: card.iconBg }}>
                  <IconComponent size={28} color={card.iconColor} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card transactions-card">
        <div className="transactions-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="section-title">All Users</div>
            <div className="section-sub">Manage your user base</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="pg-table-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search users..." value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
            <button className="pg-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add User
            </button>
            <button className="action-btn">Export</button>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.email}>
                  <td>
                    <div className="customer-cell">
                      <div className="cust-avatar" style={{ background: user.color }}>{user.initials}</div>
                      <div>
                        <div className="cust-name">{user.name}</div>
                        <div className="cust-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{user.role}</td>
                  <td>
                    <span className={`pg-status-badge ${statusClass[user.status]}`}>
                      <span className="pg-status-dot" />
                      {user.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{user.joined}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{user.lastActive}</td>
                  <td>
                    <button className="pg-edit-btn">Edit</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-dim)' }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
