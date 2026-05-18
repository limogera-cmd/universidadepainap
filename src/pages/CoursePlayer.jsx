import React, { useState } from 'react';
import { Play, CheckCircle, Circle, Lock, Maximize, ArrowRight, Star, Award, Award as AwardIcon } from 'lucide-react';
import './CoursePlayer.css';

const DEFAULT_LESSONS_PARCEIRO = [
  { 
    id: 1, 
    title: 'Introdução ao Método PAINAP', 
    module: 'Módulo 1: Fundamentos', 
    duration: '15:20', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Bases e fundamentos do método de arquitetura comercial que gera faturamento e atrai clientes de altíssimo padrão.'
  },
  { 
    id: 2, 
    title: 'Zoneamento Comercial: O Primeiro Passo', 
    module: 'Módulo 1: Fundamentos', 
    duration: '22:45', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Como planejar a planta baixa e o fluxo de circulação ideal focado em conversão e experiência de compra.'
  },
  { 
    id: 3, 
    title: 'Iluminação Cênica para Produtos de Luxo', 
    module: 'Módulo 2: Iluminação Estratégica', 
    duration: '18:10', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Luz e sombra direcionados para destacar e valorizar produtos de alto ticket no varejo físico.'
  },
  { 
    id: 4, 
    title: 'Comunicação Visual e Fachadas Vendedoras', 
    module: 'Módulo 2: Iluminação Estratégica', 
    duration: '25:30', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Estratégias de atração passiva de clientes e design de fachadas de alto padrão.'
  }
];

const DEFAULT_LESSONS_COLABORADOR = [
  { 
    id: 1, 
    title: 'Checklist de Implantação e Padrão da Marca', 
    module: 'Módulo 1: Padronização Técnica', 
    duration: '15:20', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Como garantir a perfeita replicação visual e técnica do padrão PAINAP no PDV de novos franqueados.'
  },
  { 
    id: 2, 
    title: 'Zoneamento Operacional e Fluxo do PDV', 
    module: 'Módulo 1: Padronização Técnica', 
    duration: '22:45', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Como analisar o fluxo técnico e a disposição operacional para reduzir gargalos na operação.'
  },
  { 
    id: 3, 
    title: 'Controle de Prazos e Checklists Finais de Entrega', 
    module: 'Módulo 2: Gestão de Obras', 
    duration: '18:10', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Garantindo o cumprimento rigoroso dos prazos críticos para a inauguração da nova unidade.'
  },
  { 
    id: 4, 
    title: 'Comunicação Visual e Padrões Construtivos', 
    module: 'Módulo 2: Gestão de Obras', 
    duration: '25:30', 
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    status: 'Publicado',
    description: 'Como auditar fachadas e materiais autorizados para manter a consistência da marca.'
  }
];

