import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ArticuloInfoBox } from '../components/ArticuloInfoBox';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { reportesPendientes } from '../data/adminReports';
import { removeArticulo } from '../data/articulos';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminReportesGestionar.css';

export const AdminReportesGestionar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const reporte = reportesPendientes.find((item) => item.id === id);

  if (!reporte) {
    return <Navigate to="/admin/reportes" replace />;
  }

  const handleIgnorar = () => {
    console.log('Reporte ignorado');
    navigate('/admin/reportes');
  };

  const handleEliminar = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCerrarModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmarEliminacion = () => {
    if (reporte.articleId) {
      removeArticulo(reporte.articleId);
    }
    setIsDeleteModalOpen(false);
    navigate('/admin/reportes');
  };

  return (
    <div className="admin-gestionar-layout">
      <AdminNavbar />

      <main className="admin-gestionar-content">
        <div className="detalle-back-row">
          <button className="btn-volver-texto" onClick={() => navigate(-1)}>
            <img src={flechaVolverNegra} alt="Volver" className="icon-volver" />
            <span>Volver al Administrar</span>
          </button>
        </div>

        <section className="detalle-grid">
          
          {/* COLUMNA IZQUIERDA: Tarjeta del Reporte */}
          <div className="detalle-col-left">
            <div className="reporte-panel-admin">
              <h2 className="reporte-panel-title">Reporte</h2>

              <div className="reporte-section">
                <h3 className="reporte-section-title">Usuario Reportante</h3>
                <p className="reporte-text">Reportado por {reporte.reporter.name}</p>
                <p className="reporte-text">Hora: {reporte.reporter.time}</p>
                <p className="reporte-text">Fecha: {reporte.reporter.date}</p>
              </div>

              <div className="reporte-section">
                <h3 className="reporte-section-title">Motivo</h3>
                {/* Mostramos la categoría (default) en negrita y luego la descripción */}
                <p className="reporte-text">
                  <strong>{reporte.reason.category}: </strong> 
                  {reporte.reason.description}
                </p>
              </div>

              <div className="reporte-section">
                <h3 className="reporte-section-title">Usuario Reportado</h3>
                <p className="reporte-text">Reportan a {reporte.author}</p>
                <p className="reporte-text">Publicaciones activas: {reporte.reportedUser.activePosts}</p>
                <p className="reporte-text">Reportes previos: {reporte.reportedUser.previousReports}</p>
                <p className="reporte-text">Activo desde: {reporte.reportedUser.activeSince}</p>
              </div>

              <div className="reporte-actions">
                <button className="btn-ignorar" onClick={handleIgnorar}>
                  Ignorar Reporte
                </button>
                <button className="btn-eliminar-rojo" onClick={handleEliminar}>
                  Eliminar Publicación
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Evidencia (Imagen + ArticuloInfoBox) */}
          <div className="detalle-col-right">
            
            {/* Si quieres que la imagen esté arriba de la info, como en el diseño de usuario, la ponemos aquí.
                Si prefieres la imagen dentro de la misma caja de info, ajusta según necesites. */}
            <div className="evidencia-container">
               <ArticuloInfoBox 
                  category={reporte.article.category}
                  title={reporte.title}
                  modality={reporte.type === 'DONACIÓN' ? 'Donación' : 'Intercambio'}
                  description={reporte.description}
                  condition={reporte.article.condition}
                  author={reporte.author}
                  tags={reporte.article.tags}
                  daysElapsed={reporte.article.daysElapsed}
                  evidenceImageUrl={reporte.article.imageUrl}
                  isAdmin
                />
            </div>
           
          </div>
        </section>
      </main>

      <Footer />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCerrarModal}
        onConfirm={handleConfirmarEliminacion}
      />
    </div>
  );
};