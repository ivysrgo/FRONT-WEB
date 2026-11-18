import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { FavoriteRequestCard } from '../components/FavoriteRequestCard';
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes } from '../services/solicitudService';
import './SolicitudesFavoritos.css';

interface FavoriteItem {
  id: string;
  type: string;
  author: string;
  title: string;
  message: string;
  daysRemaining?: number;
}

const FALLBACK_FAVORITES: FavoriteItem[] = [
  {
    id: '1',
    type: 'Intercambio',
    author: 'Pedro C.',
    title: 'Repisa de madera 60 cm',
    message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
    daysRemaining: 3,
  },
  {
    id: '2',
    type: 'Adquisicion',
    author: 'Valentina P.',
    title: 'Set de escuadras y compás',
    message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
  },
];

export const SolicitudesFavoritos: React.FC = () => {
  const [favoriteRequests, setFavoriteRequests] = useState<FavoriteItem[]>(FALLBACK_FAVORITES);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes({ esFavorito: true })
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        setFavoriteRequests(
          datos.map((s) => ({
            id: s.id,
            type: s.type,
            author: s.author || 'Comunidad',
            title: s.title,
            message: s.message,
            daysRemaining: s.daysRemaining,
          }))
        );
      })
      .catch(() => {
        // Respaldo local
      });
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className="solicitudes-page">
      {esAdmin() ? <AdminNavbar /> : <Navbar />}

      <main className="solicitudes-content">
        <header className="solicitudes-header">
          <h1 className="solicitudes-title">Mis Solicitudes</h1>
          <p className="solicitudes-subtitle">
            Lo que has pedido y lo que otros te han pedido.
          </p>
        </header>

        <nav className="solicitudes-tabs">
          <NavLink
            to="/solicitudes"
            end
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Enviadas
          </NavLink>
          <NavLink
            to="/solicitudes/recibidas"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Recibidos
          </NavLink>
          <NavLink
            to="/solicitudes/favoritos"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Favoritos ({favoriteRequests.length})
          </NavLink>
          <NavLink
            to="/solicitudes/historial"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Historial
          </NavLink>
        </nav>

        <section className="solicitudes-list">
          {favoriteRequests.map((req) => (
            <FavoriteRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              daysRemaining={req.daysRemaining}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};
