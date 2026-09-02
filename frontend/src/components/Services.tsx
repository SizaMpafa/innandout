import { useApp } from '../context/AppContext';

const ICONS = [
  // shield
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  // wrench
  <svg key="wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
  // clipboard
  <svg key="clipboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>,
  // drop
  <svg key="drop" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>,
  // home
  <svg key="home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
];

export function Services() {
  const { services } = useApp();

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <span className="services-eyebrow">What we do</span>
            <h2>Our Core Services</h2>
            <p>Reliable solutions for homes and businesses across Western Cape</p>
          </div>
          <a href="#book" className="btn btn-outline-sm services-header-cta">
            Request a quote
          </a>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <article className="service-row" key={service.id}>
              <div className="service-row-num">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="service-row-icon">
                {ICONS[index % ICONS.length]}
              </div>
              <div className="service-row-body">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <a href="#book" className="service-row-link" aria-label={`Book ${service.name}`}>
                Book
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}

          {services.length === 0 && (
            <p className="services-empty">
              No services listed yet. Add them from the Admin Portal.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
