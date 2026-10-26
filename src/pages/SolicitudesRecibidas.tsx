import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ReceivedRequestCard } from '../components/ReceivedRequestCard';
import './SolicitudesRecibidas.css';

interface ReceivedItem {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Pendiente';
}

export const SolicitudesRecibidas: React.FC = () => {
  const receivedRequests: ReceivedItem[] = [
    {
      id: '1',
      type: 'DONACIÓN',
      author: 'Mariana C.',
      title: 'Diccionario bilingüe Oxford',
      message: 'Estoy empezando inglés técnico y me sería muy útil. Puedo recogerlo cuando te quede bien.',
      status: 'Aceptado'
    },
    {
      id: '2',
      type: 'INTERCAMBIO',
      author: 'Julián E.',
      title: 'Diccionario bilingüe Oxford',
      message: 'Tengo un diccionario de francés y una gramática avanzada para intercambiar.',
      status: 'Aceptado'
    },
    {
      id: '3',
      type: 'INTERCAMBIO',
      author: 'Laura V.',
      title: 'Abrigo de paño gris',
      message: 'Ofrezco una chaqueta impermeable talla M en buen estado.',
      status: 'Aceptado'
    },
    {
      id: '4',
      type: 'INTERCAMBIO',
      author: 'Luna P.',
      title: 'Repisa de madera de 60cm',
      message: 'Ofrezco una repisa de madera de abedúl de 60cm.',
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

        {/* Lista de Tarjetas */}
        <section className="solicitudes-list">
          {receivedRequests.map((req) => (
            <ReceivedRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              status={req.status}
              onAccept={() => console.log(`Aceptado ${req.id}`)}
              onReject={() => console.log(`Rechazado ${req.id}`)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};