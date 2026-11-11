import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackLink, ScreenLayout } from '../components/ScreenLayout';
import './PublicationScreens.css';

export const EditPublicationScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('Ropa');
  const [mode, setMode] = useState('Intercambio');
  const isDelete = location.pathname.endsWith('/eliminar');

  return (
    <ScreenLayout title="Editar publicación" subtitle="Actualiza la información de tu artículo." width="wide">
      <BackLink to="/publicaciones">Volver a mis publicaciones</BackLink>
      <section className="screen-panel publication-editor">
        <form className="screen-form" onSubmit={(event) => { event.preventDefault(); navigate('/publicaciones'); }}>
          <label>Fotografía
            <input type="file" accept="image/png,image/jpeg" />
          </label>
          <div className="publication-form-grid">
            <label>Título<input defaultValue="Abrigo de paño gris" required /></label>
            <label>Categoría
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Ropa</option><option>Libros</option><option>Útiles</option><option>Muebles pequeños</option>
              </select>
            </label>
            <label>Estado
              <select defaultValue="Como nuevo"><option>Nuevo</option><option>Como nuevo</option><option>Buen estado</option><option>Con uso</option></select>
            </label>
            <label>Modalidad
              <select value={mode} onChange={(event) => setMode(event.target.value)}>
                <option>Intercambio</option><option>Donación</option>
              </select>
            </label>
          </div>
          {category === 'Ropa' && (
            <div className="publication-clothing-data">
              <h2>Datos de ropa</h2>
              <div className="publication-form-grid">
                <label>Talla<select defaultValue="M"><option>S</option><option>M</option><option>L</option><option>XL</option></select></label>
                <label>Género<select defaultValue="Mujer"><option>Mujer</option><option>Hombre</option><option>Unisex</option></select></label>
                <label>Clima<select defaultValue="Frío"><option>Frío</option><option>Templado</option><option>Cálido</option></select></label>
              </div>
            </div>
          )}
          <label>Descripción
            <textarea defaultValue="Abrigo de paño gris, en excelente estado. Talla M." required />
          </label>
          <div className="screen-actions publication-editor-actions">
            <button className="screen-button" type="submit">Guardar cambios</button>
            <Link className="screen-button screen-button-secondary" to="/publicaciones">Cancelar</Link>
            <Link className="publication-delete-link" to={`/publicaciones/${id ?? '1'}/eliminar`}>Eliminar publicación</Link>
          </div>
        </form>
      </section>

      {isDelete && <DeletePublicationDialog publicationId={id ?? '1'} />}
    </ScreenLayout>
  );
};

const DeletePublicationDialog: React.FC<{ publicationId: string }> = ({ publicationId }) => {
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

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
            <div className="screen-actions">
              <button className="screen-button screen-button-danger" onClick={() => setDeleted(true)}>Eliminar artículo</button>
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
