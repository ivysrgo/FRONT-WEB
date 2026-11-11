import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BackLink, ScreenLayout } from '../components/ScreenLayout';
import './SearchScreens.css';

interface CatalogItem {
  id: string;
  category: string;
  title: string;
  type: 'Donación' | 'Intercambio';
  condition: string;
  author: string;
  description: string;
  image: string;
}

const catalog: CatalogItem[] = [
  {
    id: '1',
    category: 'Libros',
    title: 'Diccionario bilingüe Oxford',
    type: 'Donación',
    condition: 'Buen estado',
    author: 'Valentina P.',
    description: 'Diccionario bilingüe de inglés, en buen estado y con páginas completas.',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80',
  },
  {
    id: '2',
    category: 'Ropa',
    title: 'Abrigo de paño gris',
    type: 'Intercambio',
    condition: 'Como nuevo · Talla M',
    author: 'Andrés S.',
    description: 'Abrigo de paño gris, abrigado y en excelente estado. Talla M.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
  },
  {
    id: '3',
    category: 'Útiles',
    title: 'Set de escuadras y compás',
    type: 'Donación',
    condition: 'Como nuevo',
    author: 'Valentina P.',
    description: 'Set de dibujo técnico: dos escuadras, transportador y compás.',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80',
  },
  {
    id: '4',
    category: 'Muebles pequeños',
    title: 'Repisa de madera 60 cm',
    type: 'Intercambio',
    condition: 'Buen estado',
    author: 'Pedro C.',
    description: 'Repisa de madera de abedul de 60 cm. Busca un nuevo hogar.',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
  },
  {
    id: '5',
    category: 'Ropa',
    title: 'Camisas de trabajo (x3)',
    type: 'Donación',
    condition: 'Buen estado · Talla M',
    author: 'Andrés S.',
    description: 'Tres camisas de trabajo de algodón, manga corta.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
  },
  {
    id: '6',
    category: 'Libros',
    title: 'Harry Potter y la Piedra Filosofal',
    type: 'Intercambio',
    condition: 'Buen estado',
    author: 'Mariana C.',
    description: 'Primera novela de la saga, ideal para intercambio.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  },
];

const categories = ['Todos', 'Libros', 'Útiles', 'Muebles pequeños', 'Ropa'];

export const SearchScreen: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const isEmptyState = location.pathname.endsWith('/sin-resultados');
  const query = params.get('q') ?? '';
  const activeCategory = params.get('categoria') ?? 'Todos';
  const [searchText, setSearchText] = useState(query);
  const filteredItems = catalog.filter((item) => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesQuery = !query || `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
  const items = isEmptyState ? [] : filteredItems;

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

      {items.length > 0 ? (
        <>
          <div className="catalog-results-heading">
            <strong>{items.length} artículos encontrados</strong>
            <span>Artículos recientes de la comunidad</span>
          </div>
          <div className="feature-catalog-grid">
            {items.map((item) => (
              <article className="feature-product-card" key={item.id}>
                <Link to={`/productos/${item.id}`} className="feature-product-image-link" aria-label={`Ver ${item.title}`}>
                  <img className="feature-product-image" src={item.image} alt={item.title} />
                  <span className={`feature-product-type ${item.type === 'Donación' ? 'donation' : 'exchange'}`}>{item.type}</span>
                </Link>
                <div className="feature-product-body">
                  <span className="feature-product-category">{item.category}</span>
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

const getItem = (id: string | undefined) => catalog.find((item) => item.id === id) ?? catalog[0];

export const ProductScreen: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const item = getItem(id);
  const mode = location.pathname.split('/').pop();
  const isRequest = mode === 'solicitar';
  const isReport = mode === 'reportar';
  const isExchangeConfirmation = mode === 'confirmar-intercambio';
  const isDialogOpen = isRequest || isReport || isExchangeConfirmation;

  const sendRequest = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/solicitudes/intercambio-confirmado');
  };

  return (
    <ScreenLayout title={item.title} subtitle={`${item.category} · ${item.type}`} width="wide">
      <BackLink to="/buscar">Volver a explorar</BackLink>
      <section className="screen-panel product-detail">
        <img src={item.image} alt={item.title} />
        <div className="product-detail-copy">
          <span className={`feature-product-type ${item.type === 'Donación' ? 'donation' : 'exchange'}`}>{item.type}</span>
          <p className="feature-product-category">{item.category}</p>
          <h2>{item.title}</h2>
          <p className="product-detail-description">{item.description}</p>
          <dl className="product-facts">
            <div><dt>Estado</dt><dd>{item.condition}</dd></div>
            <div><dt>Publicado por</dt><dd>{item.author}</dd></div>
            <div><dt>Ubicación</dt><dd>Bogotá · Sede Claustro</dd></div>
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
