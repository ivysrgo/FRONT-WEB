import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ExternalProfileCard } from '../components/ExternalProfileCard';
import flechaVolverNegra from '../assets/flechavolvernegra.svg';
import './PerfilUsuario.css';

// Interfaz para las publicaciones del perfil
interface ProfilePost {
  id: string;
  category: string;
  title: string;
  details: string;
  imageUrl: string;
  daysElapsed: number; // Para la barra de progreso (de 30 días)
}

export const PerfilUsuario: React.FC = () => {
  const navigate = useNavigate();

  // Datos mockeados del usuario 
  const userData = {
    nombre: 'Julian Espinoza',
    calificacion: 3.0,
    correo: 'jujuyespi@gmail.com',
    telefono: '317 1221890'
  };

  // Publicaciones mockeadas de este usuario
  const userPosts: ProfilePost[] = [
    {
      id: '1',
      category: 'LIBROS',
      title: 'Diccionario bilingüe Oxford',
      details: 'Buen estado · Intercambio',
      imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&q=80',
      daysElapsed: 6
    },
    {
      id: '2',
      category: 'ROPA',
      title: 'Diccionario Gramatical',
      details: 'Buen estado · Intercambio',
      imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&q=80',
      daysElapsed: 22
    }
  ];

  return (
    <div className="perfil-layout">
      <Navbar />

      <main className="perfil-content">
        {/* Encabezado con flecha de volver y título */}
        <header className="perfil-header">
          <button className="btn-volver" onClick={() => navigate(-1)}>
            <img src={flechaVolverNegra} alt="Volver" />
          </button>
          <h1 className="perfil-title">Perfil</h1>
        </header>

        {/* Tarjeta de Información del Usuario */}
        <ExternalProfileCard 
          nombre={userData.nombre}
          calificacion={userData.calificacion}
          correo={userData.correo}
          telefono={userData.telefono}
        />

        {/* Sección de Publicaciones del Usuario */}
        <section className="perfil-publicaciones-section">
          <h3 className="section-title">Publicaciones</h3>
          
          <div className="perfil-publicaciones-list">
            {userPosts.map((post) => {
              // Calculamos el progreso para la barra
              const percentage = (post.daysElapsed / 30) * 100;
              const daysRemaining = 30 - post.daysElapsed;

              return (
                <article key={post.id} className="perfil-post-card">
                  <div className="perfil-post-info">
                    <div className="perfil-post-image">
                      <img src={post.imageUrl} alt={post.title} />
                    </div>
                    <div className="perfil-post-text">
                      <span className="perfil-post-category">{post.category}</span>
                      <h4 className="perfil-post-title">{post.title}</h4>
                      <p className="perfil-post-details">{post.details}</p>
                    </div>
                  </div>

                  {/* Barra de progreso simplificada para este layout */}
                  <div className="perfil-progress-container">
                    <div className="perfil-progress-bar-bg">
                      <div 
                        className="perfil-progress-bar-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="perfil-progress-labels">
                      <span>Publicado hace {post.daysElapsed} días · {daysRemaining} días restantes</span>
                      <span>caducidad a los 30 días</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};