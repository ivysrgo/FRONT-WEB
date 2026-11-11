import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import { ApiError, displayCategory, getImageUrl, publicacionesApi } from '../services/publicacionesApi';
import type { Publication } from '../services/publicacionesApi';
import './Publicaciones.css';

export const Publicaciones: React.FC = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    publicacionesApi.listMine()
      .then(setMyPosts)
      .catch((requestError: unknown) => {
        if (requestError instanceof ApiError && requestError.status === 401) {
          navigate('/login');
          return;
        }
        setError(requestError instanceof ApiError ? requestError.message : 'No se pudieron cargar tus publicaciones.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

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

        <section className="publicaciones-list">
          {loading && <p>Cargando tus publicaciones…</p>}
          {error && <p className="publication-api-error" role="alert">{error}</p>}
          {!loading && !error && myPosts.length === 0 && <p>Aún no has publicado artículos.</p>}
          {myPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              category={displayCategory(post.category)}
              title={post.title}
              details={post.details || `${post.condition} · ${post.modality}`}
              requests={post.requests}
              status={post.status}
              daysElapsed={post.daysElapsed}
              imageUrl={getImageUrl(post.imageUrl)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};
