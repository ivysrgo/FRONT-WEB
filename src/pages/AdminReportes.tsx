import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminReportCard } from '../components/AdminReportCard';
import { listarReportes, tipoDeModalidad, type ReporteResumen } from '../services/adminService';
import { ApiError } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminReportes.css';

type Pestana = 'Gestionar' | 'Historial';

export const AdminReportes: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Pestana>('Gestionar');
  const [reportes, setReportes] = useState<Record<Pestana, ReporteResumen[] | null>>({
    Gestionar: null,
    Historial: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    listarReportes(activeTab === 'Gestionar' ? 'pendientes' : 'historial')
      .then((lista) => {
        if (activo) setReportes((actual) => ({ ...actual, [activeTab]: lista }));
      })
      .catch((err: unknown) => {
        if (activo) setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los reportes.');
      });
    return () => {
      activo = false;
    };
  }, [activeTab]);

  const cambiarPestana = (pestana: Pestana) => {
    setError(null);
    setActiveTab(pestana);
  };

  const lista = reportes[activeTab];

  return (
    <div className="admin-reportes-layout">
      <AdminNavbar />

      <main className="admin-reportes-content">
        <header className="admin-reportes-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate('/admin/dashboard')}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Reportes</h2>
        </header>

        <div className="reportes-buttons-container">
          {(['Gestionar', 'Historial'] as const).map((pestana) => (
            <button
              key={pestana}
              className={`admin-tab-btn ${activeTab === pestana ? 'active' : ''}`}
              onClick={() => cambiarPestana(pestana)}
            >
              {pestana}
            </button>
          ))}
        </div>

        <section className="admin-list-section">
          <div className="admin-reports-list">
            {error ? (
              <p className="empty-state-text">{error}</p>
            ) : lista === null ? (
              <p className="empty-state-text">Cargando reportes…</p>
            ) : lista.length === 0 ? (
              <p className="empty-state-text">
                {activeTab === 'Gestionar'
                  ? 'No hay reportes pendientes por revisar.'
                  : 'Aún no se ha resuelto ningún reporte.'}
              </p>
            ) : (
              lista.map((reporte) => (
                <AdminReportCard
                  key={reporte.id}
                  id={reporte.id}
                  type={tipoDeModalidad(reporte.publicacion.modality)}
                  author={reporte.publicacion.author || 'Usuario'}
                  title={reporte.publicacion.title}
                  description={reporte.publicacion.description}
                  statusBadge={activeTab === 'Historial' ? reporte.estado : undefined}
                  onViewReport={() => navigate(`/admin/reportes/gestionar/${reporte.id}`)}
                  onViewProfile={
                    reporte.reportadoId ? () => navigate(`/admin/perfil/${reporte.reportadoId}`) : undefined
                  }
                />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
