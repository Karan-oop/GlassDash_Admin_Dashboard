import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/style.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Dashboard page (existing components assembled)
import DashboardCards from './components/DashboardCards';
import ChartSection from './components/ChartSection';
import ActivitySection from './components/ActivitySection';
import Transactions from './components/Transactions';
import Calendar from './components/Calendar';
import ProgressSection from './components/ProgressSection';
import TrafficSection from './components/TrafficSection';

// New pages
import Analytics from './components/pages/Analytics';
import Users from './components/pages/Users';
import Settings from './components/pages/Settings';

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

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Navbar />
          <main className="main-area">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
