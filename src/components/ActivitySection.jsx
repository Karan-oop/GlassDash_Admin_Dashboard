import React from 'react';

const activities = [
  { initials: 'JD', name: 'John Deere', action: 'purchased Premium Plan', time: '2 minutes ago', color: '#6E011A' },
  { initials: 'AS', name: 'Anna Smith', action: 'submitted a support ticket', time: '15 minutes ago', color: '#8c6534' },
  { initials: 'MJ', name: 'Mike Johnson', action: 'upgraded subscription', time: '1 hour ago', color: '#3b6e5a' },
  { initials: 'EW', name: 'Emily White', action: 'downloaded the invoice', time: '2 hours ago', color: '#4a3b6e' },
  { initials: 'RB', name: 'Robert Brown', action: 'left a 5-star review', time: '3 hours ago', color: '#6e5a3b' },
];

export default function ActivitySection() {
  return (
    <div className="glass-card activity-card">
      <div className="section-header" style={{ marginBottom: '8px' }}>
        <div>
          <div className="section-title">Recent Activity</div>
          <div className="section-sub">Latest Transactions</div>
        </div>
      </div>
      <div className="activity-list">
        {activities.map((item, i) => (
          <div key={i} className="activity-item">
            <div className="activity-avatar" style={{ background: item.color }}>
              {item.initials}
            </div>
            <div className="activity-text">
              <div className="activity-name">{item.name}</div>
              <div className="activity-action">{item.action}</div>
            </div>
            <div className="activity-time">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
