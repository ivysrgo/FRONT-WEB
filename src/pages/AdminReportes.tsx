import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminReportCard } from '../components/AdminReportCard';
import { reportesHistorial, reportesPendientes } from '../data/adminReports';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminReportes.css';

export const AdminReportes: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Gestionar' | 'Historial'>('Gestionar');

  return (
    <div className="admin-reportes-layout">
      <AdminNavbar />

      <main className="admin-reportes-content">
        <header className="admin-reportes-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate(-1)}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Reportes</h2>
        </header>

        {/* Botones de navegación: Gestionar / Historial separados */}
        <div className="reportes-buttons-container">
          <button 
            className={`admin-tab-btn ${activeTab === 'Gestionar' ? 'active' : ''}`}
            onClick={() => setActiveTab('Gestionar')}
          >
            Gestionar
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'Historial' ? 'active' : ''}`}
            onClick={() => setActiveTab('Historial')}
          >
            Historial
          </button>
        </div>

        {/* Lista de Reportes */}
        <section className="admin-list-section">
          <div className="admin-reports-list">
            {activeTab === 'Gestionar' ? (
              reportesPendientes.map((report) => (
                <AdminReportCard
                  key={report.id}
                  id={report.id}
                  type={report.type}
                  author={report.author}
                  title={report.title}
                  description={report.description}
                  onViewReport={() => navigate(`/admin/reportes/gestionar/${report.id}`)}
                  onViewProfile={() => navigate(`/admin/perfil/${report.authorId}`)}
                />
              ))
            ) : (
              reportesHistorial.map((report) => (
                <AdminReportCard
                  key={report.id}
                  id={report.id}
                  type={report.type}
                  author={report.author}
                  title={report.title}
                  description={report.description}
                  statusBadge={report.statusBadge}
                  onViewProfile={() => navigate(`/admin/perfil/${report.authorId}`)}
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