import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Store, Utensils, Stethoscope } from 'lucide-react';
import './OnboardingModal.css';

export default function OnboardingModal() {
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);

  if (!user || !user.needsOnboarding) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel fade-in">
        {step === 1 ? (
          <>
            <h2>Bem-vindo à Universidade PAINAP</h2>
            <p>Para montarmos a sua trilha de aprendizado ideal, conte para nós: qual é o seu foco principal de projetos hoje?</p>
            
            <div className="options-grid">
              <button className="option-card" onClick={() => setStep(2)}>
                <Store size={32} className="option-icon" />
                <span>Varejo & Lojas</span>
              </button>
              <button className="option-card" onClick={() => setStep(2)}>
                <Utensils size={32} className="option-icon" />
                <span>Food Service</span>
              </button>
              <button className="option-card" onClick={() => setStep(2)}>
                <Stethoscope size={32} className="option-icon" />
                <span>Saúde & Clínicas</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Excelente escolha!</h2>
            <p>Personalizamos o seu Dashboard com os melhores cases e módulos focados na sua área de atuação.</p>
            <div className="success-animation">
              {/* Anim Placeholder */}
            </div>
            <button className="btn-primary" onClick={completeOnboarding}>
              Começar a Estudar <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
