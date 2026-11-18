import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminMetricas.css';

interface MetricaItem {
  id: string;
  valor: string | number;
  descripcion: string;
}

export const AdminMetricas: React.FC = () => {
  const navigate = useNavigate();

  const metricasData: MetricaItem[] = [
    { id: 'm1', valor: 14, descripcion: 'Artículos donados entre la comunidad' },
    { id: 'm2', valor: 76, descripcion: 'Artículos intercambiados entre la comunidad' },
    { id: 'm3', valor: 52, descripcion: 'Artículos donados a Unidona' },
    { id: 'm4', valor: 12, descripcion: 'Reportes de publicaciones de la comunidad' },
    { id: 'm5', valor: 3.7, descripcion: 'Calificación promedio de los intercambios de la comunidad' }
  ];

  return (
    <div className="admin-metricas-layout">
      <AdminNavbar />

      <main className="admin-metricas-content">
        <header className="admin-metricas-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate(-1)}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Métricas</h2>
        </header>

        {/* Sección actualizada para el Bento Box */}
        <section className="metricas-list-section">
          {metricasData.map((metrica, index) => (
            <div 
              key={metrica.id} 
              // Si es el 3er elemento (index 2), le asignamos la clase 'wide-card'
              className={`metrica-card ${index === 2 ? 'wide-card' : ''}`}
            >
              <span className="metrica-valor">{metrica.valor}</span>
              <span className="metrica-descripcion">{metrica.descripcion}</span>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};