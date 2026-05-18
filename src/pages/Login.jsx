import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSSOLogin = (provider) => {
    login('aluno@painap.com', 'aluno');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError('E-mail ou senha incorretos. Verifique seus dados e tente novamente.');
    }
  };

  return (
    <div className="login-page-wrapper">
      
      {/* Formulário de Login */}
      <div className="login-form-side">
        <div className="login-box glass-panel fade-in">
          <div className="login-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <img src="/img/logo site (3).png" alt="PAINAP Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            <span className="subtitle" style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, margin: 0 }}>UNIVERSIDADE</span>
          </div>
          
          <p className="login-desc">O acesso à elite da Arquitetura de Consumo requer identificação.</p>
          
          <div className="social-login-group">
            <button type="button" className="btn-social" onClick={() => handleSSOLogin('Google')}>
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Workspace
            </button>
            <button type="button" className="btn-social" onClick={() => handleSSOLogin('Microsoft')}>
              <svg width="20" height="20" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h11v11H0z" fill="#f25022"/>
                <path d="M12 0h11v11H12z" fill="#7fba00"/>
                <path d="M0 12h11v11H0z" fill="#00a4ef"/>
                <path d="M12 12h11v11H12z" fill="#ffb900"/>
              </svg>
              Microsoft Entra ID
            </button>
          </div>

          <div className="login-divider">ou use seu e-mail</div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message" style={{ color: '#ff4d4f', borderLeft: '2px solid #ff4d4f', paddingLeft: '1rem', marginBottom: '1rem' }}>{error}</div>}
            
            <div className="input-group">
              <input 
                type="email" 
                placeholder="E-mail VIP" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginBottom: '1rem', outline: 'none' }}
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Senha de Acesso" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginBottom: '1.5rem', outline: 'none' }}
              />
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <span>Acessar Universidade</span>
              <LogIn size={20} />
            </button>
          </form>

        </div>
      </div>

      {/* Brand & Social Proof Side */}
      <div className="login-brand-side fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="brand-proof-card">
          <p>"O que antes era apenas layout, agora é estratégia pura. Multipliquei o valor dos meus contratos mostrando como meu projeto afeta o caixa do cliente final."</p>
          <div className="brand-proof-author">Renata C. — Arquiteta de Varejo</div>
        </div>
      </div>

    </div>
  );
}
