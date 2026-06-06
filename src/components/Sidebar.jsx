/*Bhai ise change mat kriyo is code ko chune ki koshish bhi mat kriyo purane wale code se "glassdash" se..*/

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const icons = {
  Dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Analytics: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Products: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Upload: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,16 12,12 8,16"/>
      <line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
  Blog: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Coupon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2 2 2 0 0 0 0 4 2 2 0 0 1 0 4 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4 2 2 0 0 1 0-4 2 2 0 0 0 0-4z"/>
      <path d="M9 9h.01M15 15h.01M15 9l-6 6"/>
    </svg>
  ),
  User: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21a8 8 0 0 0-16 0"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    </svg>
  ),
  Logout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

const productSubLinks = [
  { label: 'Listed Products',   path: '/products' },
  { label: 'Create New Product', path: '/products/create' },
];

const blogSubLinks = [
  { label: 'Listed Blogs',   path: '/blogs' },
  { label: 'Create New Blog', path: '/blogs/create' },
];

const couponSubLinks = [
  { label: 'All Listed Coupons',   path: '/coupons' },
  { label: 'Create New Coupon', path: '/coupons/create' },
];

const userSubLinks = [
  { label: 'List of All Users', path: '/user/list' },
  { label: 'User Profile', path: '/user/profile' },
  { label: 'Orders', path: '/user/orders' },
];

const mainItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Analytics',  path: '/analytics' },
  { label: 'Users',      path: '/users' },
  { label: 'Upload', path: '/upload' },
];

const accountItems = [
  { label: 'Settings', path: '/settings' },
  { label: 'Logout',   path: '/login' },
];

let globalToggle = null;
export function toggleSidebar() {
  if (globalToggle) globalToggle();
}

export default function Sidebar({ isOpen: controlledOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const location = useLocation();
  const isControlled = typeof controlledOpen === 'boolean';
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [productsOpen, setProductsOpen] = useState(
    location.pathname.startsWith('/products')
  );

  const [blogOpen, setBlogOpen] = useState(
    location.pathname.startsWith('/blogs')
  );

  const [couponOpen, setCouponOpen] = useState(
    location.pathname.startsWith('/coupons')
  );
  const [userOpen, setUserOpen] = useState(
    location.pathname.startsWith('/user')
  );

  useEffect(() => {
    globalToggle = () => setInternalOpen(prev => !prev);
    return () => { globalToggle = null; };
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/products')) {
      setProductsOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/blogs')) {
      setBlogOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/coupons')) {
      setCouponOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/user')) {
      setUserOpen(true);
    }
  }, [location.pathname]);

  const closeSidebar = () => {
    if (isControlled) {
      if (typeof onClose === "function") onClose();
      return;
    }
    setInternalOpen(false);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 900) closeSidebar();
  };

  function toggleProducts() {
    setProductsOpen(prev => !prev);
  }

  function toggleBlog() {
    setBlogOpen(prev => !prev);
  }

  function toggleCoupon() {
    setCouponOpen(prev => !prev);
  }

  function toggleUser() {
    setUserOpen(prev => !prev);
  }

  const isProductsActive = location.pathname.startsWith('/products');
  const isBlogActive = location.pathname.startsWith('/blogs');
  const isCouponActive = location.pathname.startsWith('/coupons');
  const isUserActive = location.pathname.startsWith('/user');

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">G.D</div>
          <div>
            <div className="logo-text">Glass Dash</div>
              <div className="logo-sub">Admin Panel</div>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>

          {mainItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              {icons[item.label]}
              {item.label}
              {item.label === 'Analytics' && <span className="nav-badge">New</span>}
            </NavLink>
          ))}

          {/* Products dropdown */}
          <div
            className={`nav-item products-parent ${isProductsActive ? 'active' : ''}`}
            onClick={toggleProducts}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {icons['Products']}
            Products
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                transition: 'transform 0.25s',
                transform: productsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▼
            </span>
          </div>

          {productsOpen && (
            <div className="products-submenu">
              {productSubLinks.map((sub) => (
                <NavLink
                  key={sub.label}
                  to={sub.path}
                  end={sub.path === '/products'}
                  className={({ isActive }) =>
                    `submenu-item ${isActive ? 'submenu-active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Blog dropdown */}
          <div
            className={`nav-item products-parent ${isBlogActive ? 'active' : ''}`}
            onClick={toggleBlog}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {icons['Blog']}
            Blog
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                transition: 'transform 0.25s',
                transform: blogOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▼
            </span>
          </div>

          {blogOpen && (
            <div className="products-submenu">
              {blogSubLinks.map((sub) => (
                <NavLink
                  key={sub.label}
                  to={sub.path}
                  end={sub.path === '/blogs'}
                  className={({ isActive }) =>
                    `submenu-item ${isActive ? 'submenu-active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          )}

          <div
            className={`nav-item products-parent ${isCouponActive ? 'active' : ''}`}
            onClick={toggleCoupon}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {icons['Coupon']}
            Coupon
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                transition: 'transform 0.25s',
                transform: couponOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▼
            </span>
          </div>

          {couponOpen && (
            <div className="products-submenu">
              {couponSubLinks.map((sub) => (
                <NavLink
                  key={sub.label}
                  to={sub.path}
                  end={sub.path === '/coupons'}
                  className={({ isActive }) =>
                    `submenu-item ${isActive ? 'submenu-active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          )}

          <div
            className={`nav-item products-parent ${isUserActive ? 'active' : ''}`}
            onClick={toggleUser}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {icons['User']}
            User
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                transition: 'transform 0.25s',
                transform: userOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▼
            </span>
          </div>

          {userOpen && (
            <div className="products-submenu">
              {userSubLinks.map((sub) => (
                <NavLink
                  key={sub.label}
                  to={sub.path}
                  end
                  className={({ isActive }) =>
                    `submenu-item ${isActive ? 'submenu-active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          )}

          <div className="nav-section-label">Account</div>
          {accountItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end
              className={({ isActive }) =>
                `nav-item ${item.label === 'Logout' ? '' : isActive ? 'active' : ''}`
              }
              onClick={handleNavClick}
            >
              {icons[item.label]}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">K.C</div>
            <div>
              <div className="sidebar-user-name">Karan Chandra Kothari</div>
              <div className="sidebar-user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
