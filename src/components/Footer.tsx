import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-title">ASOCIACIÓN</p>
        <p className="footer-item">Email: contacto@unidona.org</p>
        <p className="footer-item">En Bogotá: 601 5874441</p>
        <p className="footer-item">Línea nacional: 01 8000 946 223</p>
        <p className="footer-item">Calle 82 a # 73 a 22</p>
      </div>
    </footer>
  );
};