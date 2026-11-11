import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BackLink, ScreenLayout } from '../components/ScreenLayout';
import { ApiError, displayCategory, getImageUrl, publicacionesApi } from '../services/publicacionesApi';
import type { Publication } from '../services/publicacionesApi';
import './SearchScreens.css';

const categories = ['Todos', 'Libros', 'Útiles', 'Muebles pequeños', 'Ropa'];

export const SearchScreen: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const isEmptyState = location.pathname.endsWith('/sin-resultados');
  const query = params.get('q') ?? '';
  const activeCategory = params.get('categoria') ?? 'Todos';
  const [searchText, setSearchText] = useState(query);
  const filterKey = `${activeCategory}\u0000${query}`;
  const [result, setResult] = useState<{ key: string; items?: Publication[]; error?: string } | null>(null);

  useEffect(() => {
    publicacionesApi.list({ categoria: activeCategory, q: query })
      .then((items) => setResult({ key: filterKey, items }))
      .catch((requestError: unknown) => {
        const error = requestError instanceof ApiError ? requestError.message : 'No se pudieron cargar los artículos.';
        setResult({ key: filterKey, error });
      })
  }, [activeCategory, filterKey, query]);

  const loading = result?.key !== filterKey;
  const items = result?.key === filterKey ? result.items ?? [] : [];
  const error = result?.key === filterKey ? result.error : undefined;

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const next = new URLSearchParams(params);
    if (searchText.trim()) next.set('q', searchText.trim());
    else next.delete('q');
    setParams(next);
  };

  return (
    <ScreenLayout title="Buscar artículos" subtitle="Encuentra artículos para intercambiar o recibir en tu comunidad." width="wide">
      <form className="catalog-search" onSubmit={submitSearch} role="search">
        <input
          className="screen-search-input"
          aria-label="Buscar artículos"
          placeholder="¿Qué estás buscando?"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button className="screen-button" type="submit">Buscar</button>
      </form>

      <nav className="catalog-categories" aria-label="Filtrar por categoría">
        {categories.map((category) => {
          const next = new URLSearchParams(params);
          if (category === 'Todos') next.delete('categoria');
          else next.set('categoria', category);
          return (
            <Link
              key={category}
              className={`catalog-category ${activeCategory === category ? 'active' : ''}`}
              to={`/buscar${next.size ? `?${next.toString()}` : ''}`}
            >
              {category}
            </Link>
          );
        })}
      </nav>

      {loading ? (
        <p role="status">Cargando artículos…</p>
      ) : error ? (
        <section className="screen-panel search-empty-state"><h2 role="alert">{error}</h2></section>
      ) : !isEmptyState && items.length > 0 ? (
        <>
          <div className="catalog-results-heading">
            <strong>{items.length} artículos encontrados</strong>
            <span>Artículos recientes de la comunidad</span>
          </div>
          <div className="feature-catalog-grid">
            {items.map((item) => (
              <article className="feature-product-card" key={item.id}>
                <Link to={`/productos/${item.id}`} className="feature-product-image-link" aria-label={`Ver ${item.title}`}>
                  <img className="feature-product-image" src={getImageUrl(item.imageUrl)} alt={item.title} />
                  <span className={`feature-product-type ${item.modality === 'Donación' ? 'donation' : 'exchange'}`}>{item.modality}</span>
                </Link>
                <div className="feature-product-body">
                  <span className="feature-product-category">{displayCategory(item.category)}</span>
                  <h2><Link to={`/productos/${item.id}`}>{item.title}</Link></h2>
                  <p>{item.condition}</p>
                  <div className="feature-product-footer">
                    <span>{item.author}</span>
                    <Link to={`/productos/${item.id}`}>Ver artículo →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <section className="screen-panel search-empty-state">
          <span className="search-empty-icon" aria-hidden="true">⌕</span>
          <h2>{isEmptyState ? 'No encontramos resultados' : 'No hay artículos para mostrar'}</h2>
          <p>Prueba con otras palabras o explora todas las categorías disponibles.</p>
          <Link className="screen-button" to="/buscar">Ver todos los artículos</Link>
        </section>
      )}
    </ScreenLayout>
  );
};

export const ProductScreen: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [productResult, setProductResult] = useState<{ id: string; item?: Publication; error?: string } | null>(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    publicacionesApi.get(id)
      .then((item) => { if (active) setProductResult({ id, item }); })
      .catch((requestError: unknown) => {
        if (active) {
          const error = requestError instanceof ApiError ? requestError.message : 'No se pudo cargar el artículo.';
          setProductResult({ id, error });
        }
      });
    return () => { active = false; };
  }, [id]);

  const matchingResult = productResult?.id === id ? productResult : null;
  const loading = !matchingResult;
  const item = matchingResult?.item ?? null;
  const error = matchingResult?.error;

  const mode = location.pathname.split('/').pop();
  const isRequest = mode === 'solicitar';
  const isReport = mode === 'reportar';
  const isExchangeConfirmation = mode === 'confirmar-intercambio';
  const isDialogOpen = isRequest || isReport || isExchangeConfirmation;

  const sendRequest = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/solicitudes/intercambio-confirmado');
  };

  if (loading) {
    return <ScreenLayout title="Artículo" subtitle="Cargando información…" width="wide"><p role="status">Cargando artículo…</p></ScreenLayout>;
  }
  if (error || !item) {
    return <ScreenLayout title="Artículo no disponible" subtitle={error || 'No se encontró el artículo.'} width="wide"><BackLink to="/buscar">Volver a explorar</BackLink></ScreenLayout>;
  }

  return (
    <ScreenLayout title={item.title} subtitle={`${displayCategory(item.category)} · ${item.modality}`} width="wide">
      <BackLink to="/buscar">Volver a explorar</BackLink>
      <section className="screen-panel product-detail">
        <img src={getImageUrl(item.imageUrl)} alt={item.title} />
        <div className="product-detail-copy">
          <span className={`feature-product-type ${item.modality === 'Donación' ? 'donation' : 'exchange'}`}>{item.modality}</span>
          <p className="feature-product-category">{displayCategory(item.category)}</p>
          <h2>{item.title}</h2>
          <p className="product-detail-description">{item.description}</p>
          <dl className="product-facts">
            <div><dt>Estado</dt><dd>{item.condition}</dd></div>
            <div><dt>Publicado por</dt><dd>{item.author}</dd></div>
            <div><dt>Ubicación</dt><dd>{item.ubicacion || 'Bogotá, Colombia'}</dd></div>
          </dl>
          <div className="screen-actions">
            <Link className="screen-button" to={`/productos/${item.id}/solicitar`}>Enviar solicitud</Link>
            <Link className="screen-button screen-button-secondary" to={`/productos/${item.id}/confirmar-intercambio`}>Proponer intercambio</Link>
            <Link className="product-report-link" to={`/productos/${item.id}/reportar`}>Reportar artículo</Link>
          </div>
        </div>
      </section>

      {isDialogOpen && (
        <div className="screen-overlay">
          <section className="screen-dialog product-dialog" role="dialog" aria-modal="true">
            {submitted ? (
              <>
                <h2>Reporte enviado</h2>
                <p>Gracias. El equipo revisará el artículo reportado.</p>
                <button className="screen-button" onClick={() => navigate(`/productos/${item.id}`)}>Cerrar</button>
              </>
            ) : isRequest ? (
              <>
                <h2>Enviar solicitud</h2>
                <p>Cuéntale a {item.author} por qué te interesa este artículo.</p>
                <form className="screen-form" onSubmit={sendRequest}>
                  <label>Mensaje<textarea required placeholder="Escribe tu mensaje para el publicador" /></label>
                  <div className="screen-actions">
                    <button className="screen-button" type="submit">Enviar solicitud</button>
                    <button className="screen-button screen-button-secondary" type="button" onClick={() => navigate(`/productos/${item.id}`)}>Cancelar</button>
                  </div>
                </form>
              </>
            ) : isReport ? (
              <>
                <h2>Reportar artículo</h2>
                <p>Indica el motivo por el que este artículo debería ser revisado.</p>
                <form className="screen-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                  <label>Motivo del reporte
                    <select required defaultValue="">
                      <option value="" disabled>Selecciona un motivo</option>
                      <option>Contenido inapropiado</option>
                      <option>Información engañosa</option>
                      <option>Artículo no disponible</option>
                      <option>Otro</option>
                    </select>
                  </label>
                  <label>Detalles<textarea placeholder="Agrega información adicional (opcional)" /></label>
                  <div className="screen-actions">
                    <button className="screen-button screen-button-danger" type="submit">Enviar reporte</button>
                    <button className="screen-button screen-button-secondary" type="button" onClick={() => navigate(`/productos/${item.id}`)}>Cancelar</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2>Confirmar intercambio</h2>
                <p>¿Quieres enviar una propuesta de intercambio por “{item.title}”?</p>
                <div className="screen-actions">
                  <button className="screen-button" onClick={() => navigate(`/productos/${item.id}/solicitar`)}>Sí, continuar</button>
                  <button className="screen-button screen-button-secondary" onClick={() => navigate(`/productos/${item.id}`)}>Cancelar</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </ScreenLayout>
  );
};

export const ExchangeConfirmationScreen: React.FC = () => (
  <ScreenLayout title="¡Solicitud enviada!" subtitle="Tu propuesta de intercambio ha sido enviada al publicador.">
    <section className="screen-panel exchange-confirmation">
      <span className="exchange-check" aria-hidden="true">✓</span>
      <h2>Solicitud confirmada</h2>
      <p>Recibirás una notificación cuando la otra persona responda. Puedes consultar el estado desde Mis Solicitudes.</p>
      <div className="screen-actions">
        <Link className="screen-button" to="/solicitudes">Ver mis solicitudes</Link>
        <Link className="screen-button screen-button-secondary" to="/explorar">Volver a explorar</Link>
      </div>
    </section>
  </ScreenLayout>
);
