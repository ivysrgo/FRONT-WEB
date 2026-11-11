import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './ScreenLayout.css';

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'standard' | 'wide';
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  subtitle,
  children,
  width = 'standard',
}) => (
  <div className="screen-page">
    <Navbar />
    <main className={`screen-content screen-content-${width}`}>
      <header className="screen-heading">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </header>
      {children}
    </main>
    <Footer />
  </div>
);

export const BackLink: React.FC<{ to: string; children?: React.ReactNode }> = ({
  to,
  children = 'Volver',
}) => (
  <Link className="screen-back-link" to={to}>
    <span aria-hidden="true">←</span> {children}
  </Link>
);
