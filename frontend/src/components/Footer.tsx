import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <>
      <div className="section-divider">
        <div className="container divider-inner">
          <div className="divider-line" />
          <div className="divider-text">INNANDOUT SERVICES</div>
          <div className="divider-line" />
        </div>
      </div>

      <footer className="footer booking-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="INNANDOUT" height={48} />
            <p>
              Plumbing, Electrical &amp; Renovations
              <br />
              Painting, Tiling &amp; Maintenance
            </p>
          </div>

          <div className="footer-contact">
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:0603891287">060 389 1287</a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:info@innandout.co.za">info@innandout.co.za</a>
            </p>
            <p>
              <strong>Areas:</strong> Cape Town, Western Cape, &amp; surrounds
            </p>
            <p>
              <strong>Hours:</strong> Mon–Fri 07:00–18:00 | Emergency 24/7
            </p>
          </div>

          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#book">Book Service</a>
            <Link to="/admin">Admin Portal</Link>
          </div>

          <div className="footer-copy">
            <p>© {new Date().getFullYear()} INNANDOUT Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
