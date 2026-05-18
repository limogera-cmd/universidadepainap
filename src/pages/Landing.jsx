import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
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
      q: "O que é o conceito de 'Arquitetura de Consumo' ensinado na Escola?",
      a: "É a metodologia que enxerga o espaço físico como um ativo gerador de lucro e escala de vendas, combinando neuroarquitetura, zoneamento de calor comercial, técnicas de visual merchandising e cálculo de viabilidade de reforma."
    },
    {
      q: "A Escola serve para arquitetos recém-formados?",
      a: "Sim, se você quer pular a fase de fazer projetos residenciais de baixo valor e se posicionar imediatamente como um especialista estratégico altamente remunerado por marcas e redes de varejo."
    },
    {
      q: "O que está incluso na PAINAP Toolbox?",
      a: "Tudo o que você precisa para operar profissionalmente: modelos de propostas comerciais high-ticket, blocos 3D técnicos de varejo, planilhas financeiras de ROI e checklists de implantação física em shopping e rua."
    }
  ];

  return (
    <div className="landing-container fade-in">
      {/* Scarcity Banner */}
      <div className="scarcity-banner">
        ⚠️ Atenção: As matrículas para a nova turma da Elite PAINAP fecham em breve. Apenas 7 vagas restantes.
      </div>

      {/* Navbar */}
      <nav className="landing-navbar">
        <img src="/img/LOGO SITE 4.png" alt="PAINAP Logo" className="brand-logo-img" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        <button className="btn-secondary" onClick={() => navigate('/login')} style={{ padding: '0.5rem 1.5rem' }}>
          Acesso Alunos
        </button>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-content">
          <h1>Arquitetura de Consumo: Projetamos ambientes como ativos estratégicos.</h1>
          <p>Não somos decoradores. Somos estrategistas. Domine a metodologia exata da PAINAP para criar projetos comerciais de alto impacto que atraem fluxo, maximizam o ROI do investidor e vendem de forma previsível.</p>
          <button className="btn-primary hero-cta" onClick={() => navigate('/login')}>
            Entrar para a Elite da Arquitetura <ArrowRight size={20} style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </header>

      {/* Social Proof */}
      <section className="social-proof">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'Mosvita, serif', textTransform: 'uppercase' }}>O Impacto do Método no Mercado</h2>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card glass-panel">
            <p>"Depois de dominar a metodologia de fluxo comercial e jornada de consumo da PAINAP, fechei meu primeiro projeto de rede com 12 lojas de cosméticos. O cliente percebeu que eu não estava vendendo decoração, mas sim um ativo gerador de lucro."</p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ backgroundImage: 'url(/img/socia_2.jpg)', backgroundSize: 'cover' }}></div>
              <div>
                <strong>Mariana Silva</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Arquiteta & Estrategista de Varejo</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card glass-panel">
            <p>"A Escola PAINAP me deu o vocabulário e a técnica que os grandes varejistas exigem. Apresentar um projeto baseado em dados de atração visual e inteligência de vendas tornou a aprovação 3x mais rápida. Paguei o investimento na primeira mentoria."</p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ backgroundImage: 'url(/img/socia_3.jpg)', backgroundSize: 'cover' }}></div>
              <div>
                <strong>Carlos Mendes</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Especialista em Franquias</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blurred Toolbox Preview */}
      <section className="toolbox-preview">
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Mosvita, serif', textTransform: 'uppercase' }}>PAINAP Toolbox: O Arsenal Estratégico</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.1rem' }}>Os exatos mesmos recursos táticos, templates de contrato, blocos de gôndolas e planilhas de ROI que usamos com nossos clientes high-ticket.</p>
        
        <div className="toolbox-grid-locked">
          <div className="lock-overlay">
            <Lock size={40} color="var(--accent)" />
            <h3>Acesso Restrito</h3>
            <p>O arsenal tático da PAINAP é exclusivo para alunos matriculados na trilha de elite.</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>Liberar Acesso</button>
          </div>
          
          <div className="case-card glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
            <h4 style={{ color: 'var(--accent)', fontFamily: 'Mosvita, serif' }}>EXPOSITORES PARAMÉTRICOS</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Coleção de blocos 3D focados em aumentar o Sell-Out por metro quadrado.</p>
          </div>
          <div className="case-card glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
            <h4 style={{ color: 'var(--accent)', fontFamily: 'Mosvita, serif' }}>TEMPLATES DE CONTRATOS VIP</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Modelos jurídicos blindados para contratação de grandes redes e shoppings.</p>
          </div>
          <div className="case-card glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
            <h4 style={{ color: 'var(--accent)', fontFamily: 'Mosvita, serif' }}>CALCULADORA DE ROI</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Planilha matemática para provar ao investidor o retorno do investimento no ponto físico.</p>
          </div>
          <div className="case-card glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
            <h4 style={{ color: 'var(--accent)', fontFamily: 'Mosvita, serif' }}>DIRETRIZES DE MARCA 3D</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>Manuais táticos para traduzir a identidade visual corporativa em arquitetura.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Mosvita, serif', textAlign: 'center', marginBottom: '3rem', textTransform: 'uppercase' }}>Perguntas Frequentes</h2>
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
            <h2 style={{ fontFamily: 'Mosvita, serif', fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Não deixe o dinheiro do seu cliente escorrer.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Ao sair sem conhecer o Método PAINAP, você continua vendendo decoração simples e perdendo projetos high-ticket. Garanta <strong>20% de desconto</strong> se der o primeiro passo rumo à elite agora.
            </p>
            <button className="btn-primary" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }} onClick={() => navigate('/login')}>
              Destravar Meu Desconto Especial
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
          <img src="/img/LOGO SITE 4.png" alt="PAINAP Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '260px' }}>
            Transformando o mercado de arquitetura comercial no Brasil. Projetamos para que cada ambiente seja um ponto de partida, nunca um ponto final.
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
          <p>© {new Date().getFullYear()} Escola PAINAP · Todos os direitos reservados · PAINAP Arquitetura Ltda.</p>
        </div>
      </footer>
    </div>
  );
}
