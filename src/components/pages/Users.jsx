import React, { useState } from 'react';

const userCards = [
  { label: 'Total Users', value: '24,521', change: '+5%', positive: true, colorClass: 'tan',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  },
  { label: 'Active Now', value: '1,204', change: '+1.5%', positive: true, colorClass: 'tan',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
  },
  { label: 'New Today', value: '86', change: '-3.1%', positive: false, colorClass: 'red',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
  },
  { label: 'Premium Users', value: '3,847', change: '+18.7%', positive: true, colorClass: 'tan',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>
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
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pg-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Users</span>
      </div>
      <h1 className="pg-title">Users</h1>

      {/* Cards */}
      <div className="cards-grid pg-cards-anim">
        {userCards.map((c, i) => (
          <div key={c.label} className="glass-card dash-card" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className={`card-icon ${c.colorClass}`}>{c.icon}</div>
            <div className="card-label">{c.label}</div>
            <div className="card-value">{c.value}</div>
            <span className={`card-change ${c.positive ? 'positive' : 'negative'}`}>
              {c.positive ? '▲' : '▼'} {c.change}
            </span>
            <div className="card-glow" />
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="glass-card transactions-card">
        <div className="transactions-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="section-title">All Users</div>
            <div className="section-sub">Manage your user base</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div className="pg-table-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
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
              {filtered.map((u, i) => (
                <tr key={i}>
                  <td>
                    <div className="customer-cell">
                      <div className="cust-avatar" style={{ background: u.color }}>{u.initials}</div>
                      <div>
                        <div className="cust-name">{u.name}</div>
                        <div className="cust-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{u.role}</td>
                  <td>
                    <span className={`pg-status-badge ${statusClass[u.status]}`}>
                      <span className="pg-status-dot" />
                      {u.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{u.joined}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{u.lastActive}</td>
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
