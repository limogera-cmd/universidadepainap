import React, { useState } from 'react';
import { Play, CheckCircle, Circle, Lock, Maximize, ArrowRight, Star, Award } from 'lucide-react';
import './CoursePlayer.css';

export default function CoursePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeModule, setActiveModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState(2);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const courseData = [
    {
      id: 1,
      title: "Módulo 1: Fundamentos",
      lessons: [
        { id: 1, title: "O que é Arquitetura de Consumo?", duration: "12:05", completed: true },
        { id: 2, title: "A Psicologia do Espaço", duration: "18:30", completed: false },
      ]
    },
    {
      id: 2,
      title: "Módulo 2: Iluminação Estratégica",
      lessons: [
        { id: 3, title: "Luz Quente vs Luz Fria", duration: "15:20", completed: false },
        { id: 4, title: "Direcionamento de Fluxo", duration: "22:15", locked: true },
      ]
    }
  ];

  return (
    <div className={`course-player-container fade-in ${isFocusMode ? 'focus-mode-active' : ''}`}>
      <div className="main-player-section">
        <div className="video-wrapper glass-panel">
          {!isPlaying ? (
            <div 
              className="custom-video-cover" 
              onClick={() => setIsPlaying(true)}
              style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url(/img/thumb_course_psicologia_1779051643188.png)' }}
            >
              <div className="cover-content">
                <div className="play-button-glass">
                  <Play size={36} fill="currentColor" className="play-icon" style={{ marginLeft: '4px' }} />
                </div>
                <h3 style={{ fontFamily: 'Mosvita, serif', fontSize: '2rem', letterSpacing: '1px' }}>A Psicologia do Espaço</h3>
                <p style={{ color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>Módulo 1 • Aula 2</p>
              </div>
            </div>
          ) : (
            <div className="iframe-container">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1" 
                title="Course Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="lesson-details">
          <div className="lesson-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontFamily: 'Mosvita, serif', fontSize: '2.2rem', margin: 0, fontWeight: 'normal' }}>A Psicologia do Espaço</h1>
                <p className="lesson-meta" style={{ color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                  Módulo 1 • 18 Minutos • Nível Intermediário
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px' }}>
                  <CheckCircle size={18} /> Marcar como Concluída
                </button>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="btn-secondary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px', color: isFavorited ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  <Star size={18} fill={isFavorited ? 'var(--accent)' : 'none'} /> {isFavorited ? 'Salva nos Favoritos' : 'Salvar nos Favoritos'}
                </button>
                <button 
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className="btn-secondary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px' }}
                >
                  <Maximize size={18} /> {isFocusMode ? 'Sair do Modo Foco' : 'Modo Foco'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="lesson-description glass-panel">
            <h3>Sobre esta aula</h3>
            <p>
              Nesta aula, exploraremos como a disposição dos móveis e o pé-direito afetam
              a percepção do consumidor e o tempo de permanência no estabelecimento. 
              Você aprenderá a criar zonas de transição suaves que guiam o cliente intuitivamente.
            </p>
            <div className="materials">
              <h4>Materiais Complementares</h4>
              <button className="btn-secondary">Download PDF da Aula</button>
            </div>
          </div>

          {/* Upsell Module */}
          <div className="upsell-module glass-panel fade-in" style={{ marginTop: '2rem', border: '1px solid var(--accent)', background: 'linear-gradient(145deg, rgba(18,18,18,0.9), rgba(30,25,10,0.8))', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>RECOMENDAÇÃO VIP</span>
                <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Mentoria 1-on-1 com as Sócias</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px' }}>Traga o projeto do seu cliente para uma revisão completa de layout, iluminação e jornada de compra. Exclusivo para alunos Ouro.</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ padding: '1rem 2rem' }}
                onClick={() => window.open('https://painap.vercel.app/', '_blank')}
              >
                Destravar Oferta <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="course-sidebar glass-panel">
        <div className="sidebar-header">
          <h3>Trilha do Curso</h3>
          <div className="course-progress">
            <span className="progress-text">1/4 Aulas</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="modules-list">
          {courseData.map((module) => (
            <div key={module.id} className={`module-item ${activeModule === module.id ? 'active' : ''}`}>
              <div 
                className="module-title" 
                onClick={() => setActiveModule(module.id)}
              >
                <h4>{module.title}</h4>
              </div>
              
              {activeModule === module.id && (
                <div className="lessons-list">
                  {module.lessons.map(lesson => (
                    <div 
                      key={lesson.id} 
                      className={`lesson-item ${activeLesson === lesson.id ? 'active' : ''} ${lesson.locked ? 'locked' : ''}`}
                      onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                    >
                      <div className="lesson-icon">
                        {lesson.locked ? <Lock size={16} /> : 
                         lesson.completed ? <CheckCircle size={16} className="text-accent" /> : 
                         <Circle size={16} />}
                      </div>
                      <div className="lesson-info">
                        <span className="lesson-name">{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certificado Premium Widget */}
        <div style={{ 
          marginTop: '2rem', padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(30,25,10,0.4), rgba(18,18,18,0.8))', 
          border: '1px dashed var(--accent)', borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Award size={32} color="var(--accent)" style={{ margin: '0 auto 0.5rem auto' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Certificado Oficial PAINAP</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status: 25% Concluído</span>
          <div className="progress-bar" style={{ marginTop: '0.5rem', height: '6px' }}>
            <div className="progress-fill" style={{ width: '25%' }}></div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Conclua todas as aulas para desbloquear seu selo Ouro corporativo.</p>
        </div>

      </div>
    </div>
  );
}
