import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CATEGORIAS_PRENDA,
  MODALIDADES,
  TALLAS_PRENDA,
  type Publicacion,
  type PublicacionDatos,
} from '../types/unidona';
import {
  VALORES_INICIALES_PUBLICACION,
  convertirAPublicacionDatos,
  validarPublicacionForm,
  type ErroresPublicacionForm,
  type ValoresPublicacionForm,
} from '../utils/validarPublicacion';

interface PublicacionFormularioProps {
  publicacionInicial: Publicacion | null;
  onGuardar: (datos: PublicacionDatos) => boolean;
  onCancelar: () => void;
}

function obtenerValoresIniciales(
  publicacion: Publicacion | null,
): ValoresPublicacionForm {
  if (!publicacion) return VALORES_INICIALES_PUBLICACION;
  return {
    codigo: publicacion.codigo,
    title: publicacion.title,
    categoriaPrenda: publicacion.categoriaPrenda,
    modalidad: publicacion.modalidad,
    talla: publicacion.talla,
    estadoFisico: publicacion.estadoFisico,
    ubicacion: publicacion.ubicacion,
    imageUrl: publicacion.imageUrl,
  };
}

export const PublicacionFormulario: React.FC<PublicacionFormularioProps> = ({
  publicacionInicial,
  onGuardar,
  onCancelar,
}) => {
  const [valores, setValores] = useState<ValoresPublicacionForm>(() =>
    obtenerValoresIniciales(publicacionInicial),
  );
  const [errores, setErrores] = useState<ErroresPublicacionForm>({});

  const esEdicion = publicacionInicial !== null;

  function manejarCambio(
    evento: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value });

    if (errores[name as keyof ValoresPublicacionForm]) {
      setErrores({ ...errores, [name]: undefined });
    }
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const erroresDetectados = validarPublicacionForm(valores);
    if (Object.keys(erroresDetectados).length > 0) {
      setErrores(erroresDetectados);
      return;
    }

    const exito = onGuardar(convertirAPublicacionDatos(valores));
    if (exito && !esEdicion) {
      setValores(VALORES_INICIALES_PUBLICACION);
      setErrores({});
    }
  }

  const inputStyle: React.CSSProperties = {
    height: '44px',
    borderRadius: '12px',
    border: '1px solid #000000',
    padding: '0 14px',
    fontFamily: 'var(--font-principal)',
    fontSize: '14px',
    width: '100%',
    backgroundColor: '#F4F5F3',
  };

  const errorStyle: React.CSSProperties = {
    color: '#D5473A',
    fontSize: '12px',
    marginTop: '4px',
  };

  return (
    <form
      onSubmit={manejarEnvio}
      noValidate
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '24px 28px',
        marginBottom: '24px',
        border: '1px solid #ECECEC',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '20px' }}>
          {esEdicion
            ? `Editar prenda: ${publicacionInicial.title}`
            : 'Publicar nueva prenda'}
        </h3>
        <span style={{ fontSize: '12px', color: '#A3A3A3' }}>
          {valores.title.length}/80 caracteres
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <div>
          <label htmlFor="codigo" style={{ fontSize: '13px', fontWeight: 600 }}>
            Código *
          </label>
          <input
            id="codigo"
            name="codigo"
            placeholder="PRN-005"
            maxLength={15}
            value={valores.codigo}
            onChange={manejarCambio}
            style={inputStyle}
          />
          {errores.codigo && <div style={errorStyle}>{errores.codigo}</div>}
        </div>

        <div>
          <label htmlFor="title" style={{ fontSize: '13px', fontWeight: 600 }}>
            Prenda / Título *
          </label>
          <input
            id="title"
            name="title"
            placeholder="Chaqueta Rompevientos Azul"
            maxLength={80}
            value={valores.title}
            onChange={manejarCambio}
            style={inputStyle}
          />
          {errores.title && <div style={errorStyle}>{errores.title}</div>}
        </div>

        <div>
          <label htmlFor="modalidad" style={{ fontSize: '13px', fontWeight: 600 }}>
            Modalidad *
          </label>
          <select
            id="modalidad"
            name="modalidad"
            value={valores.modalidad}
            onChange={manejarCambio}
            style={inputStyle}
          >
            <option value="">Selecciona...</option>
            {MODALIDADES.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
          {errores.modalidad && <div style={errorStyle}>{errores.modalidad}</div>}
        </div>

        <div>
          <label
            htmlFor="categoriaPrenda"
            style={{ fontSize: '13px', fontWeight: 600 }}
          >
            Categoría *
          </label>
          <select
            id="categoriaPrenda"
            name="categoriaPrenda"
            value={valores.categoriaPrenda}
            onChange={manejarCambio}
            style={inputStyle}
          >
            <option value="">Selecciona...</option>
            {CATEGORIAS_PRENDA.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errores.categoriaPrenda && (
            <div style={errorStyle}>{errores.categoriaPrenda}</div>
          )}
        </div>

        <div>
          <label htmlFor="talla" style={{ fontSize: '13px', fontWeight: 600 }}>
            Talla *
          </label>
          <select
            id="talla"
            name="talla"
            value={valores.talla}
            onChange={manejarCambio}
            style={inputStyle}
          >
            <option value="">Selecciona...</option>
            {TALLAS_PRENDA.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errores.talla && <div style={errorStyle}>{errores.talla}</div>}
        </div>

        <div>
          <label htmlFor="estadoFisico" style={{ fontSize: '13px', fontWeight: 600 }}>
            Estado físico *
          </label>
          <input
            id="estadoFisico"
            name="estadoFisico"
            placeholder="Como nuevo / Buen estado"
            value={valores.estadoFisico}
            onChange={manejarCambio}
            style={inputStyle}
          />
          {errores.estadoFisico && (
            <div style={errorStyle}>{errores.estadoFisico}</div>
          )}
        </div>

        <div>
          <label htmlFor="ubicacion" style={{ fontSize: '13px', fontWeight: 600 }}>
            Localidad / Ubicación *
          </label>
          <input
            id="ubicacion"
            name="ubicacion"
            placeholder="Chapinero, Bogotá"
            value={valores.ubicacion}
            onChange={manejarCambio}
            style={inputStyle}
          />
          {errores.ubicacion && <div style={errorStyle}>{errores.ubicacion}</div>}
        </div>

        <div>
          <label htmlFor="imageUrl" style={{ fontSize: '13px', fontWeight: 600 }}>
            URL de imagen (opcional)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            placeholder="https://..."
            value={valores.imageUrl}
            onChange={manejarCambio}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button
          type="submit"
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '14px',
            padding: '10px 24px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {esEdicion ? 'Guardar cambios' : 'Publicar prenda'}
        </button>

        {esEdicion && (
          <button type="button" className="edit-btn" onClick={onCancelar}>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
};

