import { useMemo, useState } from 'react';
import { profile, skills, projects, timeline } from './data';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const projectFilters = ['All', 'Frontend', 'Backend', 'Full Stack', 'Data App'];

export default function App() {
  const [filter, setFilter] = useState('All');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Unable to send message right now.');
      }

      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to send message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand">
            {profile.name}
          </a>
          <nav>
            <ul className="nav-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Professional Portfolio</p>
              <h1>{profile.name}</h1>
              <h2>{profile.role}</h2>
              <p className="lead">{profile.tagline}</p>
              <div className="hero-actions">
                <a className="btn primary" href="#projects">
                  View Projects
                </a>
              </div>
            </div>
            <aside className="hero-aside" aria-label="Candidate profile summary">
              <figure className="hero-profile-pic">
                <img src="/profile.jpg" alt={`Profile picture of ${profile.name}`} />
              </figure>
              <section className="hero-card">
                <h3>Quick Profile</h3>
                <ul>
                  <li>
                    <strong>Location:</strong> {profile.location}
                  </li>
                  <li>
                    <strong>Email:</strong> {profile.email}
                  </li>
                  <li>
                    <strong>GitHub:</strong>{' '}
                    <a href={profile.github} target="_blank" rel="noreferrer">
                      Profile
                    </a>
                  </li>
                  <li>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={profile.linkedin} target="_blank" rel="noreferrer">
                      Connect
                    </a>
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </section>

        <section id="projects" className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>Projects</h2>
              <p>Selected work including internship and personal full-stack builds.</p>
            </div>
            <div className="filter-wrap" role="tablist" aria-label="Project category filters">
              {projectFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-btn ${filter === item ? 'active' : ''}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {filteredProjects.map((project) => (
                <article className="project-card" key={project.title}>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="tag-list">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div className="links">
                    {project.live && project.live !== project.repo && (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container about-grid">
            <div>
              <div className="section-head">
                <h2>About & Resume</h2>
                <p>
                  I focus on shipping practical products with clean architecture, responsive UI, and reliable APIs.
                </p>
              </div>

              <div className="skills-grid">
                {Object.entries(skills).map(([key, values]) => (
                  <article key={key} className="skill-card">
                    <h3>{key}</h3>
                    <ul>
                      {values.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <aside className="timeline">
              <h3>Experience Snapshot</h3>
              {timeline.map((item) => (
                <article key={item.title} className="timeline-item">
                  <h4>{item.title}</h4>
                  <p className="muted">
                    {item.org} · {item.period}
                  </p>
                  <p>{item.details}</p>
                </article>
              ))}
            </aside>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container contact-grid">
            <div>
              <div className="section-head">
                <h2>Contact</h2>
                <p>
                  Looking for collaboration, internships, or freelance opportunities? Send me a message.
                </p>
              </div>
              <p>
                Prefer direct email? Write to{' '}
                <a href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formState.message}
                onChange={handleInputChange}
                required
              />

              <button className="btn primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="social-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
