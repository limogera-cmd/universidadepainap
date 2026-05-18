import React from 'react';
import { PlayCircle, Clock, Award, ArrowRight, Lock, CheckCircle, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

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

const srsQuestions = {
  parceiro: {
    id: 'srs_parceiro_1',
    question: "Qual o princípio fundamental do zoneamento de fluxo em lojas comerciais de alto padrão?",
    options: [
      { key: 'A', text: 'Maximizar o espaço de armazenamento nos fundos e reduzir a área de exposição do salão.' },
      { key: 'B', text: 'Guiar o cliente de forma orgânica pelas zonas quentes da loja, introduzindo pontos de fricção visuais estratégicos nos produtos de alta margem.' },
      { key: 'C', text: 'Manter a entrada com barreiras visuais e expor todos os produtos promocionais na vitrine externa.' }
    ],
    correct: 'B',
    explanation: 'No método PAINAP, o zoneamento comercial estratégico desenha o fluxo de circulação para conduzir naturalmente o consumidor pelas "zonas quentes" da loja, gerando maior permanência e estimulando o desejo de consumo.'
  },
  colaborador: {
    id: 'srs_colaborador_1',
    question: "Segundo o manual de engenharia e obras da PAINAP, qual o prazo regulamentar de resposta para auditoria de layout comercial de nova franquia?",
    options: [
      { key: 'A', text: 'Até 15 dias úteis, devido à complexidade da análise de zoneamento de varejo.' },
      { key: 'B', text: 'Até 5 dias úteis, garantindo agilidade operacional e mantendo o cronograma crítico de inauguração.' },
      { key: 'C', text: 'Em até 24 horas úteis, dispensando a validação final da equipe técnica de expansão.' }
    ],
    correct: 'B',
    explanation: 'A agilidade operacional é crítica para manter a expansão e o cronograma de obras. O prazo regulamentar de retorno de auditoria técnica da equipe PAINAP é de até 5 dias úteis.'
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Load dynamic lessons from localStorage or use defaults
  const [activeProfile, setActiveProfile] = React.useState(() => {
    return localStorage.getItem('painap_student_profile') || 'parceiro';
  });

  const getLessonsForProfile = (profile) => {
    const isColaborador = profile === 'colaborador';
    
    return [
      { 
        id: 1, 
        module: isColaborador ? 'Padronização Técnica e Franquias' : 'Fundamentos da Arquitetura Comercial', 
        title: isColaborador ? 'Checklist de Implantação e Padrão da Marca' : 'Introdução ao Método PAINAP', 
        duration: '15:20', 
        completed: true, 
        locked: false, 
        required: isColaborador,
        deadline: isColaborador ? 'Concluído' : null,
        description: isColaborador 
          ? 'Como garantir a perfeita replicação visual e técnica do padrão PAINAP no PDV de novos franqueados.' 
          : 'Bases e fundamentos do método de arquitetura comercial que gera faturamento e atrai clientes high-ticket.' 
      },
      { 
        id: 2, 
        module: isColaborador ? 'Padronização Técnica e Franquias' : 'Fundamentos da Arquitetura Comercial', 
        title: isColaborador ? 'Zoneamento Operacional e Fluxo do PDV' : 'Zoneamento Comercial: O Primeiro Passo', 
        duration: '22:45', 
        completed: false, 
        locked: false, 
        required: isColaborador,
        deadline: isColaborador ? 'Restam 2 dias' : null,
        description: isColaborador 
          ? 'Como analisar o fluxo técnico e a disposição operacional para reduzir gargalos na operação.' 
          : 'Como planejar a planta baixa e o fluxo de circulação ideal focado em conversão e experiência.' 
      },
      { 
        id: 3, 
        module: isColaborador ? 'Gestão de Obras e Cronogramas' : 'Iluminação e Psicologia', 
        title: isColaborador ? 'Controle de Prazos e Checklists Finais de Entrega' : 'Iluminação Cênica para Produtos de Luxo', 
        duration: '18:10', 
        completed: false, 
        locked: false, 
        required: isColaborador,
        deadline: isColaborador ? 'Vence em 5 dias' : null,
        description: isColaborador 
          ? 'Garantindo o cumprimento rigoroso dos prazos críticos para a inauguração da nova unidade.' 
          : 'Luz e sombra direcionados para destacar e valorizar produtos de alto ticket no varejo físico.' 
      },
      { 
        id: 4, 
        module: isColaborador ? 'Estudos Avançados Internos' : 'Estudos Avançados', 
        title: isColaborador ? 'Comunicação Visual e Padrões Construtivos' : 'Comunicação Visual e Fachadas Vendedoras', 
        duration: '25:30', 
        completed: false, 
        locked: false, 
        required: false,
        deadline: null,
        description: isColaborador 
          ? 'Como auditar fachadas e materiais autorizados para manter a consistência da marca.' 
          : 'Estratégias de atração passiva de clientes e design de fachadas de alto padrão.' 
      }
    ];
  };

  const [lessonsData, setLessonsData] = React.useState(() => {
    const saved = localStorage.getItem('painap_lessons');
    if (saved) return JSON.parse(saved);
    const profile = localStorage.getItem('painap_student_profile') || 'parceiro';
    return getLessonsForProfile(profile);
  });

  React.useEffect(() => {
    const handleProfileUpdate = () => {
      const profile = localStorage.getItem('painap_student_profile') || 'parceiro';
      setActiveProfile(profile);
      setLessonsData(getLessonsForProfile(profile));
    };
    window.addEventListener('painap_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('painap_profile_updated', handleProfileUpdate);
    };
  }, []);

  // --- SRS Spaced Repetition State & Functions ---
  const intervals = [1, 3, 7, 15, 30];
  const activeQuestion = srsQuestions[activeProfile] || srsQuestions.parceiro;

  const [srsState, setSrsState] = React.useState(() => {
    const saved = localStorage.getItem('painap_srs_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      lastAnswered: null,
      intervalIndex: 0,
      nextReviewDate: null,
      isCorrect: null,
      userAnswer: null,
      completed: false
    };
  });

  const [selectedOption, setSelectedOption] = React.useState('');
  const [showExplanation, setShowExplanation] = React.useState(false);

  // Sync selectedOption / showExplanation if completed
  React.useEffect(() => {
    if (srsState.completed) {
      setSelectedOption(srsState.userAnswer || '');
      setShowExplanation(true);
    } else {
      setSelectedOption('');
      setShowExplanation(false);
    }
  }, [srsState, activeProfile]);

  const isReviewPending = !srsState.completed || !srsState.nextReviewDate || Date.now() >= new Date(srsState.nextReviewDate).getTime();

  const handleAnswerSRS = (optionKey) => {
    if (srsState.completed) return; // lock once answered
    setSelectedOption(optionKey);
  };

  const submitSRS = () => {
    if (!selectedOption || srsState.completed) return;
    
    const isCorrect = selectedOption === activeQuestion.correct;
    let nextIndex = srsState.intervalIndex;
    
    if (isCorrect) {
      nextIndex = Math.min(srsState.intervalIndex + 1, intervals.length - 1);
      // Award +25 XP
      const currentXp = parseInt(localStorage.getItem('painap_xp')) || 350;
      const newXp = currentXp + 25;
      localStorage.setItem('painap_xp', newXp.toString());
      window.dispatchEvent(new Event('painap_profile_updated'));
    } else {
      nextIndex = 0; // reset
    }

    const intervalDays = intervals[nextIndex];
    const nextReviewDate = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

    const newState = {
      lastAnswered: new Date().toISOString(),
      intervalIndex: nextIndex,
      nextReviewDate: nextReviewDate,
      isCorrect: isCorrect,
      userAnswer: selectedOption,
      completed: true
    };

    localStorage.setItem('painap_srs_state', JSON.stringify(newState));
    setSrsState(newState);
    setShowExplanation(true);
  };

  const simulateAdvanceTime = () => {
    const newState = {
      ...srsState,
      completed: false,
      nextReviewDate: new Date(Date.now() - 60000).toISOString()
    };
    localStorage.setItem('painap_srs_state', JSON.stringify(newState));
    setSrsState(newState);
    setSelectedOption('');
    setShowExplanation(false);
  };

  const resetSRS = () => {
    const newState = {
      lastAnswered: null,
      intervalIndex: 0,
      nextReviewDate: null,
      isCorrect: null,
      userAnswer: null,
      completed: false
    };
    localStorage.setItem('painap_srs_state', JSON.stringify(newState));
    setSrsState(newState);
    setSelectedOption('');
    setShowExplanation(false);
  };

  const exportProgress = () => {
    const backupData = {
      xp: localStorage.getItem('painap_xp') || '350',
      badges: localStorage.getItem('painap_badges_count') || '1',
      profile: localStorage.getItem('painap_student_profile') || 'parceiro',
      srs: localStorage.getItem('painap_srs_state') || '{}'
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `painap_student_backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importProgress = () => {
    const input = prompt("Cole aqui o JSON de backup copiado ou digite o progresso manualmente:");
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      if (parsed.xp) localStorage.setItem('painap_xp', parsed.xp);
      if (parsed.badges) localStorage.setItem('painap_badges_count', parsed.badges);
      if (parsed.profile) localStorage.setItem('painap_student_profile', parsed.profile);
      if (parsed.srs) localStorage.setItem('painap_srs_state', typeof parsed.srs === 'string' ? parsed.srs : JSON.stringify(parsed.srs));
      
      window.dispatchEvent(new Event('painap_profile_updated'));
      alert("✓ Progresso importado com sucesso! Recarregando painel...");
      window.location.reload();
    } catch (e) {
      alert("❌ JSON de backup inválido. Verifique os dados inseridos.");
    }
  };

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

  // Find the last watched lesson, or the first incomplete one, or default to first
  const activeLessonId = localStorage.getItem('painap_active_lesson_id');
  const lastWatchedLesson = activeLessonId 
    ? lessonsData.find(l => l.id === parseInt(activeLessonId))
    : null;

  const nextLesson = lastWatchedLesson || lessonsData.find(l => !l.completed) || lessonsData[0];

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
        <div className="cw-image" style={{ backgroundImage: `url(${getModuleThumbnail(nextLesson?.module)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

      {/* Sistema de Revisão Espaçada (SRS) */}
      <section className="srs-section">
        <div className={`srs-card ${isReviewPending ? 'srs-pending' : ''}`}>
          
          <div className="srs-header">
            <div className="srs-title-wrapper">
              <span className="srs-badge">Revisão Espaçada</span>
              <h3 className="srs-title">Reforço de Aprendizado (SRS)</h3>
            </div>
            
            <div className="srs-meta">
              <span>Intervalo: {intervals[srsState.intervalIndex]} {intervals[srsState.intervalIndex] === 1 ? 'dia' : 'dias'}</span>
              {srsState.nextReviewDate && (
                <span>Próxima revisão: {new Date(srsState.nextReviewDate).toLocaleDateString('pt-BR')}</span>
              )}
            </div>
          </div>

          {!isReviewPending ? (
            <div className="srs-completed-state fade-in">
              <div className="srs-completed-icon">
                <CheckCircle size={64} style={{ color: 'var(--accent)' }} />
              </div>
              <h4 className="srs-completed-title">Você está em dia!</h4>
              <p className="srs-completed-subtitle">
                Excelente! Você respondeu à pergunta de revisão de hoje com sucesso. Volte em breve para continuar fixando o conhecimento técnico e estratégico da PAINAP.
              </p>
              
              <div className="srs-debug-toolbar" style={{ marginTop: '1rem' }}>
                <button onClick={simulateAdvanceTime} className="srs-btn-debug">Simular Avanço de Tempo (Avançar 24h)</button>
                <button onClick={resetSRS} className="srs-btn-debug">Resetar Questão</button>
                <button onClick={exportProgress} className="srs-btn-debug">Exportar Progresso</button>
                <button onClick={importProgress} className="srs-btn-debug">Importar Progresso</button>
              </div>
            </div>
          ) : (
            <div className="srs-question-box fade-in">
              <p className="srs-question-text">{activeQuestion.question}</p>
              
              <div className="srs-options-grid">
                {activeQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.key;
                  return (
                    <button 
                      key={option.key}
                      onClick={() => handleAnswerSRS(option.key)}
                      className={`srs-option-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="srs-option-indicator">{option.key}</div>
                      <div>{option.text}</div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="srs-explanation-box fade-in">
                  <div className="srs-explanation-header">
                    {srsState.isCorrect ? (
                      <span style={{ color: 'var(--accent)' }}>✓ Resposta Correta! (+25 XP)</span>
                    ) : (
                      <span style={{ color: '#CCBCA1' }}>✗ Resposta Incorreta. O intervalo retornou para 1 dia.</span>
                    )}
                  </div>
                  <p className="srs-explanation-text">{activeQuestion.explanation}</p>
                </div>
              )}

              <div className="srs-actions">
                <div className="srs-debug-toolbar">
                  <button onClick={simulateAdvanceTime} className="srs-btn-debug">Simular Avanço de Tempo (Avançar 24h)</button>
                  <button onClick={resetSRS} className="srs-btn-debug">Resetar Questão</button>
                  <button onClick={exportProgress} className="srs-btn-debug">Exportar Progresso</button>
                  <button onClick={importProgress} className="srs-btn-debug">Importar Progresso</button>
                </div>
                
                {!srsState.completed ? (
                  <button 
                    onClick={submitSRS}
                    disabled={!selectedOption}
                    className="srs-btn-submit"
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      const newState = {
                        ...srsState,
                        completed: true
                      };
                      localStorage.setItem('painap_srs_state', JSON.stringify(newState));
                      setSrsState(newState);
                    }}
                    className="srs-btn-submit"
                  >
                    Finalizar Revisão
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Trilha de Aprendizado Visual */}
      <section className="featured-section" style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <h3>Trilha do Sucesso Comercial</h3>
          <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>Sua jornada passo a passo</span>
        </div>
        
        <div className="roadmap-container">
          {(() => {
            const getRoadmapForProfile = (profile) => {
              const isColaborador = profile === 'colaborador';
              return [
                {
                  phase: 1,
                  title: isColaborador ? 'Padronização Técnica e Franquias' : 'Arquitetura que Vende',
                  description: isColaborador 
                    ? 'Como garantir a perfeita replicação visual e técnica do padrão PAINAP no PDV de novos franqueados.' 
                    : 'Os segredos e bases estratégicas para transformar fachadas e pontos comerciais em máquinas de atração.',
                  status: 'completed',
                  image: '/img/curso_novo_1.png'
                },
                {
                  phase: 2,
                  title: isColaborador ? 'Zoneamento Operacional e Fluxo do PDV' : 'Estética que Fatura',
                  description: isColaborador 
                    ? 'Como analisar o fluxo técnico e a disposição operacional para reduzir gargalos na operação.' 
                    : 'Harmonização visual de alto padrão, escolha de paleta de cores corporativa e acabamentos premium.',
                  status: 'active',
                  image: '/img/curso_novo_2.png'
                },
                {
                  phase: 3,
                  title: isColaborador ? 'Controle de Prazos e Cronogramas' : 'A Loja como Experiência',
                  description: isColaborador 
                    ? 'Garantindo o cumprimento rigoroso dos prazos críticos para a inauguração da nova unidade.' 
                    : 'Criação de jornadas sensoriais, fluxos intuitivos e estímulos de consumo dentro da loja física.',
                  status: 'locked',
                  image: '/img/curso_novo_3.png'
                },
                {
                  phase: 4,
                  title: isColaborador ? 'Comunicação Visual e Padrões Construtivos' : 'O Luxo do Varejo',
                  description: isColaborador 
                    ? 'Como auditar fachadas e materiais autorizados para manter a consistência da marca.' 
                    : 'Estratégias de atração passiva de clientes e design de fachadas de alto padrão.',
                  status: 'locked',
                  image: '/img/curso_novo_4.png'
                },
                {
                  phase: 5,
                  title: isColaborador ? 'Auditoria de Implantação e Checklist Final' : 'Arquitetura de Posicionamento',
                  description: isColaborador 
                    ? 'Avaliação minuciosa de cada detalhe físico e estético antes de abrir as portas ao público.' 
                    : 'Como se consolidar como referência no mercado e atrair contratos corporativos de cinco dígitos.',
                  status: 'locked',
                  image: '/img/curso_novo_5.png'
                }
              ];
            };
            
            const steps = getRoadmapForProfile(activeProfile);
            
            return steps.map((step) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';
              return (
                <div key={step.phase} className={`roadmap-step ${isCompleted ? 'completed' : isActive ? 'active' : ''}`}>
                  <div className="step-marker">{isCompleted ? '✓' : step.phase}</div>
                  <div className="roadmap-card" onClick={() => navigate('/aluno/curso')}>
                    <div className="roadmap-image" style={{ backgroundImage: `url(${step.image})` }}></div>
                    <div className="roadmap-content">
                      <span style={{ 
                        color: isCompleted || isActive ? 'var(--accent)' : 'var(--text-secondary)', 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase' 
                      }}>
                        Fase {step.phase} • {isCompleted ? 'Concluído' : isActive ? 'Em Andamento' : 'Bloqueado'}
                      </span>
                      <h4 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{step.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </section>

      {/* Cases & Mentoria */}
      <section className="featured-section">
        <div className="section-header">
          <h3>Cases de Sucesso & Mentoria</h3>
          <button className="btn-text" onClick={() => navigate('/aluno/cases')}>Ver todos</button>
        </div>
        <div className="cards-grid">
          
          <div className="case-card glass-panel" style={{ 
            border: '2px solid var(--accent)', 
            background: 'var(--bg-primary)', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ padding: '2rem 1.5rem 1rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Logo Oficial 2:1 Mentoring (Ativo 36.png) */}
              <img src="/img/Ativo 36.png" alt="2:1 Mentoring" style={{ height: '64px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
              
              <span className="card-category" style={{ letterSpacing: '2px', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Mentoria Elite</span>
              <h4 style={{ fontFamily: 'Mosvita, serif', fontSize: '1.25rem', margin: '0.5rem 0 0.8rem 0', textTransform: 'uppercase' }}>2:1 MENTORING</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Destrave a expansão e escala de grandes franquias comerciais diretamente com os fundadores da PAINAP.
              </p>
            </div>
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}
                onClick={() => window.open('https://painap.vercel.app/', '_blank')}
              >
                Garantir Sessão VIP
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
