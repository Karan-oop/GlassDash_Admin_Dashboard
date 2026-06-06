import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Coupon.css";

const initialCoupons = [
  {
    id: 1,
    code: "KT^15/OL*",
    name: "Summer Sale",
    discountType: "percentage",
    discountValue: 20,
    status: "Active",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    usageLimit: 500,
    used: 124,
  },
  {
    id: 2,
    code: "GL#29/DS!",
    name: "Welcome Gift",
    discountType: "fixed",
    discountValue: 15,
    status: "Scheduled",
    startDate: "2026-06-10",
    endDate: "2026-07-10",
    usageLimit: 200,
    used: 18,
  },
  {
    id: 3,
    code: "5@9m#w&nU",
    name: "Mid Midnight Owl",
    discountType: "percentage",
    discountValue: 60,
    status: "Active",
    startDate: "2026-06-15",
    endDate: "2026-06-10",
    usageLimit: 10,
    used: 0,
  },
  {
    id: 4,
    code: "DS%44/NE@",
    name: "Flash Weekend",
    discountType: "percentage",
    discountValue: 10,
    status: "Expired",
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    usageLimit: 100,
    used: 100,
  },
];

const discountTypes = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed" },
];

const statusClassMap = {
  Active: "coupon-status-active",
  Scheduled: "coupon-status-scheduled",
  Expired: "coupon-status-expired",
};

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getCouponStatus(coupon) {
  const today = getTodayKey();
  if (coupon.startDate && coupon.startDate > today) return "Scheduled";
  if (coupon.endDate && coupon.endDate < today) return "Expired";
  return "Active";
}

