import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ReceivedRequestCard } from '../components/ReceivedRequestCard';
import { ExchangeConfirmModal } from '../components/ExchangeConfirmModal';
import './SolicitudesRecibidas.css';

interface ReceivedItem {
  id: string;
  type: 'DONACIÓN' | 'INTERCAMBIO';
  author: string;
  title: string;
  message: string;
  status: 'Aceptado' | 'Pendiente';
}

// Datos iniciales guardados fuera del componente para no recrearlos
const solicitudesIniciales: ReceivedItem[] = [
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
    status: 'Pendiente' // Esta es la que podremos aceptar o rechazar
  }
];

export const SolicitudesRecibidas: React.FC = () => {
  // 1. Memoria del componente (Sesión 2): Pasamos el arreglo al estado
  const [solicitudes, setSolicitudes] = useState<ReceivedItem[]>(solicitudesIniciales);
  const [modalIntercambioAbierto, setModalIntercambioAbierto] = useState(false);
  const [usuarioACalificar, setUsuarioACalificar] = useState('');
  const [idSolicitudActual, setIdSolicitudActual] = useState<string | null>(null);

  // 2. Función inmutable para ACEPTAR 
  const manejarAceptar = (id: string) => {
    setSolicitudes((solicitudesActuales) =>
      solicitudesActuales.map((req) =>
        req.id === id ? { ...req, status: 'Aceptado' } : req
      )
    );
  };

  // 3. Función inmutable para RECHAZAR 
  const manejarRechazar = (id: string) => {
    // Usamos .filter() para crear un nuevo arreglo descartando el que rechazamos
    setSolicitudes((solicitudesActuales) =>
      solicitudesActuales.filter((req) => req.id !== id)
    );
  };

  const iniciarConfirmacionIntercambio = (idSolicitud: string, nombreUsuario: string) => {
    setIdSolicitudActual(idSolicitud);
    setUsuarioACalificar(nombreUsuario);
    setModalIntercambioAbierto(true);
  };

  const finalizarIntercambio = (calificacionOtorgada: number) => {
    if (idSolicitudActual === null) return;

    console.log(
      `Intercambio confirmado. Calificación para ${usuarioACalificar}: ${calificacionOtorgada} estrellas`
    );
    manejarAceptar(idSolicitudActual);
    setModalIntercambioAbierto(false);
    setIdSolicitudActual(null);
    setUsuarioACalificar('');
  };

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
            Recibidos ({solicitudes.length}) {/* El contador ahora reacciona al estado real */}
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
          {/* 4. Iteramos sobre el estado (solicitudes) en lugar del arreglo estático */}
          {solicitudes.map((req) => (
            <ReceivedRequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              author={req.author}
              title={req.title}
              message={req.message}
              status={req.status}
              onAccept={() => {
                if (req.type === 'INTERCAMBIO') {
                  iniciarConfirmacionIntercambio(req.id, req.author);
                } else {
                  manejarAceptar(req.id);
                }
              }}
              onReject={() => manejarRechazar(req.id)}
            />
          ))}
        </section>
      </main>

      <Footer />

      <ExchangeConfirmModal
        isOpen={modalIntercambioAbierto}
        onClose={() => {
          setModalIntercambioAbierto(false);
          setIdSolicitudActual(null);
          setUsuarioACalificar('');
        }}
        onConfirm={finalizarIntercambio}
        nombreOtroUsuario={usuarioACalificar}
      />
    </div>
  );
};