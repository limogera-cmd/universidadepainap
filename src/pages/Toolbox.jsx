import React, { useState } from 'react';
import { Download, Box, Layers, ClipboardCheck, Lock, Star } from 'lucide-react';

export default function Toolbox() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (idx) => {
    setFavorites(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const assets = [
    { title: "Kit de Iluminação Comercial", icon: Box, type: "Blocos SketchUp" },
    { title: "Famílias Revit - Marcenaria", icon: Layers, type: "Famílias Revit" },
    { title: "Checklist de Vistoria (Food)", icon: ClipboardCheck, type: "Checklist Interativo" },
    { title: "Planilha de Precificação Corporativa High-Ticket", icon: ClipboardCheck, type: "Planilhas VIP", premium: true },
    { title: "Template de Contrato Jurídico PAINAP (5 dígitos)", icon: Layers, type: "Documentos de Gestão", premium: true },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Toolbox PAINAP</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Faça o download de assets e checklists exclusivos usados em nossos projetos reais.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {assets.map((asset, idx) => (
          <div key={idx} className="glass-panel" style={{ 
            padding: '2rem', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', textAlign: 'center', gap: '1rem', 
            transition: 'all 0.3s', position: 'relative',
            opacity: asset.premium ? 0.75 : 1
          }}>
            
            {/* Favorite Star Button */}
            <button 
              onClick={() => toggleFavorite(idx)}
              style={{
                position: 'absolute', top: '1rem', left: '1rem',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: favorites[idx] ? 'var(--accent)' : 'var(--text-secondary)'
              }}
            >
              <Star size={20} fill={favorites[idx] ? 'var(--accent)' : 'none'} />
            </button>

            {asset.premium && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: 'var(--bg-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                VIP OURO
              </div>
            )}

            <div style={{ padding: '1.5rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', color: 'var(--accent)' }}>
              <asset.icon size={36} />
            </div>
            
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{asset.type}</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{asset.title}</h3>
            
            {asset.premium ? (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', border: '1px dashed var(--accent)' }}>
                <Lock size={16} /> Destravar com Ouro
              </button>
            ) : (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Download size={18} /> Baixar Asset
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
