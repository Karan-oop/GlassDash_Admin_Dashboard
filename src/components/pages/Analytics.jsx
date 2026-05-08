import React, { useState } from 'react';

/* ── Top stat cards ── */
const analyticsCards = [
  {
    label: 'Page Views',
    value: '2.4M',
    change: '+34.5%',
    positive: true,
    colorClass: 'tan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    label: 'Unique Visitors',
    value: '847K',
    change: '+18.3%',
    positive: true,
    colorClass: 'tan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: 'Bounce Rate',
    value: '38.2%',
    change: '+5.2%',
    positive: false,
    colorClass: 'red',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>
      </svg>
    ),
  },
  {
    label: 'Avg. Session',
    value: '8m 32s',
    change: '+12.1%',
    positive: true,
    colorClass: 'tan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
  },
];

/* ── Traffic chart data ── */
const trafficData = {
  '7 Days': [42, 58, 35, 71, 63, 88, 55],
  '30 Days': [28,35,42,38,55,48,62,58,71,65,78,72,85,80,68,74,82,76,90,84,72,68,78,74,86,80,70,66,76,72],
  '90 Days': Array.from({ length: 90 }, (_, i) => 20 + Math.round(Math.sin(i / 8) * 20 + Math.random() * 25 + i * 0.4)),
};
const tabLabels = { '7 Days': ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], '30 Days': Array.from({length:30},(_,i)=>i+1), '90 Days': Array.from({length:90},(_,i)=>i+1) };

/* ── Top Pages ── */
const topPages = [
  { rank: 1, path: 'Dashboard Pricing', views: '45,254', color: 'var(--primary-light)' },
  { rank: 2, path: 'Products Pricing', views: '32,891', color: 'var(--tan-dark)' },
  { rank: 3, path: 'Pricing Details', views: '29,456', color: 'var(--primary)' },
];

/* ── Browsers ── */
const browsers = [
  { name: 'Chrome', pct: 64, color: 'var(--tan)' },
  { name: 'Safari', pct: 22, color: 'var(--tan-dark)' },
  { name: 'Brave', pct: 10, color: 'var(--primary-light)' },
  { name: 'Edge', pct: 4, color: 'var(--primary)' },
];

/* ── Countries ── */
const countries = [
  { flag: '🇺🇸', code: 'US', name: 'United States', pct: 38, color: 'var(--tan)' },
  { flag: '🇬🇧', code: 'UK', name: 'United Kingdom', pct: 18, color: 'var(--tan-dark)' },
  { flag: '🇩🇰', code: 'DK', name: 'Denmark', pct: 12, color: 'var(--primary-light)' },
  { flag: '🇨🇦', code: 'CA', name: 'Canada', pct: 9, color: 'var(--primary)' },
];

/* ── Devices donut ── */
function DevicesDonut() {
  const segs = [
    { pct: 55, color: '#B5AD89', label: 'Mobile (55%)' },
    { pct: 35, color: '#8c6534', label: 'Desktop (35%)' },
    { pct: 10, color: '#9b1a35', label: 'Tablet (10%)' },
  ];
  const r = 44, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  let off = -circ / 4;
  const paths = segs.map(s => {
    const dash = (s.pct / 100) * circ;
    const el = { ...s, dash, gap: circ - dash, off };
    off += dash;
    return el;
  });
  return (
    <div className="pg-devices-wrap">
      <div className="pg-donut-container">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
          {paths.map((p, i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={p.color} strokeWidth="14"
              strokeDasharray={`${p.dash} ${p.gap}`} strokeDashoffset={-p.off} />
          ))}
        </svg>
        <div className="pg-donut-label"><div className="pg-donut-num">100%</div><div className="pg-donut-sub">Total</div></div>
      </div>
      <div className="pg-devices-legend">
        {segs.map(s => (
          <div key={s.label} className="pg-legend-item">
            <span className="pg-legend-dot" style={{ background: s.color }} />
            <span className="pg-legend-text">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('30 Days');
  const data = trafficData[activeTab];
  const labels = tabLabels[activeTab];
  const showEvery = data.length > 15 ? Math.ceil(data.length / 15) : 1;

  return (
    <div className="pg-page">
      {/* Breadcrumb */}
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Analytics</span>
      </div>
      <h1 className="pg-title">Analytics</h1>

      {/* Top Cards */}
      <div className="cards-grid pg-cards-anim">
        {analyticsCards.map((c, i) => (
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

      {/* Chart + Top Pages row */}
      <div className="pg-chart-row">
        {/* Traffic Overview */}
        <div className="glass-card pg-chart-main">
          <div className="section-header">
            <div>
              <div className="section-title">Traffic Overview</div>
              <div className="section-sub">Daily visitors and page views</div>
            </div>
            <div className="chart-tabs">
              {Object.keys(trafficData).map(t => (
                <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="pg-bars-area">
            <div className="pg-y-labels">
              {['50K','40K','30K','20K','10K','0'].map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="pg-bars-inner">
              <div className="pg-bars-grid">
                {data.map((v, i) => (
                  <div key={i} className="pg-bar-col" title={`${v * 600} views`}>
                    <div className="pg-bar-fill" style={{ height: `${v}%`, animationDelay: `${i * 0.015}s` }} />
                    {i % showEvery === 0 && <div className="pg-bar-xlabel">{labels[i]}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="glass-card pg-top-pages">
          <div className="section-title">Top Pages</div>
          <div className="section-sub" style={{ marginBottom: '20px', marginTop: '4px' }}>Most visited pages</div>
          {topPages.map(p => (
            <div key={p.rank} className="pg-top-page-item">
              <div className="pg-rank-badge" style={{ background: p.color }}>{p.rank}</div>
              <div className="pg-page-info">
                <div className="pg-page-path">{p.path}</div>
                <div className="pg-page-views">{p.views} views</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Devices / Browsers / Countries */}
      <div className="pg-bottom-3">
        {/* Devices */}
        <div className="glass-card pg-card-pad">
          <div className="section-title">Devices</div>
          <div className="section-sub" style={{ marginBottom: '16px', marginTop: '4px' }}>Traffic by device type</div>
          <DevicesDonut />
        </div>

        {/* Browsers */}
        <div className="glass-card pg-card-pad">
          <div className="section-title">Browsers</div>
          <div className="section-sub" style={{ marginBottom: '16px', marginTop: '4px' }}>Traffic by browser</div>
          {browsers.map(b => (
            <div key={b.name} className="pg-browser-item">
              <div className="pg-browser-header">
                <span className="pg-browser-name">{b.name}</span>
                <span className="pg-browser-pct">{b.pct}%</span>
              </div>
              <div className="progress-track">
                <div className="pg-progress-fill" style={{ '--w': `${b.pct}%`, '--color': b.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Countries */}
        <div className="glass-card pg-card-pad">
          <div className="section-title">Countries</div>
          <div className="section-sub" style={{ marginBottom: '16px', marginTop: '4px' }}>Top traffic sources</div>
          {countries.map(c => (
            <div key={c.name} className="pg-browser-item">
              <div className="pg-browser-header">
                <span className="pg-browser-name">
                  <span style={{ fontSize: '0.85rem', marginRight: '6px' }}>{c.flag}</span>
                  {c.name}
                </span>
                <span className="pg-browser-pct">{c.pct}%</span>
              </div>
              <div className="progress-track">
                <div className="pg-progress-fill" style={{ '--w': `${c.pct}%`, '--color': c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
