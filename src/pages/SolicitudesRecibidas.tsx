import React, { useState } from 'react';
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

  // 2. Función inmutable para ACEPTAR (Actualizar - 'U' del CRUD)
  const manejarAceptar = (id: string) => {
    // CORRECCIÓN: Le indicamos a TS que el retorno de esta flecha es de tipo ReceivedItem
    const nuevoArreglo = solicitudes.map((req): ReceivedItem => 
      req.id === id ? { ...req, status: 'Aceptado' } : req
    );
    setSolicitudes(nuevoArreglo);
  };

  // 3. Función inmutable para RECHAZAR (Eliminar - 'D' del CRUD)
  const manejarRechazar = (id: string) => {
    // Usamos .filter() para crear un nuevo arreglo descartando el que rechazamos
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
              onAccept={() => manejarAceptar(req.id)}
              onReject={() => manejarRechazar(req.id)}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};