const QUIZZES = {
  parceiro: {
    1: {
      question: 'Qual o foco central do método PAINAP?',
      options: [
        'Apenas estética minimalista e purista.',
        'Desenhos artísticos manuais de alta complexidade.',
        'Arquitetura comercial estratégica focada em faturamento, conversão e atração de clientes de alto padrão.',
        'Vender projetos de baixo custo para o varejo popular.'
      ],
      correct: 2
    },
    2: {
      question: 'Qual o fluxo ideal de circulação do cliente em um PDV comercial segundo o método?',
      options: [
        'Totalmente aleatório e livre de estímulos.',
        'O fluxo deve direcionar o cliente de forma fluida pelas zonas quentes, maximizando a exposição dos produtos.',
        'Forçar o cliente a ir apenas ao caixa o mais rápido possível.',
        'Evitar qualquer contato físico com o produto.'
      ],
      correct: 1
    },
    3: {
      question: 'Como destacar produtos de alto ticket (luxo) com iluminação estratégica?',
      options: [
        'Luz fria geral difusa e sem contraste em todo o espaço.',
        'Luz cênica quente e spots direcionados, criando alto contraste e valorização volumétrica.',
        'Apagar as luzes da vitrine principal para criar mistério excessivo.',
        'Usar exclusivamente luzes de neon e refletores coloridos piscantes.'
      ],
      correct: 1
    },
    4: {
      question: 'Qual o papel principal da fachada comercial no Método PAINAP?',
      options: [
        'Elemento puramente decorativo e sem conexão com o interior.',
        'Atração passiva e transmissão instantânea do posicionamento de alto padrão da marca.',
        'Reduzir custos estruturais da obra através de painéis simples.',
        'Impedir a visibilidade do interior da loja.'
      ],
      correct: 1
    }
  },
  colaborador: {
    1: {
      question: 'O que o Checklist de Implantação e Padrão da Marca garante?',
      options: [
        'Uma obra livre de qualquer investimento financeiro.',
        'A perfeita replicação visual e técnica do padrão PAINAP no PDV de novos franqueados.',
        'Escolha aleatória de fornecedores locais de baixo custo.',
        'Apenas a velocidade de entrega, desconsiderando acabamentos.'
      ],
      correct: 1
    },
    2: {
      question: 'Qual o principal objetivo do zoneamento operacional do PDV?',
      options: [
        'Aumentar o tempo de fila e espera do cliente.',
        'Minimizar gargalos de circulação técnica e operacional da equipe interna.',
        'Deixar o espaço menor e mais apertado para guardar estoque.',
        'Garantir apenas o conforto visual das sócias-fundadoras.'
      ],
      correct: 1
    },
    3: {
      question: 'Qual a melhor prática para garantir prazos de inauguração críticos em obras?',
      options: [
        'Não fazer cronogramas e confiar no prazo verbal do mestre de obras.',
        'Auditar checklists semanais detalhados de progresso físico e relatórios de entrega de insumos homologados.',
        'Esperar o dia da inauguração para checar as pendências físicas.',
        'Reduzir a qualidade do padrão da marca para acelerar a entrega.'
      ],
      correct: 1
    },
    4: {
      question: 'Quem pode autorizar materiais alternativos para as fachadas das franquias?',
      options: [
        'Qualquer fornecedor ou construtor local contratado.',
        'Apenas a auditoria central da PAINAP baseada nos padrões de marca homologados.',
        'O próprio franqueado individualmente, sem consulta.',
        'Qualquer colaborador interno do administrativo.'
      ],
      correct: 1
    }
  }
};

