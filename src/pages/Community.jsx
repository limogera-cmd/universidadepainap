import React from 'react';
import { MessageSquare, ThumbsUp, Share2, Award } from 'lucide-react';

export default function Community() {
  const posts = [
    { 
      author: "Maria Silva", 
      role: "Arquiteta Varejo", 
      badge: "Arquiteta de Elite",
      badgeColor: "linear-gradient(135deg, #d4af37, #b38b22)",
      content: "Alguém tem indicação de fornecedor de ACM dourado escovado em SP? Preciso para uma fachada de franquia de alto luxo.", 
      likes: 12, 
      comments: 4 
    },
    { 
      author: "Carlos Eduardo", 
      role: "Design de Franquias", 
      badge: "Referência",
      badgeColor: "#1e1a0a",
      content: "Apliquei os conceitos do módulo 2 no projeto da clínica e o cliente aprovou de primeira! Reduzimos as luzes brancas na recepção.", 
      likes: 34, 
      comments: 8 
    },
    {
      author: "Carina Souza",
      role: "Fundadora PAINAP",
      badge: "Sócio PAINAP",
      badgeColor: "#ff4d4f",
      content: "Parabéns Carlos! Esse é exatamente o efeito da Psicologia de Iluminação. Aumenta a ocitocina e gera uma recepção muito mais acolhedora.",
      likes: 56,
      comments: 11
    }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'var(--text-primary)' }}>Networking & Comunidade</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Troque experiências e encontre fornecedores de alto padrão.</p>
        </div>
        <button className="btn-primary">Novo Tópico</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 'bold' }}>
                {post.author.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h4 style={{ color: 'var(--text-primary)' }}>{post.author}</h4>
                  
                  {/* Badge de Hierarquia */}
                  <span style={{ 
                    background: post.badgeColor, 
                    color: post.badgeColor.startsWith('#ff') ? 'white' : 'var(--accent)',
                    fontSize: '0.7rem', 
                    padding: '0.1rem 0.5rem', 
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    border: '1px solid var(--accent)'
                  }}>
                    <Award size={10} /> {post.badge}
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{post.role}</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{post.content}</p>
            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <ThumbsUp size={18} /> {post.likes}
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <MessageSquare size={18} /> {post.comments}
              </button>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginLeft: 'auto' }}>
                <Share2 size={18} /> Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
