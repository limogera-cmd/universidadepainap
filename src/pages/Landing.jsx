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
        <div className="logo">PAINAP<span>.</span></div>
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
        <div className="footer-col">
          <h4>UNIVERSIDADE PAINAP</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Transformando o mercado de arquitetura comercial no Brasil.</p>
        </div>
        <div className="footer-col">
          <h4>Conteúdo</h4>
          <ul>
            <li>Psicologia do Espaço</li>
            <li>Iluminação para Varejo</li>
            <li>Gestão de Projetos</li>
            <li>Precificação High-Ticket</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Políticas</h4>
          <ul>
            <li>Termos de Uso</li>
            <li>Privacidade</li>
            <li>Suporte ao Aluno</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
