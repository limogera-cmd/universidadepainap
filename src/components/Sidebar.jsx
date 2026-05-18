import React from 'react';
import { Home, PlayCircle, Briefcase, Layers, Users, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/aluno/dashboard', icon: Home, label: 'Visão Geral' },
    { path: '/aluno/curso', icon: PlayCircle, label: 'Cursos' },
    { path: '/aluno/cases', icon: Briefcase, label: 'Cases & Templates' },
    { path: '/aluno/toolbox', icon: Layers, label: 'Toolbox PAINAP' },
    { path: '/aluno/community', icon: Users, label: 'Networking' }
  ];

  return (
    <aside className="sidebar">
      <div className="brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.4rem', padding: '1rem 0' }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginLeft: '2px' }}>UNIVERSIDADE</span>
        <img src="/img/LOGO SITE 4.png" alt="PAINAP Logo" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
      </div>
      
      <nav className="nav-menu">
        {menuItems.map(item => (
          <button 
            key={item.path}
            className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} strokeWidth={location.pathname.startsWith(item.path) ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">AL</div>
          <div className="user-info">
            <span className="user-name">Aluno PAINAP</span>
            <span className="user-plan">Plano Anual</span>
          </div>
        </div>
        <button className="nav-item logout" onClick={() => navigate('/login')}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
