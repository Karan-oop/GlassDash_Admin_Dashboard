import React from 'react';

const items = [
  { label: 'UI Design', pct: 85 },
  { label: 'Backend API', pct: 62 },
  { label: 'Testing', pct: 45 },
  { label: 'Documentation', pct: 28 },
];

export default function ProgressSection() {
  return (
    <div className="glass-card progress-card">
      <div className="section-title">Project Progress</div>
      <div className="section-sub" style={{ marginBottom: '16px', marginTop: '4px' }}>Current sprint status</div>
      <div className="progress-list">
        {items.map((item, i) => (
          <div key={item.label} className="progress-item">
            <div className="progress-header-row">
              <span className="progress-label">{item.label}</span>
              <span className="progress-pct">{item.pct}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  '--target-width': `${item.pct}%`,
                  animationDelay: `${i * 0.15 + 0.4}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
