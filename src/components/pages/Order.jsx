import React, { useMemo, useState } from "react";
import "./Order.css";

const ORDER_STATUSES = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded",
];

const PAYMENT_STATUSES = ["Paid", "Pending", "Refunded"];

const initialOrders = [
  {
    id: "GD-2048",
    productName: "Premium Leather Jacket",
    orderDate: "2026-06-01",
    deliveryDate: "2026-06-07",
    amount: 129.99,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
  },
  {
    id: "GD-2049",
    productName: "Classic White Sneakers",
    orderDate: "2026-06-02",
    deliveryDate: "2026-06-09",
    amount: 89.5,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
  },
  {
    id: "GD-2050",
    productName: "Smart Watch Series X",
    orderDate: "2026-06-03",
    deliveryDate: "2026-06-12",
    amount: 249.0,
    paymentStatus: "Pending",
    orderStatus: "Processing",
  },
  {
    id: "GD-2051",
    productName: "Noise Cancelling Headphones",
    orderDate: "2026-05-29",
    deliveryDate: "2026-06-04",
    amount: 189.99,
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery",
  },
  {
    id: "GD-2052",
    productName: "Travel Backpack Pro",
    orderDate: "2026-05-28",
    deliveryDate: "2026-06-05",
    amount: 59.99,
    paymentStatus: "Paid",
    orderStatus: "Pending",
  },
  {
    id: "GD-2053",
    productName: "Wireless Mechanical Keyboard",
    orderDate: "2026-05-24",
    deliveryDate: "2026-05-31",
    amount: 149.0,
    paymentStatus: "Refunded",
    orderStatus: "Returned",
  },
  {
    id: "GD-2054",
    productName: "Smart Home Speaker",
    orderDate: "2026-05-21",
    deliveryDate: "2026-05-28",
    amount: 77.25,
    paymentStatus: "Paid",
    orderStatus: "Cancelled",
  },
  {
    id: "GD-2055",
    productName: "Gaming Mouse Elite",
    orderDate: "2026-05-19",
    deliveryDate: "2026-05-27",
    amount: 45.0,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
  },
  {
    id: "GD-2056",
    productName: "Bluetooth Speaker Mini",
    orderDate: "2026-06-04",
    deliveryDate: "2026-06-10",
    amount: 35.5,
    paymentStatus: "Pending",
    orderStatus: "Processing",
  },
  {
    id: "GD-2057",
    productName: "Cotton Hoodie Set",
    orderDate: "2026-06-05",
    deliveryDate: "2026-06-13",
    amount: 72.0,
    paymentStatus: "Paid",
    orderStatus: "Pending",
  },
];

const statsConfig = [
  { label: "Total Orders", key: "total" },
  { label: "Delivered Orders", key: "delivered" },
  { label: "Pending Orders", key: "pending" },
  { label: "Cancelled Orders", key: "cancelled" },
  { label: "Processing Orders", key: "processing" },
  { label: "Returned Orders", key: "returned" },
];

const orderStatusClassMap = {
  Pending: "order-status-pending",
  Processing: "order-status-processing",
  Shipped: "order-status-shipped",
  "Out for Delivery": "order-status-out",
  Delivered: "order-status-delivered",
  Cancelled: "order-status-cancelled",
  Returned: "order-status-returned",
  Refunded: "order-status-refunded",
};

const paymentStatusClassMap = {
  Paid: "payment-paid",
  Pending: "payment-pending",
  Refunded: "payment-refunded",
};

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Amount High to Low", value: "amountDesc" },
  { label: "Amount Low to High", value: "amountAsc" },
];

const PER_PAGE = 5;

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function toDate(value) {
  return new Date(`${value}T00:00:00`);
}

function getStatusClass(status) {
  return orderStatusClassMap[status] || "order-status-pending";
}

function getPaymentClass(status) {
  return paymentStatusClassMap[status] || "payment-pending";
}

function OrderBadge({ status, payment = false }) {
  const badgeClass = payment ? getPaymentClass(status) : getStatusClass(status);
  return <span className={`order-badge ${badgeClass}`}>{status}</span>;
}

