import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { InputField } from '../components/InputField';
import { ApiError } from '../services/api';
import { cambiarContrasena } from '../services/authService';
import './MiPerfil.css';
import './CambiarContrasena.css';

interface CambiarContrasenaProps {
  isAdmin?: boolean;
}

// Cambio de contraseña para quien ya inició sesión (distinto del flujo de "¿Olvidaste tu contraseña?")
export const CambiarContrasena: React.FC<CambiarContrasenaProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const rutaPerfil = isAdmin ? '/admin/mi-perfil' : '/perfil';

  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [navigate]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (nuevaContrasena !== confirmacion) {
      setError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    try {
      setEnviando(true);
      await cambiarContrasena({ contrasenaActual, nuevaContrasena });
      setExito(true);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        navigate('/login');
        return;
      }
      setError(requestError instanceof Error ? requestError.message : 'No se pudo cambiar la contraseña.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="perfil-page">
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="perfil-content">
        <header className="perfil-header">
          <div className="perfil-title-row">
            <button type="button" className="perfil-back" onClick={() => navigate(rutaPerfil)} aria-label="Volver al perfil">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="perfil-title">Cambiar Contraseña</h1>
          </div>
          <p className="perfil-subtitle">Confirma tu contraseña actual y elige una nueva</p>
        </header>

        <section className="cambiar-card">
          {exito ? (
            <div className="cambiar-exito" role="status">
              <p className="cambiar-exito-titulo">Tu contraseña se actualizó correctamente</p>
              <p className="cambiar-exito-texto">La próxima vez que inicies sesión usa la nueva contraseña.</p>
              <button type="button" className="perfil-btn-solid" onClick={() => navigate(rutaPerfil)}>
                Volver a mi perfil
              </button>
            </div>
          ) : (
            <form className="cambiar-form" onSubmit={manejarEnvio}>
              {error && <p className="cambiar-error" role="alert">{error}</p>}

              <InputField
                label="Contraseña actual"
                type="password"
                value={contrasenaActual}
                onChange={(e) => setContrasenaActual(e.target.value)}
                autoComplete="current-password"
                required
                disabled={enviando}
              />
              <InputField
                label="Nueva contraseña"
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                autoComplete="new-password"
                required
                disabled={enviando}
              />
              <InputField
                label="Confirmar nueva contraseña"
                type="password"
                value={confirmacion}
                onChange={(e) => setConfirmacion(e.target.value)}
                autoComplete="new-password"
                required
                disabled={enviando}
              />
              <p className="cambiar-ayuda">
                Mínimo 5 caracteres, con mayúscula, minúscula, número y un carácter especial.
              </p>

              <div className="perfil-form-actions">
                <button type="button" className="perfil-btn-outline" onClick={() => navigate(rutaPerfil)} disabled={enviando}>
                  Cancelar
                </button>
                <button type="submit" className="perfil-btn-solid" disabled={enviando}>
                  {enviando ? 'Guardando...' : 'Guardar contraseña'}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
