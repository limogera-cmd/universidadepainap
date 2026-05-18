import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import OnboardingModal from '../components/OnboardingModal';
import { Bell, Moon, Sun, User } from 'lucide-react';

export default function StudentLayout() {
  const [theme, setTheme] = useState('light');
  const [showNotifications, setShowNotifications] = useState(false);
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('painap_xp')) || 350);
  const [badges, setBadges] = useState(() => parseInt(localStorage.getItem('painap_badges_count')) || 1);
  const [studentProfile, setStudentProfile] = useState(() => localStorage.getItem('painap_student_profile') || '');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setStudentProfile(localStorage.getItem('painap_student_profile') || '');
      setXp(parseInt(localStorage.getItem('painap_xp')) || 350);
      setBadges(parseInt(localStorage.getItem('painap_badges_count')) || 1);
    };
    window.addEventListener('painap_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);
    return () => {
      window.removeEventListener('painap_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

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
          padding: '1.2rem 2rem', 
          borderBottom: '1px solid var(--border-color)',
          gap: '1.2rem',
          background: 'var(--bg-secondary)',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>

          {/* Gamificação Brutalista */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginRight: 'auto' }}>
            <div style={{ 
              border: '1px solid var(--border-color)', 
              padding: '0.4rem 0.8rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.02)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>XP:</span>
              <strong style={{ color: 'white' }}>{xp}</strong>
            </div>

            <div style={{ 
              border: '1px solid var(--border-color)', 
              padding: '0.4rem 0.8rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.02)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ color: '#CCBCA1', fontWeight: 'bold' }}>MEDALHAS:</span>
              <strong style={{ color: 'white' }}>{badges}</strong>
            </div>
            
            {studentProfile && (
              <span style={{ 
                fontSize: '0.65rem', 
                letterSpacing: '1px', 
                textTransform: 'uppercase', 
                background: studentProfile === 'colaborador' ? 'rgba(225,70,28,0.1)' : 'rgba(204,188,161,0.1)', 
                color: studentProfile === 'colaborador' ? 'var(--accent)' : 'var(--accent)', 
                border: `1px solid ${studentProfile === 'colaborador' ? 'var(--accent)' : 'var(--accent)'}`,
                padding: '0.3rem 0.6rem',
                fontWeight: 'bold'
              }}>
                {studentProfile === 'colaborador' ? 'Interno' : 'Arquiteto'}
              </span>
            )}
          </div>
          
          <button onClick={toggleTheme} className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)} 
              className="btn-icon" 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', position: 'relative' }}
            >
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '0px', right: '0px', background: 'var(--accent)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
            </button>
            
            {showNotifications && (
              <div className="glass-panel fade-in" style={{ 
                position: 'absolute', top: '100%', right: '0', width: '320px', 
                marginTop: '1rem', padding: '1.2rem', zIndex: 100, border: '2px solid var(--accent)',
                borderRadius: '0', background: 'var(--bg-secondary)', textAlign: 'left'
              }}>
                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'white', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', fontFamily: 'Mosvita, serif', margin: 0 }}>Sino Inteligente</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.8rem' }}>
                  {studentProfile === 'colaborador' ? (
                    <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '0.5rem' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>📅 PRAZO CRÍTICO</span>
                      <p style={{ margin: '0.2rem 0 0 0', color: 'white' }}>O Checklist de Implantação vence em 3 dias!</p>
                    </div>
                  ) : (
                    <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '0.5rem' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>🚀 RECOMENDAÇÃO</span>
                      <p style={{ margin: '0.2rem 0 0 0', color: 'white' }}>Assista ao case "Fast Food do Futuro" para insights de ROI.</p>
                    </div>
                  )}
                  
                  <div style={{ borderLeft: '2px solid #CCBCA1', paddingLeft: '0.5rem' }}>
                    <span style={{ color: '#CCBCA1', fontWeight: 'bold' }}>🏆 GAMIFICAÇÃO</span>
                    <p style={{ margin: '0.2rem 0 0 0', color: 'white' }}>Você conquistou a medalha: <strong>Pioneiro do PDV</strong>!</p>
                  </div>

                  <div style={{ borderLeft: '2px solid #e1461c', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>📢 MENTORIA 2:1</span>
                    <p style={{ margin: '0.2rem 0 0 0', color: 'white' }}>Sessão de mentoria destravada. Garanta seu agendamento VIP!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <User size={18} color="var(--bg-primary)" />
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
