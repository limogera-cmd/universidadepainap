import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Video, Users, Settings, LogOut } from 'lucide-react';
import './AdminLayout.css';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Visão Geral' },
    { path: '/admin/cursos', icon: Video, label: 'Gerir Cursos' },
    { path: '/admin/alunos', icon: Users, label: 'Gerir Alunos' },
    { path: '/admin/config', icon: Settings, label: 'Configurações' }
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.4rem', padding: '1rem 0' }}>
          <img src="/img/logo site (3).png" alt="PAINAP Logo" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
          <span className="admin-subtitle" style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--accent)', marginLeft: '1px' }}>ADMINISTRADOR</span>
        </div>
        
        <nav className="admin-nav">
          {menuItems.map(item => (
            <button 
              key={item.path}
              className={`admin-nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-footer">
          <button className="admin-nav-item logout" onClick={() => navigate('/login')}>
            <LogOut size={18} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
