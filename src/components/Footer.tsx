import React from 'react';
import './Footer.css';

// Enlaces de las redes de Unidona: completar con las URLs oficiales.
// Mientras estén vacíos, el ícono se muestra sin enlace.
const REDES = {
  facebook: '',
  instagram: '',
  twitter: '',
};

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.9v3.1h2.6V21h3Z"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M23.95 4.57a10 10 0 0 1-2.82.78 4.96 4.96 0 0 0 2.16-2.73c-.95.56-2 .96-3.13 1.19a4.92 4.92 0 0 0-8.38 4.48A13.98 13.98 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.61v.06a4.92 4.92 0 0 0 3.95 4.83 5 5 0 0 1-2.21.08 4.94 4.94 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a14 14 0 0 0 7.56 2.21c9.05 0 14-7.5 14-13.99l-.02-.63A9.94 9.94 0 0 0 24 4.59Z"
    />
  </svg>
);

const redes = [
  { nombre: 'Facebook', url: REDES.facebook, Icono: FacebookIcon },
  { nombre: 'Instagram', url: REDES.instagram, Icono: InstagramIcon },
  { nombre: 'Twitter', url: REDES.twitter, Icono: TwitterIcon },
];

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-title">ASOCIACIÓN BANCO DE ROPA UNIDONA</p>

        <div className="footer-columns">
          <div className="footer-col">
            <p className="footer-col-title">Email</p>
            <a className="footer-item" href="mailto:contacto@unidona.org">contacto@unidona.org</a>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Línea nacional y Dirección</p>
            <a className="footer-item" href="tel:018000946223">01 8000 946 223</a>
            <p className="footer-item">Calle 82 a # 73 a 22</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Redes Sociales</p>
            <div className="footer-social">
              {redes.map(({ nombre, url, Icono }) =>
                url ? (
                  <a
                    key={nombre}
                    className="footer-social-icon"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={nombre}
                    title={nombre}
                  >
                    <Icono />
                  </a>
                ) : (
                  <span key={nombre} className="footer-social-icon" role="img" aria-label={nombre} title={nombre}>
                    <Icono />
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
