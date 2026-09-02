import { useState } from 'react';
import type { FormEvent } from 'react';
import { useApp } from '../context/AppContext';

export function BookingForm() {
  const { services, addBooking } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    location: '',
    details: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addBooking({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service,
      date: form.date,
      time: form.time,
      location: form.location.trim(),
      details: form.details.trim(),
    });
    setSubmitted(true);
    setForm({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      location: '',
      details: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Prefer dynamic services from admin; fall back to a solid default list
  const serviceOptions =
    services.length > 0
      ? services.map((s) => s.name)
      : [
          'Plumbing & Drainage',
          'Electrical Services',
          'Painting & Tiling',
          'Renovations & Maintenance',
          'Geyser & Water Heating',
          'Bathroom & Kitchen Upgrades',
          'General Repairs',
          'Commercial Maintenance',
          'Property Improvements',
          'Other',
        ];

  return (
    <section className="estimate-section" id="book">
      <div className="container estimate-grid">
        <div className="estimate-text">
          <h2>
            REQUEST ESTIMATES
            <br />
            &amp; BOOK SERVICES
          </h2>
          <p>
            Tell us what you need and when. Our team will confirm availability and send a
            qualified plumber to your location. Transparent pricing, professional service.
          </p>
          <ul className="estimate-list">
            <li>✓ Same-day &amp; emergency slots available</li>
            <li>✓ Clear quotes before work starts</li>
            <li>✓ Fully insured &amp; certified technicians</li>
            <li>✓ Residential &amp; commercial projects</li>
          </ul>
        </div>

        <div className="estimate-form-card">
          {submitted ? (
            <div className="form-success">
              <h4>Thank you!</h4>
              <p>
                Your booking request has been received. We will contact you shortly to
                confirm.
              </p>
            </div>
          ) : (
            <>
              <h3>Book a Service</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="060 000 0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Type *</label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date *</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Preferred Time *</label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                    >
                      <option value="">Select time</option>
                      <option value="08:00 - 10:00">08:00 - 10:00</option>
                      <option value="10:00 - 12:00">10:00 - 12:00</option>
                      <option value="12:00 - 14:00">12:00 - 14:00</option>
                      <option value="14:00 - 16:00">14:00 - 16:00</option>
                      <option value="16:00 - 18:00">16:00 - 18:00</option>
                      <option value="Emergency / ASAP">Emergency / ASAP</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location / Address *</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Street, Suburb, City"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="details">Additional Details</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Describe the issue or work needed..."
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Submit Booking Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
