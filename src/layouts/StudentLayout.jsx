import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import OnboardingModal from '../components/OnboardingModal';
import { Bell, Moon, Sun, User } from 'lucide-react';

export default function StudentLayout() {
  const [theme, setTheme] = useState('dark');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="app-container">
      <OnboardingModal />
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
          padding: '1.5rem 2rem', 
          borderBottom: '1px solid var(--border-color)',
          gap: '1.5rem'
        }}>
          
          <button onClick={toggleTheme} className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)} 
              className="btn-icon" 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', position: 'relative' }}
            >
              <Bell size={22} />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'red', width: '10px', height: '10px', borderRadius: '50%' }}></span>
            </button>
            
            {showNotifications && (
              <div className="glass-panel fade-in" style={{ 
                position: 'absolute', top: '100%', right: '0', width: '300px', 
                marginTop: '1rem', padding: '1rem', zIndex: 100, border: '1px solid var(--accent)'
              }}>
                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Notificações</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <p style={{ marginBottom: '0.5rem' }}>🎯 <strong>Novo Módulo Liberado:</strong> Precificação High-Ticket.</p>
                  <p>⭐ <strong>Conquista:</strong> Você completou 50% do curso!</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <User size={20} color="var(--bg-primary)" />
            </div>
          </div>

        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
