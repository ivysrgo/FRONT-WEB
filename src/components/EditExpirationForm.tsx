import React, { useState } from 'react';
import './EditExpirationForm.css';

interface EditExpirationFormProps {
  onConfirm: (daysToAdd: number) => void;
}

export const EditExpirationForm: React.FC<EditExpirationFormProps> = ({ onConfirm }) => {
  const [daysToAdd, setDaysToAdd] = useState('');
  const parsedDays = Number(daysToAdd);
  const isValid = Number.isInteger(parsedDays) && parsedDays > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) onConfirm(parsedDays);
  };

  return (
    <form className="edit-expiration-form" onSubmit={handleSubmit}>
      <label className="edit-expiration-label" htmlFor="expiration-days">
        Días que se agregarán a la caducidad actual:
      </label>
      <input
        id="expiration-days"
        className="edit-expiration-input"
        type="number"
        min="1"
        step="1"
        required
        value={daysToAdd}
        onChange={(event) => setDaysToAdd(event.target.value)}
      />
      <button className="edit-expiration-submit" type="submit" disabled={!isValid}>
        Confirmar cambio
      </button>
    </form>
  );
};