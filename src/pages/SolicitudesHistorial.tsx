import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HistoryRequestCard } from '../components/HistoryRequestCard';
import './SolicitudesHistorial.css';

interface HistoryItem {
  id: string;
  type: string;
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Donado' | 'Rechazado';
}

export const SolicitudesHistorial: React.FC = () => {
  const historyRequests: HistoryItem[] = [
    {
      id: '1',
      type: 'Intercambio',
      author: 'Pedro C.',
      title: 'Repisa de madera 60 cm',
      message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
      status: 'Aceptado'
    },
    {
      id: '2',
      type: 'Donación',
      author: 'Valentina P.',
      title: 'Set de escuadras y compás',
      message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
      status: 'Donado'
    },
    {
      id: '3',
      type: 'Intercambio',
      author: 'Pedro C.',
      title: 'Repisa de madera 60 cm',
      message: 'Estructura metálica firme, asiento acolchado con una rasgadura pequeña en el borde. Busco a cambio...',
      status: 'Rechazado'
    },
    {
      id: '4',
      type: 'Donación',
      author: 'Valentina P.',
      title: 'Set de escuadras y compás',
      message: 'Set de dibujo técnico casi sin uso: dos escuadras, transportador, compás...',
      status: 'Donado'
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

        {/* Lista de Tarjetas de Historial */}
        <section className="solicitudes-list">
          {historyRequests.map((req) => (
            <HistoryRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              status={req.status}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};