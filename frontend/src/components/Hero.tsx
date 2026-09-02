import { useEffect, useState } from 'react';

const SLIDES = ['/cor1.jpg', '/cor2.jpg', '/cor3.jpg', '/cor4.jpg'];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-slider" aria-label="Featured project images">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`hero-slide ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-text">
          <h1>
            PLUMBING.
            <br />
            ELECTRICAL. RENOVATIONS.
          </h1>
          <p>
            Professional plumbing, electrical, painting, tiling and renovation services
            you can trust. From emergency repairs to full property upgrades, we keep
            your home or business running smoothly and looking its best.
          </p>
          <div className="hero-actions">
            <a href="#book" className="btn btn-primary">
              Book a Service
            </a>
            <a href="tel:0603891287" className="btn btn-outline">
              📞 060 389 1287
            </a>
          </div>
        </div>
      </div>
      <div className="hero-dots" aria-label="Hero image navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-dot ${i === current ? 'active' : ''}`}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
