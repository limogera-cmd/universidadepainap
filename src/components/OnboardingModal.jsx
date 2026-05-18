import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Store, Utensils, Stethoscope } from 'lucide-react';
import './OnboardingModal.css';

export default function OnboardingModal() {
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState('');
  const [focus, setFocus] = useState('');

  if (!user || !user.needsOnboarding) return null;

  const handleSelectProfile = (selectedProfile) => {
    setProfile(selectedProfile);
    localStorage.setItem('painap_student_profile', selectedProfile);
    setStep(2);
  };

  const handleSelectFocus = (selectedFocus) => {
    setFocus(selectedFocus);
    localStorage.setItem('painap_student_focus', selectedFocus);
    setStep(3);
  };

  const handleFinish = () => {
    // Dispatch custom event so Dashboard.jsx reloads the customized lessons immediately
    window.dispatchEvent(new Event('painap_profile_updated'));
    completeOnboarding();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel fade-in" style={{ border: '2px solid var(--accent)', borderRadius: '0' }}>
        {step === 1 && (
          <>
            <span className="subtitle" style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>PASSO 1 DE 2 • PERFIL DE ACESSO</span>
            <h2 style={{ fontFamily: 'LuxuryRigane, serif', marginTop: '0.8rem', textTransform: 'uppercase' }}>Defina sua Rota Estratégica</h2>
            <p>Selecione seu perfil de atuação para adaptarmos sua trilha de aprendizado e prazos críticos:</p>
            
            <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <button className="option-card" onClick={() => handleSelectProfile('colaborador')} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 'bold' }}>Franquias & Equipes</span>
                <span style={{ fontSize: '1.25rem', fontFamily: 'Mosvita, serif', color: 'white', textTransform: 'uppercase', margin: '0.4rem 0' }}>Colaborador Interno</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Foco em padronização operacional, controle técnico de expansão, checklists de PDV de novos franqueados e prazos rígidos de inauguração.
                </span>
              </button>
              
              <button className="option-card" onClick={() => handleSelectProfile('parceiro')} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 'bold' }}>Luxo & Negócios</span>
                <span style={{ fontSize: '1.25rem', fontFamily: 'Mosvita, serif', color: 'white', textTransform: 'uppercase', margin: '0.4rem 0' }}>Arquiteto Parceiro</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Foco em neuroarquitetura comercial de alto padrão, viabilidade (ROI), captação de clientes corporativos de alto padrão e escala de contratos.
                </span>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span className="subtitle" style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>PASSO 2 DE 2 • FOCO PRINCIPAL</span>
            <h2 style={{ fontFamily: 'LuxuryRigane, serif', marginTop: '0.8rem', textTransform: 'uppercase' }}>Qual é o seu nicho de atuação?</h2>
            <p>Selecione a sua principal vertical de projetos hoje:</p>
            
            <div className="options-grid">
              <button className="option-card" onClick={() => handleSelectFocus('varejo')}>
                <Store size={32} className="option-icon" />
                <span style={{ fontFamily: 'Mosvita, serif', textTransform: 'uppercase' }}>Varejo & Lojas</span>
              </button>
              <button className="option-card" onClick={() => handleSelectFocus('food')}>
                <Utensils size={32} className="option-icon" />
                <span style={{ fontFamily: 'Mosvita, serif', textTransform: 'uppercase' }}>Food Service</span>
              </button>
              <button className="option-card" onClick={() => handleSelectFocus('saude')}>
                <Stethoscope size={32} className="option-icon" />
                <span style={{ fontFamily: 'Mosvita, serif', textTransform: 'uppercase' }}>Saúde & Clínicas</span>
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span className="subtitle" style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>JORNADA INICIADA</span>
            <h2 style={{ fontFamily: 'LuxuryRigane, serif', marginTop: '0.8rem', textTransform: 'uppercase' }}>Sua Trilha Está Pronta!</h2>
            <p>
              Personalizamos o seu Dashboard. Módulos, cases de sucesso e relatórios técnicos foram reconfigurados especificamente para o perfil de{' '}
              <strong style={{ color: 'white' }}>{profile === 'colaborador' ? 'Colaborador Interno' : 'Arquiteto Parceiro'}</strong>.
            </p>
            <div className="success-animation" style={{ borderRadius: '0' }}>
              {/* Anim Placeholder */}
            </div>
            <button className="btn-primary" onClick={handleFinish} style={{ width: '100%', justifyContent: 'center' }}>
              Entrar na Universidade <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
