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
      <div className="brand">
        <h2>UNIVERSIDADE</h2>
        <span className="brand-subtitle">PAINAP</span>
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
