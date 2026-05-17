import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError('Credenciais inválidas. Use admin@painap.com ou aluno@painap.com');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box glass-panel fade-in">
        <div className="login-header">
          <h2>UNIVERSIDADE</h2>
          <span className="subtitle">PAINAP</span>
        </div>
        
        <p className="login-desc">Acesse a plataforma de elite da Arquitetura de Consumo.</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Seu E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Sua Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-login-submit">
            <span>Entrar na Universidade</span>
            <LogIn size={20} />
          </button>
        </form>

        <div className="login-footer">
          <p>Credenciais de teste:</p>
          <small>Admin: admin@painap.com / admin</small><br/>
          <small>Aluno: aluno@painap.com / aluno</small>
        </div>
      </div>
    </div>
  );
}
