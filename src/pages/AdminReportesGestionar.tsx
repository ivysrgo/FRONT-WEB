import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ArticuloInfoBox } from '../components/ArticuloInfoBox';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { SuccessModal } from '../components/SuccessModal';
import { removeArticulo } from '../data/articulos';
import {
  eliminarPublicacionReportada,
  formatearFechaLarga,
  formatearHora,
  ignorarReporte,
  obtenerReporte,
  tipoDeModalidad,
  type ReporteDetalle,
} from '../services/adminService';
import { ApiError } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminReportesGestionar.css';

const valorODesconocido = (valor: number | null) => (valor === null ? 'Sin datos' : valor);

export const AdminReportesGestionar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [reporte, setReporte] = useState<ReporteDetalle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletedOpen, setIsDeletedOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let activo = true;
    obtenerReporte(id)
      .then((detalle) => {
        if (activo) setReporte(detalle);
      })
      .catch((err: unknown) => {
        if (activo) setError(err instanceof ApiError ? err.message : 'No se pudo cargar el reporte.');
      });
    return () => {
      activo = false;
    };
  }, [id]);

  const volverAReportes = () => navigate('/admin/reportes');

  const handleIgnorar = async () => {
    if (!reporte) return;
    setProcesando(true);
    setError(null);
    try {
      await ignorarReporte(reporte.id);
      volverAReportes();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo ignorar el reporte.');
    } finally {
      setProcesando(false);
    }
  };

  const handleConfirmarEliminacion = async () => {
    if (!reporte) return;
    setProcesando(true);
    setError(null);
    try {
      await eliminarPublicacionReportada(reporte.id);
      if (reporte.publicacionId) removeArticulo(reporte.publicacionId);
      setIsDeleteModalOpen(false);
      setIsDeletedOpen(true);
    } catch (err) {
      setIsDeleteModalOpen(false);
      setError(err instanceof ApiError ? err.message : 'No se pudo eliminar la publicación.');
    } finally {
      setProcesando(false);
    }
  };

  const pendiente = reporte?.estado === 'Pendiente';
  const pub = reporte?.publicacion;
  const diasTranscurridos = reporte?.publicacionActual?.daysElapsed ?? 0;
  const diasCaducidad = reporte?.publicacionActual?.expirationDays ?? 30;

  return (
    <div className="admin-gestionar-layout">
      <AdminNavbar />

      <main className="admin-gestionar-content">
        <div className="detalle-back-row">
          <button className="btn-volver-texto" onClick={volverAReportes}>
            <img src={flechaVolverNegra} alt="Volver" className="icon-volver" />
            <span>Volver al Administrar</span>
          </button>
        </div>

        {error && <p className="gestionar-error" role="alert">{error}</p>}

        {!reporte || !pub ? (
          !error && <p className="gestionar-cargando">Cargando reporte…</p>
        ) : (
          <section className="detalle-grid">
            <div className="detalle-col-left">
              <div className="reporte-panel-admin">
                <h2 className="reporte-panel-title">Reporte</h2>

                <div className="reporte-section">
                  <h3 className="reporte-section-title">Usuario Reportante</h3>
                  <p className="reporte-text">Reportado por {reporte.reportante?.nombre ?? 'Usuario eliminado'}</p>
                  <p className="reporte-text">Hora: {formatearHora(reporte.createdAt)}</p>
                  <p className="reporte-text">Fecha: {formatearFechaLarga(reporte.createdAt)}</p>
                </div>

                <div className="reporte-section">
                  <h3 className="reporte-section-title">Motivo</h3>
                  <p className="reporte-text">
                    <strong>{reporte.motivo}</strong>
                    {reporte.descripcion ? `: ${reporte.descripcion}` : ''}
                  </p>
                </div>

                <div className="reporte-section">
                  <h3 className="reporte-section-title">Usuario Reportado</h3>
                  <p className="reporte-text">
                    Reportan a{' '}
                    {reporte.reportado.id ? (
                      <button
                        type="button"
                        className="reporte-link-perfil"
                        onClick={() => navigate(`/admin/perfil/${reporte.reportado.id}`)}
                      >
                        {reporte.reportado.nombre}
                      </button>
                    ) : (
                      reporte.reportado.nombre
                    )}
                  </p>
                  <p className="reporte-text">
                    Publicaciones activas: {valorODesconocido(reporte.reportado.publicacionesActivas)}
                  </p>
                  <p className="reporte-text">
                    Reportes previos: {valorODesconocido(reporte.reportado.reportesPrevios)}
                  </p>
                  <p className="reporte-text">
                    Activo desde: {reporte.reportado.activoDesde ? formatearFechaLarga(reporte.reportado.activoDesde) : 'Sin datos'}
                  </p>
                </div>

                {pendiente ? (
                  <div className="reporte-actions">
                    <button className="btn-ignorar" onClick={() => void handleIgnorar()} disabled={procesando}>
                      Ignorar Reporte
                    </button>
                    <button
                      className="btn-eliminar-rojo"
                      onClick={() => setIsDeleteModalOpen(true)}
                      disabled={procesando || !reporte.publicacionExiste}
                    >
                      Eliminar Publicación
                    </button>
                  </div>
                ) : (
                  <p className="reporte-resuelto">
                    Reporte resuelto: {reporte.estado === 'Eliminada' ? 'publicación eliminada' : 'ignorado'}
                    {reporte.resueltoEn ? ` el ${formatearFechaLarga(reporte.resueltoEn)}` : ''}.
                  </p>
                )}
              </div>
            </div>

            <div className="detalle-col-right">
              <div className="evidencia-container">
                {!reporte.publicacionExiste && (
                  <p className="gestionar-aviso">Esta publicación ya no existe en el sistema.</p>
                )}
                <ArticuloInfoBox
                  category={pub.category || 'OTROS'}
                  title={pub.title}
                  modality={tipoDeModalidad(pub.modality) === 'INTERCAMBIO' ? 'Intercambio' : 'Donación'}
                  description={pub.description}
                  condition={pub.condition}
                  author={pub.author}
                  tags={pub.tags}
                  daysElapsed={diasTranscurridos}
                  expirationDays={diasCaducidad}
                  evidenceImageUrl={pub.imageUrl || undefined}
                  isAdmin
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => void handleConfirmarEliminacion()}
      />
      <SuccessModal
        isOpen={isDeletedOpen}
        variant="danger"
        title="Publicación eliminada"
        buttonText="Volver a administrar"
        onButtonClick={volverAReportes}
        onClose={volverAReportes}
      />
    </div>
  );
};
