import React, { useState } from 'react';
import { Play, CheckCircle, Circle, Lock, Maximize, ArrowRight, Star, Award } from 'lucide-react';
import './CoursePlayer.css';

const DEFAULT_LESSONS = [
  { 
    id: 1, 
    title: 'O que é Arquitetura de Consumo?', 
    module: 'Módulo 1: Fundamentos', 
    duration: '12:05', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Nesta aula de introdução, exploramos as origens e a evolução do design comercial estratégico no Brasil e no mundo.'
  },
  { 
    id: 2, 
    title: 'A Psicologia do Espaço', 
    module: 'Módulo 1: Fundamentos', 
    duration: '18:30', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Aprenda como a disposição dos móveis, fluxos internos e o pé-direito afetam o tempo de permanência no estabelecimento.'
  },
  { 
    id: 3, 
    title: 'Luz Quente vs Luz Fria', 
    module: 'Módulo 2: Iluminação Estratégica', 
    duration: '15:20', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Entenda a temperatura de cor e como criar atmosferas aconchegantes ou áreas de alta produtividade e vendas.'
  },
  { 
    id: 4, 
    title: 'Direcionamento de Fluxo', 
    module: 'Módulo 2: Iluminação Estratégica', 
    duration: '22:15', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Rascunho',
    description: 'Checklists práticos de como usar spots de iluminação direcionada para guiar o cliente intuitivamente pelas prateleiras.'
  }
];

const getModuleThumbnail = (moduleName) => {
  if (!moduleName) return '/img/thumb_course_psicologia_1779051643188.png';
  
  const normalized = moduleName.toLowerCase();
  if (normalized.includes('fundamentos') || normalized.includes('módulo 1') || normalized.includes('modulo 1')) {
    return '/img/curso_novo_1.png';
  }
  if (normalized.includes('iluminação') || normalized.includes('iluminacao') || normalized.includes('módulo 2') || normalized.includes('modulo 2')) {
    return '/img/curso_novo_2.png';
  }
  if (normalized.includes('cores') || normalized.includes('psicologia') || normalized.includes('módulo 3') || normalized.includes('modulo 3')) {
    return '/img/curso_novo_3.png';
  }
  if (normalized.includes('experiência') || normalized.includes('experiencia') || normalized.includes('módulo 4') || normalized.includes('modulo 4')) {
    return '/img/curso_novo_4.png';
  }
  return '/img/curso_novo_5.png';
};

