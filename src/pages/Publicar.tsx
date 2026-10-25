import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import './Publicar.css';

// Importación del SVG para los selectores desplegables
import flechaDropdown from '../assets/flechadropdown.svg';

export const Publicar: React.FC = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [categoria, setCategoria] = useState('Ropa');
  const [estado, setEstado] = useState('Buen Estado');
  const [modalidad, setModalidad] = useState('Donación');

  // Metadatos de ropa
  const [talla, setTalla] = useState('L');
  const [genero, setGenero] = useState('Unisex');
  const [tela, setTela] = useState('Calida');

  // Campos de texto y términos
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [autorizaDonacion, setAutorizaDonacion] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío: navega a la vista de publicaciones
    navigate('/mis-publicaciones');
  };

  return (
    <div className="publicar-page">
      <Navbar />

      <main className="publicar-container">
        {/* Encabezado */}
        <header className="publicar-header">
          <h1 className="publicar-title">Publicar un artículo</h1>
          <p className="publicar-subtitle">
            Los campos obligatorios estandarizan el inventario. En ropa se piden talla, género y clima para que el artículo pueda clasificarse también en el Banco de Ropa de Unidona.
          </p>
        </header>

        {/* Tarjeta blanca centralizada */}
        <section className="publicar-card">
          <form className="publicar-form" onSubmit={handleSubmit}>

            {/* 1. Zona de Fotografía */}
            <div className="form-group">
              <label className="form-label">
                Fotografía<span className="required-star">*</span>
              </label>
              <div className="photo-upload-zone">
                <input 
                  type="file" 
                  id="photo-input" 
                  accept="image/png, image/jpeg" 
                  className="photo-file-input" 
                />
                <label htmlFor="photo-input" className="photo-upload-label">
                  <span className="photo-primary-text">Arrastra una o varias fotos o haz clic</span>
                  <span className="photo-secondary-text">JPG o PNG · máx. 5 MB</span>
                </label>
              </div>
            </div>

            {/* 2. Campo Título */}
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
              />
            </div>

            {/* 3. Fila de 3 Selectores: Categoría, Estado, Modalidad */}
            <div className="dropdowns-row">
              <div className="form-group flex-1">
                <label className="form-label">Categoría</label>
                <div className="select-wrapper">
                  <select 
                    value={categoria} 
                    onChange={(e) => setCategoria(e.target.value)}
                    className="custom-select"
                  >
                    <option value="Ropa">Ropa</option>
                    <option value="Libros">Libros</option>
                    <option value="Útiles Escolares">Útiles Escolares</option>
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
                  >
                    <option value="Donación">Donación</option>
                    <option value="Intercambio">Intercambio</option>
                  </select>
                  <img src={flechaDropdown} alt="" className="select-arrow" />
                </div>
              </div>
            </div>

            {/* 4. Caja azul condicional de Datos de Ropa */}
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

            {/* 5. Campo Descripción */}
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="textarea-d9"
                rows={4}
                placeholder="Detalles de uso, medidas, qué buscas a cambio..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {/* 6. Caja de Autorización con fondo #D9D9D9 */}
            <div className="authorization-box">
              <label className="custom-checkbox-container">
                <input 
                  type="checkbox" 
                  checked={autorizaDonacion} 
                  onChange={(e) => setAutorizaDonacion(e.target.checked)}
                />
                <span className="checkbox-checkmark"></span>
              </label>
              <p className="authorization-text">
                Autorizo que, si no hay intercambio local en 30 días, el artículo se habilite para donación a la red del Banco de Ropa de Unidona.
              </p>
            </div>

            {/* 7. Botón Publicar Artículo */}
            <button type="submit" className="publicar-submit-btn">
              Publicar Artículo
            </button>

          </form>
        </section>
      </main>
    </div>
  );
};