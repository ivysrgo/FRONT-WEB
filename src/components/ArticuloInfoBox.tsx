import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReportarPublicacionModal } from './ReportarPublicacionModal';
import './ArticuloInfoBox.css';

export interface ArticuloInfoProps {
  category: string;
  title: string;
  modality: 'Donación' | 'Intercambio';
  description: string;
  condition: string;
  author: string;
  tags?: string[]; // Talla, Género, Tela (para Ropa)
  daysElapsed: number;
}

export const ArticuloInfoBox: React.FC<ArticuloInfoProps> = ({
  category,
  title,
  modality,
  description,
  condition,
  author,
  tags,
  daysElapsed
}) => {
  const navigate = useNavigate();
  const [reporteAbierto, setReporteAbierto] = useState(false);
  const diasRestantes = 30 - daysElapsed;
  const isRopa = category.toUpperCase() === 'ROPA';

  return (
    <div className="articulo-info-box">
      {/* Encabezado: Etiquetas y Botón Reportar */}
      <div className="detalle-tags-row">
        <div className="detalle-tags-left">
          <span className={`tag-modality ${modality === 'Donación' ? 'bg-cyan' : 'bg-orange'}`}>
            {modality}
          </span>
          <span className="tag-category-outline">{category}</span>
        </div>
        <button
          type="button"
          className="btn-reportar"
          onClick={() => setReporteAbierto(true)}
        >
          Reportar
        </button>
      </div>

      <ReportarPublicacionModal
        isOpen={reporteAbierto}
        onClose={() => setReporteAbierto(false)}
        onContinue={() => navigate('/explorar')}
      />

      {/* Título y Descripción */}
      <h1 className="detalle-title">{title}</h1>
      <p className="detalle-description">{description}</p>

      {/* Cuadrícula de Metadatos */}
      <div className="metadata-grid">
        <div className="metadata-box">
          <span className="metadata-label">ESTADO</span>
          <span className="metadata-value">{condition}</span>
        </div>
        <div className="metadata-box">
          <span className="metadata-label">PUBLICADO POR</span>
          <span className="metadata-value">{author}</span>
        </div>
        
        {/* Renderizado condicional de metadatos textiles (RQF-02) */}
        {isRopa && tags && tags.length >= 3 && (
          <>
            <div className="metadata-box">
              <span className="metadata-label">TALLA</span>
              <span className="metadata-value">{tags[0]}</span>
            </div>
            <div className="metadata-box">
              <span className="metadata-label">GÉNERO</span>
              <span className="metadata-value">{tags[1]}</span>
            </div>
            <div className="metadata-box">
              <span className="metadata-label">TELA</span>
              <span className="metadata-value">{tags[2]}</span>
            </div>
          </>
        )}
      </div>

      {/* Alerta azul de días restantes (Caducidad - RQF-03) */}
      <div className="days-alert-box">
        <span className="days-number">{diasRestantes}</span>
        <p className="days-text">
          Días restantes en circulación local antes de habilitarse para donación al Minuto de Dios.
        </p>
      </div>
    </div>
  );
};