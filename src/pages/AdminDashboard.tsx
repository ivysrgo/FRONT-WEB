<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import {
  obtenerTodasLasPublicaciones,
  actualizarPublicacion,
  eliminarPublicacion,
  type PostItem,
} from '../services/publicacionService';
import { ApiError } from '../services/api';
import './Publicaciones.css';

export const AdminDashboard: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<PostItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorDeCarga, setErrorDeCarga] = useState<string | null>(null);
  const [actualizandoId, setActualizandoId] = useState<string | null>(null);

  const cargarInventario = async () => {
    setCargando(true);
    try {
      const datos = await obtenerTodasLasPublicaciones();
      setPublicaciones(datos);
      setErrorDeCarga(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorDeCarga(`Error ${error.status}: ${error.message}`);
      } else {
        setErrorDeCarga('No se pudo cargar el inventario de MongoDB Atlas.');
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    let cancelado = false;
    obtenerTodasLasPublicaciones()
      .then((datos) => {
        if (!cancelado) {
          setPublicaciones(datos);
          setErrorDeCarga(null);
        }
      })
      .catch((error) => {
        if (!cancelado) {
          if (error instanceof ApiError) {
            setErrorDeCarga(`Error ${error.status}: ${error.message}`);
          } else {
            setErrorDeCarga('No se pudo cargar el inventario de MongoDB Atlas.');
          }
        }
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, []);

  const cambiarEstado = async (id: string, nuevoEstado: PostItem['status']) => {
    try {
      setActualizandoId(id);
      await actualizarPublicacion(id, { status: nuevoEstado });
      setPublicaciones((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: nuevoEstado } : item))
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo actualizar el estado');
    } finally {
      setActualizandoId(null);
    }
  };

  const handleEliminar = async (id: string, title: string) => {
    if (!window.confirm(`¿Eliminar definitivamente "${title}" de MongoDB Atlas?`)) return;
    try {
      setActualizandoId(id);
      await eliminarPublicacion(id);
      setPublicaciones((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo eliminar la publicación');
    } finally {
      setActualizandoId(null);
    }
  };

  const disponibles = publicaciones.filter((p) => p.status === 'Disponible').length;
  const donados = publicaciones.filter((p) => p.status === 'Donado').length;

  return (
    <div className="publicaciones-page">
      <AdminNavbar />

      <main className="publicaciones-content">
        <header className="publicaciones-header">
          <h1 className="publicaciones-title">Administración de Inventario</h1>
          <p className="publicaciones-subtitle">
            Supervisa y modera todas las prendas y artículos publicados por la comunidad en MongoDB Atlas.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div style={{ background: '#85DAFF', borderRadius: '18px', padding: '18px 22px' }}>
            <div style={{ fontSize: '30px', fontWeight: 700 }}>{publicaciones.length}</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Total Publicaciones</div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '18px 22px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#15803D' }}>{disponibles}</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Disponibles</div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: '18px', padding: '18px 22px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#FF9600' }}>{donados}</div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Escalados a Unidona</div>
          </div>
        </section>

        {cargando && (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3 style={{ color: '#0070BA' }}>Cargando inventario desde MongoDB Atlas...</h3>
          </div>
        )}

        {errorDeCarga && !cargando && (
          <div style={{ backgroundColor: '#fee2e2', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#D5473A', fontWeight: 600 }}>{errorDeCarga}</p>
            <button
              type="button"
              onClick={cargarInventario}
              style={{
                padding: '10px 20px',
                backgroundColor: '#D5473A',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !errorDeCarga && (
          <section className="publicaciones-list">
            {publicaciones.map((post) => (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px 24px',
                  border: '1px solid #ECECEC',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 280px' }}>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '1px solid #E5E7EB',
                    }}
                  />
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#0070BA', textTransform: 'uppercase' }}>
                      {post.category} · {post.author || 'Comunidad'}
                    </span>
                    <h3 style={{ margin: '2px 0 4px 0', fontSize: '17px', fontWeight: 700 }}>{post.title}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{post.details}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <select
                    value={post.status}
                    disabled={actualizandoId === post.id}
                    onChange={(e) => cambiarEstado(post.id, e.target.value as PostItem['status'])}
                    aria-label={`Estado de ${post.title}`}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #D1D5DB',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Donado">Donado</option>
                    <option value="Caducado">Caducado</option>
                  </select>

                  <button
                    type="button"
                    disabled={actualizandoId === post.id}
                    onClick={() => handleEliminar(post.id, post.title)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#FEE2E2',
                      color: '#D5473A',
                      border: '1px solid #FECACA',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import './AdminDashboard.css';

// Importación de los logos que mencionaste en la imagen 13
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
      title: 'Reportes',
      icon: reportesLogo,
      path: '/admin/reportes'
    },
    {
      id: 'historial',
      title: 'Historial de donaciones',
      icon: donacionesLogo,
      path: '/admin/historial'
    },
    {
      id: 'metricas',
      title: 'Métricas',
      icon: metricasLogo,
      path: '/admin/metricas'
    },
    {
      id: 'usuarios',
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
              onClick={() => navigate(option.path)}
            >
              <h2 className="admin-card-title">{option.title}</h2>
              <div className="admin-card-icon-wrapper">
                <img src={option.icon} alt={option.title} className="admin-card-icon" />
              </div>
            </button>
          ))}
        </section>
>>>>>>> Luisa
      </main>

      <Footer />
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> Luisa