export default function CoursePlayer() {
  const [lessons, setLessons] = useState(() => {
    const saved = localStorage.getItem('painap_lessons');
    return saved ? JSON.parse(saved) : DEFAULT_LESSONS;
  });

  const getYoutubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const toggleComplete = (id) => {
    setLessons(prev => {
      const next = prev.map(l => l.id === id ? { ...l, completed: !l.completed } : l);
      localStorage.setItem('painap_lessons', JSON.stringify(next));
      return next;
    });
  };

  // Group lessons by module
  const modulesMap = {};
  let moduleIdCounter = 1;
  const publicLessons = lessons.filter(l => l.status === 'Publicado');

  publicLessons.forEach(lesson => {
    if (!modulesMap[lesson.module]) {
      modulesMap[lesson.module] = {
        id: moduleIdCounter++,
        title: lesson.module,
        lessons: []
      };
    }
    modulesMap[lesson.module].lessons.push({
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl,
      description: lesson.description,
      completed: lesson.completed || false
    });
  });

  const courseData = Object.values(modulesMap);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLesson, setActiveLesson] = useState(() => {
    const savedActive = localStorage.getItem('painap_active_lesson_id');
    if (savedActive) return parseInt(savedActive);
    return courseData[0]?.lessons[0]?.id || null;
  });

  const [activeModule, setActiveModule] = useState(() => {
    if (activeLesson) {
      for (const mod of courseData) {
        if (mod.lessons.some(l => l.id === activeLesson)) {
          return mod.id;
        }
      }
    }
    return courseData[0]?.id || 1;
  });

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Find active lesson details
  let currentLesson = null;
  courseData.forEach(mod => {
    const found = mod.lessons.find(l => l.id === activeLesson);
    if (found) currentLesson = found;
  });

  if (!currentLesson && courseData[0]?.lessons[0]) {
    currentLesson = courseData[0].lessons[0];
  }

  const totalLessonsCount = courseData.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessonsCount = courseData.reduce((acc, mod) => acc + mod.lessons.filter(l => l.completed).length, 0);
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  return (
    <div className={`course-player-container fade-in ${isFocusMode ? 'focus-mode-active' : ''}`}>
      <div className="main-player-section">
        <div className="video-wrapper glass-panel">
          {!isPlaying ? (
            <div 
              className="custom-video-cover" 
              onClick={() => setIsPlaying(true)}
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url(${getModuleThumbnail(currentLesson?.module)})` }}
            >
              <div className="cover-content">
                <div className="play-button-glass">
                  <Play size={36} fill="currentColor" className="play-icon" style={{ marginLeft: '4px' }} />
                </div>
                <h3 style={{ fontFamily: 'Mosvita, serif', fontSize: '2rem', letterSpacing: '1px' }}>{currentLesson?.title || 'Selecione uma aula'}</h3>
                <p style={{ color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600 }}>{currentLesson?.module || 'Trilha Principal'}</p>
              </div>
            </div>
          ) : (
            <div className="iframe-container">
              {currentLesson?.videoUrl ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${getYoutubeId(currentLesson.videoUrl)}?autoplay=1&rel=0&modestbranding=1`} 
                  title="Course Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#111', color: '#888' }}>
                  <span>Nenhum vídeo configurado para esta aula.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lesson-details">
          <div className="lesson-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontFamily: 'Mosvita, serif', fontSize: '2.2rem', margin: 0, fontWeight: 'normal' }}>{currentLesson?.title || 'Selecione uma aula'}</h1>
                <p className="lesson-meta" style={{ color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.4rem' }}>
                  {currentLesson?.module || 'Trilha Principal'} • {currentLesson?.duration || '10:00'} • Nível Elite
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => currentLesson && toggleComplete(currentLesson.id)}
                  className="btn-primary" 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px',
                    background: currentLesson?.completed ? 'transparent' : 'var(--text-primary)',
                    border: currentLesson?.completed ? '1px solid var(--accent)' : 'none',
                    color: currentLesson?.completed ? 'var(--accent)' : 'var(--bg-primary)'
                  }}
                >
                  <CheckCircle size={18} /> {currentLesson?.completed ? 'Aula Concluída' : 'Marcar como Concluída'}
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
              {currentLesson?.description || 'Nesta aula do método PAINAP, abordamos estratégias avançadas de posicionamento arquitetônico comercial para otimizar os lucros do cliente final.'}
            </p>
            <div className="materials">
              <h4>Materiais Complementares</h4>
              <a 
                href="/docs/Material_Complementar_PAINAP.pdf" 
                download="Material_Complementar_PAINAP.pdf"
                className="btn-secondary" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textDecoration: 'none', 
                  gap: '0.5rem', 
                  padding: '0.75rem 1.25rem',
                  borderRadius: '8px',
                  width: 'fit-content' 
                }}
              >
                Download PDF da Aula
              </a>
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
            <span className="progress-text">{completedLessonsCount}/{totalLessonsCount} Aulas</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
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
                      onClick={() => {
                        if (!lesson.locked) {
                          setActiveLesson(lesson.id);
                          localStorage.setItem('painap_active_lesson_id', lesson.id);
                          setIsPlaying(false);
                        }
                      }}
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
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status: {progressPercent}% Concluído</span>
          <div className="progress-bar" style={{ marginTop: '0.5rem', height: '6px' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Conclua todas as aulas para desbloquear seu selo Ouro corporativo.</p>
        </div>

      </div>
    </div>
  );
}
