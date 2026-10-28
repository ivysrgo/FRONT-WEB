import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import { Alerta, type MensajeAlerta } from '../components/Alerta';
import { Cargando } from '../components/Cargando';
import { ResumenPublicaciones } from '../components/ResumenPublicaciones';
import {
  BarraFiltrosPublicaciones,
  type FiltroCategoriaPrenda,
  type FiltroEstadoPublicacion,
} from '../components/BarraFiltrosPublicaciones';
import { PublicacionFormulario } from '../components/PublicacionFormulario';
import { obtenerMensajeDeError } from '../services/api';
import { obtenerPublicacionesDemo } from '../services/publicacionService';
import type { Publicacion, PublicacionDatos } from '../types/unidona';
import './Publicaciones.css';

export const Publicaciones: React.FC = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorDeCarga, setErrorDeCarga] = useState<string | null>(null);
  const [intentoDeCarga, setIntentoDeCarga] = useState(0);

  const [mensaje, setMensaje] = useState<MensajeAlerta | null>(null);
  const [publicacionEditando, setPublicacionEditando] =
    useState<Publicacion | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] =
    useState<FiltroCategoriaPrenda>('Todas');
  const [estadoFiltro, setEstadoFiltro] =
    useState<FiltroEstadoPublicacion>('Todos');

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      setCargando(true);
      setErrorDeCarga(null);

      try {
        const datos = await obtenerPublicacionesDemo();
        if (!cancelado) {
          setPublicaciones(datos);
        }
      } catch (error) {
        if (!cancelado) {
          setErrorDeCarga(obtenerMensajeDeError(error));
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargar();

    return () => {
      cancelado = true;
    };
  }, [intentoDeCarga]);

  function guardarPublicacion(datos: PublicacionDatos): boolean {
    const codigoRepetido = publicaciones.some(
      (p) =>
        p.codigo.toLowerCase() === datos.codigo.toLowerCase() &&
        p.id !== publicacionEditando?.id,
    );

    if (codigoRepetido) {
      setMensaje({
        tipo: 'error',
        texto: `Ya existe una prenda registrada con el código ${datos.codigo}.`,
      });
      return false;
    }

    const ahora = new Date().toISOString();

    if (publicacionEditando) {
      const actualizada: Publicacion = {
        ...publicacionEditando,
        ...datos,
        updatedAt: ahora,
      };
      setPublicaciones(
        publicaciones.map((p) =>
          p.id === publicacionEditando.id ? actualizada : p,
        ),
      );
      setPublicacionEditando(null);
      setMostrarFormulario(false);
      setMensaje({
        tipo: 'exito',
        texto: `Prenda "${actualizada.title}" (${actualizada.codigo}) actualizada.`,
      });
    } else {
      const nueva: Publicacion = {
        id: crypto.randomUUID(),
        ...datos,
        requests: 0,
        daysElapsed: 0,
        createdAt: ahora,
        updatedAt: ahora,
      };
      setPublicaciones([nueva, ...publicaciones]);
      setMostrarFormulario(false);
      setMensaje({
        tipo: 'exito',
        texto: `Prenda "${nueva.title}" (${nueva.codigo}) publicada con éxito.`,
      });
    }

    return true;
  }

  function iniciarEdicion(publicacion: Publicacion) {
    setMensaje(null);
    setPublicacionEditando(publicacion);
    setMostrarFormulario(true);
  }

  function eliminarPublicacion(publicacion: Publicacion) {
    const confirmar = window.confirm(
      `¿Deseas eliminar la publicación "${publicacion.title}" (${publicacion.codigo})?`,
    );
    if (!confirmar) return;

    setPublicaciones(publicaciones.filter((p) => p.id !== publicacion.id));
    if (publicacionEditando?.id === publicacion.id) {
      setPublicacionEditando(null);
    }
    setMensaje({
      tipo: 'exito',
      texto: `Publicación "${publicacion.title}" eliminada.`,
    });
  }

  function escalarADonacionUnidona(publicacion: Publicacion) {
    const ahora = new Date().toISOString();
    setPublicaciones(
      publicaciones.map((p) =>
        p.id === publicacion.id
          ? { ...p, status: 'Donado', updatedAt: ahora }
          : p,
      ),
    );
    setMensaje({
      tipo: 'exito',
      texto: `"${publicacion.title}" fue escalada a donación formal con el Banco de Ropa Unidona.`,
    });
  }

  function limpiarFiltros() {
    setBusqueda('');
    setCategoriaFiltro('Todas');
    setEstadoFiltro('Todos');
  }

  const termino = busqueda.trim().toLowerCase();
  const publicacionesFiltradas = publicaciones.filter((p) => {
    const coincideCat =
      categoriaFiltro === 'Todas' || p.categoriaPrenda === categoriaFiltro;
    const coincideEst = estadoFiltro === 'Todos' || p.status === estadoFiltro;
    const coincideTexto =
      termino === '' ||
      p.title.toLowerCase().includes(termino) ||
      p.codigo.toLowerCase().includes(termino) ||
      p.details.toLowerCase().includes(termino);
    return coincideCat && coincideEst && coincideTexto;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          maxWidth: '1140px',
          width: '100%',
          margin: '32px auto',
          padding: '0 24px',
          flex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '32px' }}>Mis Publicaciones</h1>
            <p style={{ margin: '4px 0 0', color: '#A3A3A3', fontSize: '14px' }}>
              Mostrando {publicacionesFiltradas.length} de {publicaciones.length} prendas
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setPublicacionEditando(null);
              setMostrarFormulario(!mostrarFormulario);
            }}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '14px',
              padding: '10px 22px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {mostrarFormulario ? 'Cerrar formulario' : '+ Nueva prenda'}
          </button>
        </div>

        {mensaje && (
          <Alerta mensaje={mensaje} onCerrar={() => setMensaje(null)} />
        )}

        {cargando ? (
          <Cargando texto="Cargando tus publicaciones..." />
        ) : errorDeCarga ? (
          <div>
            <Alerta
              mensaje={{ tipo: 'error', texto: errorDeCarga }}
              onCerrar={() => setErrorDeCarga(null)}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIntentoDeCarga((n) => n + 1)}
            >
              Reintentar carga
            </button>
          </div>
        ) : (
          <>
            <ResumenPublicaciones publicaciones={publicaciones} />

            {mostrarFormulario && (
              <PublicacionFormulario
                key={publicacionEditando?.id ?? 'nueva'}
                publicacionInicial={publicacionEditando}
                onGuardar={guardarPublicacion}
                onCancelar={() => {
                  setPublicacionEditando(null);
                  setMostrarFormulario(false);
                }}
              />
            )}

            <BarraFiltrosPublicaciones
              busqueda={busqueda}
              categoria={categoriaFiltro}
              estado={estadoFiltro}
              onBusquedaChange={setBusqueda}
              onCategoriaChange={setCategoriaFiltro}
              onEstadoChange={setEstadoFiltro}
              onLimpiar={limpiarFiltros}
            />

            {publicacionesFiltradas.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#A3A3A3' }}>
                No se encontraron publicaciones con los filtros seleccionados.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {publicacionesFiltradas.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    category={`${post.codigo} · ${post.category}`}
                    title={post.title}
                    details={post.details}
                    requests={post.requests}
                    status={post.status}
                    daysElapsed={post.daysElapsed}
                    imageUrl={post.imageUrl}
                    onEdit={() => iniciarEdicion(post)}
                    onDelete={() => eliminarPublicacion(post)}
                    onDonateUnidona={() => escalarADonacionUnidona(post)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};
