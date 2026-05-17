import React from 'react';
import { Download, Eye } from 'lucide-react';
import './CaseLibrary.css';

export default function CaseLibrary() {
  const cases = [
    {
      id: 1,
      title: "Projeto Restaurante OTTA",
      category: "Restaurante",
      description: "Análise do fluxo de clientes, iluminação direcionada e paleta de cores para aumentar o giro de mesas.",
      downloads: ["Planta Baixa (DWG)", "Memorial Descritivo (PDF)"]
    },
    {
      id: 2,
      title: "Loja Conceito Banana Food",
      category: "Varejo",
      description: "Como aplicar o design 'Instagramável' sem perder a funcionalidade e o fluxo do caixa.",
      downloads: ["Moodboard (Figma)", "Lista de Fornecedores (PDF)"]
    },
    {
      id: 3,
      title: "Quiosque Mr. Cheney",
      category: "Fast Food",
      description: "Otimização de espaço em 12m²: layout de equipamentos e vitrine atrativa.",
      downloads: ["Layout 3D (SketchUp)", "Memorial (PDF)"]
    },
    {
      id: 4,
      title: "Clínica MAJ",
      category: "Saúde & Bem-estar",
      description: "Arquitetura sensorial: usando aromas, texturas e acústica para reduzir a ansiedade dos pacientes.",
      downloads: ["Especificação de Acabamentos (XLS)"]
    }
  ];

  return (
    <div className="cases-container fade-in">
      <div className="cases-header">
        <div>
          <h1>Biblioteca de Cases & Templates</h1>
          <p>Explore projetos reais desconstruídos. Baixe plantas, memoriais e arquivos nativos.</p>
        </div>
        <div className="filters">
          <button className="btn-secondary active">Todos</button>
          <button className="btn-secondary">Restaurantes</button>
          <button className="btn-secondary">Varejo</button>
          <button className="btn-secondary">Saúde</button>
        </div>
      </div>

      <div className="cases-grid">
        {cases.map((project) => (
          <div key={project.id} className="case-card-large glass-panel">
            <div className="case-image">
              <div className="hover-overlay">
                <button className="btn-primary">
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
                    <button key={idx} className="download-chip">
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
