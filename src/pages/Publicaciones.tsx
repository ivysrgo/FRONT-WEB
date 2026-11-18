import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import { DonateConfirmModal } from '../components/DonateConfirmModal';
import { esAdmin } from '../services/authService';
import {
  obtenerMisPublicaciones,
  actualizarPublicacion,
  type PostItem,
} from '../services/publicacionService';
import { ApiError } from '../services/api';
import './Publicaciones.css';

export const Publicaciones: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<PostItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorDeCarga, setErrorDeCarga] = useState<string | null>(null);

  const [modalDonarAbierto, setModalDonarAbierto] = useState(false);
  const [idArticuloADonar, setIdArticuloADonar] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    const cargarDatos = async () => {
      try {
        const datos = await obtenerMisPublicaciones();

        if (!cancelado) {
          setPublicaciones(datos);
          setErrorDeCarga(null);
        }
      } catch (error: unknown) {
        if (!cancelado) {
          if (error instanceof ApiError) {
            setErrorDeCarga(`Error ${error.status}: ${error.message}`);
          } else if (error instanceof Error) {
            setErrorDeCarga(error.message);
          } else {
            setErrorDeCarga('No pudimos conectar con el servidor.');
          }
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    cargarDatos();

    return () => {
      cancelado = true;
    };
  }, []);

  const solicitarDonacion = (id: string) => {
    setIdArticuloADonar(id);
    setModalDonarAbierto(true);
  };

  const confirmarDonacion = async () => {
    if (idArticuloADonar) {
      try {
        await actualizarPublicacion(idArticuloADonar, { status: 'Donado' });
      } catch (err) {
        console.error('Error al actualizar donación en MongoDB Atlas:', err);
      }
      setPublicaciones((publicacionesActuales) =>
        publicacionesActuales.map((post) =>
          post.id === idArticuloADonar ? { ...post, status: 'Donado' } : post
        )
      );
      setModalDonarAbierto(false);
      setIdArticuloADonar(null);
    }
  };

  return (
    <div className="publicaciones-page">
      {esAdmin() ? <AdminNavbar /> : <Navbar />}

      <main className="publicaciones-content">
        <header className="publicaciones-header">
          <h1 className="publicaciones-title">Mis Publicaciones</h1>
          <p className="publicaciones-subtitle">
            Los campos obligatorios estandarizan el inventario. En ropa se piden talla, género y clima para que el artículo pueda clasificarse también en el Banco de Ropa de Unidona.
          </p>
        </header>

        {cargando && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h3 style={{ color: '#0070BA', fontSize: '18px' }}>
              Cargando inventario desde MongoDB Atlas...
            </h3>
          </div>
        )}

        {errorDeCarga && !cargando && (
          <div style={{ backgroundColor: '#fee2e2', padding: '20px', borderRadius: '12px', textAlign: 'center', margin: '20px 0' }}>
            <h3 style={{ color: '#D5473A', margin: '0 0 10px 0' }}>¡Uy! Algo salió mal</h3>
            <p style={{ color: '#000', marginBottom: '15px' }}>{errorDeCarga}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#D5473A',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !errorDeCarga && (
          <section className="publicaciones-list">
            {publicaciones.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
                <p style={{ fontSize: '16px', color: '#6B7280', margin: '0 0 16px 0' }}>
                  No tienes publicaciones activas en este momento.
                </p>
                <Link
                  to="/publicar"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#0070BA',
                    color: '#FFF',
                    padding: '10px 22px',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Publicar mi primer artículo
                </Link>
              </div>
            ) : (
              publicaciones.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  category={post.category}
                  title={post.title}
                  details={post.details}
                  requests={post.requests}
                  status={post.status}
                  daysElapsed={post.daysElapsed}
                  imageUrl={post.imageUrl}
                  onDonate={() => solicitarDonacion(post.id)}
                />
              ))
            )}
          </section>
        )}
      </main>

      <Footer />

      <DonateConfirmModal
        isOpen={modalDonarAbierto}
        onClose={() => {
          setModalDonarAbierto(false);
          setIdArticuloADonar(null);
        }}
        onConfirm={confirmarDonacion}
      />
    </div>
  );
};
