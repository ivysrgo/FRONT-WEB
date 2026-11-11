import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { AdminUserPostCard } from '../components/AdminUserPostCard';
import { SuspendAccountModal } from '../components/SuspendAccountModal';
import { reportesHistorial, reportesPendientes } from '../data/adminReports';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';

// Importa las estrellas (Ajusta la ruta si las tienes en otra carpeta)
import starLleno from '../assets/starratingllena.svg';
import starVacio from '../assets/starratingvacia.svg';

import './AdminPerfil.css';

export const AdminPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const { userId } = useParams<{ userId: string }>();
  const selectedUserId = userId ?? 'julian-espinoza';
  const allReports = [...reportesPendientes, ...reportesHistorial];
  const reporteUsuario = allReports.find((report) => report.authorId === selectedUserId);

  if (!reporteUsuario) {
    return <Navigate to="/admin/reportes" replace />;
  }

  const usuario = reporteUsuario.reportedUser;
  const userPublications = reportesPendientes.filter(
    (report) => report.authorId === selectedUserId
  );
  const publicaciones = (userPublications.length > 0
    ? userPublications
    : reportesHistorial.filter((report) => report.authorId === selectedUserId)
  ).map((report) => ({
    id: report.id,
    category: report.article.category,
    title: report.title,
    details: `${report.article.condition} - ${report.type === 'DONACIÓN' ? 'Donación' : 'Intercambio'}`,
    requests: report.article.requests,
    status: 'Disponible' as const,
    daysElapsed: report.article.daysElapsed,
    imageUrl: report.article.imageUrl
  }));

  // Función para renderizar las estrellas estáticamente
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img 
          key={i} 
          src={i <= rating ? starLleno : starVacio} 
          alt={i <= rating ? "Estrella llena" : "Estrella vacía"} 
          className="rating-star-small"
        />
      );
    }
    return stars;
  };

  const handleSuspenderCuenta = () => {
    setIsSuspendModalOpen(true);
  };

  const handleConfirmarSuspension = () => {
    console.log(`Cuenta suspendida: ${usuario.name}`);
    setIsSuspendModalOpen(false);
    navigate('/admin/usuarios');
  };

  return (
    <div className="admin-perfil-layout">
      <AdminNavbar />

      <main className="admin-perfil-content">
        {/* Encabezado con Flecha */}
        <header className="admin-perfil-header">
          <div className="header-title-row">
            <button className="btn-volver-icon" onClick={() => navigate(-1)}>
              <img src={flechaVolverNegra} alt="Volver" />
            </button>
            <h1 className="admin-title-main">Perfil</h1>
          </div>
        </header>

        {/* TARJETA DE PERFIL (Usuario) */}
        <section className="perfil-usuario-card">
          <div className="perfil-avatar-box">
            {/* Si no hay foto, puedes poner un cuadro gris simulando la imagen */}
            <div className="avatar-placeholder-gray">
               {/* Puedes poner un icono de usuario genérico aquí */}
            </div>
          </div>

          <div className="perfil-info-box">
            <h2 className="perfil-nombre">{usuario.name}</h2>
            
            <div className="perfil-rating-row">
              <div className="stars-container">
                {renderStars(usuario.rating)}
              </div>
              <span className="rating-text">
                Calificacion: {usuario.rating.toFixed(1)}
              </span>
            </div>

            <div className="perfil-contacto">
              <p>Correo: {usuario.email}</p>
              <p>telefono: {usuario.phone}</p>
            </div>
          </div>

          <div className="perfil-action-box">
            <button className="btn-suspender-rojo" onClick={handleSuspenderCuenta}>
              Suspender<br/>cuenta
            </button>
          </div>
        </section>

        {/* SECCIÓN MIS PUBLICACIONES */}
        <section className="perfil-publicaciones-section">
          <h3 className="section-subtitle">Mis Publicaciones</h3>
          
          <div className="perfil-publicaciones-list">
            {publicaciones.map(pub => (
              <AdminUserPostCard
                key={pub.id}
                id={pub.id}
                category={pub.category}
                title={pub.title}
                details={pub.details}
                requests={pub.requests}
                status={pub.status}
                daysElapsed={pub.daysElapsed}
                imageUrl={pub.imageUrl}
                onEdit={() => console.log(`Editar publicación ${pub.id}`)}
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />

      <SuspendAccountModal
        isOpen={isSuspendModalOpen}
        accountName={usuario.name}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={handleConfirmarSuspension}
      />
    </div>
  );
};