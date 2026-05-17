import React from 'react';
import { Plus, Edit2, Trash2, Link } from 'lucide-react';

export default function ManageCourses() {
  const courses = [
    { id: 1, title: 'A Psicologia do Espaço', module: 'Fundamentos', status: 'Publicado', embed: 'Sim' },
    { id: 2, title: 'Luz Quente vs Luz Fria', module: 'Iluminação', status: 'Publicado', embed: 'Sim' },
    { id: 3, title: 'Direcionamento de Fluxo', module: 'Iluminação', status: 'Rascunho', embed: 'Não' },
  ];

  return (
    <div className="fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Gerenciamento de Cursos</h1>
          <p>Adicione aulas, edite os embeds do YouTube e gerencie os módulos.</p>
        </div>
        <button style={{ 
          background: '#111', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', 
          borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' 
        }}>
          <Plus size={18} /> Nova Aula
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e4e8' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Título da Aula</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Módulo</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444' }}>Embed YT</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#444', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem 1.5rem', color: '#111', fontWeight: 500 }}>{course.title}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#666' }}>{course.module}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    background: course.status === 'Publicado' ? '#eefbf3' : '#f0f2f5', 
                    color: course.status === 'Publicado' ? '#10a345' : '#666',
                    padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600
                  }}>
                    {course.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#666' }}>
                  {course.embed === 'Sim' ? <Link size={16} color="#0056b3" /> : '-'}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', marginRight: '1rem' }}>
                    <Edit2 size={18} />
                  </button>
                  <button style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
