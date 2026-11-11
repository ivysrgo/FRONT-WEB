import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ArticuloInfoBox } from '../components/ArticuloInfoBox';
import { ArticuloSolicitudForm } from '../components/ArticuloSolicitudForm';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { ExpirationUpdatedModal } from '../components/ExpirationUpdatedModal';
import { addDaysToExpiration, removeArticulo, useArticulos } from '../data/articulos';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './DetalleArticulo.css';

interface DetalleArticuloProps {
  isAdmin?: boolean;
}

export const DetalleArticulo: React.FC<DetalleArticuloProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const articulos = useArticulos();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isExpirationUpdatedOpen, setIsExpirationUpdatedOpen] = useState(false);
  const articulo = articulos.find((item) => item.id === id);

  // Función que recibe los datos desde el componente hijo ArticuloSolicitudForm
  const procesarEnvioSolicitud = (
    tipoSolicitud: 'Donación' | 'Intercambio',
    mensaje: string,
    articuloOfrecidoId?: string
  ) => {
    console.log(`Enviando solicitud de ${tipoSolicitud} para el artículo ${articulo?.id}:`, {
      mensaje,
      articuloOfrecidoId
    });
    // Aquí iría el fetch() hacia el backend para guardar la solicitud.
  };

  const handleEliminarArticulo = () => {
    if (!id) return;
    removeArticulo(id);
    setIsDeleteModalOpen(false);
    navigate('/admin/todos');
  };

  const handleAgregarDias = (daysToAdd: number) => {
    if (!id) return;
    addDaysToExpiration(id, daysToAdd);
    setIsExpirationUpdatedOpen(true);
  };

  return (
    <div className="detalle-layout">
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="detalle-content">
        <div className="detalle-back-row">
          <button className="btn-volver-texto" onClick={() => navigate(isAdmin ? '/admin/todos' : '/todos')}>
            <img src={flechaVolverNegra} alt="Volver" className="icon-volver" />
            <span>Volver al Catálogo</span>
          </button>
        </div>

        {articulo ? (
          <section className="detalle-grid">
            <div className="detalle-col-left">
              <div className="detalle-image-box">
                <img src={articulo.imageUrl} alt={articulo.title} />
              </div>
            </div>

            <div className="detalle-col-right">
              <ArticuloInfoBox
                category={articulo.category}
                title={articulo.title}
                modality={articulo.modality}
                description={articulo.description}
                condition={articulo.condition}
                author={articulo.author}
                tags={articulo.tags}
                daysElapsed={articulo.daysElapsed}
                expirationDays={articulo.expirationDays}
                isAdmin={isAdmin}
                onDelete={isAdmin ? () => setIsDeleteModalOpen(true) : undefined}
                onAddExpirationDays={isAdmin ? handleAgregarDias : undefined}
              />

              {!isAdmin && <ArticuloSolicitudForm onEnviarSolicitud={procesarEnvioSolicitud} />}
            </div>
          </section>
        ) : (
          <div className="detalle-not-found">
            <h1>Artículo no encontrado</h1>
            <p>El artículo que buscas no está disponible en el catálogo.</p>
            <button
              type="button"
              className="btn-publicar-negro"
              onClick={() => navigate(isAdmin ? '/admin/todos' : '/todos')}
            >
              Volver al catálogo
            </button>
          </div>
        )}
      </main>

      <Footer />

      {isAdmin && (
        <>
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleEliminarArticulo}
          />
          <ExpirationUpdatedModal
            isOpen={isExpirationUpdatedOpen}
            onClose={() => setIsExpirationUpdatedOpen(false)}
          />
        </>
      )}
    </div>
  );
};