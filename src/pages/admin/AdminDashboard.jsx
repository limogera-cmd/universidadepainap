import React from 'react';
import { TrendingUp, Users, PlayCircle, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="fade-in">
      <div className="admin-header">
        <h1>Dashboard Geral</h1>
        <p>Acompanhe o desempenho da plataforma e métricas de alunos.</p>
      </div>

      <div className="admin-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#e6f0fa', color: '#0056b3', borderRadius: '12px' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Receita Recorrente (MRR)</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111' }}>R$ 42.500</span>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#eefbf3', color: '#10a345', borderRadius: '12px' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Alunos Ativos</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111' }}>284</span>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#fef5e6', color: '#d48a1c', borderRadius: '12px' }}>
            <PlayCircle size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Aulas Assistidas (Mês)</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111' }}>1.432</span>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#fef1f2', color: '#e11d48', borderRadius: '12px' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Taxa de Conclusão</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111' }}>68%</span>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
        <TrendingUp size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <h3>Gráfico de Engajamento e Receita</h3>
        <p>Aguardando integração com API de pagamentos (Ex: Stripe)</p>
      </div>
    </div>
  );
}
