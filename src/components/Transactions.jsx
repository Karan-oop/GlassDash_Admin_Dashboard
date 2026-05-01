import React from 'react';

const transactions = [
  { initials: 'JD', color: '#6E011A', name: 'John Deere', email: 'john.dee@gmail.com', product: 'Premium Plan', date: 'Jan 26, 2025', status: 'Completed', amount: '$1,899.00' },
  { initials: 'AS', color: '#8c6534', name: 'Anna Smith', email: 'smith.anna@gmail.com', product: 'Enterprise License', date: 'Jan 20, 2025', status: 'Processing', amount: '$1,499.00' },
  { initials: 'MJ', color: '#3b6e5a', name: 'Mike Johnson', email: 'mike.john@gmail.com', product: 'Team Bundle', date: 'Jan 19, 2025', status: 'Completed', amount: '$599.00' },
  { initials: 'EW', color: '#6e5a3b', name: 'Emily White', email: 'emily.white@gmail.com', product: 'Starter Plan', date: 'Jan 12, 2025', status: 'Pending', amount: '$499.00' },
  { initials: 'RB', color: '#4a3b6e', name: 'Robert Brown', email: 'robert.bro@gmail.com', product: 'Pro Annual', date: 'Jan 02, 2025', status: 'Completed', amount: '$1,999.00' },
];

const statusClass = { Completed: 'status-completed', Pending: 'status-pending', Processing: 'status-processing' };

export default function Transactions() {
  return (
    <div className="glass-card transactions-card">
      <div className="transactions-header">
        <div>
          <div className="section-title">Recent Transactions</div>
          <div className="section-sub">Latest Orders and Payments</div>
        </div>
        <div className="header-actions">
          <button className="action-btn">View All</button>
          <button className="action-btn">Export</button>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i}>
                <td>
                  <div className="customer-cell">
                    <div className="cust-avatar" style={{ background: tx.color }}>{tx.initials}</div>
                    <div>
                      <div className="cust-name">{tx.name}</div>
                      <div className="cust-email">{tx.email}</div>
                    </div>
                  </div>
                </td>
                <td>{tx.product}</td>
                <td>{tx.date}</td>
                <td><span className={`status-badge ${statusClass[tx.status]}`}>{tx.status}</span></td>
                <td style={{ textAlign: 'right' }}><span className="amount">{tx.amount}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
