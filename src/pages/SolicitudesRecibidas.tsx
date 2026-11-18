import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { ReceivedRequestCard } from '../components/ReceivedRequestCard';
import { esAdmin } from '../services/authService';
import { obtenerSolicitudes, actualizarSolicitud } from '../services/solicitudService';
import './SolicitudesRecibidas.css';

interface ReceivedItem {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Pendiente';
}

const FALLBACK_RECEIVED: ReceivedItem[] = [
  {
    id: '1',
    type: 'DONACIÓN',
    author: 'Mariana C.',
    title: 'Diccionario bilingüe Oxford',
    message: 'Estoy empezando inglés técnico y me sería muy útil. Puedo recogerlo cuando te quede bien.',
    status: 'Aceptado',
  },
  {
    id: '2',
    type: 'INTERCAMBIO',
    author: 'Julián E.',
    title: 'Diccionario bilingüe Oxford',
    message: 'Tengo un diccionario de francés y una gramática avanzada para intercambiar.',
    status: 'Aceptado',
  },
  {
    id: '3',
    type: 'INTERCAMBIO',
    author: 'Laura V.',
    title: 'Abrigo de paño gris',
    message: 'Ofrezco una chaqueta impermeable talla M en buen estado.',
    status: 'Aceptado',
  },
  {
    id: '4',
    type: 'INTERCAMBIO',
    author: 'Luna P.',
    title: 'Repisa de madera de 60cm',
    message: 'Ofrezco una repisa de madera de abedúl de 60cm.',
    status: 'Pendiente',
  },
];

export const SolicitudesRecibidas: React.FC = () => {
  const [receivedRequests, setReceivedRequests] = useState<ReceivedItem[]>(FALLBACK_RECEIVED);

  useEffect(() => {
    let cancelado = false;
    obtenerSolicitudes()
      .then((datos) => {
        if (cancelado || !datos || datos.length === 0) return;
        const activas = datos
          .filter((s) => s.status === 'Pendiente' || s.status === 'Aceptado')
          .map((s) => ({
            id: s.id,
            type: (String(s.type).toUpperCase().includes('INTER') ? 'INTERCAMBIO' : 'DONACIÓN') as ReceivedItem['type'],
            author: s.author || 'Usuario',
            title: s.title,
            message: s.message,
            status: (s.status === 'Aceptado' ? 'Aceptado' : 'Pendiente') as ReceivedItem['status'],
          }));
        if (activas.length > 0) setReceivedRequests(activas);
      })
      .catch(() => {
        // Respaldo local
      });
    return () => {
      cancelado = true;
    };
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await actualizarSolicitud(id, { status: 'Aceptado' });
    } catch {
      // Actualización optimista si es dato demo
    }
    setReceivedRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Aceptado' } : item))
    );
  };

  const handleReject = async (id: string) => {
    try {
      await actualizarSolicitud(id, { status: 'Rechazado' });
    } catch {
      // Actualización optimista si es dato demo
    }
    setReceivedRequests((prev) => prev.filter((item) => item.id !== id));
  };

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
            Recibidos ({receivedRequests.length})
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
          {receivedRequests.map((req) => (
            <ReceivedRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              status={req.status}
              onAccept={() => handleAccept(req.id)}
              onReject={() => handleReject(req.id)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};
