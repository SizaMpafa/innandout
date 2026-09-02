import { useApp } from '../context/AppContext';

export function Portfolio() {
  const { projects } = useApp();

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <p>Quality workmanship across Gauteng</p>
        </div>
        <div className="portfolio-grid" id="projectsList">
          {projects.map((project) => (
            <div className="portfolio-item" key={project.id}>
              <div
                className="portfolio-img"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="portfolio-info">
                <h4>{project.title}</h4>
                <span>{project.location}</span>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
              No projects listed yet. Add them from the Admin Portal.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
