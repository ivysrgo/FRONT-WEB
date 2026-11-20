import React, { useState } from 'react';
import { ApiError } from '../services/api';
import './EditExpirationForm.css';

interface EditExpirationFormProps {
  initialDays?: number;
  onConfirm: (diasSumar: number) => Promise<void> | void;
}

export const EditExpirationForm: React.FC<EditExpirationFormProps> = ({ initialDays = 30, onConfirm }) => {
  const [dias, setDias] = useState('');
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
      <h3 className="edit-expiration-title">Añadir tiempo de caducidad</h3>
      <label className="edit-expiration-label" htmlFor="expiration-days">
        Días adicionales a sumar (actualmente: {initialDays} días):
      </label>
      <input
        id="expiration-days"
        className="edit-expiration-input"
        type="number"
        min="1"
        max="365"
        step="1"
        placeholder="Ej: 12"
        required
        value={dias}
        onChange={(event) => setDias(event.target.value)}
      />
      {isValid && (
        <p style={{ color: '#00796B', fontWeight: 600, fontSize: '0.85rem', margin: '4px 0' }}>
          Nuevo tiempo resultante: {(initialDays || 0) + parsedDays} días
        </p>
      )}
      {error && <p className="edit-expiration-error" role="alert">{error}</p>}
      <button className="edit-expiration-submit" type="submit" disabled={!isValid || guardando}>
        {guardando ? 'Guardando…' : 'Sumar días'}
      </button>
    </form>
  );
};
