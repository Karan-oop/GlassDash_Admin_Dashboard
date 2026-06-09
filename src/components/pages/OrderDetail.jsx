import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import "./Order.css";
import { getOrderById } from "./OrderData";

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

function addDays(dateStr, days) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

// ── Icons (Inline SVGs) ──────────────────────────────────────────────────────
function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

const progressSteps = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const downloadInvoicePDF = (order) => {
  const sub = (order.amount * 0.85).toFixed(2);
  const tax = (order.amount * 0.15).toFixed(2);
  const total = Number(order.amount).toFixed(2);
  const unit = (order.amount / order.quantity).toFixed(2);

  const streamText = `BT
/F1 18 Tf
50 780 Td
(GLASSDASH INC. - INVOICE) Tj
0 -30 Td
/F1 10 Tf
(Invoice Reference: INV-${order.id}) Tj
0 -15 Td
(Date: ${order.orderDate}) Tj
0 -15 Td
(Tracking ID: ${order.trackingId}) Tj
0 -30 Td
/F1 12 Tf
(CUSTOMER INFORMATION) Tj
0 -15 Td
/F1 10 Tf
(Name: ${order.customerName}) Tj
0 -15 Td
(Email: ${order.customerEmail}) Tj
0 -15 Td
(Phone: ${order.customerPhone}) Tj
0 -15 Td
(Shipping Address: ${order.shippingAddress.substring(0, 50)}) Tj
0 -12 Td
(${order.shippingAddress.substring(50, 100) || ''}) Tj
0 -30 Td
/F1 12 Tf
(ORDER ITEMS) Tj
0 -15 Td
/F1 10 Tf
(Item: ${order.productName}) Tj
0 -12 Td
(Category: ${order.productCategory}  |  Qty: ${order.quantity}  |  Unit Price: $${unit}) Tj
0 -30 Td
/F1 12 Tf
(PAYMENT & COST SUMMARY) Tj
0 -15 Td
/F1 10 Tf
(Payment Method: ${order.paymentMethod}  |  Status: ${order.paymentStatus}) Tj
0 -15 Td
(Subtotal: $${sub}) Tj
0 -12 Td
(Estimated Tax (15%): $${tax}) Tj
0 -12 Td
(Shipping / Delivery: Free) Tj
0 -20 Td
/F1 12 Tf
(GRAND TOTAL: $${total}) Tj
ET`;

  const objects = [
    `%PDF-1.4`,
    `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`,
    `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`,
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>\nendobj`,
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`,
    `5 0 obj\n<< /Length ${streamText.length} >>\nstream\n${streamText}\nendstream\nendobj`
  ];

  let pdfText = objects[0] + "\n";
  const offsets = [];
  let currentOffset = pdfText.length;

  for (let i = 1; i < objects.length; i++) {
    offsets.push(currentOffset);
    pdfText += objects[i] + "\n";
    currentOffset = pdfText.length;
  }

  const xrefOffset = currentOffset;
  pdfText += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  
  for (let i = 0; i < offsets.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, "0");
    pdfText += `${offsetStr} 00000 n \n`;
  }

  pdfText += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdfText], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Invoice-${order.id}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = useMemo(() => getOrderById(orderId), [orderId]);
  
  const [activeTab, setActiveTab] = useState("items"); // "items", "customer", "payment"
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const currentStepIndex = useMemo(() => {
    if (["Cancelled", "Returned", "Refunded"].includes(order.orderStatus)) return -1;
    return progressSteps.indexOf(order.orderStatus);
  }, [order.orderStatus]);

  // Generates user initials for avatar
  const userInitials = useMemo(() => {
    if (!order.customerName) return "U";
    return order.customerName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [order.customerName]);

  // Derived financial summary
  const subtotal = useMemo(() => order.amount * 0.85, [order.amount]);
  const estimatedTax = useMemo(() => order.amount * 0.15, [order.amount]);

  return (
    <div className="pg-page profile-page order-detail-page">
      {/* Breadcrumbs */}
      <div className="pg-breadcrumb">
        <span className="pg-bc-link" onClick={() => navigate("/")}>Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-link" onClick={() => navigate("/user/orders")}>Orders</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">{order.id}</span>
      </div>

      {/* 1. Header Card with Stepper */}
      <div className="order-details-header-card glass-card">
        <div className="order-header-info-row">
          <div className="order-title-block">
            <div className="order-title-meta">
              <span className="order-id-label">Order Details</span>
              <h1 className="order-id-title">{order.id}</h1>
              <div className="order-date-row">
                <CalendarIcon />
                <span>Placed on {order.orderDate}</span>
              </div>
            </div>
            <div className="order-badges-wrapper">
              <span className={`order-badge ${orderStatusClassMap[order.orderStatus] || "order-status-pending"}`}>
                {order.orderStatus}
              </span>
              <span className={`order-badge ${paymentStatusClassMap[order.paymentStatus] || "payment-pending"}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <div className="order-header-actions">
            <button type="button" className="order-back-btn" onClick={() => navigate("/user/orders")}>
              <ArrowLeftIcon />
              <span>Back to Orders</span>
            </button>
            <span className="order-tracking-badge">
              Tracking: <strong>{order.trackingId}</strong>
            </span>
          </div>
        </div>

        {/* Stepper progress */}
        <div className="order-stepper-container">
          <div className="order-stepper-progress-bar">
            <div 
              className={`order-stepper-progress-fill ${["Cancelled", "Returned", "Refunded"].includes(order.orderStatus) ? "special-status" : ""}`}
              style={{ width: `${["Cancelled", "Returned", "Refunded"].includes(order.orderStatus) ? 100 : (currentStepIndex / (progressSteps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="order-stepper-steps">
            {progressSteps.map((step, idx) => {
              const isCompleted = currentStepIndex >= idx;
              const isActive = currentStepIndex === idx;
              return (
                <div 
                  key={step} 
                  className={`order-stepper-step 
                    ${isCompleted ? "completed" : ""} 
                    ${isActive ? "active" : ""} 
                    ${["Cancelled", "Returned", "Refunded"].includes(order.orderStatus) ? "disabled" : ""}`}
                >
                  <div className="order-step-dot">
                    {isCompleted ? "✓" : idx + 1}
                  </div>
                  <span className="order-step-label">{step}</span>
                </div>
              );
            })}
          </div>

          {["Cancelled", "Returned", "Refunded"].includes(order.orderStatus) && (
            <div className="order-special-status-banner">
              ⚠️ This order has been <strong>{order.orderStatus}</strong>.
            </div>
          )}
        </div>
      </div>

      {/* 2. Tabs Navigation */}
      <div className="order-tabs-nav glass-card">
        <button 
          type="button" 
          className={`order-tab-btn ${activeTab === "items" ? "active" : ""}`}
          onClick={() => setActiveTab("items")}
        >
          <BoxIcon />
          <span>Order Items & Timeline</span>
        </button>
        <button 
          type="button" 
          className={`order-tab-btn ${activeTab === "customer" ? "active" : ""}`}
          onClick={() => setActiveTab("customer")}
        >
          <UserIcon />
          <span>Customer & Delivery</span>
        </button>
        <button 
          type="button" 
          className={`order-tab-btn ${activeTab === "payment" ? "active" : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          <PaymentIcon />
          <span>Payment & Cost Breakdown</span>
        </button>
      </div>

      {/* 3. Tabs Content */}
      <div className="order-tabs-content">
        
        {/* TAB 1: Items & Timeline */}
        {activeTab === "items" && (
          <div className="tab-grid-layout fade-in">
            <div className="tab-left-content">
              {/* Product list */}
              <div className="details-subcard glass-card">
                <h3 className="details-subcard-title">Items in Order</h3>
                <div className="products-table-wrapper">
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Product Details</th>
                        <th>Category</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-right">Unit Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="product-info-cell">
                            <div className="product-image-placeholder">
                              <BoxIcon />
                            </div>
                            <div>
                              <p className="product-cell-name">{order.productName}</p>
                              <p className="product-cell-meta">ID: {order.id}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="product-category-tag">{order.productCategory}</span>
                        </td>
                        <td className="text-center font-bold">{order.quantity}</td>
                        <td className="text-right">{formatMoney(order.amount / order.quantity)}</td>
                        <td className="text-right font-bold text-highlight">{formatMoney(order.amount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Notes */}
              {order.notes && (
                <div className="details-subcard glass-card notes-card">
                  <h3 className="details-subcard-title">Order Notes / Instructions</h3>
                  <div className="notes-content-box">
                    <p>{order.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="tab-right-content">
              {/* Vertical Timeline */}
              <div className="details-subcard glass-card timeline-card">
                <h3 className="details-subcard-title">Order Activity Timeline</h3>
                <div className="activity-timeline-vertical">
                  
                  <div className="timeline-item active">
                    <div className="timeline-dot" />
                    <div className="timeline-info">
                      <span className="timeline-time">{order.orderDate}</span>
                      <h4 className="timeline-title">Order Placed</h4>
                      <p className="timeline-desc">Order was successfully placed by customer and confirmed.</p>
                    </div>
                  </div>

                  <div className={`timeline-item ${order.paymentStatus === "Paid" ? "active" : ""}`}>
                    <div className="timeline-dot" />
                    <div className="timeline-info">
                      <span className="timeline-time">{order.orderDate}</span>
                      <h4 className="timeline-title">Payment Cleared</h4>
                      <p className="timeline-desc">
                        Payment of {formatMoney(order.amount)} cleared via {order.paymentMethod}.
                      </p>
                    </div>
                  </div>

                  {currentStepIndex >= 1 && (
                    <div className={`timeline-item ${currentStepIndex >= 1 ? "active" : ""}`}>
                      <div className="timeline-dot" />
                      <div className="timeline-info">
                        <span className="timeline-time">{addDays(order.orderDate, 1)}</span>
                        <h4 className="timeline-title">Processing Order</h4>
                        <p className="timeline-desc">Order package prepared and packed at the fulfillment center.</p>
                      </div>
                    </div>
                  )}

                  {currentStepIndex >= 2 && (
                    <div className={`timeline-item ${currentStepIndex >= 2 ? "active" : ""}`}>
                      <div className="timeline-dot" />
                      <div className="timeline-info">
                        <span className="timeline-time">{addDays(order.orderDate, 2)}</span>
                        <h4 className="timeline-title">Shipped & Dispatched</h4>
                        <p className="timeline-desc">
                          In transit with {order.shippingMethod}. Carrier Tracking: {order.trackingId}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStepIndex >= 3 && (
                    <div className={`timeline-item ${currentStepIndex >= 3 ? "active" : ""}`}>
                      <div className="timeline-dot" />
                      <div className="timeline-info">
                        <span className="timeline-time">{order.deliveryDate}</span>
                        <h4 className="timeline-title">Out for Delivery</h4>
                        <p className="timeline-desc">Package is out for local delivery with the courier agent.</p>
                      </div>
                    </div>
                  )}

                  {currentStepIndex >= 4 && (
                    <div className="timeline-item active completed">
                      <div className="timeline-dot" />
                      <div className="timeline-info">
                        <span className="timeline-time">{order.deliveryDate}</span>
                        <h4 className="timeline-title">Delivered</h4>
                        <p className="timeline-desc">Package successfully signed and delivered to destination.</p>
                      </div>
                    </div>
                  )}

                  {["Cancelled", "Returned", "Refunded"].includes(order.orderStatus) && (
                    <div className="timeline-item special">
                      <div className="timeline-dot warning" />
                      <div className="timeline-info">
                        <span className="timeline-time">{order.deliveryDate}</span>
                        <h4 className="timeline-title">{order.orderStatus}</h4>
                        <p className="timeline-desc">{order.notes || "Order action completed."}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Customer & Delivery */}
        {activeTab === "customer" && (
          <div className="tab-grid-layout-2 fade-in">
            {/* Customer profile card */}
            <div className="details-subcard glass-card customer-profile-card">
              <div className="customer-avatar-badge">{userInitials}</div>
              <div className="customer-profile-info">
                <span className="profile-badge-role">Customer</span>
                <h3 className="customer-name">{order.customerName}</h3>
                
                <div className="customer-contact-list">
                  <div className="customer-contact-item">
                    <MailIcon />
                    <a href={`mailto:${order.customerEmail}`} className="contact-link">{order.customerEmail}</a>
                  </div>
                  <div className="customer-contact-item">
                    <PhoneIcon />
                    <a href={`tel:${order.customerPhone}`} className="contact-link">{order.customerPhone}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery address details */}
            <div className="details-subcard glass-card address-card-layout">
              <h3 className="details-subcard-title">
                <MapPinIcon />
                <span>Shipping Address</span>
              </h3>
              <div className="address-content-block">
                <p className="address-recipient-name">{order.customerName}</p>
                <p className="address-detail-text">{order.shippingAddress}</p>
              </div>

              <hr className="address-sep" />

              <div className="shipping-method-overview">
                <div>
                  <span className="method-label">Shipping Method</span>
                  <p className="method-val">{order.shippingMethod}</p>
                </div>
                <div>
                  <span className="method-label">Est. Delivery Date</span>
                  <p className="method-val">{order.deliveryDate}</p>
                </div>
              </div>
            </div>

            {/* Billing address details */}
            <div className="details-subcard glass-card address-card-layout">
              <h3 className="details-subcard-title">
                <DocumentIcon />
                <span>Billing Address</span>
              </h3>
              <div className="address-content-block">
                <p className="address-recipient-name">{order.customerName}</p>
                <p className="address-detail-text">{order.shippingAddress}</p>
                <p className="billing-same-tag">✓ Same as shipping address</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Payment & Cost */}
        {activeTab === "payment" && (
          <div className="tab-grid-layout fade-in">
            <div className="tab-left-content">
              {/* Payment Info Card */}
              <div className="details-subcard glass-card payment-method-card">
                <h3 className="details-subcard-title">Payment Method & Status</h3>
                
                <div className="payment-layout-row">
                  {/* Virtual card UI */}
                  <div className="virtual-cc-graphic">
                    <div className="cc-chip" />
                    <div className="cc-number">•••• •••• •••• {order.id.split("-")[1] || "9842"}</div>
                    <div className="cc-row-bottom">
                      <span className="cc-holder">{order.customerName}</span>
                      <span className="cc-brand-logo">{order.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="payment-text-details">
                    <div className="payment-detail-field">
                      <span className="payment-label">Status</span>
                      <span className={`order-badge ${paymentStatusClassMap[order.paymentStatus] || "payment-pending"}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="payment-detail-field">
                      <span className="payment-label">Transaction Reference</span>
                      <strong className="text-highlight">TXN-ORD-{order.id}</strong>
                    </div>
                    <div className="payment-detail-field">
                      <span className="payment-label">Gateway Method</span>
                      <strong>{order.paymentMethod}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="payment-actions-card">
                <button 
                  type="button" 
                  className="action-btn-styled primary"
                  onClick={() => downloadInvoicePDF(order)}
                >
                  <DownloadIcon />
                  <span>Download Invoice PDF</span>
                </button>
                <button 
                  type="button" 
                  className="action-btn-styled secondary"
                  onClick={() => setShowInvoiceModal(true)}
                >
                  <DocumentIcon />
                  <span>View Invoice</span>
                </button>
                <button 
                  type="button" 
                  className="action-btn-styled secondary"
                  onClick={() => window.print()}
                >
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            <div className="tab-right-content">
              {/* Cost Breakdown Summary */}
              <div className="details-subcard glass-card invoice-breakdown-card">
                <h3 className="details-subcard-title">Cost Summary</h3>
                
                <div className="invoice-rows-container">
                  <div className="invoice-cost-row">
                    <span className="cost-label">Subtotal</span>
                    <span className="cost-value">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="invoice-cost-row">
                    <span className="cost-label">Estimated Tax (15%)</span>
                    <span className="cost-value">{formatMoney(estimatedTax)}</span>
                  </div>
                  <div className="invoice-cost-row">
                    <span className="cost-label">Shipping / Delivery</span>
                    <span className="cost-value free-shipping">Free Shipping</span>
                  </div>
                  
                  <hr className="cost-divider" />

                  <div className="invoice-cost-row total">
                    <span className="cost-label">Grand Total</span>
                    <span className="cost-value grand-total-amount">{formatMoney(order.amount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 4. Hidden Printable Invoice (Visible only when printing) */}
      <div className="printable-invoice-sheet">
        <div className="invoice-print-header">
          <h1>GLASSDASH INC.</h1>
          <p>Premium Dashboard Solutions  |  support@glassdash.com</p>
        </div>

        <hr className="invoice-print-divider" />

        <div className="invoice-print-meta-grid">
          <div>
            <strong>INVOICE TO:</strong>
            <p>{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.customerPhone}</p>
          </div>
          <div className="text-right">
            <strong>INVOICE DETAILS:</strong>
            <p>Invoice ID: INV-{order.id}</p>
            <p>Date: {order.orderDate}</p>
            <p>Tracking ID: {order.trackingId}</p>
          </div>
        </div>

        <div className="invoice-print-address-grid">
          <div>
            <strong>SHIPPING ADDRESS:</strong>
            <p>{order.shippingAddress}</p>
          </div>
          <div>
            <strong>PAYMENT DETAILS:</strong>
            <p>Method: {order.paymentMethod}</p>
            <p>Status: {order.paymentStatus}</p>
          </div>
        </div>

        <table className="invoice-print-table">
          <thead>
            <tr>
              <th>Description</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Unit Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{order.productName}</strong><br />
                <span>Category: {order.productCategory}</span>
              </td>
              <td className="text-center">{order.quantity}</td>
              <td className="text-right">{formatMoney(order.amount / order.quantity)}</td>
              <td className="text-right">{formatMoney(order.amount)}</td>
            </tr>
          </tbody>
        </table>

        <div className="invoice-print-totals">
          <div className="invoice-print-totals-row">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="invoice-print-totals-row">
            <span>Tax (15%)</span>
            <span>{formatMoney(estimatedTax)}</span>
          </div>
          <div className="invoice-print-totals-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="invoice-print-totals-row total">
            <strong>GRAND TOTAL</strong>
            <strong>{formatMoney(order.amount)}</strong>
          </div>
        </div>

        <div className="invoice-print-footer">
          <p>Thank you for your business!</p>
        </div>
      </div>

      {/* 5. View Invoice Modal (Preview overlay) */}
      {showInvoiceModal && (
        <div className="order-modal-backdrop invoice-preview-backdrop" onClick={() => setShowInvoiceModal(false)}>
          <div className="invoice-paper-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="invoice-modal-header">
              <div className="invoice-brand-section">
                <h2>GLASSDASH INC.</h2>
                <p>Premium Dashboard Solutions</p>
              </div>
              <button className="invoice-modal-close" onClick={() => setShowInvoiceModal(false)}>✕</button>
            </div>

            <hr className="invoice-modal-divider" />

            <div className="invoice-modal-meta-row">
              <div>
                <span className="inv-meta-label">Invoice To:</span>
                <p className="inv-meta-value font-bold">{order.customerName}</p>
                <p className="inv-meta-sub">{order.customerEmail}</p>
                <p className="inv-meta-sub">{order.customerPhone}</p>
              </div>
              <div className="text-right">
                <span className="inv-meta-label">Invoice Details:</span>
                <p className="inv-meta-value">Invoice ID: <strong>INV-{order.id}</strong></p>
                <p className="inv-meta-sub">Date: {order.orderDate}</p>
                <p className="inv-meta-sub">Tracking ID: {order.trackingId}</p>
              </div>
            </div>

            <div className="invoice-modal-address-row">
              <div>
                <span className="inv-meta-label">Shipping Address:</span>
                <p className="inv-meta-subAddress">{order.shippingAddress}</p>
              </div>
              <div>
                <span className="inv-meta-label">Payment Method:</span>
                <p className="inv-meta-value">{order.paymentMethod}</p>
                <p className="inv-meta-sub">Status: <span className="text-highlight font-bold">{order.paymentStatus}</span></p>
              </div>
            </div>

            <div className="invoice-modal-items-table-wrapper">
              <table className="invoice-modal-items-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th className="text-center">Qty</th>
                    <th className="text-right">Unit Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>{order.productName}</strong>
                      <span className="inv-item-desc-category">{order.productCategory}</span>
                    </td>
                    <td className="text-center">{order.quantity}</td>
                    <td className="text-right">{formatMoney(order.amount / order.quantity)}</td>
                    <td className="text-right font-bold">{formatMoney(order.amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="invoice-modal-totals-block">
              <div className="invoice-modal-total-row">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="invoice-modal-total-row">
                <span>Tax (15%)</span>
                <span>{formatMoney(estimatedTax)}</span>
              </div>
              <div className="invoice-modal-total-row">
                <span>Shipping</span>
                <span className="free-shipping">Free</span>
              </div>
              <hr className="invoice-total-divider" />
              <div className="invoice-modal-total-row grand-total">
                <span>Amount Due</span>
                <span className="grand-total-amount">{formatMoney(order.amount)}</span>
              </div>
            </div>

            <div className="invoice-modal-footer">
              <p>Thank you for your business with GlassDash!</p>
              <p className="inv-support-text">For questions, contact support@glassdash.com</p>
            </div>

            <div className="invoice-modal-print-actions">
              <button type="button" className="action-btn-styled primary" onClick={() => downloadInvoicePDF(order)}>
                <DownloadIcon />
                <span>Download PDF</span>
              </button>
              <button type="button" className="action-btn-styled secondary" onClick={() => window.print()}>
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
