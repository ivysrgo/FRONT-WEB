import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminUserCard } from '../components/AdminUserCard';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminUsuarios.css';

interface UsuarioItem {
  id: string;
  name: string;
  dateText: string;
  status: 'Activo' | 'Suspendido';
}

export const AdminUsuarios: React.FC = () => {
  const navigate = useNavigate();

  // Datos mockeados basados en la imagen
  const usuariosData: UsuarioItem[] = [
    {
      id: 'u1',
      name: 'Andres Parra',
      dateText: 'Marzo 14 del 2026',
      status: 'Activo'
    },
    {
      id: 'u2',
      name: 'Juliana Jurado',
      dateText: 'Septiembre 14 del 2026',
      status: 'Activo'
    },
    {
      id: 'u3',
      name: 'Luis Joao da Silva Santos',
      dateText: 'Octubre 19 del 2026',
      status: 'Suspendido'
    }
  ];

  return (
    <div className="admin-usuarios-layout">
      <AdminNavbar />

      <main className="admin-usuarios-content">
        <header className="admin-usuarios-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate(-1)}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Usuarios Registrados</h2>
        </header>

        <section className="admin-list-section">
          <div className="admin-users-list">
            {usuariosData.map((user) => (
              <AdminUserCard
                key={user.id}
                id={user.id}
                name={user.name}
                dateText={user.dateText}
                status={user.status}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};