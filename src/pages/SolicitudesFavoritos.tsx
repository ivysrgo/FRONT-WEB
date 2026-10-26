import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FavoriteRequestCard } from '../components/FavoriteRequestCard';
import './SolicitudesFavoritos.css';

interface FavoriteItem {
  id: string;
  type: string;
  author: string;
  title: string;
  message: string;
  daysRemaining?: number;
}

export const SolicitudesFavoritos: React.FC = () => {
  const favoriteRequests: FavoriteItem[] = [
    {
      id: '1',
      type: 'Intercambio',
      author: 'Pedro C.',
      title: 'Repisa de madera 60 cm',
      message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
      daysRemaining: 3
    },
    {
      id: '2',
      type: 'Adquisicion',
      author: 'Valentina P.',
      title: 'Set de escuadras y compás',
      message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
    }
  ];

  return (
    <div className="solicitudes-page">
      <Navbar />

      <main className="solicitudes-content">
        <header className="solicitudes-header">
          <h1 className="solicitudes-title">Mis Solicitudes</h1>
          <p className="solicitudes-subtitle">
            Lo que has pedido y lo que otros te han pedido.
          </p>
        </header>

        {/* Pestañas con NavLink para navegar */}
        <nav className="solicitudes-tabs">
          <NavLink 
            to="/solicitudes" 
            end 
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Enviadas (2)
          </NavLink>
          <NavLink 
            to="/solicitudes/recibidas" 
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Recibidos (2)
          </NavLink>
          <NavLink 
            to="/solicitudes/favoritos" 
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Favoritos
          </NavLink>
          <NavLink 
            to="/solicitudes/historial" 
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Historial
          </NavLink>
        </nav>

        {/* Lista de Tarjetas Favoritas */}
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