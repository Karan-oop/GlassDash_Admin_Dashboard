import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';

// ─── CSV Parser ───────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i]; });
    return obj;
  });
}

// ─── Calculate stats from CSV rows ────────────────────────────
function calculateStats(rows) {
  let total_revenue = 0;
  let total_orders = 0;
  let active_users = 0;

  rows.forEach(row => {
    // Support common column names
    const rev = parseFloat(row.revenue || row.amount || row.sales || row.total || 0);
    const ord = parseInt(row.orders || row.order_count || row.transactions || 0);
    const usr = parseInt(row.users || row.active_users || row.customers || 0);
    total_revenue += isNaN(rev) ? 0 : rev;
    total_orders  += isNaN(ord) ? 0 : ord;
    active_users  += isNaN(usr) ? 0 : usr;
  });

  const conversion_rate = total_orders > 0 && active_users > 0
    ? ((total_orders / active_users) * 100).toFixed(2)
    : 0;

  return {
    total_revenue: Math.round(total_revenue),
    active_users,
    total_orders,
    conversion_rate: parseFloat(conversion_rate),
  };
}

// ─── ICONS ────────────────────────────────────────────────────
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);
const FileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function Upload() {
  const [activeTab, setActiveTab] = useState('csv');

  // CSV state
  const [csvFile, setCsvFile]       = useState(null);
  const [csvPreview, setCsvPreview] = useState(null);
  const [csvStats, setCsvStats]     = useState(null);
  const [dragOver, setDragOver]     = useState(false);
  const fileRef = useRef();

  // Manual form state
  const [form, setForm] = useState({
    total_revenue: '',
    active_users: '',
    total_orders: '',
    conversion_rate: '',
    revenue_change: '+0%',
    users_change: '+0%',
    orders_change: '+0%',
    conversion_change: '+0%',
  });

  // Shared state
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ── CSV Handlers ──────────────────────────────────────────
  function handleFile(file) {
    if (!file || !file.name.endsWith('.csv')) {
      setErrorMsg('Sirf .csv file allowed hai!');
      return;
    }
    setCsvFile(file);
    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = parseCSV(e.target.result);
      setCsvPreview(rows.slice(0, 3));   // first 3 rows preview
      setCsvStats(calculateStats(rows));
    };
    reader.readAsText(file);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // ── Save to Supabase ─────────────────────────────────────
  async function saveToSupabase(statsData) {
    setLoading(true);
    setErrorMsg('');
    try {
      // Upsert — row id=1 update karo, nahi hai toh insert karo
      const { error } = await supabase
        .from('stats')
        .upsert({ id: 1, ...statsData, updated_at: new Date().toISOString() });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrorMsg('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── CSV Submit ────────────────────────────────────────────
  async function handleCsvSubmit() {
    if (!csvStats) { setErrorMsg('Pehle CSV upload karo!'); return; }
    await saveToSupabase(csvStats);
    setCsvFile(null);
    setCsvPreview(null);
    setCsvStats(null);
  }

  // ── Manual Submit ─────────────────────────────────────────
  async function handleManualSubmit() {
    if (!form.total_revenue || !form.active_users || !form.total_orders) {
      setErrorMsg('Revenue, Users aur Orders required hain!');
      return;
    }
    const statsData = {
      total_revenue:    parseFloat(form.total_revenue),
      active_users:     parseInt(form.active_users),
      total_orders:     parseInt(form.total_orders),
      conversion_rate:  parseFloat(form.conversion_rate) || 0,
      revenue_change:   form.revenue_change || '+0%',
      users_change:     form.users_change   || '+0%',
      orders_change:    form.orders_change  || '+0%',
      conversion_change: form.conversion_change || '+0%',
    };
    await saveToSupabase(statsData);
  }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ─────────────────────────────────────────────────────────
  return (
    <div className="pg-page">
      {/* Breadcrumb */}
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Upload Data</span>
      </div>
      <h1 className="pg-title">Upload Data</h1>

      {/* Success toast */}
      {success && (
        <div className="pg-toast">
          <CheckIcon /> Dashboard updated ! ✅
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="upl-error">{errorMsg}</div>
      )}

      {/* Tabs */}
      <div className="upl-tabs">
        <button
          className={`upl-tab ${activeTab === 'csv' ? 'active' : ''}`}
          onClick={() => { setActiveTab('csv'); setErrorMsg(''); }}
        >
          📂 CSV Upload
        </button>
        <button
          className={`upl-tab ${activeTab === 'manual' ? 'active' : ''}`}
          onClick={() => { setActiveTab('manual'); setErrorMsg(''); }}
        >
          ✏️ Manual Entry
        </button>
      </div>

      {/* ── TAB 1: CSV ── */}
      {activeTab === 'csv' && (
        <div className="upl-section-wrap">

          {/* Info box */}
          <div className="glass-card upl-info-card">
            <div className="upl-info-title">📋 How does this CSV Format looks like?</div>
            <div className="upl-info-sub">Your CSV file must contain the following columns:</div>
            <div className="upl-code-block">
              revenue, orders, users<br/>
              84254, 3947, 14823<br/>
              92000, 4100, 16000
            </div>
            <div className="upl-info-sub" style={{ marginTop: '10px' }}>
              Supported column names:
              <span className="upl-tag">revenue</span>
              <span className="upl-tag">amount</span>
              <span className="upl-tag">sales</span>
              <span className="upl-tag">orders</span>
              <span className="upl-tag">users</span>
              <span className="upl-tag">customers</span>
            </div>
          </div>

          {/* Drop zone */}
          <div
            className={`glass-card upl-dropzone ${dragOver ? 'drag-over' : ''} ${csvFile ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {csvFile ? (
              <div className="upl-file-selected">
                <FileIcon />
                <div className="upl-filename">{csvFile.name}</div>
                <div className="upl-filesize">{(csvFile.size / 1024).toFixed(1)} KB</div>
              </div>
            ) : (
              <div className="upl-drop-placeholder">
                <div className="upl-drop-icon"><UploadIcon /></div>
                <div className="upl-drop-text">Drop your CSV File here</div>
                <div className="upl-drop-sub">or click here</div>
              </div>
            )}
          </div>

          {/* Preview */}
          {csvPreview && (
            <div className="glass-card upl-preview-card">
              <div className="upl-preview-title">👁️ Preview (first 3 rows)</div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(csvPreview[0]).map(k => (
                        <th key={k}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvPreview.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((v, j) => (
                          <td key={j}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Calculated stats preview */}
          {csvStats && (
            <div className="glass-card upl-stats-preview">
              <div className="upl-preview-title">🧮 Calculated Stats (Dashboard pe yahi dikhega)</div>
              <div className="upl-stats-grid">
                <div className="upl-stat-item">
                  <div className="upl-stat-label">Total Revenue</div>
                  <div className="upl-stat-value">${csvStats.total_revenue.toLocaleString()}</div>
                </div>
                <div className="upl-stat-item">
                  <div className="upl-stat-label">Active Users</div>
                  <div className="upl-stat-value">{csvStats.active_users.toLocaleString()}</div>
                </div>
                <div className="upl-stat-item">
                  <div className="upl-stat-label">Total Orders</div>
                  <div className="upl-stat-value">{csvStats.total_orders.toLocaleString()}</div>
                </div>
                <div className="upl-stat-item">
                  <div className="upl-stat-label">Conversion Rate</div>
                  <div className="upl-stat-value">{csvStats.conversion_rate}%</div>
                </div>
              </div>
              <button
                className="pg-btn-primary"
                onClick={handleCsvSubmit}
                disabled={loading}
                style={{ marginTop: '20px' }}
              >
                {loading ? 'Saving...' : 'Update Dashboard 🚀'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: MANUAL ── */}
      {activeTab === 'manual' && (
        <div className="glass-card pg-settings-content">
          <div className="pg-form-section-title">📊 Main Stats</div>

          <div className="pg-form-grid-2">
            <div className="pg-form-group">
              <label className="pg-label">Total Revenue ($)</label>
              <input
                className="pg-input"
                type="number"
                placeholder="e.g. 84254"
                value={form.total_revenue}
                onChange={e => f('total_revenue', e.target.value)}
              />
            </div>
            <div className="pg-form-group">
              <label className="pg-label">Active Users</label>
              <input
                className="pg-input"
                type="number"
                placeholder="e.g. 14823"
                value={form.active_users}
                onChange={e => f('active_users', e.target.value)}
              />
            </div>
            <div className="pg-form-group">
              <label className="pg-label">Total Orders</label>
              <input
                className="pg-input"
                type="number"
                placeholder="e.g. 3947"
                value={form.total_orders}
                onChange={e => f('total_orders', e.target.value)}
              />
            </div>
            <div className="pg-form-group">
              <label className="pg-label">Conversion Rate (%)</label>
              <input
                className="pg-input"
                type="number"
                step="0.01"
                placeholder="e.g. 3.24"
                value={form.conversion_rate}
                onChange={e => f('conversion_rate', e.target.value)}
              />
            </div>
          </div>

          <div className="pg-form-section-title" style={{ marginTop: '28px' }}>
            📈 Change in % 
          </div>

          <div className="pg-form-grid-2">
            <div className="pg-form-group">
              <label className="pg-label">Revenue Change</label>
              <input
                className="pg-input"
                placeholder="e.g. +12.5% or -3.2%"
                value={form.revenue_change}
                onChange={e => f('revenue_change', e.target.value)}
              />
            </div>
            <div className="pg-form-group">
              <label className="pg-label">Users Change</label>
              <input
                className="pg-input"
                placeholder="e.g. +8.2%"
                value={form.users_change}
                onChange={e => f('users_change', e.target.value)}
              />
            </div>
            <div className="pg-form-group">
              <label className="pg-label">Orders Change</label>
              <input
                className="pg-input"
                placeholder="e.g. -5.1%"
                value={form.orders_change}
                onChange={e => f('orders_change', e.target.value)}
              />
            </div>
            <div className="pg-form-group">
              <label className="pg-label">Conversion Change</label>
              <input
                className="pg-input"
                placeholder="e.g. +1.4%"
                value={form.conversion_change}
                onChange={e => f('conversion_change', e.target.value)}
              />
            </div>
          </div>

          <div className="pg-form-actions">
            <button
              className="pg-btn-primary"
              onClick={handleManualSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Update Dashboard 🚀'}
            </button>
            <button
              className="action-btn"
              onClick={() => setForm({
                total_revenue: '', active_users: '', total_orders: '',
                conversion_rate: '', revenue_change: '+0%',
                users_change: '+0%', orders_change: '+0%', conversion_change: '+0%',
              })}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