function buildRandomCode() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^*/!@#%&(){}[]/<>";
  let code = "";
  for (let i = 0; i < 9; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function formatDiscount(coupon) {
  return coupon.discountType === "percentage"
    ? `${coupon.discountValue}%`
    : `$${coupon.discountValue}`;
}

function CouponBadge({ status }) {
  return (
    <span className={`coupon-status ${statusClassMap[status] || "coupon-status-scheduled"}`}>
      {status}
    </span>
  );
}

const emptyForm = {
  code: "",
  name: "",
  discountType: "percentage",
  discountValue: "",
  startDate: "",
  endDate: "",
  usageLimit: "",
};

export default function Coupon() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreateRoute = location.pathname.endsWith("/create");

  const [activeTab, setActiveTab] = useState(isCreateRoute ? "create" : "list");
  const [toast, setToast] = useState("");
  const [coupons, setCoupons] = useState(initialCoupons);
  const [editingId, setEditingId] = useState(null); // ← track which coupon is being edited
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    setActiveTab(isCreateRoute ? "create" : "list");
  }, [isCreateRoute, location.pathname]);

  const stats = useMemo(() => {
    const active = coupons.filter((c) => getCouponStatus(c) === "Active").length;
    const scheduled = coupons.filter((c) => getCouponStatus(c) === "Scheduled").length;
    const expired = coupons.filter((c) => getCouponStatus(c) === "Expired").length;
    return [
      { label: "Total Coupons", value: coupons.length },
      { label: "Active", value: active },
      { label: "Scheduled", value: scheduled },
      { label: "Expired", value: expired },
    ];
  }, [coupons]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__couponToastTimer);
    window.__couponToastTimer = window.setTimeout(() => setToast(""), 2200);
  };

  const goToTab = (tab) => {
    setActiveTab(tab);
    navigate(tab === "create" ? "/coupons/create" : "/coupons");
  };

  // ── NEW: open edit mode with prefilled form ──────────────────────────────
  const handleEdit = (coupon) => {
    setEditingId(coupon.id);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      discountType: coupon.discountType,
      discountValue: String(coupon.discountValue),
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      usageLimit: coupon.usageLimit ? String(coupon.usageLimit) : "",
    });
    goToTab("create");
  };

  // ── NEW: cancel edit — reset form and editingId ──────────────────────────
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleGenerateCode = () => {
    setFormData((prev) => ({ ...prev, code: buildRandomCode() }));
    showToast("Coupon code generated");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.code.trim() ||
      !formData.name.trim() ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.endDate
    ) {
      showToast("Please fill all required fields");
      return;
    }

    if (editingId !== null) {
      // ── UPDATE existing coupon ──────────────────────────────────────────
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                code: formData.code.trim(),
                name: formData.name.trim(),
                discountType: formData.discountType,
                discountValue: Number(formData.discountValue),
                startDate: formData.startDate,
                endDate: formData.endDate,
                usageLimit: Number(formData.usageLimit) || 0,
                status: getCouponStatus({
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                }),
              }
            : c
        )
      );
      setEditingId(null);
      showToast("Coupon updated successfully");
    } else {
      // ── CREATE new coupon ───────────────────────────────────────────────
      const newCoupon = {
        id: Date.now(),
        code: formData.code.trim(),
        name: formData.name.trim(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        status: getCouponStatus({
          startDate: formData.startDate,
          endDate: formData.endDate,
        }),
        startDate: formData.startDate,
        endDate: formData.endDate,
        usageLimit: Number(formData.usageLimit) || 0,
        used: 0,
      };
      setCoupons((prev) => [newCoupon, ...prev]);
      showToast("Coupon created successfully");
    }

    setFormData(emptyForm);
    setActiveTab("list");
    navigate("/coupons");
  };

  const handleDelete = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast("Coupon deleted");
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast("Coupon code copied");
    } catch {
      showToast("Copy failed");
    }
  };

  return (
    <div className="pg-page coupon-page">
      <div className="pg-breadcrumb">
        <span className="pg-bc-link">Dashboard</span>
        <span className="pg-bc-sep"> / </span>
        <span className="pg-bc-current">Coupons</span>
      </div>

      <div className="coupon-header">
        <div>
          <h1 className="pg-title">Coupons</h1>
          <p className="coupon-subtitle">Manage coupon list and create new discounts from one place.</p>
        </div>

        <div className="coupon-tabs">
          <button
            type="button"
            className={`coupon-tab ${activeTab === "list" ? "active" : ""}`}
            onClick={() => {
              handleCancelEdit();
              goToTab("list");
            }}
          >
            List
          </button>
          <button
            type="button"
            className={`coupon-tab ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              handleCancelEdit();
              goToTab("create");
            }}
          >
            {editingId !== null ? "Edit" : "Create"}
          </button>
        </div>
      </div>

      <div className="coupon-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card coupon-stat-card">
            <div className="coupon-stat-label">{stat.label}</div>
            <div className="coupon-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {activeTab === "list" ? (
        <section className="glass-card coupon-list-card">
          <div className="coupon-section-title-row">
            <div>
              <div className="section-title">Coupon List</div>
              <div className="section-sub">View all available coupons and their usage.</div>
            </div>
            <button type="button" className="pg-btn-primary" onClick={() => goToTab("create")}>
              + Create Coupon
            </button>
          </div>

          <div className="coupon-table-scroll">
            <table className="coupon-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Discount</th>
                  <th>Status</th>
                  <th>Validity</th>
                  <th>Usage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>
                      <div className="coupon-code-cell">
                        <span className="coupon-code-pill">{coupon.code}</span>
                        <button
                          type="button"
                          className="coupon-copy-btn"
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          Copy
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="coupon-name-cell">
                        <div className="coupon-name">{coupon.name}</div>
                        <div className="coupon-muted">Discount code</div>
                      </div>
                    </td>
                    <td>{formatDiscount(coupon)}</td>
                    <td>
                      <CouponBadge status={getCouponStatus(coupon)} />
                    </td>
                    <td>
                      <div className="coupon-muted">
                        {coupon.startDate} <span className="coupon-sep">→</span> {coupon.endDate}
                      </div>
                    </td>
                    <td>
                      <div className="coupon-muted">
                        {coupon.used}/{coupon.usageLimit || "∞"}
                      </div>
                    </td>
                    <td>
                      <div className="coupon-actions">
                        {/* ── FIXED Edit button ── */}
                        <button
                          type="button"
                          className="coupon-mini-btn"
                          onClick={() => handleEdit(coupon)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="coupon-mini-btn danger"
                          onClick={() => handleDelete(coupon.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {coupons.length === 0 && (
                  <tr>
                    <td colSpan="7" className="coupon-empty">
                      No coupons found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="glass-card coupon-create-card">
          <div className="coupon-section-title-row">
            <div>
              {/* ── dynamic title based on mode ── */}
              <div className="section-title">{editingId !== null ? "Edit Coupon" : "Add Coupon"}</div>
              <div className="section-sub">
                {editingId !== null
                  ? "Update the coupon details below."
                  : "Create a new coupon code with percentage or fixed discount."}
              </div>
            </div>
            <button type="button" className="pg-btn-primary" onClick={() => { handleCancelEdit(); goToTab("list"); }}>
              View List
            </button>
          </div>

          <form className="coupon-form" onSubmit={handleSubmit}>
            <div className="coupon-grid-2">
              <div className="pg-form-group">
                <label className="pg-label">Coupon Code</label>
                <div className="coupon-code-input-row">
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="pg-input coupon-input"
                    placeholder="Generate or type code"
                  />
                  <button type="button" className="coupon-generate-btn" onClick={handleGenerateCode}>
                    Generate Code
                  </button>
                </div>
              </div>

              <div className="pg-form-group">
                <label className="pg-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pg-input coupon-input"
                  placeholder="Summer Sale"
                />
              </div>
            </div>

            <div className="coupon-grid-2">
              <div className="pg-form-group">
                <label className="pg-label">Discount Type</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="pg-input pg-select coupon-input"
                >
                  {discountTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pg-form-group">
                <label className="pg-label">
                  {formData.discountType === "percentage"
                    ? "Discounted Percentage (1-100%)"
                    : "Discounted Price ($)"}
                </label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  className="pg-input coupon-input"
                  placeholder={formData.discountType === "percentage" ? "20" : "15"}
                />
              </div>
            </div>

            <div className="coupon-grid-3">
              <div className="pg-form-group">
                <label className="pg-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="pg-input coupon-input"
                />
              </div>

              <div className="pg-form-group">
                <label className="pg-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="pg-input coupon-input"
                />
              </div>

              <div className="pg-form-group">
                <label className="pg-label">Usage Limit</label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  className="pg-input coupon-input"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="coupon-form-note">
              <strong>Tip:</strong> Generated codes use 9 mixed characters, including symbols like{" "}
              <code>^</code>, <code>*</code>, and <code>/</code>.
            </div>

            <div className="coupon-form-actions">
              <button
                type="button"
                className="coupon-secondary-btn"
                onClick={() => {
                  if (editingId !== null) {
                    handleCancelEdit();
                    goToTab("list");
                  } else {
                    setFormData(emptyForm);
                  }
                }}
              >
                {editingId !== null ? "Cancel" : "Reset"}
              </button>
              <button type="submit" className="coupon-primary-btn">
                {editingId !== null ? "Update Coupon" : "Create Coupon"}
              </button>
            </div>
          </form>
        </section>
      )}

      {toast && <div className="coupon-toast">{toast}</div>}
    </div>
  );
}