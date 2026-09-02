import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={close}>
          <img src="/logo.png" alt="INNANDOUT Plumbing" height={56} />
        </Link>

        {!isAdmin && (
          <>
            <nav className={`nav ${open ? 'open' : ''}`} id="mainNav">
              <a href="#home" onClick={close}>
                Home
              </a>
              <a href="#about" onClick={close}>
                About
              </a>
              <a href="#services" onClick={close}>
                Services
              </a>
              <a href="#portfolio" onClick={close}>
                Projects
              </a>
              <a href="#book" onClick={close}>
                Book Service
              </a>
              <Link to="/admin" className="btn-admin" onClick={close}>
                Admin Portal
              </Link>
            </nav>
            <button
              className="mobile-toggle"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </>
        )}

        {isAdmin && (
          <nav className="nav" style={{ display: 'flex', gap: 16 }}>
            <Link to="/" style={{ color: '#64748b', fontSize: 14 }}>
              ← Back to Website
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
