import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/style.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// pages
import DashboardCards from './components/DashboardCards';
import ChartSection from './components/ChartSection';
import ActivitySection from './components/ActivitySection';
import Transactions from './components/Transactions';
import Calendar from './components/Calendar';
import ProgressSection from './components/ProgressSection';
import TrafficSection from './components/TrafficSection';
import Analytics from './components/pages/Analytics';
import Users from './components/pages/Users';
import Settings from './components/pages/Settings';
import ProductCreate from './components/pages/ProductCreate';
import ProductList from './components/pages/ProductList';
import Coupon from './components/pages/Coupon';
import User from './components/pages/User';
import UserList from './components/pages/UserList';
import Profile from './components/pages/Profile';
import Order from './components/pages/Order';
import BlogList from './components/pages/BlogList';
import BlogDetail from './components/pages/BlogDetail';
import BlogCreate from './components/pages/BlogCreate';
import LoginPage from './components/pages/LoginPage';

// Agentation (dev tool)
import { Agentation } from "agentation";

const SIDEBAR_BREAKPOINT = 900;

function DashboardHome() {
  return (
    <div className="content-wrapper">
      <DashboardCards />

      <div className="chart-activity-row">
        <ChartSection />
        <ActivitySection />
      </div>

      <Transactions />

      <div className="bottom-row">
        <Calendar />
        <TrafficSection />
        <ProgressSection />
      </div>
    </div>
  );
}

function AppShell({ isMobile, sidebarOpen, openSidebar, closeSidebar }) {
  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <Navbar onMenuClick={openSidebar} />
        <main className="main-area">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/coupons" element={<Coupon />} />
            <Route path="/coupons/create" element={<Coupon />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/list" element={<UserList />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/:userId" element={<Profile />} />
            <Route path="/user/orders" element={<Order />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/create" element={<BlogCreate />} />
          </Routes>
        </main>
        <Footer />
        {import.meta.env.DEV && (
          <Agentation
            endpoint="http://localhost:4747"
            onSessionCreated={(sessionId) => {
              console.log("Agentation Session Started:", sessionId);
            }}
          />
        )}
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= SIDEBAR_BREAKPOINT : false
  );
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth > SIDEBAR_BREAKPOINT : true
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${SIDEBAR_BREAKPOINT}px)`);

    const handleViewportChange = (event) => {
      const mobile = event.matches;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    setIsMobile(mediaQuery.matches);
    setSidebarOpen(!mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleViewportChange);
      return () => mediaQuery.removeEventListener('change', handleViewportChange);
    }

    mediaQuery.addListener(handleViewportChange);
    return () => mediaQuery.removeListener(handleViewportChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sidebar-drawer-open', isMobile && sidebarOpen);
    return () => document.body.classList.remove('sidebar-drawer-open');
  }, [isMobile, sidebarOpen]);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  if (location.pathname === '/login') {
    return <LoginPage />;
  }

  return <AppShell isMobile={isMobile} sidebarOpen={sidebarOpen} openSidebar={openSidebar} closeSidebar={closeSidebar} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
