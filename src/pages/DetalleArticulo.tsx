import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArticuloInfoBox } from '../components/ArticuloInfoBox';
import { ArticuloSolicitudForm } from '../components/ArticuloSolicitudForm';
import { articulosMock } from '../data/articulos';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './DetalleArticulo.css';

export const DetalleArticulo: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const articulo = articulosMock.find((item) => item.id === id);

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

  return (
    <div className="detalle-layout">
      <Navbar />

      <main className="detalle-content">
        <div className="detalle-back-row">
          <button className="btn-volver-texto" onClick={() => navigate('/todos')}>
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
              />

              <ArticuloSolicitudForm onEnviarSolicitud={procesarEnvioSolicitud} />
            </div>
          </section>
        ) : (
          <div className="detalle-not-found">
            <h1>Artículo no encontrado</h1>
            <p>El artículo que buscas no está disponible en el catálogo.</p>
            <button type="button" className="btn-publicar-negro" onClick={() => navigate('/todos')}>
              Volver al catálogo
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};