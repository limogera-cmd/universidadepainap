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
        <div className="admin-brand">
          <h2 style={{fontSize: '1.2rem'}}>UNIVERSIDADE</h2>
          <span className="admin-subtitle">PAINAP ADMIN</span>
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
