import { useState } from "react";
import "./SettingsTabs.css";

export default function BillingTab() {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const billingHistory = [
    { date: "Apr 1, 2025", description: "Pro Plan – Monthly", amount: "$29.00", status: "Paid" },
    { date: "Mar 1, 2025", description: "Pro Plan – Monthly", amount: "$29.00", status: "Paid" },
    { date: "Feb 1, 2025", description: "Pro Plan – Monthly", amount: "$29.00", status: "Paid" },
    { date: "Jan 1, 2025", description: "Pro Plan – Monthly", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="tab-content fade-in">
      {/* Current Plan */}
      <section className="settings-section">
        <h2 className="section-title">Current Plan</h2>
        <div className="plan-card glass-card">
          <div className="plan-info">
            <span className="plan-name">Pro Plan</span>
            <span className="plan-billing">Billed monthly</span>
          </div>
          <div className="plan-price">
            <span className="price-amount">$29</span>
            <span className="price-period">/month</span>
          </div>
          <div className="plan-actions">
            <button className="btn-primary">Upgrade Plan</button>
            <button
              className="btn-ghost btn-danger"
              onClick={() => setShowCancelConfirm(!showCancelConfirm)}
            >
              Cancel Subscription
            </button>
          </div>
        </div>
        {showCancelConfirm && (
          <div className="cancel-confirm glass-card">
            <p>Are you sure you want to cancel? You'll lose access to Pro features.</p>
            <div className="btn-row" style={{ marginTop: "12px" }}>
              <button className="btn-primary" style={{ background: "#6E011A" }}>Yes, Cancel</button>
              <button className="btn-ghost" onClick={() => setShowCancelConfirm(false)}>Keep Plan</button>
            </div>
          </div>
        )}
      </section>

      {/* Payment Method */}
      <section className="settings-section">
        <h2 className="section-title">Payment Method</h2>
        <div className="payment-card glass-card">
          <div className="card-icon">
            <span className="visa-badge">VISA</span>
          </div>
          <div className="card-info">
            <span className="card-number">Visa ending in 4242</span>
            <span className="card-expiry">Expires 12/2026</span>
          </div>
          <button className="btn-link">Edit</button>
        </div>
        <button className="btn-add-payment">
          <span>+</span> Add Payment Method
        </button>
      </section>

      {/* Billing History */}
      <section className="settings-section">
        <h2 className="section-title">Billing History</h2>
        <div className="billing-table-wrap">
          <table className="billing-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className="badge-paid">● {row.status}</span>
                  </td>
                  <td>
                    <button className="btn-link">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
