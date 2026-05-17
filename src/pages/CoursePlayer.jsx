import React, { useState } from 'react';
import { PlayCircle, CheckCircle, Circle, Lock, Maximize } from 'lucide-react';
import './CoursePlayer.css';

export default function CoursePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeModule, setActiveModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState(2);
  const [isFocusMode, setIsFocusMode] = useState(false);

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
            <div className="custom-video-cover" onClick={() => setIsPlaying(true)}>
              {/* Premium Background Pattern or Image could go here */}
              <div className="cover-content">
                <div className="play-button-glass">
                  <PlayCircle size={64} className="play-icon" />
                </div>
                <h3>A Psicologia do Espaço</h3>
                <p>Módulo 1 • Aula 2</p>
              </div>
            </div>
          ) : (
            <div className="iframe-container">
              {/* YouTube Embed: Autoplay enabled since user initiated it */}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div>
                <h1>A Psicologia do Espaço</h1>
                <p className="lesson-meta">Módulo 1 • 18 Minutos • Nível Intermediário</p>
              </div>
              <button 
                onClick={() => setIsFocusMode(!isFocusMode)}
                className="btn-secondary" 
                style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Maximize size={18} /> {isFocusMode ? 'Sair do Modo Foco' : 'Modo Foco'}
              </button>
            </div>
            <button className="btn-primary">
              <CheckCircle size={18} /> Marcar como Concluída
            </button>
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
      </div>
    </div>
  );
}
