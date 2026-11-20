import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { obtenerMetricas, type MetricaItem } from '../services/adminService';
import { ApiError } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminMetricas.css';

export const AdminMetricas: React.FC = () => {
  const navigate = useNavigate();
  const [metricasData, setMetricasData] = useState<MetricaItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    obtenerMetricas()
      .then((data) => {
        if (!activo) return;
        setMetricasData(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!activo) return;
        setError(err instanceof ApiError || err instanceof Error ? err.message : 'No se pudieron cargar las métricas');
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="admin-metricas-layout">
      <AdminNavbar />

      <main className="admin-metricas-content">
        <header className="admin-metricas-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate('/admin/dashboard')}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Métricas</h2>
        </header>

        {cargando ? (
          <p className="admin-results-count">Cargando métricas en tiempo real…</p>
        ) : error ? (
          <p className="admin-results-count" style={{ color: '#D32F2F' }}>{error}</p>
        ) : (
          <section className="metricas-list-section">
            {metricasData.map((metrica, index) => (
              <div 
                key={metrica.id} 
                className={`metrica-card ${index === 2 ? 'wide-card' : ''}`}
              >
                <span className="metrica-valor">{metrica.valor}</span>
                <span className="metrica-descripcion">{metrica.descripcion}</span>
              </div>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminMetricas;
