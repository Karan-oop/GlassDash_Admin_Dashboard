import React from 'react';

const cards = [
  {
    label: 'Total Revenue',
    value: '$84,254',
    change: '+12.5%',
    positive: true,
    iconColor: 'tan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Active Users',
    value: '14,823',
    change: '+8.2%',
    positive: true,
    iconColor: 'tan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Total Orders',
    value: '3,947',
    change: '-5.1%',
    positive: false,
    iconColor: 'red',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: '+1.4%',
    positive: true,
    iconColor: 'tan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
      </svg>
    ),
  },
];

export default function DashboardCards() {
  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <div key={card.label} className="glass-card dash-card">
          <div className={`card-icon ${card.iconColor}`}>{card.icon}</div>
          <div className="card-label">{card.label}</div>
          <div className="card-value">{card.value}</div>
          <span className={`card-change ${card.positive ? 'positive' : 'negative'}`}>
            {card.positive ? '▲' : '▼'} {card.change}
          </span>
          <div className="card-glow" />
        </div>
      ))}
    </div>
  );
}
