import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackLink, ScreenLayout } from '../components/ScreenLayout';
import { ApiError, displayCategory, publicacionesApi } from '../services/publicacionesApi';
import type { Publication, PublicationData } from '../services/publicacionesApi';
import './PublicationScreens.css';

export const EditPublicationScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isDelete = location.pathname.endsWith('/eliminar');
  const [publication, setPublication] = useState<Publication | null>(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(!isDelete);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id || isDelete) return;
    publicacionesApi.get(id)
      .then((result) => {
        setPublication(result);
        setCategory(displayCategory(result.category));
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof ApiError && requestError.status === 401) {
          navigate('/login');
          return;
        }
        setError(requestError instanceof ApiError ? requestError.message : 'No se pudo cargar la publicación.');
      })
      .finally(() => setLoading(false));
  }, [id, isDelete, navigate]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;
    setError('');
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const data: PublicationData = {
      title: String(formData.get('title') || ''),
      category: String(formData.get('category') || ''),
      condition: String(formData.get('condition') || ''),
      modality: String(formData.get('modality') || 'Donación') as PublicationData['modality'],
      description: String(formData.get('description') || ''),
      imageUrl: String(formData.get('imageUrl') || ''),
      talla: String(formData.get('talla') || ''),
      genero: String(formData.get('genero') || ''),
      clima: String(formData.get('clima') || ''),
    };

    try {
      await publicacionesApi.update(id, data);
      navigate('/publicaciones');
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        navigate('/login');
        return;
      }
      setError(requestError instanceof ApiError ? requestError.message : 'No se pudo actualizar la publicación.');
    } finally {
      setSaving(false);
    }
  };

  if (isDelete) {
    return (
      <ScreenLayout title="Eliminar publicación" subtitle="Esta acción no se puede deshacer." width="wide">
        <BackLink to="/publicaciones">Volver a mis publicaciones</BackLink>
        <DeletePublicationDialog publicationId={id ?? ''} />
      </ScreenLayout>
    );
  }

  if (loading) {
    return <ScreenLayout title="Editar publicación" subtitle="Cargando artículo…" width="wide"><p role="status">Cargando publicación…</p></ScreenLayout>;
  }
  if (error || !publication) {
    return <ScreenLayout title="No se pudo abrir la publicación" subtitle={error || 'Publicación no encontrada.'} width="wide"><BackLink to="/publicaciones">Volver a mis publicaciones</BackLink></ScreenLayout>;
  }

  return (
    <ScreenLayout title="Editar publicación" subtitle="Actualiza la información de tu artículo." width="wide">
      <BackLink to="/publicaciones">Volver a mis publicaciones</BackLink>
      <section className="screen-panel publication-editor">
        <form className="screen-form" onSubmit={handleUpdate}>
          <label>Enlace de la fotografía
            <input name="imageUrl" type="url" defaultValue={publication.imageUrl} placeholder="https://ejemplo.com/imagen.jpg" />
          </label>
          <div className="publication-form-grid">
            <label>Título<input name="title" defaultValue={publication.title} required minLength={3} /></label>
            <label>Categoría
              <select name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Ropa</option><option>Libros</option><option>Útiles Escolares</option><option>Muebles pequeños</option>
              </select>
            </label>
            <label>Estado
              <select name="condition" defaultValue={publication.condition}>
                <option>Nuevo</option><option>Como nuevo</option><option>Buen Estado</option><option>Con uso</option><option>Usado</option>
              </select>
            </label>
            <label>Modalidad
              <select name="modality" defaultValue={publication.modality}>
                <option>Intercambio</option><option>Donación</option>
              </select>
            </label>
          </div>
          {category === 'Ropa' && (
            <div className="publication-clothing-data">
              <h2>Datos de ropa</h2>
              <div className="publication-form-grid">
                <label>Talla<select name="talla" defaultValue={publication.talla || 'M'}><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option></select></label>
                <label>Género<select name="genero" defaultValue={publication.genero || 'Unisex'}><option>Mujer</option><option>Hombre</option><option>Unisex</option></select></label>
                <label>Clima<select name="clima" defaultValue={publication.clima || 'Templado'}><option>Frío</option><option>Templado</option><option>Cálido</option></select></label>
              </div>
            </div>
          )}
          <label>Descripción
            <textarea name="description" defaultValue={publication.description} required />
          </label>
          {error && <p className="publication-api-error" role="alert">{error}</p>}
          <div className="screen-actions publication-editor-actions">
            <button className="screen-button" type="submit" disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</button>
            <Link className="screen-button screen-button-secondary" to="/publicaciones">Cancelar</Link>
            <Link className="publication-delete-link" to={`/publicaciones/${id}/eliminar`}>Eliminar publicación</Link>
          </div>
        </form>
      </section>
    </ScreenLayout>
  );
};

const DeletePublicationDialog: React.FC<{ publicationId: string }> = ({ publicationId }) => {
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const deletePublication = async () => {
    setDeleting(true);
    setError('');
    try {
      await publicacionesApi.delete(publicationId);
      setDeleted(true);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        navigate('/login');
        return;
      }
      setError(requestError instanceof ApiError ? requestError.message : 'No se pudo eliminar la publicación.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="screen-overlay">
      <section className="screen-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-publication-title">
        {deleted ? (
          <>
            <h2 id="delete-publication-title">Publicación eliminada</h2>
            <p>El artículo se quitó de tus publicaciones.</p>
            <button className="screen-button" onClick={() => navigate('/publicaciones')}>Continuar</button>
          </>
        ) : (
          <>
            <h2 id="delete-publication-title">¿Eliminar esta publicación?</h2>
            <p>El artículo dejará de aparecer en el catálogo y no podrás recuperar esta publicación.</p>
            {error && <p className="publication-api-error" role="alert">{error}</p>}
            <div className="screen-actions">
              <button className="screen-button screen-button-danger" onClick={deletePublication} disabled={deleting}>{deleting ? 'Eliminando…' : 'Eliminar artículo'}</button>
              <button className="screen-button screen-button-secondary" onClick={() => navigate(`/publicaciones/${publicationId}/editar`)}>Cancelar</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export const PublicationConfirmationScreen: React.FC = () => (
  <ScreenLayout title="¡Artículo publicado!" subtitle="Tu publicación ya está disponible para la comunidad.">
    <section className="screen-panel publication-success">
      <span className="exchange-check" aria-hidden="true">✓</span>
      <h2>Artículo agregado correctamente</h2>
      <p>Las personas de tu comunidad ya pueden encontrar tu artículo y enviarte solicitudes.</p>
      <div className="screen-actions">
        <Link className="screen-button" to="/publicaciones">Ver mis publicaciones</Link>
        <Link className="screen-button screen-button-secondary" to="/explorar">Ir a explorar</Link>
      </div>
    </section>
  </ScreenLayout>
);
