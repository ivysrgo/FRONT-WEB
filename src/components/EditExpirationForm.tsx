import React, { useState } from 'react';
import { ApiError } from '../services/api';
import './EditExpirationForm.css';

interface EditExpirationFormProps {
  initialDays?: number;
  onConfirm: (diasRestantes: number) => Promise<void> | void;
}

export const EditExpirationForm: React.FC<EditExpirationFormProps> = ({ initialDays, onConfirm }) => {
  const [dias, setDias] = useState(initialDays && initialDays > 0 ? String(initialDays) : '');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const parsedDays = Number(dias);
  const isValid = Number.isInteger(parsedDays) && parsedDays >= 1 && parsedDays <= 365;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setGuardando(true);
    setError(null);
    try {
      await onConfirm(parsedDays);
    } catch (err) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : 'No se pudo actualizar la caducidad.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form className="edit-expiration-form" onSubmit={handleSubmit}>
      <h3 className="edit-expiration-title">Editar tiempo de caducidad</h3>
      <label className="edit-expiration-label" htmlFor="expiration-days">
        Vencimiento de la publicación en la siguiente cantidad de días:
      </label>
      <input
        id="expiration-days"
        className="edit-expiration-input"
        type="number"
        min="1"
        max="365"
        step="1"
        required
        value={dias}
        onChange={(event) => setDias(event.target.value)}
      />
      {error && <p className="edit-expiration-error" role="alert">{error}</p>}
      <button className="edit-expiration-submit" type="submit" disabled={!isValid || guardando}>
        {guardando ? 'Guardando…' : 'Confirmar cambio'}
      </button>
    </form>
  );
};
