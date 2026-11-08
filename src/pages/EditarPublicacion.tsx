import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { InputField } from '../components/InputField';
import { SuccessModal } from '../components/SuccessModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import './EditarPublicacion.css';

export const EditarPublicacion: React.FC = () => {
  const navigate = useNavigate();

  // Estados del formulario (precargados con datos de ejemplo para simular la edición)
  const [titulo, setTitulo] = useState('Chaqueta Impermeable');
  const [categoria, setCategoria] = useState('Ropa');
  const [estadoArticulo, setEstadoArticulo] = useState('Buen Estado');
  const [modalidad, setModalidad] = useState('Donación');
  const [talla, setTalla] = useState('L');
  const [genero, setGenero] = useState('Unisex');
  const [clima, setClima] = useState('Calida');
  const [descripcion, setDescripcion] = useState('');
  const [autorizaDonacion, setAutorizaDonacion] = useState(true);

  // Control de los modales de guardar y eliminar
  const [modalGuardarAbierto, setModalGuardarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  const manejarGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de actualización (PUT/PATCH) iría aquí
    setModalGuardarAbierto(true);
  };

  const solicitarEliminacion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalEliminarAbierto(true);
  };

  const confirmarEliminacion = () => {
    // Lógica de eliminación (DELETE) iría aquí
    console.log('Publicación eliminada');
    navigate('/publicaciones');
  };

  return (
    <div className="editar-layout">
      <Navbar />

      <main className="editar-content">
        <header className="editar-header">
          <h1 className="editar-title">Edita tu Publicación</h1>
          <p className="editar-subtitle">
            Los campos obligatorios estandarizan el inventario. En ropa se piden talla, género y clima para que el artículo pueda clasificarse también en el Banco de Ropa.
          </p>
        </header>

        <section className="editar-form-section">
          <form className="editar-form" onSubmit={manejarGuardar}>
            
            {/* Fotografía */}
            <div className="custom-input-group">
              <label className="editar-label">Fotografía<span className="required">*</span></label>
              <div className="upload-box">
                <p className="upload-text">Arrastra una foto o haz clic</p>
                <p className="upload-subtext">JPG o PNG · máx. 5 MB</p>
              </div>
            </div>

            {/* Título */}
            <div className="custom-input-group">
              <InputField 
                label="Título*"
                type="text"
                placeholder="Ej: Chaqueta Impermeable"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            {/* Fila: Categoría, Estado, Modalidad */}
            <div className="select-row-3">
              <div className="select-group">
                <label className="editar-label">Categoría</label>
                <select className="ui-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="Ropa">Ropa</option>
                  <option value="Libro">Libro</option>
                  <option value="UtilEscolar">Útil Escolar</option>
                  <option value="Mueble">Mueble</option>
                </select>
              </div>
              <div className="select-group">
                <label className="editar-label">Estado</label>
                <select className="ui-select" value={estadoArticulo} onChange={(e) => setEstadoArticulo(e.target.value)}>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Buen Estado">Buen Estado</option>
                  <option value="Usado">Usado</option>
                </select>
              </div>
              <div className="select-group">
                <label className="editar-label">Modalidad</label>
                <select className="ui-select" value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
                  <option value="Donación">Donación</option>
                  <option value="Intercambio">Intercambio</option>
                </select>
              </div>
            </div>

            {/* Caja Azul: Datos de ropa */}
            {categoria === 'Ropa' && (
              <div className="datos-ropa-box">
                <h4 className="ropa-box-title">Datos de ropa</h4>
                <p className="ropa-box-subtitle">Requeridos para clasificar la prenda si escala a donación formal.</p>
                
                <div className="select-row-3">
                  <div className="select-group">
                    <label className="editar-label">Talla</label>
                    <select className="ui-select" value={talla} onChange={(e) => setTalla(e.target.value)}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div className="select-group">
                    <label className="editar-label">Género</label>
                    <select className="ui-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div className="select-group">
                    <label className="editar-label">Clima</label>
                    <select className="ui-select" value={clima} onChange={(e) => setClima(e.target.value)}>
                      <option value="Fria">Fría</option>
                      <option value="Templado">Templado</option>
                      <option value="Calida">Cálida</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Descripción */}
            <div className="custom-input-group">
              <label className="editar-label">Descripción</label>
              <textarea 
                className="ui-textarea" 
                placeholder="Detalles de uso, medidas, qué buscas a cambio..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {/* Checkbox de autorización */}
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="autorizacion" 
                className="ui-checkbox" 
                checked={autorizaDonacion}
                onChange={(e) => setAutorizaDonacion(e.target.checked)}
              />
              <label htmlFor="autorizacion" className="checkbox-label">
                Autorizo que, si no hay intercambio local en 30 días, el artículo se habilite para donación a la red del Banco de Ropa del Minuto de Dios.
              </label>
            </div>

            {/* Botones de Acción */}
            <div className="editar-buttons-row">
              <button type="submit" className="btn-guardar">
                Guardar Cambios
              </button>
              <button type="button" className="btn-eliminar" onClick={solicitarEliminacion}>
                Eliminar Publicacion
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />

      {/* Modal de Éxito al Editar */}
      <SuccessModal 
        isOpen={modalGuardarAbierto}
        title="¡Cambios Guardados!"
        subtitle="Tu publicación ha sido actualizada exitosamente."
        buttonText="Volver a Publicaciones"
        redirectPath="/publicaciones"
      />

      <DeleteConfirmModal
        isOpen={modalEliminarAbierto}
        onClose={() => setModalEliminarAbierto(false)}
        onConfirm={confirmarEliminacion}
      />
    </div>
  );
};