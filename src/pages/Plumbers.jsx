import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, MessageCircle, Star } from 'lucide-react';
import '../styles/plumbers.css';

export default function Plumbers() {
  const [plumbers] = useState([
    {
      id: 1,
      name: 'James Kipchoge',
      image: '👨‍🔧',
      location: 'Nairobi',
      rating: 4.9,
      reviews: 87,
      expertise: ['Plumbing', 'Gas Fitting', 'Repairs'],
      certification: 'Level 5 - Master Plumber',
      jobs: 156,
      responseTime: '< 1 hour',
      hourlyRate: '500 KES/hour'
    },
    {
      id: 2,
      name: 'Mary Mwangi',
      image: '👩‍🔧',
      location: 'Karen',
      rating: 4.8,
      reviews: 72,
      expertise: ['Installations', 'Maintenance', 'Emergency'],
      certification: 'Level 4 - Professional',
      jobs: 134,
      responseTime: '< 2 hours',
      hourlyRate: '400 KES/hour'
    },
    {
      id: 3,
      name: 'Peter Odhiambo',
      image: '👨‍🔧',
      location: 'Westlands',
      rating: 4.7,
      reviews: 95,
      expertise: ['Large Projects', 'Commercial', 'Drainage'],
      certification: 'Level 5 - Master Plumber',
      jobs: 201,
      responseTime: '< 3 hours',
      hourlyRate: '600 KES/hour'
    },
    {
      id: 4,
      name: 'Grace Mutua',
      image: '👩‍🔧',
      location: 'Kilimani',
      rating: 4.6,
      reviews: 58,
      expertise: ['Repairs', 'Installations', 'Fixtures'],
      certification: 'Level 4 - Professional',
      jobs: 98,
      responseTime: '< 2 hours',
      hourlyRate: '380 KES/hour'
    },
  ]);

  const [filteredPlumbers, setFilteredPlumbers] = useState(plumbers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    let filtered = [...plumbers];

    if (searchTerm) {
      filtered = filtered.filter(plumber =>
        plumber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plumber.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plumber.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'jobs') {
      filtered.sort((a, b) => b.jobs - a.jobs);
    } else if (sortBy === 'rate') {
      filtered.sort((a, b) => 
        parseInt(a.hourlyRate) - parseInt(b.hourlyRate)
      );
    }

    setFilteredPlumbers(filtered);
  }, [searchTerm, sortBy, plumbers]);

  return (
    <div className="plumbers-page">
      {/* Header */}
      <div className="plumbers-header glass">
        <div className="plumbers-header-content">
          <div>
            <h1>Certified Plumbers</h1>
            <p>Connect with verified and highly-rated professionals</p>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="search-sort glass">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, location, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="rating">Sort by Rating</option>
          <option value="jobs">Sort by Experience</option>
          <option value="rate">Sort by Rate</option>
        </select>
      </div>

      {/* Plumbers Grid */}
      <div className="plumbers-grid">
        {filteredPlumbers.length > 0 ? (
          filteredPlumbers.map((plumber, index) => (
            <Link
              key={plumber.id}
              to={`/plumbers/${plumber.id}`}
              className="plumber-card glass-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="plumber-avatar">{plumber.image}</div>
              
              <div className="plumber-info">
                <h3>{plumber.name}</h3>
                <p className="certification">{plumber.certification}</p>
                
                <div className="rating-section">
                  <div className="stars">
                    <Star size={16} className="star-filled" />
                    <span>{plumber.rating}</span>
                    <span className="reviews">({plumber.reviews})</span>
                  </div>
                </div>

                <div className="location-info">
                  <MapPin size={16} />
                  {plumber.location}
                </div>

                <div className="expertise">
                  {plumber.expertise.map((skill, i) => (
                    <span key={i} className="skill-badge">{skill}</span>
                  ))}
                </div>

                <div className="stats">
                  <div className="stat">
                    <div className="stat-value">{plumber.jobs}</div>
                    <div className="stat-label">Jobs</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">{plumber.responseTime}</div>
                    <div className="stat-label">Response</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">{plumber.hourlyRate}</div>
                    <div className="stat-label">Rate</div>
                  </div>
                </div>

                <button className="contact-btn">
                  <MessageCircle size={18} />
                  Contact
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>No plumbers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
