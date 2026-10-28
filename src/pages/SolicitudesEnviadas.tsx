import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

// 1. Sacamos los datos iniciales fuera del componente para que no se recreen en cada render
const solicitudesIniciales: RequestItem[] = [
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

export const SolicitudesEnviadas: React.FC = () => {
  // 2. Estado de React: La memoria de la página (Sesión 2)
  const [solicitudes, setSolicitudes] = useState<RequestItem[]>(solicitudesIniciales);

  // 3. Función Inmutable para ELIMINAR (CRUD) usando .filter()
  const manejarCancelar = (id: string) => {
    // Retorna todas las solicitudes EXCEPTO la que el usuario quiere cancelar
    const nuevoArreglo = solicitudes.filter(req => req.id !== id);
    setSolicitudes(nuevoArreglo);
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

        {/* Pestañas con NavLink para navegar */}
        <nav className="solicitudes-tabs">
          <NavLink 
            to="/solicitudes" 
            end 
            className={({ isActive }) => `tab-pill ${isActive ? 'active' : ''}`}
          >
            {/* El contador se actualiza solo gracias al estado */}
            Enviadas ({solicitudes.length})
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

        {/* Lista de Tarjetas iterando el ESTADO, no el arreglo estático */}
        <section className="solicitudes-list">
          {solicitudes.map((req) => (
            <RequestCard
              key={req.id}
              id={req.id}
              type={req.type}
              title={req.title}
              message={req.message}
              date={req.date}
              status={req.status}
              // 4. Entregamos la función al componente hijo
              onCancel={() => manejarCancelar(req.id)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};