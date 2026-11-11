import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScreenLayout } from '../components/ScreenLayout';
import './AdminScreens.css';

const reports = [
  { id: 'R-102', type: 'Artículo', subject: 'Camisas de trabajo (x3)', author: 'Andrés S.', reason: 'Información engañosa', date: '12 oct 2026' },
  { id: 'R-101', type: 'Usuario', subject: 'Perfil de usuario', author: 'Cuenta reportada', reason: 'Contenido inapropiado', date: '10 oct 2026' },
  { id: 'R-098', type: 'Artículo', subject: 'Silla de escritorio', author: 'Diego L.', reason: 'Artículo no disponible', date: '08 oct 2026' },
];

const donations = [
  { id: 'D-029', article: 'Abrigo de paño gris', user: 'María G.', category: 'Ropa', status: 'En proceso', date: '10 oct 2026' },
  { id: 'D-028', article: 'Cuadernos universitarios (x4)', user: 'Julián E.', category: 'Útiles', status: 'Recibido', date: '08 oct 2026' },
  { id: 'D-027', article: 'Diccionario bilingüe Oxford', user: 'Valentina P.', category: 'Libros', status: 'Entregado', date: '03 oct 2026' },
];

export const AdminScreen: React.FC = () => {
  const location = useLocation();
  const isDonations = location.pathname.endsWith('/donaciones');
  const [handledReports, setHandledReports] = useState<string[]>([]);

  return (
    <ScreenLayout title="Administrar" subtitle="Administra la página correctamente." width="wide">
      <nav className="admin-tabs" aria-label="Administración">
        <Link className={`admin-tab ${!isDonations ? 'active' : ''}`} to="/admin/reportes">Reportes</Link>
        <Link className={`admin-tab ${isDonations ? 'active' : ''}`} to="/admin/donaciones">Historial de donaciones</Link>
      </nav>
      <section className="admin-screen-content">
        <div className="admin-title-row">
          <div>
            <h2>{isDonations ? 'Historial de donaciones' : 'Reportes'}</h2>
            <p>{isDonations ? 'Seguimiento de artículos escalados al Banco de Ropa de Unidona.' : 'Revisa los reportes recibidos de la comunidad.'}</p>
          </div>
          <span className="admin-count">{isDonations ? donations.length : reports.length - handledReports.length} registros</span>
        </div>

        {isDonations ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Artículo</th><th>Usuario</th><th>Categoría</th><th>Estado</th><th>Fecha</th></tr></thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td><strong>{donation.article}</strong><small>{donation.id}</small></td>
                    <td>{donation.user}</td>
                    <td>{donation.category}</td>
                    <td><span className={`admin-status ${donation.status.toLowerCase().replace(' ', '-')}`}>{donation.status}</span></td>
                    <td>{donation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-report-list">
            {reports.filter((report) => !handledReports.includes(report.id)).map((report) => (
              <article className="admin-report-card" key={report.id}>
                <div className="admin-report-avatar">{report.author.charAt(0)}</div>
                <div className="admin-report-info">
                  <span>{report.type} · {report.author}</span>
                  <h3>{report.subject}</h3>
                  <p>{report.reason} <span>· {report.date}</span></p>
                </div>
                <div className="screen-actions">
                  <button className="screen-button screen-button-secondary" onClick={() => setHandledReports((items) => [...items, report.id])}>Descartar</button>
                  <button className="screen-button" onClick={() => setHandledReports((items) => [...items, report.id])}>Resolver</button>
                </div>
              </article>
            ))}
            {handledReports.length === reports.length && (
              <div className="admin-empty">No tienes reportes pendientes.</div>
            )}
          </div>
        )}
      </section>
    </ScreenLayout>
  );
};