function ActionIcon({ type }) {
  if (type === "view") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (type === "cancel") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 9 6 6M15 9l-6 6" />
      </svg>
    );
  }

  if (type === "reorder") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    );
  }

 if (type === "download") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Order() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [activeOrder, setActiveOrder] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__orderToastTimer);
    window.__orderToastTimer = window.setTimeout(() => setToast(""), 2200);
  };

  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();

    return orders
      .filter((order) => {
        const matchSearch =
          !q ||
          order.id.toLowerCase().includes(q) ||
          order.productName.toLowerCase().includes(q) ||
          order.orderStatus.toLowerCase().includes(q) ||
          order.paymentStatus.toLowerCase().includes(q);
        const matchStatus = statusFilter === "All" || order.orderStatus === statusFilter;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return toDate(b.orderDate) - toDate(a.orderDate);
        if (sortBy === "oldest") return toDate(a.orderDate) - toDate(b.orderDate);
        if (sortBy === "amountDesc") return b.amount - a.amount;
        if (sortBy === "amountAsc") return a.amount - b.amount;
        return 0;
      });
  }, [orders, search, sortBy, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((order) => order.orderStatus === "Delivered").length;
    const pending = orders.filter((order) => order.orderStatus === "Pending").length;
    const cancelled = orders.filter((order) => order.orderStatus === "Cancelled").length;
    const processing = orders.filter((order) => order.orderStatus === "Processing").length;
    const returned = orders.filter((order) => order.orderStatus === "Returned").length;

    return {
      total,
      delivered,
      pending,
      cancelled,
      processing,
      returned,
    };
  }, [orders]);

  const handleCancelOrder = () => {
    if (!cancelTarget) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === cancelTarget.id ? { ...order, orderStatus: "Cancelled", paymentStatus: "Refunded" } : order
      )
    );
    setCancelTarget(null);
    setActiveOrder(null);
    showToast(`Order ${cancelTarget.id} cancelled`);
  };

  const handleReorder = (order) => {
    const newOrder = {
      ...order,
      id: `GD-${Math.floor(2000 + Math.random() * 7000)}`,
      orderDate: new Date().toISOString().split("T")[0],
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      orderStatus: "Pending",
      paymentStatus: "Pending",
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Reordered ${order.productName}`);
  };

  const handleDownloadInvoice = (order) => {
    showToast(`Invoice downloaded for ${order.id}`);
  };

  const handleTrackOrder = (order) => {
    showToast(`Tracking opened for ${order.id}`);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSortBy("newest");
    setPage(1);
  };

  return (
    <div className="pg-page order-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-link">User</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Orders</span>
      </div>

      <div className="order-header glass-card">
        <div>
          <div className="section-title">Order Management</div>
          <div className="section-sub">Search, filter, track, and manage all user orders.</div>
        </div>

        <div className="order-toolbar">
          <div className="order-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>

          <select
            className="order-select"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Statuses" : status}
              </option>
            ))}
          </select>

          <select
            className="order-select"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setPage(1);
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="order-stats-grid">
        {statsConfig.map((item, index) => (
          <article key={item.label} className="glass-card order-stat-card" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="order-stat-label">{item.label}</div>
            <div className="order-stat-value">{stats[item.key]}</div>
          </article>
        ))}
      </div>

      <section className="glass-card order-table-card">
        <div className="order-table-head">
          <div>
            <div className="section-title">Orders List</div>
            <div className="section-sub">{filteredOrders.length} order(s) found</div>
          </div>

          <button type="button" className="order-reset-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        <div className="order-table-scroll">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="order-id-pill">{order.id}</div>
                  </td>
                  <td>
                    <div className="order-product-name">{order.productName}</div>
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.deliveryDate}</td>
                  <td className="order-amount">{formatMoney(order.amount)}</td>
                  <td>
                    <OrderBadge status={order.paymentStatus} payment />
                  </td>
                  <td>
                    <OrderBadge status={order.orderStatus} />
                  </td>
                  <td>
                    <div className="order-actions">
 <button type="button" className="order-mini-btn" onClick={() => handleReorder(order)}>
                        <ActionIcon type="reorder" />
                        Reorder
                      </button>
                      <button type="button" className="order-mini-btn" onClick={() => handleDownloadInvoice(order)}>
                        <ActionIcon type="download" />
                        Download Invoice
                      </button>
                      <button type="button" className="order-mini-btn" onClick={() => handleTrackOrder(order)}>
                        Track Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="order-empty">
                      <div className="order-empty-icon">🧾</div>
                      <h3>No orders found</h3>
                      <p>Try changing the status filter or search term.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="order-pagination">
            <button
              type="button"
              className="page-btn"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                className={`page-btn${currentPage === index + 1 ? " active" : ""}`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              className="page-btn"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>

      {activeOrder && (
        <div className="order-modal-backdrop" onClick={() => setActiveOrder(null)}>
          <div className="order-modal glass-card" onClick={(event) => event.stopPropagation()}>
            <div className="order-modal-head">
              <div>
                <div className="section-title">Order Details</div>
                <div className="section-sub">{activeOrder.id}</div>
              </div>
              <button type="button" className="order-modal-close" onClick={() => setActiveOrder(null)}>
                ✕
              </button>
            </div>

            <div className="order-modal-grid">
              <div><span>Product</span><strong>{activeOrder.productName}</strong></div>
              <div><span>Order Date</span><strong>{activeOrder.orderDate}</strong></div>
              <div><span>Delivery Date</span><strong>{activeOrder.deliveryDate}</strong></div>
              <div><span>Amount</span><strong>{formatMoney(activeOrder.amount)}</strong></div>
              <div><span>Payment</span><strong>{activeOrder.paymentStatus}</strong></div>
              <div><span>Status</span><strong>{activeOrder.orderStatus}</strong></div>
            </div>

            <div className="order-modal-actions">
              <button type="button" className="order-modal-btn" onClick={() => handleTrackOrder(activeOrder)}>
                Track Order
              </button>
              <button type="button" className="order-modal-btn" onClick={() => handleDownloadInvoice(activeOrder)}>
                Download Invoice
              </button>
              <button type="button" className="order-modal-btn danger" onClick={() => setCancelTarget(activeOrder)}>
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {cancelTarget && (
        <div className="order-modal-backdrop" onClick={() => setCancelTarget(null)}>
          <div className="order-confirm glass-card" onClick={(event) => event.stopPropagation()}>
            <div className="section-title">Cancel this order?</div>
            <p className="order-confirm-text">
              {cancelTarget.id} — {cancelTarget.productName}
            </p>
            <p className="order-confirm-sub">This action will update the order status to Cancelled and mark payment as Refunded.</p>
            <div className="order-confirm-actions">
              <button type="button" className="order-modal-btn" onClick={() => setCancelTarget(null)}>
                Keep Order
              </button>
              <button type="button" className="order-modal-btn danger" onClick={handleCancelOrder}>
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="order-toast">{toast}</div>}
    </div>
  );
}
