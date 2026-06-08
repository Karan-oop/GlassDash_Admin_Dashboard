import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import "./Order.css";
import { getOrderById } from "./OrderData";

const orderFields = [
  ["id", "Order ID"],
  ["productName", "Product Name"],
  ["productCategory", "Product Category"],
  ["quantity", "Quantity"],
  ["customerName", "Customer Name"],
  ["customerEmail", "Customer Email"],
  ["customerPhone", "Customer Phone"],
  ["orderDate", "Order Date"],
  ["deliveryDate", "Delivery Date"],
  ["shippingMethod", "Shipping Method"],
  ["paymentMethod", "Payment Method"],
  ["amount", "Order Amount"],
  ["paymentStatus", "Payment Status"],
  ["orderStatus", "Order Status"],
  ["trackingId", "Tracking ID"],
  ["shippingAddress", "Shipping Address"],
  ["notes", "Order Notes"],
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

function formatMoney(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

function formatValue(key, value) {
  if (key === "amount") return formatMoney(value);
  return value;
}

function OrderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = useMemo(() => getOrderById(orderId), [orderId]);

  const progress = useMemo(() => {
    const flow = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered"];
    if (["Cancelled", "Returned", "Refunded"].includes(order.orderStatus)) return 100;
    const index = Math.max(0, flow.indexOf(order.orderStatus));
    return Math.round(((index + 1) / flow.length) * 100);
  }, [order.orderStatus]);

  return (
    <div className="pg-page profile-page order-detail-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-link">User</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-link">Orders</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">{order.id}</span>
      </div>

      <div className="profile-hero glass-card">
        <div className="profile-avatar-shell">
          <div className="profile-avatar-frame order-detail-icon-frame">
            <div className="profile-avatar-fallback order-detail-icon">
              <OrderIcon />
            </div>
          </div>

          <div className="profile-avatar-actions">
            <button type="button" className="profile-avatar-btn" onClick={() => navigate("/user/orders")}>
              Back to Orders
            </button>
            <button type="button" className="profile-avatar-btn secondary">
              {order.trackingId}
            </button>
          </div>
        </div>

        <div className="profile-hero-copy">
          <div className="section-title">Order Management</div>
          <h1 className="profile-hero-title">{order.id}</h1>
          <div className="profile-hero-subtitle">{order.productName}</div>

          <div className="order-detail-badges">
            <span className={`order-badge ${orderStatusClassMap[order.orderStatus] || "order-status-pending"}`}>
              {order.orderStatus}
            </span>
            <span className={`order-badge ${paymentStatusClassMap[order.paymentStatus] || "payment-pending"}`}>
              {order.paymentStatus}
            </span>
          </div>

          <div className="profile-completion">
            <div className="profile-completion-head">
              <span>Order progress</span>
              <strong>{progress}%</strong>
            </div>
            <div className="profile-completion-track">
              <div className="profile-completion-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card glass-card">
        <div className="section-header">
          <div>
            <div className="section-title">Order Information</div>
            <div className="section-sub">Read-only order overview with customer, payment, and delivery details.</div>
          </div>

          <div className="profile-mode-pill">Read Only</div>
        </div>

        <div className="profile-form">
          <div className="profile-grid-2">
            {orderFields.map(([key, label]) => (
              <div className="profile-field-block" key={key}>
                <label className="pg-label" htmlFor={`order-${key}`}>{label}</label>
                {key === "shippingAddress" || key === "notes" ? (
                  <textarea
                    id={`order-${key}`}
                    className="pg-input pg-textarea profile-input"
                    value={formatValue(key, order[key])}
                    readOnly
                  />
                ) : (
                  <input
                    id={`order-${key}`}
                    type="text"
                    className="pg-input profile-input"
                    value={formatValue(key, order[key])}
                    readOnly
                  />
                )}
              </div>
            ))}
          </div>

          <div className="profile-actions">
            <button type="button" className="profile-secondary-btn" onClick={() => navigate("/user/orders")}>
              Back to List
            </button>
            <button type="button" className="pg-btn-primary" onClick={() => navigate("/user/orders")}>
              Manage Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
