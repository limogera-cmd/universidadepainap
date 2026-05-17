import React, { useState } from 'react';
import { Search, Filter, MoreVertical, ShieldCheck, ShieldOff, Mail, Trash2, UserCheck } from 'lucide-react';

const MOCK_STUDENTS = [
  { id: 1, name: 'Mariana Oliveira', email: 'mariana@email.com', plan: 'Ouro', status: 'Ativo', progress: 72, joined: '10/01/2026' },
  { id: 2, name: 'Carlos Henrique', email: 'carlos.h@email.com', plan: 'Ouro', status: 'Ativo', progress: 45, joined: '15/02/2026' },
  { id: 3, name: 'Fernanda Lima', email: 'fer.lima@email.com', plan: 'Básico', status: 'Ativo', progress: 18, joined: '02/03/2026' },
  { id: 4, name: 'Ricardo Alves', email: 'r.alves@email.com', plan: 'Ouro', status: 'Bloqueado', progress: 90, joined: '20/11/2025' },
  { id: 5, name: 'Juliana Costa', email: 'jucosta@email.com', plan: 'Básico', status: 'Ativo', progress: 5, joined: '01/04/2026' },
  { id: 6, name: 'Thiago Braga', email: 'thiago.braga@email.com', plan: 'Ouro', status: 'Ativo', progress: 100, joined: '05/01/2026' },
];

export default function ManageStudents() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleStatus = (id) => {
    setStudents(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'Ativo' ? 'Bloqueado' : 'Ativo' } : s
    ));
    setActiveMenu(null);
  };

  const removeStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setActiveMenu(null);
  };

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Todos' || s.plan === filter || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Gestão de Alunos</h1>
          <p>Gerencie matrículas, planos e progresso dos alunos ativos.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Todos', 'Ouro', 'Básico', 'Ativo', 'Bloqueado'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem',
                fontWeight: 600, border: '1px solid',
                background: filter === f ? '#111' : 'transparent',
                color: filter === f ? '#fff' : '#666',
                borderColor: filter === f ? '#111' : '#ddd',
                transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', background: '#f8f9fa', border: '1px solid #e1e4e8', borderRadius: '8px', padding: '0.75rem 1rem' }}>
        <Search size={18} color="#999" />
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', color: '#111' }}
        />
      </div>

      {/* Students Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e4e8' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Aluno</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Plano</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Progresso</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Entrada</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#111', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0 }}>
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#111' }}>{s.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    background: s.plan === 'Ouro' ? '#fef5e6' : '#f0f2f5',
                    color: s.plan === 'Ouro' ? '#b38b22' : '#555',
                    padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700
                  }}>
                    {s.plan === 'Ouro' ? '⭐ ' : ''}{s.plan}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    background: s.status === 'Ativo' ? '#eefbf3' : '#fff0f0',
                    color: s.status === 'Ativo' ? '#10a345' : '#d32f2f',
                    padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600
                  }}>
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', minWidth: '140px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '6px', background: '#eee', borderRadius: '10px' }}>
                      <div style={{ width: `${s.progress}%`, height: '100%', background: s.progress === 100 ? '#10a345' : '#d4af37', borderRadius: '10px' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap' }}>{s.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#888', fontSize: '0.85rem' }}>{s.joined}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right', position: 'relative' }}>
                  <button
                    onClick={() => setActiveMenu(activeMenu === s.id ? null : s.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '0.25rem' }}
                  >
                    <MoreVertical size={18} />
                  </button>
                  {activeMenu === s.id && (
                    <div style={{
                      position: 'absolute', right: '1.5rem', top: '100%', background: '#fff',
                      border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      zIndex: 50, minWidth: '180px', overflow: 'hidden'
                    }}>
                      <button onClick={() => toggleStatus(s.id)} style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#333' }}>
                        {s.status === 'Ativo' ? <ShieldOff size={16} color="#d32f2f" /> : <ShieldCheck size={16} color="#10a345" />}
                        {s.status === 'Ativo' ? 'Bloquear Acesso' : 'Reativar Acesso'}
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#333' }}>
                        <Mail size={16} color="#0056b3" /> Enviar E-mail
                      </button>
                      <button onClick={() => removeStudent(s.id)} style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#d32f2f', borderTop: '1px solid #f5f5f5' }}>
                        <Trash2 size={16} /> Remover Aluno
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
            <UserCheck size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>Nenhum aluno encontrado com esse filtro.</p>
          </div>
        )}
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#999' }}>
        {filtered.length} aluno(s) exibido(s) · Total na base: {students.length}
      </p>
    </div>
  );
}
