import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Droplets, Gauge, Shield, CheckCircle, Award } from 'lucide-react';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero glass">
        <div className="hero-content animate-fade-in-up">
          <h1>Connect with Certified Plumbers</h1>
          <p>Africa's first digital marketplace built exclusively for professional plumbers and their clients</p>
          <div className="hero-actions">
            <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
            <Link to="/plumbers" className="btn btn-secondary">Find Plumbers</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container animate-slide-in-right">
            <img 
              src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=600&fit=crop" 
              alt="Professional plumber at work"
              className="hero-image"
            />
            <div className="hero-overlay">
              <div className="overlay-icon">
                <Wrench size={40} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plumbing Work Gallery */}
      <section className="work-gallery">
        <h2 className="section-title">Professional Plumbing Services</h2>
        <div className="gallery-grid">
          <div className="gallery-item glass-sm">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" alt="Pipe installation" />
            <div className="gallery-overlay">
              <h3>Pipe Installation</h3>
              <p>Expert pipe fitting and installation</p>
            </div>
          </div>
          <div className="gallery-item glass-sm">
            <img src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop" alt="Bathroom plumbing" />
            <div className="gallery-overlay">
              <h3>Bathroom Plumbing</h3>
              <p>Complete bathroom fixture installation</p>
            </div>
          </div>
          <div className="gallery-item glass-sm">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop" alt="Water heater" />
            <div className="gallery-overlay">
              <h3>Water Heaters</h3>
              <p>Installation and repair services</p>
            </div>
          </div>
          <div className="gallery-item glass-sm">
            <img src="https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=300&fit=crop" alt="Drain cleaning" />
            <div className="gallery-overlay">
              <h3>Drain Services</h3>
              <p>Professional drain cleaning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why PlumberConnect?</h2>
          <p>Everything you need to grow your plumbing business or find the perfect plumber</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-sm animate-fade-in-up">
            <div className="feature-icon">
              <CheckCircle size={48} strokeWidth={1.5} />
            </div>
            <h3>Verified Professionals</h3>
            <p>All plumbers are certified and verified. Trust is built into every interaction.</p>
          </div>

          <div className="feature-card glass-sm animate-fade-in-up">
            <div className="feature-icon">
              <Droplets size={48} strokeWidth={1.5} />
            </div>
            <h3>Fair Pricing</h3>
            <p>Transparent bidding system ensures competitive rates for quality work.</p>
          </div>

          <div className="feature-card glass-sm animate-fade-in-up">
            <div className="feature-icon">
              <Wrench size={48} strokeWidth={1.5} />
            </div>
            <h3>Knowledge Hub</h3>
            <p>Technical forum for plumbers to share expertise and solve problems together.</p>
          </div>

          <div className="feature-card glass-sm animate-fade-in-up">
            <div className="feature-icon">
              <Shield size={48} strokeWidth={1.5} />
            </div>
            <h3>Secure Payments</h3>
            <p>M-Pesa integration for safe, easy transactions with built-in protection.</p>
          </div>

          <div className="feature-card glass-sm animate-fade-in-up">
            <div className="feature-icon">
              <Gauge size={48} strokeWidth={1.5} />
            </div>
            <h3>Real-time Updates</h3>
            <p>Instant notifications and live chat keep everyone connected and informed.</p>
          </div>

          <div className="feature-card glass-sm animate-fade-in-up">
            <div className="feature-icon">
              <Award size={48} strokeWidth={1.5} />
            </div>
            <h3>Growth Tools</h3>
            <p>Build your reputation with ratings, reviews, and a professional portfolio.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats glass">
        <div className="stat-item">
          <div className="stat-number">2,500+</div>
          <div className="stat-label">Certified Plumbers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">15,000+</div>
          <div className="stat-label">Jobs Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.8★</div>
          <div className="stat-label">Average Rating</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Secure Payments</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        
        <div className="process-grid">
          <div className="process-card">
            <div className="process-step">1</div>
            <h3>Sign Up</h3>
            <p>Create your account as a plumber or client. It takes less than 2 minutes.</p>
          </div>
          <div className="process-card">
            <div className="process-step">2</div>
            <h3>Complete Profile</h3>
            <p>Add your details, certifications, and work samples to build trust.</p>
          </div>
          <div className="process-card">
            <div className="process-step">3</div>
            <h3>Connect</h3>
            <p>Browse jobs, place bids, or post requirements. Start earning today.</p>
          </div>
          <div className="process-card">
            <div className="process-step">4</div>
            <h3>Deliver & Earn</h3>
            <p>Complete quality work, get paid securely, and build your reputation.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta glass">
        <h2>Ready to Transform Your Plumbing Business?</h2>
        <p>Join thousands of certified plumbers already earning more on PlumberConnect</p>
        <Link to="/register" className="btn btn-primary">Get Started Today</Link>
      </section>
    </div>
  );
}
