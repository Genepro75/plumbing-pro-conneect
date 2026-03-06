const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory databases
const users = new Map();
const jobs = new Map();
const bids = new Map();
const messages = new Map();
const forumPosts = new Map();
const notifications = new Map();

// Initialize mock data
const initializeMockData = () => {
  // Mock users
  const mockUser1 = {
    id: '1',
    name: 'James Kipchoge',
    email: 'james@plumber.com',
    userType: 'plumber',
    location: 'Nairobi',
    rating: 4.9,
    reviews: 87,
    certifications: ['Level 5 - Master Plumber'],
  };

  users.set('1', mockUser1);
};

initializeMockData();

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, userType, profile } = req.body;
  const userId = uuidv4();
  const user = {
    id: userId,
    email,
    userType,
    ...profile,
  };
  users.set(userId, user);
  res.json({ user, token: 'token-' + userId });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Mock: accept any email/password combo
  const userId = uuidv4();
  const user = {
    id: userId,
    email,
    name: email.split('@')[0],
  };
  users.set(userId, user);
  res.json({ user, token: 'token-' + userId });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Jobs Routes
app.get('/api/jobs', (req, res) => {
  const jobsList = Array.from(jobs.values());
  res.json(jobsList);
});

app.post('/api/jobs', (req, res) => {
  const jobId = uuidv4();
  const newJob = {
    id: jobId,
    ...req.body,
    createdAt: new Date(),
  };
  jobs.set(jobId, newJob);

  // Broadcast to connected clients
  io.emit('job:created', newJob);

  // Create notification
  const notification = {
    id: uuidv4(),
    type: 'job_created',
    message: `New job posted: ${newJob.title}`,
    createdAt: new Date(),
  };
  io.emit('notification', notification);

  res.json(newJob);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

app.put('/api/jobs/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  const updated = { ...job, ...req.body };
  jobs.set(req.params.id, updated);
  res.json(updated);
});

app.delete('/api/jobs/:id', (req, res) => {
  jobs.delete(req.params.id);
  res.json({ message: 'Job deleted' });
});

// Bids Routes
app.post('/api/jobs/:jobId/bids', (req, res) => {
  const bidId = uuidv4();
  const bid = {
    id: bidId,
    jobId: req.params.jobId,
    ...req.body,
    createdAt: new Date(),
  };
  bids.set(bidId, bid);

  // Notify job poster
  io.emit('bid:placed', bid);

  res.json(bid);
});

app.get('/api/jobs/:jobId/bids', (req, res) => {
  const jobBids = Array.from(bids.values()).filter(b => b.jobId === req.params.jobId);
  res.json(jobBids);
});

// Plumbers Routes
app.get('/api/plumbers', (req, res) => {
  const plumbersList = Array.from(users.values()).filter(u => u.userType === 'plumber');
  res.json(plumbersList);
});

app.get('/api/plumbers/:id', (req, res) => {
  const plumber = users.get(req.params.id);
  if (!plumber) return res.status(404).json({ error: 'Plumber not found' });
  res.json(plumber);
});

app.put('/api/plumbers/:id', (req, res) => {
  const plumber = users.get(req.params.id);
  if (!plumber) return res.status(404).json({ error: 'Plumber not found' });
  const updated = { ...plumber, ...req.body };
  users.set(req.params.id, updated);
  res.json(updated);
});

// Forum Routes
app.get('/api/forum/posts', (req, res) => {
  const postsList = Array.from(forumPosts.values());
  res.json(postsList);
});

app.post('/api/forum/posts', (req, res) => {
  const postId = uuidv4();
  const post = {
    id: postId,
    ...req.body,
    comments: [],
    likes: 0,
    createdAt: new Date(),
  };
  forumPosts.set(postId, post);

  io.emit('forum:post_created', post);

  res.json(post);
});

app.get('/api/forum/posts/:id', (req, res) => {
  const post = forumPosts.get(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.post('/api/forum/posts/:id/comments', (req, res) => {
  const post = forumPosts.get(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const comment = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date(),
  };

  post.comments = post.comments || [];
  post.comments.push(comment);
  forumPosts.set(req.params.id, post);

  io.emit('forum:comment_added', { postId: req.params.id, comment });

  res.json(comment);
});

app.post('/api/forum/posts/:id/like', (req, res) => {
  const post = forumPosts.get(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  post.likes = (post.likes || 0) + 1;
  forumPosts.set(req.params.id, post);

  res.json(post);
});

// Messages Routes
app.get('/api/messages/conversations', (req, res) => {
  const conversationsList = Array.from(messages.values());
  res.json(conversationsList);
});

app.post('/api/messages/conversations', (req, res) => {
  const conversationId = uuidv4();
  const conversation = {
    id: conversationId,
    ...req.body,
    messages: [],
    createdAt: new Date(),
  };
  messages.set(conversationId, conversation);
  res.json(conversation);
});

app.get('/api/messages/conversations/:id', (req, res) => {
  const conversation = messages.get(req.params.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
  res.json(conversation);
});

app.post('/api/messages/conversations/:id', (req, res) => {
  const conversation = messages.get(req.params.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation not found' });

  const message = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date(),
  };

  conversation.messages = conversation.messages || [];
  conversation.messages.push(message);

  io.emit('message:sent', { conversationId: req.params.id, message });

  res.json(message);
});

// Notifications Routes
app.get('/api/notifications', (req, res) => {
  const notificationsList = Array.from(notifications.values());
  res.json(notificationsList);
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notification = notifications.get(req.params.id);
  if (!notification) return res.status(404).json({ error: 'Notification not found' });
  notification.read = true;
  notifications.set(req.params.id, notification);
  res.json(notification);
});

// Payments Routes (M-Pesa integration mock)
app.post('/api/payments/mpesa/initiate', (req, res) => {
  const { jobId, amount } = req.body;
  const transactionId = uuidv4();

  res.json({
    transactionId,
    status: 'pending',
    amount,
    jobId,
    message: 'M-Pesa prompt sent to your phone',
  });

  // Simulate M-Pesa callback after 10 seconds
  setTimeout(() => {
    io.emit('payment:completed', {
      transactionId,
      status: 'success',
      jobId,
    });
  }, 10000);
});

app.get('/api/payments/verify/:transactionId', (req, res) => {
  res.json({
    transactionId: req.params.transactionId,
    status: 'success',
    verified: true,
  });
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user:online', (userId) => {
    socket.userId = userId;
    io.emit('user:status', { userId, status: 'online' });
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('user:typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (socket.userId) {
      io.emit('user:status', { userId: socket.userId, status: 'offline' });
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PlumberConnect API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`PlumberConnect API running on http://localhost:${PORT}`);
  console.log(`WebSocket server ready for connections`);
});
