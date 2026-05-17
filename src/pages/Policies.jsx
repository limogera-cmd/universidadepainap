import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Lock, HeadphonesIcon, ChevronLeft } from 'lucide-react';

const TABS = [
  { id: 'termos', label: 'Termos de Uso', icon: ShieldCheck },
  { id: 'privacidade', label: 'Política de Privacidade', icon: Lock },
  { id: 'suporte', label: 'Suporte ao Aluno', icon: HeadphonesIcon },
];

export default function Policies() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState('termos');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TABS.some(t => t.id === tab)) {
      setActive(tab);
    }
  }, [searchParams]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'Arsenal, sans-serif' }}>
      
      {/* Navbar simples */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5%', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ fontFamily: 'Mosvita, serif', fontSize: '1.6rem' }}>PAINAP<span style={{ color: 'var(--accent)' }}>.</span></div>
        <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={18} /> Voltar ao Site
        </button>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 5%' }}>
        <h1 style={{ fontFamily: 'Mosvita, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Central de Políticas</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Última atualização: Janeiro de 2026 · PAINAP Arquitetura Ltda.</p>

        {/* Tab Nav */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: active === t.id ? 'var(--accent)' : 'var(--text-secondary)',
              borderBottom: active === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              fontFamily: 'Arsenal, sans-serif', fontWeight: active === t.id ? 700 : 400, fontSize: '0.95rem',
              transition: 'all 0.2s', marginBottom: '-1px'
            }}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Termos de Uso */}
        {active === 'termos' && (
          <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <Section title="1. Aceitação dos Termos">
              Ao acessar e utilizar a plataforma Universidade PAINAP, você concorda integralmente com estes Termos de Uso. Se não concordar com qualquer disposição aqui contida, pedimos que não utilize os serviços disponibilizados.
            </Section>
            <Section title="2. Natureza do Serviço">
              A Universidade PAINAP é uma plataforma digital de educação voltada para arquitetos e profissionais da área comercial. O conteúdo disponibilizado — videoaulas, materiais complementares, checklists, blocos 3D e templates — é de caráter educativo e profissional, não constituindo consultoria técnica individual.
            </Section>
            <Section title="3. Elegibilidade e Cadastro">
              Para acessar a plataforma é necessário ter 18 anos ou mais. O aluno é responsável pela veracidade das informações fornecidas no cadastro e pela confidencialidade de seus dados de acesso. O compartilhamento de login é estritamente proibido e pode resultar no cancelamento imediato da matrícula, sem restituição de valores.
            </Section>
            <Section title="4. Planos de Acesso e Pagamento">
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li><strong>Plano Básico:</strong> acesso ao conteúdo principal da trilha de aprendizado.</li>
                <li><strong>Plano Ouro:</strong> acesso completo, incluindo Toolbox VIP, Comunidade Exclusiva, Mentorias e Certificado Oficial PAINAP.</li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>O acesso é ativado após confirmação do pagamento. Planos anuais não são reembolsáveis após 7 (sete) dias corridos da data de compra, conforme o Código de Defesa do Consumidor (CDC) — Art. 49.</p>
            </Section>
            <Section title="5. Direitos Autorais e Propriedade Intelectual">
              Todo o conteúdo disponibilizado na plataforma — incluindo vídeos, textos, imagens, blocos 3D, planilhas e metodologias — é de propriedade exclusiva da PAINAP Arquitetura Ltda. É vedada a reprodução, distribuição, revenda ou modificação sem autorização expressa e por escrito. Violações estão sujeitas às penalidades previstas na Lei nº 9.610/98 (Lei de Direitos Autorais).
            </Section>
            <Section title="6. Conduta do Aluno">
              O aluno compromete-se a utilizar a plataforma de forma ética e respeitosa, abstendo-se de: (a) publicar conteúdo ofensivo ou discriminatório na Comunidade; (b) realizar engenharia reversa ou extração de conteúdo; (c) utilizar os materiais para fins comerciais de forma não autorizada.
            </Section>
            <Section title="7. Suspensão e Cancelamento">
              A PAINAP reserva-se o direito de suspender ou cancelar o acesso de qualquer aluno que descumprir estes Termos, sem aviso prévio e sem obrigação de reembolso após o período de 7 dias.
            </Section>
            <Section title="8. Limitação de Responsabilidade">
              A PAINAP empenha-se na disponibilidade contínua da plataforma, mas não se responsabiliza por eventuais interrupções técnicas, perda de dados ou resultados financeiros obtidos (ou não) pelo aluno com base nos conteúdos ministrados.
            </Section>
            <Section title="9. Foro e Legislação Aplicável">
              Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias.
            </Section>
          </div>
        )}

        {/* Política de Privacidade */}
        {active === 'privacidade' && (
          <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <Section title="1. Dados que Coletamos">
              Ao se cadastrar na Universidade PAINAP, coletamos: nome completo, e-mail, CPF/CNPJ (para emissão de nota fiscal), telefone de contato, dados de pagamento (processados por gateway terceiro, nunca armazenados por nós) e dados de uso da plataforma (aulas assistidas, progresso, tempo de estudo).
            </Section>
            <Section title="2. Como Usamos seus Dados">
              As informações coletadas são utilizadas para: (a) gerir sua conta e acesso aos conteúdos; (b) personalizar sua experiência de aprendizado; (c) enviar comunicações sobre novos conteúdos, atualizações e ofertas — desde que você não tenha optado por não recebê-las; (d) cumprir obrigações legais e fiscais.
            </Section>
            <Section title="3. Compartilhamento de Dados">
              Não vendemos nem cedemos seus dados a terceiros para fins comerciais. Compartilhamos apenas com: processadores de pagamento (ex: Stripe, Hotmart), serviços de e-mail marketing (opt-in), e autoridades regulatórias quando exigido por lei.
            </Section>
            <Section title="4. Cookies e Rastreamento">
              Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos (ex: Google Analytics) para melhoria da experiência. Você pode desativar os cookies não essenciais a qualquer momento nas configurações do seu navegador.
            </Section>
            <Section title="5. Seus Direitos (LGPD — Lei nº 13.709/2018)">
              Em conformidade com a Lei Geral de Proteção de Dados, você tem direito a: (a) confirmar a existência de tratamento dos seus dados; (b) acessar, corrigir ou excluir seus dados; (c) revogar consentimento a qualquer tempo; (d) solicitar a portabilidade dos seus dados. Para exercer esses direitos, contate: <strong>privacidade@painap.com.br</strong>.
            </Section>
            <Section title="6. Retenção de Dados">
              Seus dados são mantidos enquanto sua conta estiver ativa. Após o cancelamento, os dados são anonimizados ou excluídos em até 90 dias, salvo obrigações legais que exijam retenção por prazo superior.
            </Section>
            <Section title="7. Segurança">
              Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia de dados em trânsito (HTTPS/TLS), controle de acesso por função (RBAC) e auditorias periódicas. Em caso de incidente de segurança que afete seus dados, você será notificado em até 72 horas.
            </Section>
            <Section title="8. Contato">
              Para quaisquer questões sobre privacidade e proteção de dados: <strong>privacidade@painap.com.br</strong> · PAINAP Arquitetura Ltda. · São Paulo, SP.
            </Section>
          </div>
        )}

        {/* Suporte ao Aluno */}
        {active === 'suporte' && (
          <div style={{ lineHeight: '1.8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { emoji: '📧', title: 'E-mail de Suporte', desc: 'suporte@painap.com.br', sub: 'Resposta em até 24h úteis' },
                { emoji: '💬', title: 'WhatsApp Exclusivo', desc: '+55 (11) 99999-9999', sub: 'Seg–Sex, 9h às 18h (BRT)' },
                { emoji: '📱', title: 'Instagram', desc: '@arq.painap', sub: 'DMs respondidas em até 48h' },
                { emoji: '🎓', title: 'Comunidade VIP', desc: 'Plano Ouro', sub: 'Suporte entre pares em tempo real' },
              ].map((c, i) => (
                <div key={i} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-secondary)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{c.title}</h4>
                  <strong style={{ color: 'var(--accent)' }}>{c.desc}</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{c.sub}</p>
                </div>
              ))}
            </div>

            <Section title="Dúvidas Frequentes de Suporte">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { q: 'Esqueci minha senha. O que faço?', a: 'Envie um e-mail para suporte@painap.com.br com o assunto "Redefinição de Senha" e seu e-mail cadastrado. Responderemos em até 24h com o link de redefinição.' },
                  { q: 'Posso acessar a plataforma em mais de um dispositivo?', a: 'Sim. Você pode acessar de até 2 dispositivos simultâneos (computador + celular, por exemplo). Sessões adicionais serão encerradas automaticamente.' },
                  { q: 'Meu vídeo não carrega. O que pode ser?', a: 'Verifique sua conexão à internet e tente limpar o cache do navegador. Se o problema persistir, nos envie o nome da aula e o horário do erro via e-mail de suporte.' },
                  { q: 'Como faço para cancelar minha assinatura?', a: 'Entre em contato via e-mail suporte@painap.com.br com o assunto "Cancelamento". Dentro do prazo de 7 dias após a compra, o reembolso integral é garantido por lei.' },
                  { q: 'Como emito meu certificado?', a: 'O Certificado Oficial PAINAP (Plano Ouro) é liberado automaticamente ao concluir 100% da trilha principal. Acesse a seção de Perfil na plataforma para baixar.' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1rem 1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>❓ {item.q}</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '0.75rem', fontWeight: 700 }}>{title}</h3>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{children}</div>
    </div>
  );
}
