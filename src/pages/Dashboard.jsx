import React from 'react';
import { PlayCircle, Clock, Award, ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard fade-in">
      <header className="hero-banner fade-in">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-tag">BEM-VINDO AO CLUBE</span>
            <h1>Universidade PAINAP</h1>
            <p>O seu espaço de evolução em Arquitetura de Consumo e Alta Renda.</p>
            <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/aluno/curso')}>
              <PlayCircle size={18} /> Continuar Jornada
            </button>
          </div>
          <div className="stats-container">
            <div className="stat-card glass-panel">
              <Clock size={24} className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">12h 45m</span>
                <span className="stat-label">Tempo de Estudo</span>
              </div>
            </div>
            <div className="stat-card glass-panel" style={{ border: '1px solid var(--accent)' }}>
              <Award size={24} className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value" style={{ color: 'var(--accent)' }}>Ouro</span>
                <span className="stat-label">Nível Atual</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="continue-watching glass-panel">
        <div className="cw-image">
          <div className="image-overlay">
            <PlayCircle size={48} className="play-icon-large" />
          </div>
        </div>
        <div className="cw-content">
          <span className="cw-tag">CONTINUAR ASSISTINDO</span>
          <h2>Módulo 3: Psicologia das Cores no Varejo</h2>
          <p>Curso Completo de Arquitetura Comercial</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <span className="progress-text">65% concluído</span>
          <button className="btn-primary" onClick={() => navigate('/aluno/curso')}>
            Continuar Aula <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h3>Novos Cases & Templates</h3>
          <button className="btn-text" onClick={() => navigate('/aluno/cases')}>Ver todos</button>
        </div>
        <div className="cards-grid">
          <div className="case-card glass-panel" style={{ opacity: 0.7, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '50%', zIndex: 10 }}>
              <Lock size={18} color="var(--accent)" />
            </div>
            <div className="card-image-placeholder" style={{ backgroundImage: 'url(/img/thumb_1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="card-content">
              <span className="card-category">Mentoria Premium</span>
              <h4>Sessão 1-on-1 com Especialista</h4>
              <p>Traga o seu projeto para uma análise crítica de layout e iluminação.</p>
              <button className="btn-secondary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>Fazer Upgrade</button>
            </div>
          </div>
          
          <div className="case-card glass-panel" onClick={() => navigate('/aluno/curso')} style={{ cursor: 'pointer' }}>
            <div className="card-image-placeholder" style={{ backgroundImage: 'url(/img/thumb_2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="card-content">
              <span className="card-category">Módulo 1</span>
              <h4>A Psicologia do Espaço</h4>
              <p>Entenda o comportamento do consumidor dentro do PDV.</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          <div className="case-card glass-panel" onClick={() => navigate('/aluno/cases')} style={{ cursor: 'pointer' }}>
            <div className="card-image-placeholder" style={{ backgroundImage: 'url(/img/thumb_3.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="card-content">
              <span className="card-category">Estudo de Caso</span>
              <h4>Fast Food do Futuro</h4>
              <p>Layout operacional de alta performance e experiência do cliente.</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
