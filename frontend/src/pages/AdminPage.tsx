import { Fragment, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  isAdminAuthenticated,
  readFileAsDataUrl,
  setAdminAuthenticated,
} from '../lib/storage';

const ADMIN_PASSWORD = 'admin123';

export function AdminPage() {
  const {
    services,
    projects,
    bookings,
    addService,
    removeService,
    addProject,
    removeProject,
    confirmBooking,
    removeBooking,
    clearBookings,
  } = useApp();

  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const [projectTitle, setProjectTitle] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
    today: bookings.filter((b) => b.date === today).length,
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setAuthenticated(true);
      setLoginError(false);
      setPassword('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setAuthenticated(false);
  };

  const handleAddService = (e: FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !serviceDescription.trim()) return;
    addService(serviceName.trim(), serviceDescription.trim());
    setServiceName('');
    setServiceDescription('');
  };

  const handleAddProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectLocation.trim()) return;

    let image =
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80';
    if (projectImageFile) {
      try {
        image = await readFileAsDataUrl(projectImageFile);
      } catch {
        // keep fallback
      }
    }

    addProject(projectTitle.trim(), projectLocation.trim(), image);
    setProjectTitle('');
    setProjectLocation('');
    setProjectImageFile(null);
    const input = document.getElementById('projectImage') as HTMLInputElement | null;
    if (input) input.value = '';
  };

  if (!authenticated) {
    return (
      <div className="admin-body">
        <header className="admin-header">
          <div className="container">
            <h1>INNANDOUT Admin Portal</h1>
            <div>
              <Link to="/" style={{ color: '#94a3b8', fontSize: 14 }}>
                ← Back to Website
              </Link>
            </div>
          </div>
        </header>
        <div className="admin-login">
          <h2>Admin Login</h2>
          <p>
            Password: <strong>admin123</strong>
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <input
                id="adminPassword"
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Login
            </button>
            {loginError && (
              <p style={{ color: '#dc2626', fontSize: 13, marginTop: 12 }}>
                Incorrect password
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <header className="admin-header">
        <div className="container">
          <h1>INNANDOUT Admin Portal</h1>
          <div>
            <Link to="/" style={{ color: '#94a3b8', fontSize: 14, marginRight: 16 }}>
              ← Back to Website
            </Link>
            <button
              type="button"
              className="btn btn-outline-sm"
              style={{ color: '#fff', borderColor: '#64748b' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-panel">
        <div className="container">
          <div className="admin-stats">
            <div className="stat-card">
              <div className="label">Total Bookings</div>
              <div className="value">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="label">Pending</div>
              <div className="value">{stats.pending}</div>
            </div>
            <div className="stat-card">
              <div className="label">Confirmed</div>
              <div className="value">{stats.confirmed}</div>
            </div>
            <div className="stat-card">
              <div className="label">Today</div>
              <div className="value">{stats.today}</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Bookings</h2>
            <button
              type="button"
              className="btn btn-outline-sm"
              style={{ color: '#dc2626', borderColor: '#fca5a5' }}
              onClick={() => {
                if (window.confirm('Clear all bookings?')) clearBookings();
              }}
            >
              Clear All
            </button>
          </div>

          <div className="bookings-table-wrap">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date &amp; Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <Fragment key={b.id}>
                    <tr>
                      <td>
                        <strong>{b.name}</strong>
                        <br />
                        <small>{b.phone}</small>
                        {b.email ? (
                          <>
                            <br />
                            <small>{b.email}</small>
                          </>
                        ) : null}
                      </td>
                      <td>{b.service}</td>
                      <td>
                        {b.date}
                        <br />
                        <small style={{ color: '#64748b' }}>{b.time}</small>
                      </td>
                      <td>{b.location}</td>
                      <td>
                        <span
                          className={`badge ${
                            b.status === 'Confirmed' ? 'badge-confirmed' : 'badge-pending'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td>
                        {b.status === 'Pending' && (
                          <button
                            type="button"
                            className="btn btn-outline-sm"
                            style={{ padding: '4px 10px', fontSize: 12 }}
                            onClick={() => confirmBooking(b.id)}
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-outline-sm"
                          style={{
                            padding: '4px 10px',
                            fontSize: 12,
                            color: '#dc2626',
                            borderColor: '#fca5a5',
                            marginLeft: 4,
                          }}
                          onClick={() => {
                            if (window.confirm('Delete this booking?')) removeBooking(b.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {b.details ? (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            background: '#f8fafc',
                            fontSize: '0.85rem',
                            color: '#64748b',
                            paddingTop: 0,
                          }}
                        >
                          <em>Notes: {b.details}</em>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="empty-state">
                <p>No bookings yet. Submit a request from the main website to see it here.</p>
              </div>
            )}
          </div>

          <div className="admin-managers">
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>Manage Services</h3>
              </div>
              <form className="admin-form" onSubmit={handleAddService}>
                <div className="form-group">
                  <label htmlFor="serviceName">Service Name</label>
                  <input
                    id="serviceName"
                    type="text"
                    placeholder="e.g. Drain Cleaning"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="serviceDescription">Description</label>
                  <textarea
                    id="serviceDescription"
                    rows={3}
                    placeholder="Describe what this service includes"
                    required
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>
              </form>
              <div className="admin-list">
                {services.map((s) => (
                  <div className="admin-list-item" key={s.id}>
                    <div>
                      <strong>{s.name}</strong>
                      <p>{s.description}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-sm danger-btn"
                      onClick={() => {
                        if (window.confirm('Remove this service?')) removeService(s.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <h3>Manage Projects</h3>
              </div>
              <form className="admin-form" onSubmit={handleAddProject}>
                <div className="form-group">
                  <label htmlFor="projectTitle">Project Title</label>
                  <input
                    id="projectTitle"
                    type="text"
                    placeholder="e.g. Kitchen Renovation"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectLocation">Location</label>
                  <input
                    id="projectLocation"
                    type="text"
                    placeholder="e.g. Johannesburg"
                    required
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectImage">Project Image</label>
                  <input
                    id="projectImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProjectImageFile(e.target.files?.[0] ?? null)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Project
                </button>
              </form>
              <div className="admin-list admin-list-projects">
                {projects.map((p) => (
                  <div className="admin-list-item admin-project-item" key={p.id}>
                    <div
                      className="admin-project-thumb"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                    <div className="admin-project-copy">
                      <strong>{p.title}</strong>
                      <p>{p.location}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-sm danger-btn"
                      onClick={() => {
                        if (window.confirm('Remove this project?')) removeProject(p.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
