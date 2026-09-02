export function About() {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-content">
          <span className="about-eyebrow">About INNANDOUT</span>
          <h2>
            Trusted home services,
            <br />
            built on quality and reliability
          </h2>
          <p className="about-lead">
            INNANDOUT is a Cape Town-based service company offering plumbing, electrical,
            painting, tiling, renovations and general maintenance for homes and
            businesses across the region.
          </p>
          <p>
            We show up on time, work clean, and give clear pricing before any work
            starts. From emergency plumbing and electrical repairs to a full renovation
            or fresh interior upgrade, our certified team treats every project with the
            same care.
          </p>
        </div>

        <div className="about-highlights">
          <div className="about-highlight">
            <div className="about-highlight-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3>Fully insured & certified</h3>
              <p>
                Strict safety standards on every job. Fully insured, compliant and
                professional from start to finish.
              </p>
            </div>
          </div>

          <div className="about-highlight">
            <div className="about-highlight-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <h3>Fast response times</h3>
              <p>
                Same-day and emergency slots available. We prioritise urgent leaks,
                bursts and no-water situations.
              </p>
            </div>
          </div>

          <div className="about-highlight">
            <div className="about-highlight-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <div>
              <h3>Clear quotes, no surprises</h3>
              <p>
                Free, no-obligation estimates with transparent pricing before work
                begins — residential or commercial.
              </p>
            </div>
          </div>

          <div className="about-stats">
            <div className="about-stat">
              <strong>24/7</strong>
              <span>Emergency cover</span>
            </div>
            <div className="about-stat">
              <strong>Cape Town</strong>
              <span>Service area</span>
            </div>
            <div className="about-stat">
              <strong>100%</strong>
              <span>Insured work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
