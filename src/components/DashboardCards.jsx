import React from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const cards = [
  {
    label: 'Total Revenue',
    value: '$84,254',
    change: '+12.5%',
    positive: true,
    icon: DollarSign,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    iconColor: '#10B981',
    iconBg: 'rgba(16, 185, 129, 0.12)',
  },
  {
    label: 'Active Users',
    value: '14,823',
    change: '+8.2%',
    positive: true,
    icon: Users,
    gradient: 'from-blue-500/20 to-indigo-500/10',
    iconColor: '#3B82F6',
    iconBg: 'rgba(59, 130, 246, 0.12)',
  },
  {
    label: 'Total Orders',
    value: '3,947',
    change: '-5.1%',
    positive: false,
    icon: ShoppingCart,
    gradient: 'from-orange-500/20 to-red-500/10',
    iconColor: '#F59E0B',
    iconBg: 'rgba(245, 158, 11, 0.12)',
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: '+1.4%',
    positive: true,
    icon: TrendingUp,
    gradient: 'from-violet-500/20 to-purple-500/10',
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139, 92, 246, 0.12)',
  },
];

export default function DashboardCards() {
  return (
    <div className="premium-cards-grid">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div key={card.label} className="premium-card">
            <div className="premium-card-content">
              <div className="premium-card-text">
                <span className="premium-card-label">{card.label}</span>
                <span className="premium-card-value">{card.value}</span>
                <span
                  className={`premium-card-trend ${card.positive ? 'trend-up' : 'trend-down'}`}
                >
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
  );
}
