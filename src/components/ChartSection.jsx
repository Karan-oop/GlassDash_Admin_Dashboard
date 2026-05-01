import React, { useState } from 'react';

const monthlyData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 82 },
  { label: 'Mar', value: 58 },
  { label: 'Apr', value: 74 },
  { label: 'May', value: 91 },
  { label: 'Jun', value: 68 },
  { label: 'Jul', value: 85 },
  { label: 'Aug', value: 72 },
  { label: 'Sep', value: 96 },
  { label: 'Oct', value: 79 },
  { label: 'Nov', value: 88 },
  { label: 'Dec', value: 95 },
];

const weeklyData = [
  { label: 'Mon', value: 45 }, { label: 'Tue', value: 72 }, { label: 'Wed', value: 88 },
  { label: 'Thu', value: 61 }, { label: 'Fri', value: 93 }, { label: 'Sat', value: 54 },
  { label: 'Sun', value: 38 },
];

const dailyData = [
  { label: '6am', value: 20 }, { label: '9am', value: 55 }, { label: '12pm', value: 82 },
  { label: '3pm', value: 74 }, { label: '6pm', value: 90 }, { label: '9pm', value: 63 },
  { label: '12am', value: 30 },
];

const tabs = ['Monthly', 'Weekly', 'Daily'];
const dataMap = { Monthly: monthlyData, Weekly: weeklyData, Daily: dailyData };
const yLabels = ['$130K', '$100K', '$75K', '$50K', '$25K', '$0'];

export default function ChartSection() {
  const [active, setActive] = useState('Monthly');
  const data = dataMap[active];

  return (
    <div className="glass-card chart-card">
      <div className="section-header">
        <div>
          <div className="section-title">Revenue Analytics</div>
          <div className="section-sub">Monthly revenue overview</div>
        </div>
        <div className="chart-tabs">
          {tabs.map((t) => (
            <button key={t} className={`tab-btn ${active === t ? 'active' : ''}`} onClick={() => setActive(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-area">
        <div style={{ display: 'flex', gap: 0 }}>
          <div className="chart-y-labels">
            {yLabels.map((l) => <span key={l}>{l}</span>)}
          </div>
          <div style={{ flex: 1 }}>
            <div className="bars-container">
              {data.map((item, i) => (
                <div key={item.label + i} className="bar-group">
                  <div className="bar-wrap">
                    <div
                      className="bar"
                      style={{
                        height: `${item.value}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    >
                      <div className="bar-tooltip">
                        ${Math.round(item.value * 1300)}
                      </div>
                    </div>
                  </div>
                  <div className="bar-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
