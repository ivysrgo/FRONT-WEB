import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DonateConfirmModal } from '../components/DonateConfirmModal';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { PostCard } from '../components/PostCard';
import { ApiError, displayCategory, getImageUrl, publicacionesApi } from '../services/publicacionesApi';
import type { Publication } from '../services/publicacionesApi';
import './Publicaciones.css';

export type PostItem = Pick<
  Publication,
  'id' | 'category' | 'title' | 'details' | 'requests' | 'status' | 'daysElapsed' | 'imageUrl'
>;

export const Publicaciones: React.FC = () => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [publicationToDonate, setPublicationToDonate] = useState<string | null>(null);
  const [donating, setDonating] = useState(false);

  useEffect(() => {
    let active = true;
    publicacionesApi.listMine()
      .then((items) => {
        if (active) setPublications(items);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 401) {
          navigate('/login');
          return;
        }
        setError(requestError instanceof ApiError
          ? requestError.message
          : 'No se pudieron cargar tus publicaciones.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const closeDonateModal = () => {
    setDonateModalOpen(false);
    setPublicationToDonate(null);
  };

  const confirmDonation = async () => {
    if (!publicationToDonate) return;
    setDonating(true);
    setError('');
    try {
      await publicacionesApi.update(publicationToDonate, { status: 'Donado' });
      setPublications((current) => current.map((publication) => (
        publication.id === publicationToDonate
          ? { ...publication, status: 'Donado' }
          : publication
      )));
      closeDonateModal();
    } catch (requestError: unknown) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        navigate('/login');
        return;
      }
      setError(requestError instanceof ApiError
        ? requestError.message
        : 'No se pudo confirmar la donación.');
    } finally {
      setDonating(false);
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

        {loading && <p role="status">Cargando tus publicaciones…</p>}
        {error && <p className="publication-api-error" role="alert">{error}</p>}
        {!loading && !error && publications.length === 0 && <p>Aún no has publicado artículos.</p>}

        {!loading && !error && publications.length > 0 && (
          <section className="publicaciones-list">
            {publications.map((publication) => (
              <PostCard
                key={publication.id}
                id={publication.id}
                category={displayCategory(publication.category)}
                title={publication.title}
                details={publication.details || `${publication.condition} · ${publication.modality}`}
                requests={publication.requests}
                status={publication.status}
                daysElapsed={publication.daysElapsed}
                imageUrl={getImageUrl(publication.imageUrl)}
                onDonate={() => {
                  setPublicationToDonate(publication.id);
                  setDonateModalOpen(true);
                }}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
      <DonateConfirmModal
        isOpen={donateModalOpen}
        onClose={closeDonateModal}
        onConfirm={confirmDonation}
        isLoading={donating}
        error={error}
      />
    </div>
  );
};
