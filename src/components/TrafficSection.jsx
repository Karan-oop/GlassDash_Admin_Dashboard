import React from 'react';

const sources = [
  { label: 'Organic Search', pct: 50, color: '#B5AD89' },
  { label: 'Social Media', pct: 30, color: '#6E011A' },
  { label: 'Direct Traffic', pct: 20, color: '#8c6534' },
];

function DonutChart({ data }) {
  const size = 120;
  const r = 44;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = -circumference / 4;
  const segments = data.map((d) => {
    const dash = (d.pct / 100) * circumference;
    const gap = circumference - dash;
    const seg = { ...d, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="donut-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        {segments.map((seg, i) => (
          <circle
            key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth="14"
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
        ))}
      </svg>
      <div className="donut-label">
        <div className="donut-number">54.5K</div>
        <div className="donut-sub">Visitors</div>
      </div>
    </div>
  );
}

export default function TrafficSection() {
  return (
    <div className="glass-card traffic-card">
      <div className="section-title">Traffic Sources</div>
      <div className="section-sub" style={{ marginTop: '4px' }}>User Acquisition Breakdown</div>
      <div className="donut-wrap">
        <DonutChart data={sources} />
        <div className="traffic-legend">
          {sources.map((s) => (
            <div key={s.label} className="legend-item">
              <div className="legend-dot" style={{ background: s.color }} />
              <span className="legend-name">{s.label} ({s.pct}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
