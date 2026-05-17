import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import './CaseLibrary.css';

export default function CaseLibrary() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const cases = [
    {
      id: 1,
      title: "Projeto Restaurante OTTA",
      category: "Restaurantes",
      description: "Análise completa de zoneamento de mesas, iluminação acolhedora e fachada premium para o restaurante OTTA.",
      downloads: ["Planta Layout (DWG)", "Memorial de Acabamentos (PDF)", "Imagens 3D (ZIP)"],
      image: "/img/case_otta.png"
    },
    {
      id: 2,
      title: "Loja Conceito Banana Food",
      category: "Varejo",
      description: "Design estratégico para otimização de fluxo de clientes e atração instagramável em container Banana Food.",
      downloads: ["Estudo de Fluxo (PDF)", "Projeto Executivo (DWG)"],
      image: "/img/case_banana_food.png"
    },
    {
      id: 3,
      title: "Quiosque Mr. Cheney",
      category: "Fast Food",
      description: "Layout de alta performance para franquia Mr. Cheney em shopping, com otimização completa de equipamentos e vitrine.",
      downloads: ["Planta Quiosque (DWG)", "Memorial Técnico (PDF)"],
      image: "/img/case_mr_cheney.png"
    },
    {
      id: 4,
      title: "Clínica MAJ",
      category: "Saúde",
      description: "Consultório médico premium projetado com neuroarquitetura, focando na acústica e no bem-estar dos pacientes.",
      downloads: ["Especificações de Cores (PDF)", "Layout Humanizado (PDF)"],
      image: "/img/case_maj.png"
    },
    {
      id: 5,
      title: "Armazém Fit Store",
      category: "Varejo",
      description: "Design de loja conceito com foco em saudabilidade, gôndolas ergonômicas e comunicação visual de alta conversão.",
      downloads: ["Detalhamento Mobiliário (PDF)", "Projeto de Iluminação (DWG)"],
      image: "/img/case_armazem_fit.jpg"
    },
    {
      id: 6,
      title: "Crepefy",
      category: "Fast Food",
      description: "Identidade arquitetônica corporativa modular aplicada em loja de rua Crepefy para rápida expansão de franquias.",
      downloads: ["Manual de Franquias (PDF)", "Planta de Cozinha (DWG)"],
      image: "/img/case_crepefy.png"
    },
    {
      id: 7,
      title: "Donna Sorvetes",
      category: "Restaurantes",
      description: "Criação de atmosfera acolhedora e moderna para sorveteria Donna, integrando deck externo e área de autoatendimento.",
      downloads: ["Planta de Deck (DWG)", "Paleta de Materiais (PDF)"],
      image: "/img/case_donna_sorvetes.png"
    },
    {
      id: 8,
      title: "TDonuts",
      category: "Fast Food",
      description: "Projeto de quiosque de doces TDonuts em shopping center com foco em vitrine sensorial de alta atração infantil e jovem.",
      downloads: ["Projeto de Fachada (DWG)", "Memorial de Iluminação (PDF)"],
      image: "/img/case_tdonuts.png"
    }
  ];

  const filteredCases = activeFilter === 'Todos'
    ? cases
    : cases.filter(c => c.category === activeFilter);

  const handleDownload = (fileName) => {
    // Triggers a premium native download experience
    const link = document.createElement('a');
    link.href = '/docs/Material_Complementar_PAINAP.pdf';
    link.download = `${fileName.replace(/\s+/g, '_')}_PAINAP.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cases-container fade-in">
      <div className="cases-header">
        <div>
          <h1>Biblioteca de Cases & Templates</h1>
          <p>Explore projetos reais desconstruídos. Baixe plantas, memoriais e arquivos nativos.</p>
        </div>
        <div className="filters">
          {['Todos', 'Restaurantes', 'Varejo', 'Fast Food', 'Saúde'].map((filter) => (
            <button 
              key={filter} 
              className={`btn-secondary ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="cases-grid">
        {filteredCases.map((project) => (
          <div key={project.id} className="case-card-large glass-panel">
            <div 
              className="case-image" 
              style={{ 
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="hover-overlay">
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Eye size={18} /> Ver Estudo de Caso
                </button>
              </div>
            </div>
            <div className="case-details">
              <span className="category-tag">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              
              <div className="downloads-section">
                <h4>Arquivos Disponíveis</h4>
                <div className="download-chips">
                  {project.downloads.map((file, idx) => (
                    <button 
                      key={idx} 
                      className="download-chip"
                      onClick={() => handleDownload(file)}
                    >
                      <Download size={14} /> {file}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