const getModuleThumbnail = (moduleName) => {
  if (!moduleName) return '/img/thumb_course_psicologia_1779051643188.png';
  
  const normalized = moduleName.toLowerCase();
  if (normalized.includes('fundamentos') || normalized.includes('implantação') || normalized.includes('padronização') || normalized.includes('módulo 1') || normalized.includes('modulo 1')) {
    return '/img/curso_novo_1.png';
  }
  if (normalized.includes('iluminação') || normalized.includes('iluminacao') || normalized.includes('obras') || normalized.includes('módulo 2') || normalized.includes('modulo 2')) {
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
  const [activeProfile, setActiveProfile] = useState(() => {
    return localStorage.getItem('painap_student_profile') || 'parceiro';
  });

  const [lessons, setLessons] = useState(() => {
    const saved = localStorage.getItem('painap_lessons');
    if (saved) return JSON.parse(saved);
    const profile = localStorage.getItem('painap_student_profile') || 'parceiro';
    return profile === 'colaborador' ? DEFAULT_LESSONS_COLABORADOR : DEFAULT_LESSONS_PARCEIRO;
  });

  const [activeLesson, setActiveLesson] = useState(() => {
    const savedActive = localStorage.getItem('painap_active_lesson_id');
    if (savedActive) return parseInt(savedActive);
    const initialLessons = localStorage.getItem('painap_lessons') 
      ? JSON.parse(localStorage.getItem('painap_lessons')) 
      : (localStorage.getItem('painap_student_profile') === 'colaborador' ? DEFAULT_LESSONS_COLABORADOR : DEFAULT_LESSONS_PARCEIRO);
    return initialLessons[0]?.id || 1;
  });

  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'quiz' | 'nps'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizStatus, setQuizStatus] = useState({});
  const [npsScore, setNpsScore] = useState(null);
  const [npsFeedback, setNpsFeedback] = useState('');
  const [npsSubmitted, setNpsSubmitted] = useState(() => {
    return localStorage.getItem('painap_nps_submitted') === 'true';
  });
  const [showCertificate, setShowCertificate] = useState(false);

  React.useEffect(() => {
    const handleProfileUpdate = () => {
      const profile = localStorage.getItem('painap_student_profile') || 'parceiro';
      setActiveProfile(profile);
      
      const saved = localStorage.getItem('painap_lessons');
      let currentLessons = [];
      if (saved) {
        currentLessons = JSON.parse(saved);
      } else {
        currentLessons = profile === 'colaborador' ? DEFAULT_LESSONS_COLABORADOR : DEFAULT_LESSONS_PARCEIRO;
      }
      setLessons(currentLessons);
      
      const savedActive = localStorage.getItem('painap_active_lesson_id');
      const activeId = savedActive ? parseInt(savedActive) : null;
      if (!activeId || !currentLessons.some(l => l.id === activeId)) {
        if (currentLessons[0]) {
          setActiveLesson(currentLessons[0].id);
          localStorage.setItem('painap_active_lesson_id', currentLessons[0].id);
        }
      }
    };
    window.addEventListener('painap_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('painap_profile_updated', handleProfileUpdate);
    };
  }, []);

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
      window.dispatchEvent(new Event('painap_profile_updated'));
      return next;
    });
  };

  // Group lessons by module
  const modulesMap = {};
  let moduleIdCounter = 1;
  const publicLessons = lessons.filter(l => l.status === 'Publicado' || !l.status);

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
                  <span>Vídeo não disponível</span>
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
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: 0,
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
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: 0, color: isFavorited ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  <Star size={18} fill={isFavorited ? 'var(--accent)' : 'none'} /> {isFavorited ? 'Salva nos Favoritos' : 'Salvar nos Favoritos'}
                </button>
                <button 
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className="btn-secondary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: 0 }}
                >
                  <Maximize size={18} /> {isFocusMode ? 'Sair do Modo Foco' : 'Modo Foco'}
                </button>
              </div>
            </div>
          </div>

          {/* Brutalist Premium Tab Headers */}
          <div className="brutalist-tabs" style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'details' ? '3px solid var(--accent)' : '3px solid transparent',
                color: activeTab === 'details' ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                fontFamily: 'Mosvita, Inter, sans-serif',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: activeTab === 'details' ? 'bold' : 'normal',
                borderRadius: 0,
                transition: 'all 0.2s'
              }}
            >
              Conteúdo & Downloads
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'quiz' ? '3px solid var(--accent)' : '3px solid transparent',
                color: activeTab === 'quiz' ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                fontFamily: 'Mosvita, Inter, sans-serif',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: activeTab === 'quiz' ? 'bold' : 'normal',
                borderRadius: 0,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Quiz de Fixação
              {quizStatus[currentLesson?.id]?.correct && <span style={{ background: 'var(--accent)', color: 'var(--bg-primary)', fontSize: '0.7rem', padding: '1px 5px', fontWeight: 'bold' }}>+50 XP</span>}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nps' ? 'active' : ''}`}
              onClick={() => setActiveTab('nps')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'nps' ? '3px solid var(--accent)' : '3px solid transparent',
                color: activeTab === 'nps' ? 'var(--accent)' : 'var(--text-secondary)',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                fontFamily: 'Mosvita, Inter, sans-serif',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: activeTab === 'nps' ? 'bold' : 'normal',
                borderRadius: 0,
                transition: 'all 0.2s'
              }}
            >
              Avaliação NPS
            </button>
          </div>
          
          {/* Tab Content Panel */}
          <div className="tab-content glass-panel" style={{ padding: '2rem', borderRadius: 0, border: '1px solid var(--border-color)', background: 'rgba(20, 16, 12, 0.45)' }}>
            
            {activeTab === 'details' && (
              <div className="fade-in">
                <h3 style={{ fontFamily: 'Mosvita, serif', textTransform: 'uppercase', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent)' }}>Sobre esta aula</h3>
                <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  {currentLesson?.description || 'Nesta aula do método PAINAP, abordamos estratégias avançadas de posicionamento arquitetônico comercial para otimizar os lucros do cliente final.'}
                </p>
                <div className="materials" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Materiais Complementares</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Baixe o guia executivo brutalista de implantação técnica desta aula para guardar como referência.</p>
                  <a 
                    href="/docs/Material_Complementar_PAINAP.pdf" 
                    download="Material_Complementar_PAINAP.pdf"
                    className="btn-primary" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      textDecoration: 'none', 
                      gap: '0.5rem', 
                      padding: '0.75rem 1.5rem',
                      borderRadius: 0,
                      width: 'fit-content',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Download PDF da Aula
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (() => {
              const quiz = QUIZZES[activeProfile]?.[currentLesson?.id];
              if (!quiz) {
                return (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Nenhum quiz disponível para esta aula temporária.</p>
                  </div>
                );
              }

              const status = quizStatus[currentLesson?.id];
              const selectedAnswer = quizAnswers[currentLesson?.id];

              const handleQuizSubmit = () => {
                if (selectedAnswer === undefined) return;
                const isCorrect = selectedAnswer === quiz.correct;
                setQuizStatus(prev => ({
                  ...prev,
                  [currentLesson.id]: { submitted: true, correct: isCorrect }
                }));

                if (isCorrect) {
                  // Recompensar com +50 XP
                  const currentXp = parseInt(localStorage.getItem('painap_student_xp')) || 0;
                  const newXp = currentXp + 50;
                  localStorage.setItem('painap_student_xp', newXp.toString());
                  
                  // Incrementar medalha se bater certos marcos de XP (ex: a cada 100 XP)
                  if (newXp % 100 === 0) {
                    const medals = parseInt(localStorage.getItem('painap_student_medals')) || 0;
                    localStorage.setItem('painap_student_medals', (medals + 1).toString());
                  }

                  // Disparar evento reativo
                  window.dispatchEvent(new Event('painap_profile_updated'));
                }
              };

              return (
                <div className="fade-in">
                  <h3 style={{ fontFamily: 'Mosvita, serif', textTransform: 'uppercase', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Quiz de Fixação</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Teste seus conhecimentos práticos para garantir a conformidade com o método PAINAP.</p>
                  
                  <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderLeft: '3px solid var(--accent)' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)', fontWeight: 'bold' }}>Pergunta</span>
                    <p style={{ fontSize: '1.05rem', margin: '0.5rem 0 0 0', color: 'var(--text-primary)', fontWeight: 500 }}>{quiz.question}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {quiz.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isSubmitted = status?.submitted;
                      const isCorrectAnswer = index === quiz.correct;
                      
                      let optionBg = 'rgba(255, 255, 255, 0.02)';
                      let optionBorder = '1px solid var(--border-color)';
                      if (isSelected) {
                        optionBg = 'rgba(204, 188, 161, 0.08)';
                        optionBorder = '1px solid var(--accent)';
                      }
                      if (isSubmitted) {
                        if (isSelected && !status.correct) {
                          optionBg = 'rgba(225, 70, 28, 0.1)';
                          optionBorder = '1px solid #E1461C';
                        }
                        if (isCorrectAnswer) {
                          optionBg = 'rgba(46, 117, 89, 0.15)';
                          optionBorder = '2px solid #2e7559';
                        }
                      }

                      return (
                        <label 
                          key={index} 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem 1.25rem',
                            background: optionBg,
                            border: optionBorder,
                            cursor: isSubmitted ? 'default' : 'pointer',
                            borderRadius: 0,
                            transition: 'all 0.2s',
                          }}
                        >
                          <input 
                            type="radio" 
                            name={`quiz-${currentLesson.id}`}
                            checked={isSelected}
                            disabled={isSubmitted}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, [currentLesson.id]: index }))}
                            style={{ accentColor: 'var(--accent)' }}
                          />
                          <span style={{ fontSize: '0.95rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {!status?.submitted ? (
                    <button 
                      className="btn-primary"
                      onClick={handleQuizSubmit}
                      disabled={selectedAnswer === undefined}
                      style={{ borderRadius: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}
                    >
                      Enviar Resposta
                    </button>
                  ) : (
                    <div style={{ marginTop: '1.5rem' }}>
                      {status.correct ? (
                        <div style={{ padding: '1rem 1.5rem', background: 'rgba(46, 117, 89, 0.1)', borderLeft: '4px solid #2e7559', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ color: '#2e7559', fontWeight: 'bold', fontSize: '1rem' }}>🎉 EXCELENTE! Você dominou este conceito!</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Sua dedicação rendeu <strong>+50 XP</strong> de reputação comercial no seu painel. Continue avançando na trilha!</span>
                        </div>
                      ) : (
                        <div style={{ padding: '1rem 1.5rem', background: 'rgba(225, 70, 28, 0.08)', borderLeft: '4px solid #E1461C', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <span style={{ color: '#E1461C', fontWeight: 'bold', fontSize: '1rem' }}>❌ Resposta Incorreta</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Não desanime. Revise os materiais de apoio e o fluxo estratégico, depois clique no botão abaixo para tentar novamente.</span>
                          <button 
                            className="btn-secondary"
                            onClick={() => {
                              setQuizStatus(prev => {
                                const next = { ...prev };
                                delete next[currentLesson.id];
                                return next;
                              });
                              setQuizAnswers(prev => {
                                const next = { ...prev };
                                delete next[currentLesson.id];
                                return next;
                              });
                            }}
                            style={{ borderRadius: 0, width: 'fit-content', fontSize: '0.85rem', padding: '0.5rem 1rem', textTransform: 'uppercase' }}
                          >
                            Tentar Novamente
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {activeTab === 'nps' && (
              <div className="fade-in">
                <h3 style={{ fontFamily: 'Mosvita, serif', textTransform: 'uppercase', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>NPS & Feedback</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Sua opinião sincera molda o padrão de qualidade e refinamento técnico da nossa universidade comercial.</p>

                {!npsSubmitted ? (
                  <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 500 }}>
                        Em uma escala de 0 a 10, o quanto você recomendaria a Escola PAINAP para um colega arquiteto ou investidor de varejo?
                      </label>
                      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {[...Array(11).keys()].map((score) => (
                          <button
                            key={score}
                            className={`nps-btn ${npsScore === score ? 'active' : ''}`}
                            onClick={() => setNpsScore(score)}
                            style={{
                              flex: 1,
                              minWidth: '38px',
                              height: '42px',
                              background: npsScore === score ? 'var(--accent)' : 'rgba(255,255,255,0.02)',
                              border: npsScore === score ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                              color: npsScore === score ? 'var(--bg-primary)' : 'var(--text-primary)',
                              fontSize: '0.95rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              borderRadius: 0,
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>Extremamente improvável (0)</span>
                        <span>Neutro (5)</span>
                        <span>Com certeza recomendaria (10)</span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                        O que motivou sua nota? Deixe sugestões de melhoria (opcional):
                      </label>
                      <textarea
                        rows="4"
                        value={npsFeedback}
                        onChange={(e) => setNpsFeedback(e.target.value)}
                        placeholder="Ex: Qualidade da imagem de vídeo, tópicos complementares de gestão de obras, etc..."
                        style={{
                          width: '100%',
                          background: 'rgba(0,0,0,0.2)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          padding: '0.85rem',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.9rem',
                          borderRadius: 0,
                          resize: 'vertical',
                          outline: 'none'
                        }}
                      ></textarea>
                    </div>

                    <button
                      className="btn-primary"
                      disabled={npsScore === null}
                      onClick={() => {
                        localStorage.setItem('painap_nps_submitted', 'true');
                        localStorage.setItem('painap_nps_score', npsScore.toString());
                        localStorage.setItem('painap_nps_feedback', npsFeedback);
                        setNpsSubmitted(true);
                      }}
                      style={{ borderRadius: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}
                    >
                      Enviar Feedback
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: '2rem', background: 'rgba(204, 188, 161, 0.05)', border: '1px dashed var(--accent)', textAlign: 'center' }}>
                    <Star size={36} color="var(--accent)" style={{ margin: '0 auto 1rem auto' }} />
                    <h4 style={{ fontFamily: 'Mosvita, serif', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Feedback Enviado com Sucesso!</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.5' }}>
                      Agradecemos profundamente o seu tempo e dedicação. Sua avaliação ajuda a consolidar a Escola PAINAP como a formação definitiva de alto padrão em arquitetura de consumo.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Upsell Module */}
        <div className="upsell-module glass-panel fade-in" style={{ marginTop: '2rem', border: '1px solid var(--accent)', background: 'linear-gradient(145deg, rgba(18,18,18,0.9), rgba(30,25,10,0.8))', padding: '2rem', borderRadius: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>RECOMENDAÇÃO VIP</span>
                <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Mentoria 1-on-1 com as Sócias</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px' }}>Traga o projeto do seu cliente para uma revisão completa de layout, iluminação e jornada de compra. Exclusivo para alunos Ouro.</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ padding: '1rem 2rem', borderRadius: 0 }}
                onClick={() => window.open('https://painap.vercel.app/', '_blank')}
              >
                Destravar Oferta <ArrowRight size={18} />
              </button>
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
          border: '1px dashed var(--accent)', borderRadius: 0,
          textAlign: 'center'
        }}>
          <Award size={32} color="var(--accent)" style={{ margin: '0 auto 0.5rem auto' }} />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontFamily: 'Mosvita, sans-serif' }}>Certificado Oficial PAINAP</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Progresso: {progressPercent}% Concluído</span>
          <div className="progress-bar" style={{ marginTop: '0.5rem', height: '6px' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          {progressPercent === 100 ? (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#2e7559', fontWeight: 'bold', marginBottom: '0.5rem' }}>🎉 SELO OURO DESTRAVADO!</p>
              <button 
                onClick={() => setShowCertificate(true)}
                className="btn-primary"
                style={{ 
                  borderRadius: 0, width: '100%', padding: '0.75rem 1rem', 
                  fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Visualizar Certificado
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Conclua todas as aulas (100% de progresso) para desbloquear seu selo Ouro corporativo.</p>
              <button 
                disabled
                className="btn-secondary"
                style={{ 
                  borderRadius: 0, width: '100%', padding: '0.75rem 1rem', 
                  fontSize: '0.85rem', textTransform: 'uppercase',
                  letterSpacing: '1px', opacity: 0.5, cursor: 'not-allowed', marginTop: '0.5rem'
                }}
              >
                Certificado Bloqueado
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxSizing: 'border-box',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            background: '#12100E',
            border: '2px solid var(--accent)',
            padding: '3rem',
            textAlign: 'center',
            boxSizing: 'border-box',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setShowCertificate(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {/* Certificate Body (High Fidelity Vector Print Style) */}
            <div id="print-certificate" style={{
              border: '1px solid var(--accent)',
              padding: '3rem 2rem',
              position: 'relative',
              background: '#141210',
              overflow: 'hidden'
            }}>
              {/* Brutalist Watermark & Borders */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '10px',
                border: '1px dashed rgba(204, 188, 161, 0.25)',
                pointerEvents: 'none'
              }} />

              {/* Header */}
              <div style={{ marginBottom: '2.5rem' }}>
                <span style={{
                  fontFamily: 'Mosvita, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '3px',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Universidade Corporativa
                </span>
                <h2 style={{
                  fontFamily: 'Mosvita, serif',
                  fontSize: '2.4rem',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--text-primary)'
                }}>
                  Certificado de Conclusão
                </h2>
              </div>

              {/* Student info */}
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Certificamos com distinção técnica de excelência que o profissional de arquitetura e negócios
              </p>

              <h1 style={{
                fontFamily: 'Mosvita, serif',
                fontSize: '2.6rem',
                color: 'var(--accent)',
                margin: '1.5rem 0',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
                display: 'inline-block',
                minWidth: '350px'
              }}>
                {localStorage.getItem('painap_student_name') || 'Profissional de Elite'}
              </h1>

              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '1.5rem auto 3rem auto',
                lineHeight: '1.6'
              }}>
                concluiu com êxito a formação prática da <strong>Escola PAINAP ({activeProfile === 'colaborador' ? 'Trilha Colaborador Interno' : 'Trilha Parceiro Estratégico'})</strong>, adquirindo proficiência e dominando o ecossistema brutalista de Arquitetura de Consumo, Padrões de Layout e Iluminação de Varejo de Alto Padrão.
              </p>

              {/* Signatures & Stamps */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                marginTop: '4rem',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center', minWidth: '180px' }}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'var(--accent)',
                    marginBottom: '0.5rem'
                  }}>
                    Mônia Souza
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Sócia-Fundadora</span>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#666' }}>Direção de Operações</span>
                  </div>
                </div>

                {/* Seal Icon */}
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  border: '2px solid var(--accent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(204, 188, 161, 0.05)',
                  boxShadow: '0 0 15px rgba(204,188,161,0.1)'
                }}>
                  <Award size={36} color="var(--accent)" />
                  <div style={{
                    position: 'absolute',
                    fontSize: '0.55rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                    color: 'var(--accent)',
                    bottom: '-12px',
                    background: '#141210',
                    padding: '2px 6px',
                    border: '1px solid var(--accent)'
                  }}>
                    OURO
                  </div>
                </div>

                <div style={{ textAlign: 'center', minWidth: '180px' }}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: 'var(--accent)',
                    marginBottom: '0.5rem'
                  }}>
                    G. Vecchia
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Sócia-Fundadora</span>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#666' }}>Direção Executiva</span>
                  </div>
                </div>
              </div>

              {/* Date & Metadata */}
              <div style={{
                marginTop: '3rem',
                fontSize: '0.7rem',
                color: '#555',
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255,255,255,0.03)',
                paddingTop: '1rem'
              }}>
                <span>EMISSÃO: {new Date().toLocaleDateString('pt-BR')}</span>
                <span>AUTENTICIDADE: PAINAP-CERT-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => window.print()}
                className="btn-primary"
                style={{ borderRadius: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', padding: '1rem 2rem' }}
              >
                Imprimir / Salvar PDF
              </button>
              <button 
                onClick={() => setShowCertificate(false)}
                className="btn-secondary"
                style={{ borderRadius: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', padding: '1rem 2rem' }}
              >
                Voltar ao Curso
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
