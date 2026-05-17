import React, { useState } from 'react';
import { Save, Globe, Lock, Bell, Palette, CreditCard, Link2, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    platformName: 'Universidade PAINAP',
    platformUrl: 'https://universidadepainap.vercel.app',
    supportEmail: 'contato@painap.com.br',
    whatsapp: '5511999999999',
    instagram: 'https://www.instagram.com/arq.painap/',
    linkedin: 'https://www.linkedin.com/company/painap',
    youtube: 'https://www.youtube.com/@painap',
    maintenanceMode: false,
    newRegistrations: true,
    emailNotifications: true,
    scarcityBannerText: 'Atenção: As matrículas para a nova turma fecham em breve. Vagas Ouro limitadas.',
    scarcityBannerActive: true,
    accentColor: '#d4af37',
  });

  const set = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
        <div style={{ padding: '0.6rem', background: '#f8f9fa', borderRadius: '8px' }}><Icon size={18} color="#555" /></div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111' }}>{title}</h3>
      </div>
      {children}
    </div>
  );

  const Field = ({ label, hint, children }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>{label}</label>
      {hint && <p style={{ fontSize: '0.78rem', color: '#999', marginBottom: '0.5rem' }}>{hint}</p>}
      {children}
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '0.9rem', color: '#111', background: '#fff', outline: 'none',
    fontFamily: 'Arsenal, Inter, sans-serif'
  };

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: '46px', height: '26px', borderRadius: '13px', border: 'none', cursor: 'pointer',
        background: value ? '#10a345' : '#ccc', position: 'relative', transition: 'background 0.3s'
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '3px', transition: 'left 0.3s',
        left: value ? '23px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }} />
    </button>
  );

  return (
    <div className="fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Configurações da Plataforma</h1>
          <p>Gerencie as configurações globais, integrações e preferências da Universidade PAINAP.</p>
        </div>
        <button
          onClick={handleSave}
          style={{
            background: saved ? '#10a345' : '#111', color: '#fff', border: 'none',
            padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.3s'
          }}
        >
          {saved ? <CheckCircle size={18} /> : <Save size={18} />}
          {saved ? 'Salvo!' : 'Salvar Alterações'}
        </button>
      </div>

      <Section icon={Globe} title="Informações Gerais da Plataforma">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Nome da Plataforma">
            <input style={inputStyle} value={settings.platformName} onChange={e => set('platformName', e.target.value)} />
          </Field>
          <Field label="URL da Plataforma">
            <input style={inputStyle} value={settings.platformUrl} onChange={e => set('platformUrl', e.target.value)} />
          </Field>
          <Field label="E-mail de Suporte">
            <input style={inputStyle} value={settings.supportEmail} onChange={e => set('supportEmail', e.target.value)} />
          </Field>
          <Field label="WhatsApp (com DDI, sem +)">
            <input style={inputStyle} value={settings.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section icon={Link2} title="Redes Sociais Oficiais">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Instagram">
            <input style={inputStyle} value={settings.instagram} onChange={e => set('instagram', e.target.value)} />
          </Field>
          <Field label="LinkedIn">
            <input style={inputStyle} value={settings.linkedin} onChange={e => set('linkedin', e.target.value)} />
          </Field>
          <Field label="YouTube">
            <input style={inputStyle} value={settings.youtube} onChange={e => set('youtube', e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section icon={Bell} title="Banner de Escassez (Landing Page)">
        <Field label="Texto do Banner" hint="Exibido no topo da Landing Page para gerar urgência.">
          <input style={inputStyle} value={settings.scarcityBannerText} onChange={e => set('scarcityBannerText', e.target.value)} />
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <div>
            <strong style={{ fontSize: '0.9rem', color: '#333' }}>Banner de Urgência Ativo</strong>
            <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.2rem' }}>Exibe o aviso de vagas limitadas na página inicial.</p>
          </div>
          <Toggle value={settings.scarcityBannerActive} onChange={v => set('scarcityBannerActive', v)} />
        </div>
      </Section>

      <Section icon={Lock} title="Controle de Acesso">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#333' }}>Modo Manutenção</strong>
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.2rem' }}>Bloqueia o acesso de alunos enquanto você faz atualizações.</p>
            </div>
            <Toggle value={settings.maintenanceMode} onChange={v => set('maintenanceMode', v)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#333' }}>Novas Matrículas</strong>
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.2rem' }}>Permite que novos alunos se cadastrem na plataforma.</p>
            </div>
            <Toggle value={settings.newRegistrations} onChange={v => set('newRegistrations', v)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#333' }}>Notificações por E-mail</strong>
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.2rem' }}>Envia e-mails automáticos para novos alunos e atualizações.</p>
            </div>
            <Toggle value={settings.emailNotifications} onChange={v => set('emailNotifications', v)} />
          </div>
        </div>
      </Section>

      <Section icon={CreditCard} title="Integração de Pagamentos">
        <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ddd' }}>
          <CreditCard size={36} color="#ccc" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ color: '#555', marginBottom: '0.5rem' }}>Aguardando Integração</h4>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>Conecte o Stripe, Hotmart ou Kiwify para gerenciar assinaturas diretamente aqui.</p>
          <button style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Conectar Gateway
          </button>
        </div>
      </Section>
    </div>
  );
}
