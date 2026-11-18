import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { SuccessModal } from '../components/SuccessModal';
import { crearPublicacion } from '../services/publicacionService';
import { esAdmin, obtenerUsuarioActual } from '../services/authService';
import { ApiError } from '../services/api';
import './Publicar.css';

import flechaDropdown from '../assets/flechadropdown.svg';

export const Publicar: React.FC = () => {
  const usuarioActual = obtenerUsuarioActual();
  const esUsuarioAdmin = esAdmin();

  const [categoria, setCategoria] = useState('Ropa');
  const [estado, setEstado] = useState('Buen Estado');
  const [modalidad, setModalidad] = useState('Donación');
  const [modalAbierto, setModalAbierto] = useState(false);

  const [talla, setTalla] = useState('L');
  const [genero, setGenero] = useState('Unisex');
  const [tela, setTela] = useState('Calida');

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [autorizaDonacion, setAutorizaDonacion] = useState(true);

  const [imagenUrl, setImagenUrl] = useState('');
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorEnvio('La imagen no debe superar los 5 MB.');
        return;
      }
      setErrorEnvio(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagenPreview(base64);
        setImagenUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEnvio(null);

    if (titulo.trim().length < 3) {
      setErrorEnvio('El título es obligatorio y debe tener al menos 3 caracteres.');
      return;
    }

    try {
      setCargando(true);

      let finalImageUrl = imagenUrl;
      if (!finalImageUrl) {
        const cat = categoria.toLowerCase();
        if (cat.includes('ropa')) {
          finalImageUrl = 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80';
        } else if (cat.includes('libro')) {
          finalImageUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80';
        } else if (cat.includes('util') || cat.includes('útil')) {
          finalImageUrl = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&auto=format&fit=crop&q=80';
        } else {
          finalImageUrl = 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=80';
        }
      }

      const tags = categoria === 'Ropa' ? [talla, genero, tela] : [];
      const details =
        categoria === 'Ropa'
          ? `${estado} · ${modalidad} · ${talla} · ${genero} · ${tela}`
          : `${estado} · ${modalidad}`;

      await crearPublicacion({
        title: titulo.trim(),
        category: categoria.toUpperCase(),
        modality: modalidad as 'Donación' | 'Intercambio',
        condition: estado,
        description: descripcion.trim(),
        details,
        imageUrl: finalImageUrl,
        talla: categoria === 'Ropa' ? talla : '',
        genero: categoria === 'Ropa' ? genero : '',
        clima: categoria === 'Ropa' ? tela : '',
        autorizaDonacion,
        status: 'Disponible',
        tags,
        author: usuarioActual?.nombre || 'Usuario de la comunidad',
      });

      setModalAbierto(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorEnvio(err.message);
      } else {
        setErrorEnvio('No se pudo guardar la publicación en el servidor. Intenta de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="publicar-page">
      {esUsuarioAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="publicar-container">
        <header className="publicar-header">
          <h1 className="publicar-title">Publicar un artículo</h1>
          <p className="publicar-subtitle">
            Los campos obligatorios estandarizan el inventario. En ropa se piden talla, género y clima para que el artículo pueda clasificarse también en el Banco de Ropa de Unidona.
          </p>
        </header>

        <section className="publicar-card">
          <form className="publicar-form" onSubmit={handleSubmit}>
            {errorEnvio && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                {errorEnvio}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                Fotografía<span className="required-star">*</span>
              </label>
              <div className="photo-upload-zone">
                <input
                  type="file"
                  id="photo-input"
                  accept="image/png, image/jpeg, image/webp"
                  className="photo-file-input"
                  onChange={handleImagenChange}
                />
                <label htmlFor="photo-input" className="photo-upload-label" style={{ width: '100%', height: '100%' }}>
                  {imagenPreview ? (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={imagenPreview}
                        alt="Vista previa"
                        style={{ maxHeight: '115px', maxWidth: '90%', borderRadius: '10px', objectFit: 'contain' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '6px',
                          fontSize: '11px',
                          backgroundColor: 'rgba(0,0,0,0.65)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        Cambiar foto
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="photo-primary-text">Arrastra una o varias fotos o haz clic</span>
                      <span className="photo-secondary-text">JPG, PNG o WEBP · máx. 5 MB</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Título<span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="input-d9"
                placeholder="Ej: Chaqueta impermeable"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                disabled={cargando}
              />
            </div>

            <div className="dropdowns-row">
              <div className="form-group flex-1">
                <label className="form-label">Categoría</label>
                <div className="select-wrapper">
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="custom-select"
                    disabled={cargando}
                  >
                    <option value="Ropa">Ropa</option>
                    <option value="Libros">Libros</option>
                    <option value="Útiles">Útiles Escolares</option>
                    <option value="Muebles">Muebles pequeños</option>
                  </select>
                  <img src={flechaDropdown} alt="" className="select-arrow" />
                </div>
              </div>

              <div className="form-group flex-1">
                <label className="form-label">Estado</label>
                <div className="select-wrapper">
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="custom-select"
                    disabled={cargando}
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Buen Estado">Buen Estado</option>
                    <option value="Con uso">Con uso</option>
                  </select>
                  <img src={flechaDropdown} alt="" className="select-arrow" />
                </div>
              </div>

              <div className="form-group flex-1">
                <label className="form-label">Modalidad</label>
                <div className="select-wrapper">
                  <select
                    value={modalidad}
                    onChange={(e) => setModalidad(e.target.value)}
                    className="custom-select"
                    disabled={cargando}
                  >
                    <option value="Donación">Donación</option>
                    <option value="Intercambio">Intercambio</option>
                  </select>
                  <img src={flechaDropdown} alt="" className="select-arrow" />
                </div>
              </div>
            </div>

            {categoria === 'Ropa' && (
              <div className="clothing-data-box">
                <div className="clothing-box-header">
                  <h3 className="clothing-box-title">Datos de ropa</h3>
                  <p className="clothing-box-subtitle">
                    Requeridos para clasificar la prenda si escala a donación formal.
                  </p>
                </div>

                <div className="dropdowns-row">
                  <div className="form-group flex-1">
                    <label className="form-label">Talla</label>
                    <div className="select-wrapper">
                      <select
                        value={talla}
                        onChange={(e) => setTalla(e.target.value)}
                        className="custom-select"
                        disabled={cargando}
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                      <img src={flechaDropdown} alt="" className="select-arrow" />
                    </div>
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">Género</label>
                    <div className="select-wrapper">
                      <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="custom-select"
                        disabled={cargando}
                      >
                        <option value="Unisex">Unisex</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                      </select>
                      <img src={flechaDropdown} alt="" className="select-arrow" />
                    </div>
                  </div>

                  <div className="form-group flex-1">
                    <label className="form-label">Tela</label>
                    <div className="select-wrapper">
                      <select
                        value={tela}
                        onChange={(e) => setTela(e.target.value)}
                        className="custom-select"
                        disabled={cargando}
                      >
                        <option value="Calida">Calida</option>
                        <option value="Fria">Fria</option>
                        <option value="Templada">Templada</option>
                      </select>
                      <img src={flechaDropdown} alt="" className="select-arrow" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="textarea-d9"
                rows={4}
                placeholder="Detalles de uso, medidas, qué buscas a cambio..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={cargando}
              />
            </div>

            <div className="authorization-box">
              <label className="custom-checkbox-container">
                <input
                  type="checkbox"
                  checked={autorizaDonacion}
                  onChange={(e) => setAutorizaDonacion(e.target.checked)}
                  disabled={cargando}
                />
                <span className="checkbox-checkmark"></span>
              </label>
              <p className="authorization-text">
                Autorizo que, si no hay intercambio local en 30 días, el artículo se habilite para donación a la red del Banco de Ropa de Unidona.
              </p>
            </div>

            <button type="submit" className="publicar-submit-btn" disabled={cargando}>
              {cargando ? 'Publicando en MongoDB Atlas...' : 'Publicar Artículo'}
            </button>
          </form>
        </section>
      </main>

      <SuccessModal
        isOpen={modalAbierto}
        title="¡Artículo Publicado con Éxito!"
        subtitle="Tu publicación ya está guardada en MongoDB Atlas y visible en tu inventario."
        buttonText="Ver en Mis Publicaciones"
        redirectPath="/publicaciones"
      />
    </div>
  );
};
