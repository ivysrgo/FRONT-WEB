import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import './AdminDashboard.css';

import reportesLogo from '../assets/adminreporteslogo.svg';
import donacionesLogo from '../assets/admindonacioneslogo.svg';
import metricasLogo from '../assets/adminmetricaslogo.svg';
import usuariosLogo from '../assets/adminusuarioslogo.svg';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Definición de las tarjetas del panel
  const adminOptions = [
    {
      id: 'reportes',
      color: '#8CCB5E',
      title: 'Reportes',
      icon: reportesLogo,
      path: '/admin/reportes'
    },
    {
      id: 'historial',
      color: '#D23B2E',
      title: 'Historial de donaciones',
      icon: donacionesLogo,
      path: '/admin/historial'
    },
    {
      id: 'metricas',
      color: '#F0A040',
      title: 'Métricas',
      icon: metricasLogo,
      path: '/admin/metricas'
    },
    {
      id: 'usuarios',
      color: '#9DD8F7',
      title: 'Usuarios',
      icon: usuariosLogo,
      path: '/admin/usuarios'
    }
  ];

  return (
    <div className="admin-layout">
      <AdminNavbar />

      <main className="admin-content">
        <header className="admin-header">
          <h1 className="admin-title">Administrar</h1>
          <p className="admin-subtitle">
            Administra la página correctamente
          </p>
        </header>

        <section className="admin-grid">
          {adminOptions.map((option) => (
            <button
              key={option.id}
              className="admin-card"
              style={{ '--admin-card-tab': option.color } as React.CSSProperties}
              onClick={() => navigate(option.path)}
            >
              <h2 className="admin-card-title">{option.title}</h2>
              <div className="admin-card-icon-wrapper">
                <img src={option.icon} alt="" className="admin-card-icon" />
              </div>
            </button>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};