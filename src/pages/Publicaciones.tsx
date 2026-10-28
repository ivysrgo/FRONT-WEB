import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import './Publicaciones.css';

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
  // 1. Estados de datos y de red (Sesión 3)
  const [publicaciones, setPublicaciones] = useState<PostItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorDeCarga, setErrorDeCarga] = useState<string | null>(null);

  // 2. Ejecutar la petición HTTP al montar el componente
  useEffect(() => {
    let cancelado = false; // Evita fugas de memoria si el componente se desmonta antes de que responda el fetch

    const cargarDatos = async () => {
      try {
        // Simulamos un retraso de red de 1 segundo para poder ver el estado "Cargando..."
        await new Promise((resolver) => setTimeout(resolver, 1000));

        // Petición al backend simulado
        const respuesta = await fetch('/publicaciones-demo.json');
        
        // Manejo del código de estado HTTP
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: No se pudo obtener el inventario.`);
        }
        
        const datos = await respuesta.json();

        if (!cancelado) {
          setPublicaciones(datos);
          setErrorDeCarga(null);
        }
      } catch (error: any) {
        if (!cancelado) {
          setErrorDeCarga(error.message || 'No pudimos conectar con el servidor. Verifica tu conexión.');
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

  const manejarDonarUnidona = (id: string) => {
    const nuevasPublicaciones = publicaciones.map((post) => 
      post.id === id ? { ...post, status: 'Donado' as const } : post
    );
    setPublicaciones(nuevasPublicaciones);
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
                  onDonate={() => manejarDonarUnidona(post.id)}
                />
              ))
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};