import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminHistoryCard } from '../components/AdminHistoryCard';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminDonaciones.css';

interface HistorialItem {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  date: string;
  description: string;
}

export const AdminDonaciones: React.FC = () => {
  const navigate = useNavigate();

  // Datos mockeados basados en la imagen
  const historialData: HistorialItem[] = [
    {
      id: 'h1',
      type: 'DONACIÓN',
      author: 'Andrés S.',
      title: 'Camisas de trabajo (x3)',
      date: 'Marzo 14 del 2026',
      description: 'Algodón liviano, manga corta. Cuellos en buen estado, una tiene un botón de repuesto cosido dentro.'
    },
    {
      id: 'h2',
      type: 'INTERCAMBIO',
      author: 'Julián E.',
      title: 'Diccionario bilingüe Oxford',
      date: 'Septiembre 14 del 206', // Mantenido tal cual la imagen
      description: 'Tengo un diccionario de francés y una gramática avanzada para intercambiar.'
    },
    {
      id: 'h3',
      type: 'INTERCAMBIO',
      author: 'Laura V.',
      title: 'Abrigo de paño gris',
      date: 'Octubre 19 del 2026',
      description: 'Ofrezco una chaqueta impermeable talla M en buen estado.'
    }
  ];

  return (
    <div className="admin-donaciones-layout">
      <AdminNavbar />

      <main className="admin-donaciones-content">
        <header className="admin-donaciones-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate(-1)}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Historial de donaciones</h2>
        </header>

        {/* Zona de Filtros */}
        <section className="admin-filters-section">
          <div className="filter-group">
            <span className="filter-label">Ordenar por:</span>
            <div className="filter-pills">
              <button className="filter-pill">Categoria</button>
              <button className="filter-pill">Más Reciente</button>
            </div>
          </div>
          
          <div className="filter-group">
            <span className="filter-label">Filtrar por fecha:</span>
            <div className="filter-inputs">
              <input type="text" className="filter-input-date" placeholder="12/07/26" />
              <input type="text" className="filter-input-date" placeholder="17/07/26" />
            </div>
          </div>
        </section>

        {/* Contador y Lista */}
        <section className="admin-list-section">
          <p className="admin-results-count">{historialData.length} encontradas</p>
          
          <div className="admin-history-list">
            {historialData.map((item) => (
              <AdminHistoryCard
                key={item.id}
                id={item.id}
                type={item.type}
                author={item.author}
                title={item.title}
                date={item.date}
                description={item.description}
                onViewArticle={() => console.log(`Ver artículo ${item.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};