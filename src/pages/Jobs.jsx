import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase, Plus, Filter } from 'lucide-react';
import useStore from '../store';
import '../styles/jobs.css';

export default function Jobs() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Emergency Pipe Repair - Westlands',
      location: 'Westlands, Nairobi',
      budget: '5,000 - 8,000 KES',
      type: 'Emergency',
      description: 'Burst pipe in kitchen requires immediate repair',
      bids: 4,
      rating: 4.5,
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'Full Bathroom Installation',
      location: 'Karen, Nairobi',
      budget: '50,000 - 75,000 KES',
      type: 'Project',
      description: 'Complete bathroom renovation with new fixtures',
      bids: 8,
      rating: 4.8,
      createdAt: '5 hours ago'
    },
    {
      id: 3,
      title: 'Drainage System Cleaning',
      location: 'Kilimani, Nairobi',
      budget: '3,000 - 5,000 KES',
      type: 'Maintenance',
      description: 'Regular drainage cleaning and inspection',
      bids: 3,
      rating: 4.6,
      createdAt: '1 day ago'
    },
    {
      id: 4,
      title: 'Water Tank Installation',
      location: 'Gigiri, Nairobi',
      budget: '35,000 - 50,000 KES',
      type: 'Installation',
      description: 'Install new 10,000L water storage tank',
      bids: 6,
      rating: 4.7,
      createdAt: '2 days ago'
    },
  ]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { isAuthenticated } = useStore();

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(job => job.type === filterType);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, filterType]);

  return (
    <div className="jobs-page">
      {/* Header with Search */}
      <div className="jobs-header glass">
        <div className="jobs-header-content">
          <div className="jobs-title">
            <h1>Available Jobs</h1>
            <p>Find plumbing jobs that match your expertise and location</p>
          </div>
          {isAuthenticated && (
            <Link to="/jobs/post" className="btn btn-primary">
              <Plus size={20} />
              Post a Job
            </Link>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-filter glass">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterType === 'Emergency' ? 'active' : ''}`}
            onClick={() => setFilterType('Emergency')}
          >
            Emergency
          </button>
          <button
            className={`filter-btn ${filterType === 'Project' ? 'active' : ''}`}
            onClick={() => setFilterType('Project')}
          >
            Projects
          </button>
          <button
            className={`filter-btn ${filterType === 'Installation' ? 'active' : ''}`}
            onClick={() => setFilterType('Installation')}
          >
            Installation
          </button>
          <button
            className={`filter-btn ${filterType === 'Maintenance' ? 'active' : ''}`}
            onClick={() => setFilterType('Maintenance')}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="job-card glass-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="job-header">
                <div>
                  <div className="job-badge">{job.type}</div>
                  <h3>{job.title}</h3>
                </div>
                <div className="job-budget">{job.budget}</div>
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-footer">
                <div className="job-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  <div className="meta-item">
                    <Briefcase size={16} />
                    {job.bids} bid{job.bids !== 1 ? 's' : ''}
                  </div>
                  <div className="meta-item">
                    ⭐ {job.rating}
                  </div>
                </div>
                <div className="job-time">{job.createdAt}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <Briefcase size={48} />
            <h3>No jobs found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
