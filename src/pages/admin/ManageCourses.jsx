import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Link, Search, X, Check, Save } from 'lucide-react';

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

export default function ManageCourses() {
  const [lessons, setLessons] = useState(() => {
    const saved = localStorage.getItem('painap_lessons');
    return saved ? JSON.parse(saved) : DEFAULT_LESSONS;
  });

  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formModule, setFormModule] = useState('Módulo 1: Fundamentos');
  const [formCustomModule, setFormCustomModule] = useState('');
  const [useCustomModule, setUseCustomModule] = useState(false);
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formStatus, setFormStatus] = useState('Publicado');
  const [formDescription, setFormDescription] = useState('');

  // Persist lessons state
  useEffect(() => {
    localStorage.setItem('painap_lessons', JSON.stringify(lessons));
  }, [lessons]);

  const uniqueModules = Array.from(new Set(lessons.map(l => l.module)));

  const getYoutubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleOpenAdd = () => {
    setEditingLesson(null);
    setFormTitle('');
    setFormModule(uniqueModules[0] || 'Módulo 1: Fundamentos');
    setUseCustomModule(false);
    setFormCustomModule('');
    setFormVideoUrl('');
    setFormDuration('');
    setFormStatus('Publicado');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lesson) => {
    setEditingLesson(lesson);
    setFormTitle(lesson.title);
    setFormModule(lesson.module);
    setUseCustomModule(false);
    setFormCustomModule('');
    setFormVideoUrl(lesson.videoUrl || '');
    setFormDuration(lesson.duration || '');
    setFormStatus(lesson.status);
    setFormDescription(lesson.description || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir esta aula?')) {
      setLessons(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formTitle) return alert('Por favor, preencha o título da aula.');

    const finalModule = useCustomModule ? formCustomModule : formModule;
    if (!finalModule) return alert('Por favor, informe o módulo da aula.');

    const videoId = getYoutubeId(formVideoUrl);
    const finalVideoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';

    if (editingLesson) {
      // Edit
      setLessons(prev => prev.map(l => 
        l.id === editingLesson.id 
          ? { 
              ...l, 
              title: formTitle, 
              module: finalModule, 
              videoUrl: finalVideoUrl, 
              duration: formDuration || '10:00',
              status: formStatus,
              description: formDescription
            } 
          : l
      ));
    } else {
      // Create new
      const newLesson = {
        id: Date.now(),
        title: formTitle,
        module: finalModule,
        videoUrl: finalVideoUrl,
        duration: formDuration || '10:00',
        status: formStatus,
        description: formDescription
      };
      setLessons(prev => [...prev, newLesson]);
    }

    setIsModalOpen(false);
  };

  const filteredLessons = lessons.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || 
                          l.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterModule === 'Todos' || l.module === filterModule;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Gerenciamento de Aulas</h1>
          <p>Adicione novas videoaulas, configure links de embed do YouTube e gerencie os módulos.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          style={{ 
            background: '#111', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', 
            borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' 
          }}
        >
          <Plus size={18} /> Nova Aula
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8f9fa', border: '1px solid #e1e4e8', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <Search size={18} color="#999" />
          <input
            type="text"
            placeholder="Buscar pelo título ou descrição da aula..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', color: '#111' }}
          />
        </div>

        <select 
          value={filterModule} 
          onChange={e => setFilterModule(e.target.value)}
          style={{ padding: '0.75rem 1rem', border: '1px solid #e1e4e8', borderRadius: '8px', background: '#fff', fontSize: '0.95rem', color: '#333', outline: 'none' }}
        >
          <option value="Todos">Todos os Módulos</option>
          {uniqueModules.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table grid */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e4e8' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Título da Aula</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Módulo</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Duração</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Vídeo Embed</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map(lesson => {
              const videoId = getYoutubeId(lesson.videoUrl);
              return (
                <tr key={lesson.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 600, color: '#111' }}>{lesson.title}</div>
                    {lesson.description && <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lesson.description}</div>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#555', fontSize: '0.9rem' }}>{lesson.module}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#666', fontSize: '0.9rem' }}>{lesson.duration}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      background: lesson.status === 'Publicado' ? '#eefbf3' : '#fff0f0', 
                      color: lesson.status === 'Publicado' ? '#10a345' : '#d32f2f',
                      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600
                    }}>
                      {lesson.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#666' }}>
                    {videoId ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0056b3', fontSize: '0.85rem' }}>
                        <Link size={14} />
                        <span>{videoId}</span>
                      </div>
                    ) : (
                      <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Sem vídeo</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleOpenEdit(lesson)}
                      style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', marginRight: '1rem', padding: '0.25rem' }}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(lesson.id)}
                      style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', padding: '0.25rem' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredLessons.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
                  Nenhuma aula cadastrada com os filtros informados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="admin-card fade-in" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', background: '#fff', borderRadius: '12px', padding: '2rem' }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#666' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontFamily: 'Arsenal, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: '1.5rem' }}>
              {editingLesson ? 'Editar Videoaula' : 'Cadastrar Nova Aula'}
            </h2>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Título da Aula</label>
                <input 
                  type="text" 
                  value={formTitle} 
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Ex: Luz Quente vs Luz Fria"
                  required
                  style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>Módulo</label>
                  <button 
                    type="button" 
                    onClick={() => setUseCustomModule(!useCustomModule)}
                    style={{ background: 'none', border: 'none', color: '#b38b22', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {useCustomModule ? 'Selecionar Módulo Existente' : '+ Criar Novo Módulo'}
                  </button>
                </div>
                {useCustomModule ? (
                  <input 
                    type="text" 
                    value={formCustomModule} 
                    onChange={e => setFormCustomModule(e.target.value)}
                    placeholder="Ex: Módulo 3: Cores e Sensações"
                    style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem' }}
                  />
                ) : (
                  <select 
                    value={formModule} 
                    onChange={e => setFormModule(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', fontSize: '0.9rem' }}
                  >
                    {uniqueModules.length > 0 ? uniqueModules.map(m => (
                      <option key={m} value={m}>{m}</option>
                    )) : (
                      <option value="Módulo 1: Fundamentos">Módulo 1: Fundamentos</option>
                    )}
                  </select>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>URL do Vídeo (YouTube)</label>
                  <input 
                    type="text" 
                    value={formVideoUrl} 
                    onChange={e => setFormVideoUrl(e.target.value)}
                    placeholder="Ex: https://www.youtube.com/watch?v=..."
                    style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Duração (MM:SS)</label>
                  <input 
                    type="text" 
                    value={formDuration} 
                    onChange={e => setFormDuration(e.target.value)}
                    placeholder="Ex: 15:40"
                    style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Descrição da Aula</label>
                <textarea 
                  value={formDescription} 
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Descreva brevemente os tópicos abordados nesta aula complementar..."
                  rows="3"
                  style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Status da Aula</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['Publicado', 'Rascunho'].map(statusOption => (
                    <label key={statusOption} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', color: '#333' }}>
                      <input 
                        type="radio" 
                        name="status"
                        checked={formStatus === statusOption}
                        onChange={() => setFormStatus(statusOption)}
                        style={{ cursor: 'pointer' }}
                      />
                      {statusOption}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ 
                    flex: 1, padding: '0.75rem', background: '#fff', border: '1px solid #ddd', 
                    borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#666' 
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{ 
                    flex: 1, padding: '0.75rem', background: '#111', border: 'none', 
                    borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                  }}
                >
                  <Save size={16} /> Salvar Aula
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
