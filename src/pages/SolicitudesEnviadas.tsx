import React from 'react';
import { NavLink } from 'react-router-dom'; // <-- Aquí está la magia de navegación
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RequestCard } from '../components/RequestCard';
import './SolicitudesEnviadas.css';

interface RequestItem {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  title: string;
  message: string;
  date: string;
  status: 'Aceptado' | 'Pendiente';
}

export const SolicitudesEnviadas: React.FC = () => {
  const sentRequests: RequestItem[] = [
    {
      id: '1',
      type: 'DONACIÓN',
      title: 'Silla de escritorio',
      message: 'Ofrezco una lámpara de escritorio LED en muy buen estado.',
      date: '2 sep',
      status: 'Aceptado'
    },
    {
      id: '2',
      type: 'INTERCAMBIO',
      title: 'Harry Potter y la Piedra Filosofal',
      message: 'Lo necesito para el curso de este semestre, puedo recogerlo en la sede claustro.',
      date: '24 ago',
      status: 'Pendiente'
    },
    {
      id: '3',
      type: 'INTERCAMBIO',
      title: 'Diccionario bilingüe Oxford',
      message: 'Lo necesito para el curso de este semestre, lo ofrezco a cambio de las camisas de hombre',
      date: '16 sep',
      status: 'Pendiente'
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
            Enviadas (3)
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



        {/* Lista de Tarjetas */}
        <section className="solicitudes-list">
          {sentRequests.map((req) => (
            <RequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              title={req.title}
              message={req.message}
              date={req.date}
              status={req.status}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};