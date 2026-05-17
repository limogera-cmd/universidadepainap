import React from 'react';
import { PlayCircle, Clock, Award, ArrowRight, Lock, CheckCircle, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  // Load dynamic lessons from localStorage or use defaults
  const [lessonsData] = React.useState(() => {
    const saved = localStorage.getItem('painap_lessons');
    if (saved) return JSON.parse(saved);
    const defaults = [
      { id: 1, module: 'Fundamentos da Arquitetura Comercial', title: 'Introdução ao Método PAINAP', duration: '15:20', completed: true, locked: false, description: 'Bases e fundamentos do método de arquitetura comercial que gera faturamento.' },
      { id: 2, module: 'Fundamentos da Arquitetura Comercial', title: 'Zoneamento Comercial: O Primeiro Passo', duration: '22:45', completed: false, locked: false, description: 'Como planejar a planta baixa e o fluxo de circulação ideal.' },
      { id: 3, module: 'Iluminação e Psicologia', title: 'Iluminação Cênica para Produtos de Luxo', duration: '18:10', completed: false, locked: false, description: 'Luz e sombra direcionados para destacar e valorizar produtos de alto ticket.' },
      { id: 4, module: 'Estudos Avançados', title: 'Comunicação Visual e Fachadas Vendedoras', duration: '25:30', completed: false, locked: false, description: 'Estratégias de atração passiva de clientes através da fachada.' }
    ];
    return defaults;
  });

  const totalLessons = lessonsData.length;
  const completedLessons = lessonsData.filter(l => l.completed).length;

  const totalMinutes = lessonsData.reduce((acc, l) => {
    if (l.completed) {
      const parts = l.duration.split(':');
      const mins = parseInt(parts[0]) || 15;
      return acc + mins;
    }
    return acc;
  }, 0) + (completedLessons > 0 ? 12 : 5);

  const hrsStr = totalMinutes >= 60 
    ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` 
    : `${totalMinutes}m`;

  const getLevel = () => {
    const percent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    if (percent >= 75) return { name: 'Ouro', color: 'var(--accent)' };
    if (percent >= 25) return { name: 'Prata', color: '#c0c0c0' };
    return { name: 'Bronze', color: '#cd7f32' };
  };

  const level = getLevel();
  const completionPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find the first incomplete lesson to continue watching
  const nextLesson = lessonsData.find(l => !l.completed) || lessonsData[0];

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
                <span className="stat-value">{hrsStr}</span>
                <span className="stat-label">Tempo de Estudo</span>
              </div>
            </div>
            <div className="stat-card glass-panel" style={{ border: `1px solid ${level.color}` }}>
              <Award size={24} className="stat-icon" style={{ color: level.color }} />
              <div className="stat-info">
                <span className="stat-value" style={{ color: level.color }}>{level.name}</span>
                <span className="stat-label">Nível Atual</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="continue-watching glass-panel">
        <div className="cw-image" style={{ backgroundImage: 'url(/img/thumb_course_psicologia_1779051643188.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="image-overlay" onClick={() => navigate('/aluno/curso')} style={{ cursor: 'pointer' }}>
            <PlayCircle size={48} className="play-icon-large" />
          </div>
        </div>
        <div className="cw-content">
          <span className="cw-tag">CONTINUAR ASSISTINDO</span>
          <h2>{nextLesson ? nextLesson.title : 'Todos os módulos concluídos!'}</h2>
          <p>{nextLesson ? nextLesson.module : 'Parabéns pela dedicação!'}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercent}%` }}></div>
          </div>
          <span className="progress-text">{completionPercent}% concluído</span>
          <button className="btn-primary" onClick={() => navigate('/aluno/curso')}>
            Continuar Aula <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Trilha de Aprendizado Visual */}
      <section className="featured-section" style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h3>Trilha do Sucesso Comercial</h3>
          <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>Sua jornada passo a passo</span>
        </div>
        
        <div className="roadmap-container">
          
          <div className="roadmap-step completed">
            <div className="step-marker">✓</div>
            <div className="roadmap-card" onClick={() => navigate('/aluno/curso')}>
              <div className="roadmap-image" style={{ backgroundImage: 'url(/img/curso_novo_1.png)' }}></div>
              <div className="roadmap-content">
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Fase 1 • Concluído</span>
                <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Arquitetura que Vende</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Os segredos e bases estratégicas para transformar fachadas e pontos comerciais em máquinas de atração.</p>
              </div>
            </div>
          </div>

          <div className="roadmap-step active">
            <div className="step-marker">2</div>
            <div className="roadmap-card" onClick={() => navigate('/aluno/curso')}>
              <div className="roadmap-image" style={{ backgroundImage: 'url(/img/curso_novo_2.png)' }}></div>
              <div className="roadmap-content">
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Fase 2 • Em Andamento</span>
                <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Estética que Fatura</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Harmonização visual de alto padrão, escolha de paleta de cores corporativa e acabamentos premium.</p>
              </div>
            </div>
          </div>

          <div className="roadmap-step">
            <div className="step-marker">3</div>
            <div className="roadmap-card" onClick={() => navigate('/aluno/curso')}>
              <div className="roadmap-image" style={{ backgroundImage: 'url(/img/curso_novo_3.png)' }}></div>
              <div className="roadmap-content">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Fase 3 • Bloqueado</span>
                <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>A Loja como Experiência</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Criação de jornadas sensoriais, fluxos intuitivos e estímulos de consumo dentro da loja física.</p>
              </div>
            </div>
          </div>

          <div className="roadmap-step">
            <div className="step-marker">4</div>
            <div className="roadmap-card" onClick={() => navigate('/aluno/curso')}>
              <div className="roadmap-image" style={{ backgroundImage: 'url(/img/curso_novo_4.png)' }}></div>
              <div className="roadmap-content">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Fase 4 • Bloqueado</span>
                <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>O Luxo do Varejo</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Estratégias de diferenciação de marca e layout aplicadas ao mercado de altíssimo padrão.</p>
              </div>
            </div>
          </div>

          <div className="roadmap-step">
            <div className="step-marker">5</div>
            <div className="roadmap-card" onClick={() => navigate('/aluno/curso')}>
              <div className="roadmap-image" style={{ backgroundImage: 'url(/img/curso_novo_5.png)' }}></div>
              <div className="roadmap-content">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Fase 5 • Bloqueado</span>
                <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Arquitetura de Posicionamento</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Como se consolidar como referência no mercado e atrair contratos corporativos de cinco dígitos.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Cases & Mentoria */}
      <section className="featured-section">
        <div className="section-header">
          <h3>Cases de Sucesso & Mentoria</h3>
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
              <button 
                className="btn-secondary" 
                style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                onClick={() => window.open('https://painap.vercel.app/', '_blank')}
              >
                Fazer Upgrade
              </button>
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
