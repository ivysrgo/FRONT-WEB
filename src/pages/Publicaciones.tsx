import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard'; // <-- Importamos nuestro nuevo componente
import './Publicaciones.css';

interface PostItem {
  id: string;
  category: string;
  title: string;
  details: string;
  requests: number;
  status: 'Disponible' | 'Reservado' | 'Donado' | 'Caducado';
  daysElapsed: number;
  imageUrl: string;
}

export const Publicaciones: React.FC = () => {
  const myPosts: PostItem[] = [
    {
      id: '1',
      category: 'LIBROS',
      title: 'Diccionario bilingüe Oxford',
      details: 'Buen estado · Donación',
      requests: 3,
      status: 'Disponible',
      daysElapsed: 6,
      imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&q=80'
    },
    {
      id: '2',
      category: 'ROPA',
      title: 'Abrigo de paño gris',
      details: 'Como nuevo · Intercambio · M · Mujer · Frío',
      requests: 1,
      status: 'Reservado',
      daysElapsed: 22,
      imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=200&q=80'
    },
    {
      id: '3',
      category: 'ÚTILES',
      title: 'Cuadernos universitarios (x4)',
      details: 'Nuevo · Donación',
      requests: 0,
      status: 'Donado',
      daysElapsed: 30,
      imageUrl: 'https://images.unsplash.com/photo-1531346878377-244bb0cb85d8?w=200&q=80'
    },
    {
      id: '4',
      category: 'ROPA',
      title: 'Jeans Clásicos Talla 30',
      details: 'Con uso · Donación · S · Hombre · Templado',
      requests: 0,
      status: 'Caducado',
      daysElapsed: 30,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-780c8d1976ec?w=200&q=80'
    }
  ];

  return (
    <div className="publicaciones-page">
      <Navbar />

      <main className="publicaciones-content">
        <header className="publicaciones-header">
          <h1 className="publicaciones-title">Mis Publicaciones</h1>
          <p className="publicaciones-subtitle">
            Los campos obligatorios estandarizan el inventario. En ropa se piden talla, género y clima para que el artículo pueda clasificarse también en el Banco de Ropa de Unidona.
          </p>
        </header>

        <section className="publicaciones-list">
          {myPosts.map((post) => (
            <PostCard 
              key={post.id} 
              id={post.id}
              category={post.category}
              title={post.title}
              details={post.details}
              requests={post.requests}
              status={post.status}
              daysElapsed={post.daysElapsed}
              imageUrl={post.imageUrl}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};