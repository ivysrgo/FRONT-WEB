import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import { DonateConfirmModal } from '../components/DonateConfirmModal';
import './Publicaciones.css';

import { obtenerMisPublicaciones } from '../services/publicacionService';
import { ApiError } from '../services/api';

export interface PostItem {
  id: string;
  category: string;
  title: string;
  details: string;
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  imageUrl: string;
}

export const Publicaciones: React.FC = () => {
  const navigate = useNavigate();
  // 1. Estados de datos y de red (Sesión 3)
  const [publicaciones, setPublicaciones] = useState<PostItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorDeCarga, setErrorDeCarga] = useState<string | null>(null);

  const [modalDonarAbierto, setModalDonarAbierto] = useState(false);
  const [idArticuloADonar, setIdArticuloADonar] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    const cargarDatos = async () => {
      try {
        if (!localStorage.getItem('token')) {
          navigate('/login');
          return;
        }
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
  }, [navigate]);

  const solicitarDonacion = (id: string) => {
    setIdArticuloADonar(id);
    setModalDonarAbierto(true);
  };

  const confirmarDonacion = () => {
    if (idArticuloADonar) {
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
      <Navbar />

      <main className="publicaciones-content">
        <header className="publicaciones-header">
          <h1 className="publicaciones-title">Mis Publicaciones</h1>
          <p className="publicaciones-subtitle">
            Los campos obligatorios estandarizan el inventario. En ropa se piden talla, género y clima para que el artículo pueda clasificarse también en el Banco de Ropa de Unidona.
          </p>
        </header>

        {/* 3. Renderizado Condicional: Estado de Carga */}
        {cargando && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h3 style={{ color: '#0070BA' }}>Cargando inventario...</h3>
            {/* Aquí se puede insertar el componente <Spinner /> visual más adelante */}
          </div>
        )}

        {/* 4. Renderizado Condicional: Estado de Error */}
        {errorDeCarga && !cargando && (
          <div style={{ backgroundColor: '#fee2e2', padding: '20px', borderRadius: '12px', textAlign: 'center', margin: '20px 0' }}>
            <h3 style={{ color: '#D5473A', margin: '0 0 10px 0' }}>¡Uy! Algo salió mal</h3>
            <p style={{ color: '#000', marginBottom: '15px' }}>{errorDeCarga}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ padding: '10px 20px', backgroundColor: '#D5473A', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* 5. Renderizado Condicional: Éxito (Lista de Tarjetas) */}
        {!cargando && !errorDeCarga && (
          <section className="publicaciones-list">
            {publicaciones.length === 0 ? (
              <p style={{ textAlign: 'center' }}>No tienes publicaciones activas en este momento.</p>
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