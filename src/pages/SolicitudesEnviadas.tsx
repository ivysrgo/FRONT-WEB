import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { RequestCard } from '../components/RequestCard';
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes } from '../services/solicitudService';
import './SolicitudesEnviadas.css';

interface RequestItem {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  title: string;
  message: string;
  date: string;
  status: 'Aceptado' | 'Pendiente';
}

const FALLBACK_SENT: RequestItem[] = [
  {
    id: '1',
    type: 'DONACIÓN',
    title: 'Silla de escritorio',
    message: 'Ofrezco una lámpara de escritorio LED en muy buen estado.',
    date: '2 sep',
    status: 'Aceptado',
  },
  {
    id: '2',
    type: 'INTERCAMBIO',
    title: 'Harry Potter y la Piedra Filosofal',
    message: 'Lo necesito para el curso de este semestre, puedo recogerlo en la sede claustro.',
    date: '24 ago',
    status: 'Pendiente',
  },
  {
    id: '3',
    type: 'INTERCAMBIO',
    title: 'Diccionario bilingüe Oxford',
    message: 'Lo necesito para el curso de este semestre, lo ofrezco a cambio de las camisas de hombre',
    date: '16 sep',
    status: 'Pendiente',
  },
];

export const SolicitudesEnviadas: React.FC = () => {
  const [sentRequests, setSentRequests] = useState<RequestItem[]>(FALLBACK_SENT);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes()
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        const activas = datos
          .filter((s) => s.status === 'Pendiente' || s.status === 'Aceptado')
          .map((s) => ({
            id: s.id,
            type: (String(s.type).toUpperCase().includes('INTER') ? 'INTERCAMBIO' : 'DONACIÓN') as RequestItem['type'],
            title: s.title,
            message: s.message,
            date: s.date || 'Reciente',
            status: (s.status === 'Aceptado' ? 'Aceptado' : 'Pendiente') as RequestItem['status'],
          }));
        if (activas.length > 0) setSentRequests(activas);
      })
      .catch(() => {
        // Mantiene respaldo local si el backend está apagado
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
            Enviadas ({sentRequests.length})
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
            Favoritos
          </NavLink>
          <NavLink
            to="/solicitudes/historial"
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            Historial
          </NavLink>
        </nav>

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
