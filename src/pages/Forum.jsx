import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ThumbsUp, Eye, Plus, TrendingUp } from 'lucide-react';
import '../styles/forum.css';

export default function Forum() {
  const [posts] = useState([
    {
      id: 1,
      title: 'Best practices for preventing frozen pipes in winter',
      author: 'James Kipchoge',
      avatar: '👨‍🔧',
      category: 'Maintenance',
      views: 1240,
      replies: 45,
      likes: 89,
      createdAt: '2 days ago',
      excerpt: 'Winter brings unique challenges to plumbing. Here are proven strategies...'
    },
    {
      id: 2,
      title: 'High-efficiency water heater installation tips',
      author: 'Mary Mwangi',
      avatar: '👩‍🔧',
      category: 'Installation',
      views: 856,
      replies: 28,
      likes: 64,
      createdAt: '3 days ago',
      excerpt: 'Modern water heaters require specific installation techniques...'
    },
    {
      id: 3,
      title: 'Dealing with difficult customers - advice needed',
      author: 'Peter Odhiambo',
      avatar: '👨‍🔧',
      category: 'Business',
      views: 2105,
      replies: 67,
      likes: 102,
      createdAt: '1 week ago',
      excerpt: 'Share your stories and get advice from experienced plumbers...'
    },
    {
      id: 4,
      title: 'Sustainable plumbing solutions for Nairobi',
      author: 'Grace Mutua',
      avatar: '👩‍🔧',
      category: 'Innovation',
      views: 634,
      replies: 18,
      likes: 45,
      createdAt: '1 week ago',
      excerpt: 'Eco-friendly options that are practical and affordable...'
    },
    {
      id: 5,
      title: 'Drainage system troubleshooting guide',
      author: 'James Kipchoge',
      avatar: '👨‍🔧',
      category: 'Technical',
      views: 1567,
      replies: 52,
      likes: 78,
      createdAt: '2 weeks ago',
      excerpt: 'Common drainage issues and step-by-step solutions...'
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'Technical', 'Installation', 'Maintenance', 'Business', 'Innovation'];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="forum-page">
      {/* Header */}
      <div className="forum-header glass">
        <div className="forum-header-content">
          <div>
            <h1>Knowledge Forum</h1>
            <p>Share expertise, solve problems, and grow together as a community</p>
          </div>
          <Link to="/forum/new" className="btn btn-primary">
            <Plus size={20} />
            New Discussion
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="categories glass">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/forum/${post.id}`}
              className="forum-post glass-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="post-content">
                <div className="post-author">
                  <span className="author-avatar">{post.avatar}</span>
                  <div className="author-info">
                    <h4>{post.author}</h4>
                    <span>{post.createdAt}</span>
                  </div>
                  <span className="category-tag">{post.category}</span>
                </div>

                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className="post-stats">
                  <div className="stat">
                    <Eye size={16} />
                    {post.views} views
                  </div>
                  <div className="stat">
                    <MessageCircle size={16} />
                    {post.replies} replies
                  </div>
                  <div className="stat">
                    <ThumbsUp size={16} />
                    {post.likes} likes
                  </div>
                </div>
              </div>

              <div className="post-trending">
                {post.views > 1500 && (
                  <div className="trending-badge">
                    <TrendingUp size={14} />
                    Trending
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <MessageCircle size={48} />
            <h3>No discussions yet</h3>
            <p>Be the first to start a discussion in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
