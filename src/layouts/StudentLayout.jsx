import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import OnboardingModal from '../components/OnboardingModal';

export default function StudentLayout() {
  return (
    <div className="app-container">
      <OnboardingModal />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
