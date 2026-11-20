import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminUserCard } from '../components/AdminUserCard';
import { formatearFechaLarga, listarUsuarios, type UsuarioAdmin } from '../services/adminService';
import { ApiError } from '../services/api';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './AdminUsuarios.css';

export const AdminUsuarios: React.FC = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    listarUsuarios()
      .then((lista) => {
        if (activo) setUsuarios(lista);
      })
      .catch((err: unknown) => {
        if (activo) setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los usuarios.');
      });
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="admin-usuarios-layout">
      <AdminNavbar />

      <main className="admin-usuarios-content">
        <header className="admin-usuarios-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate('/admin/dashboard')}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Administrar</h1>
          </div>
          <p className="admin-subtitle-gray">Administra la página correctamente</p>
          <h2 className="admin-subtitle-black">Usuarios Registrados</h2>
        </header>

        <section className="admin-list-section">
          <div className="admin-users-list">
            {error ? (
              <p className="admin-users-empty">{error}</p>
            ) : usuarios === null ? (
              <p className="admin-users-empty">Cargando usuarios…</p>
            ) : usuarios.length === 0 ? (
              <p className="admin-users-empty">Todavía no hay usuarios registrados.</p>
            ) : (
              usuarios.map((user) => (
                <AdminUserCard
                  key={user.id}
                  id={user.id}
                  name={user.nombre}
                  dateText={formatearFechaLarga(user.suspendido ? user.suspendidoEn : user.createdAt)}
                  status={user.suspendido ? 'Suspendido' : 'Activo'}
                  rating={user.rating}
                  ratingCount={user.ratingCount}
                  avatarUrl={user.avatarUrl}
                  onClick={() => navigate(`/admin/perfil/${user.id}`)}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
