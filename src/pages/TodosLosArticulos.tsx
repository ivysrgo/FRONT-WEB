import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { applyFilters, filtersFromParams } from '../utils/searchFilters';
import { recargarArticulos, useArticulos, useEstadoArticulos } from '../data/articulos';
import { agregarFavorito, obtenerFavoritos, quitarFavorito } from '../services/favoritoService';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './TodosLosArticulos.css';

interface TodosLosArticulosProps {
  isAdmin?: boolean;
}

export const TodosLosArticulos: React.FC<TodosLosArticulosProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const articulos = useArticulos();
  const estadoArticulos = useEstadoArticulos();
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [favoritosEnProceso, setFavoritosEnProceso] = useState<Set<string>>(new Set());
  const [errorFavoritos, setErrorFavoritos] = useState<string | null>(null);
  const currentFilters = useMemo(
    () => filtersFromParams(searchParams),
    [searchParams]
  );
  const itemsFiltrados = useMemo(
    () => applyFilters(articulos, currentFilters),
    [articulos, currentFilters]
  );

  useEffect(() => {
    if (isAdmin || !localStorage.getItem('token')) return;
    let cancelled = false;
    obtenerFavoritos()
      .then((items) => {
        if (!cancelled) setFavoritos(new Set(items.map((item) => item.articleId)));
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setErrorFavoritos(requestError instanceof Error ? requestError.message : 'No se pudieron cargar los favoritos.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const toggleFavorite = async (id: string) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    if (favoritosEnProceso.has(id)) return;

    setErrorFavoritos(null);
    setFavoritosEnProceso((actuales) => new Set(actuales).add(id));
    try {
      if (favoritos.has(id)) {
        await quitarFavorito(id);
        setFavoritos((actuales) => {
          const siguientes = new Set(actuales);
          siguientes.delete(id);
          return siguientes;
        });
      } else {
        await agregarFavorito(id);
        setFavoritos((actuales) => new Set(actuales).add(id));
      }
    } catch (requestError: unknown) {
      setErrorFavoritos(requestError instanceof Error ? requestError.message : 'No se pudo actualizar el favorito.');
    } finally {
      setFavoritosEnProceso((actuales) => {
        const siguientes = new Set(actuales);
        siguientes.delete(id);
        return siguientes;
      });
    }
  };

  return (
    <div className="todos-layout">
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="todos-content">
        <div className="todos-back-row">
          <button
            type="button"
            className="todos-back-button"
            aria-label="Volver a explorar"
            onClick={() => navigate({
              pathname: isAdmin ? '/admin/explorar' : '/explorar',
              search: searchParams.toString() ? `?${searchParams.toString()}` : ''
            })}
          >
            <img src={flechaVolverNegra} alt="" className="todos-back-icon" />
            <span>Volver a Explorar</span>
          </button>
        </div>

        <header className="todos-header">
          <h2 className="todos-title">
            {itemsFiltrados.length} {itemsFiltrados.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
          </h2>
          {!isAdmin && (
            <button
              className="btn-publicar-negro"
              onClick={() => navigate('/publicar')}
            >
              Publicar Artículo
            </button>
          )}
        </header>

        {estadoArticulos.estado === 'loading' ? (
          <div className="catalog-empty" role="status">
            <p className="catalog-empty-title">Cargando publicaciones...</p>
          </div>
        ) : estadoArticulos.estado === 'error' ? (
          <div className="catalog-empty" role="alert">
            <p className="catalog-empty-title">No se pudieron cargar las publicaciones.</p>
            <p className="catalog-empty-text">{estadoArticulos.error}</p>
            <button type="button" className="btn-publicar-negro" onClick={() => void recargarArticulos()}>
              Reintentar
            </button>
          </div>
        ) : itemsFiltrados.length === 0 ? (
          <div className="catalog-empty">
            <p className="catalog-empty-title">No encontramos artículos que coincidan con tu búsqueda.</p>
            <p className="catalog-empty-text">Intenta quitando algunos filtros desde la lupa.</p>
          </div>
        ) : (
          <>
            {errorFavoritos && <p role="alert">{errorFavoritos}</p>}
            <section className="products-grid">
              {itemsFiltrados.map((item, index) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  category={item.category}
                  title={item.title}
                  modality={item.modality}
                  tags={item.tags}
                  description={item.description}
                  condition={item.condition}
                  author={item.author}
                  imageUrl={item.imageUrl}
                  isFavorite={favoritos.has(item.id)}
                  favoritePending={favoritosEnProceso.has(item.id)}
                  onToggleFavorite={(articleId) => void toggleFavorite(articleId)}
                  isNew={index < 3}
                  isAdmin={isAdmin}
                />
              ))}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};