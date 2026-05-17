import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ChevronDown, ChevronUp, AlertCircle, PlayCircle } from 'lucide-react';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Exit Intent Logic
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const faqs = [
    {
      q: "A Universidade PAINAP é para quem está começando na arquitetura?",
      a: "O conteúdo é focado em arquitetos que buscam elevar seu faturamento através de projetos comerciais estratégicos. Se você quer atuar com marcas e franquias, sim."
    },
    {
      q: "Terei acesso aos arquivos da Toolbox?",
      a: "Sim. A versão Ouro destrava todos os nossos blocos 3D, templates de contrato e planilhas de gestão que usamos com nossos clientes high-ticket."
    },
    {
      q: "O acesso é vitalício?",
      a: "O acesso padrão é anual para garantir que você sempre receba as metodologias mais atualizadas do mercado de varejo."
    }
  ];

  return (
    <div className="landing-container fade-in">
      {/* Scarcity Banner */}
      <div className="scarcity-banner">
        ⚠️ Atenção: As matrículas para a nova turma fecham em breve. Vagas Ouro limitadas.
      </div>

      {/* Navbar */}
      <nav className="landing-navbar">
        <img src="/img/logo site (3).png" alt="PAINAP Logo" className="brand-logo-img" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        <button className="btn-secondary" onClick={() => navigate('/login')} style={{ padding: '0.5rem 1.5rem' }}>
          Acesso Alunos
        </button>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-content">
          <h1>Arquitetura que gera lucro.</h1>
          <p>Domine o Método PAINAP e transforme projetos comerciais em verdadeiras máquinas de venda para seus clientes.</p>
          <button className="btn-primary hero-cta" onClick={() => navigate('/login')}>
            Garantir Minha Vaga <ArrowRight size={20} style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </header>

      {/* Social Proof */}
      <section className="social-proof">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'Mosvita, serif' }}>O que nossos alunos dizem</h2>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card glass-panel">
            <p>"Depois de aplicar a metodologia de fluxo de loja, consegui fechar meu primeiro projeto de rede de franquias. O valor cobrado pagou o curso 10x."</p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ backgroundImage: 'url(/img/socia_2.jpg)', backgroundSize: 'cover' }}></div>
              <div>
                <strong>Mariana Silva</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Arquiteta Comercial</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card glass-panel">
            <p>"O módulo de Iluminação Estratégica mudou completamente como eu apresento meus renders. A aprovação agora é de primeira."</p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ backgroundImage: 'url(/img/socia_3.jpg)', backgroundSize: 'cover' }}></div>
              <div>
                <strong>Carlos Mendes</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Especialista em Varejo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blurred Toolbox Preview */}
      <section className="toolbox-preview">
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Mosvita, serif' }}>Acesso Exclusivo à Toolbox</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Os exatos mesmos arquivos, blocos e contratos que usamos na PAINAP.</p>
        
        <div className="toolbox-grid-locked">
          <div className="lock-overlay">
            <Lock size={40} color="var(--accent)" />
            <h3>Acesso Restrito</h3>
            <p>Destrave matriculando-se na versão Ouro</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>Ver Planos</button>
          </div>
          
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="case-card glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--accent)' }}>Blocos 3D Premium</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Coleção completa de expositores paramétricos.</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Mosvita, serif', textAlign: 'center', marginBottom: '3rem' }}>Perguntas Frequentes</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
              <div className="faq-question">
                {faq.q}
                {openFaq === index ? <ChevronUp size={20} color="var(--accent)" /> : <ChevronDown size={20} />}
              </div>
              {openFaq === index && <div className="faq-answer fade-in">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="exit-intent-overlay" onClick={() => setShowExitIntent(false)}>
          <div className="exit-intent-modal fade-in" onClick={e => e.stopPropagation()}>
            <AlertCircle size={48} color="var(--accent)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontFamily: 'Mosvita, serif', fontSize: '2rem', marginBottom: '1rem' }}>Espere!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Não saia sem garantir o seu bônus especial. Ganhe <strong>20% de desconto</strong> se finalizar sua matrícula agora.
            </p>
            <button className="btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }} onClick={() => navigate('/login')}>
              Quero meu desconto
            </button>
            <button className="btn-secondary" style={{ width: '100%', border: 'none' }} onClick={() => setShowExitIntent(false)}>
              Vou pensar melhor
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-col footer-brand">
          <img src="/img/logo site (3).png" alt="PAINAP Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '260px' }}>
            Transformando o mercado de arquitetura comercial no Brasil. Projetos que vendem.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/arq.painap/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram PAINAP">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/painap" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn PAINAP">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.youtube.com/@painap" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube PAINAP">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="social-link" title="WhatsApp PAINAP">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Conteúdo</h4>
          <ul>
            <li>Arquitetura que Vende</li>
            <li>Estética que Fatura</li>
            <li>A Loja como Experiência</li>
            <li>O Luxo do Varejo</li>
            <li>Arquitetura de Posicionamento</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Plataforma</h4>
          <ul>
            <li onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Área do Aluno</li>
            <li onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Toolbox VIP</li>
            <li onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Comunidade</li>
            <li onClick={() => window.open('https://painap.vercel.app/', '_blank')} style={{ cursor: 'pointer' }}>Mentoria 1-on-1</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Políticas</h4>
          <ul>
            <li onClick={() => navigate('/politicas?tab=termos')} style={{ cursor: 'pointer' }}>Termos de Uso</li>
            <li onClick={() => navigate('/politicas?tab=privacidade')} style={{ cursor: 'pointer' }}>Privacidade & LGPD</li>
            <li onClick={() => navigate('/politicas?tab=suporte')} style={{ cursor: 'pointer' }}>Suporte ao Aluno</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Universidade PAINAP · Todos os direitos reservados · PAINAP Arquitetura Ltda.</p>
        </div>
      </footer>
    </div>
  );
}
