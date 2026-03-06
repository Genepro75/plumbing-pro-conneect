# PlumberConnect MVP

🔧 Africa's first digital marketplace for certified plumbers - Built with React, Node.js, and Socket.io

## Features

✅ **Job Marketplace** - Post and browse plumbing jobs
✅ **Plumber Directory** - Find and connect with certified professionals
✅ **Technical Forum** - Share knowledge and solve problems together
✅ **Real-time Chat** - In-app messaging between clients and plumbers
✅ **Notifications** - Stay updated with real-time alerts
✅ **M-Pesa Integration** - Secure mobile payment processing (mock for testing)
✅ **Apple Glass Design** - Modern, smooth UI with animations
✅ **Mobile Responsive** - Works seamlessly on all devices

## Tech Stack

- **Frontend**: React 18, React Router, Zustand, Socket.io Client
- **Backend**: Express.js, Socket.io, Node.js
- **Design**: CSS3 with Glass Morphism and Tailwind utilities
- **State Management**: Zustand
- **Real-time Communication**: Socket.io

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. **Navigate to the project directory**
   ```bash
   cd plumberconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   
   Option A - Run both server and client together:
   ```bash
   npm start
   ```

   Option B - Run them separately in different terminals:
   
   Terminal 1 (Backend):
   ```bash
   npm run server
   ```

   Terminal 2 (Frontend):
   ```bash
   npm run client
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Demo Credentials

### Login Page Quick Demo
You can pre-fill demo credentials by clicking:
- **Demo: Plumber** - Loads plumber account credentials
- **Demo: Client** - Loads client account credentials

Or use these credentials directly:
- Email: `plumber@demo.com` / Password: `demo123`
- Email: `client@demo.com` / Password: `demo123`

## Project Structure

```
plumberconnect/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Header.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Plumbers.jsx
│   │   ├── Forum.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── styles/
│   │   ├── header.css
│   │   ├── home.css
│   │   ├── jobs.css
│   │   ├── plumbers.css
│   │   ├── forum.css
│   │   └── auth.css
│   ├── store/
│   │   └── index.js (Zustand store)
│   ├── services/
│   │   └── api.js (API service)
│   ├── App.jsx
│   ├── index.js
│   └── index.css (Global styles)
├── server.js (Express backend)
├── package.json
└── README.md
```

## Key Pages

### Home
- Beautiful hero section with call-to-action
- Features showcase
- Statistics and testimonials
- How it works process

### Jobs Marketplace
- Browse all available plumbing jobs
- Filter by type (Emergency, Projects, Installation, Maintenance)
- Search by title or location
- View job details and bid on jobs

### Plumbers Directory
- Search and filter certified plumbers
- View ratings and reviews
- Check expertise and hourly rates
- Contact plumbers directly

### Technical Forum
- Share knowledge with other plumbers
- Discuss best practices and solutions
- Filter by categories
- Like and comment on discussions

### Authentication
- Register as plumber or client
- Secure login system
- Profile setup with credentials
- Demo account quick fill

## Design Highlights

### Apple Glass Morphism
- Frosted glass effect with backdrop blur
- Smooth animations and transitions
- Layered depth with shadows
- Gradient text and buttons

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly buttons and inputs
- Optimized for slow connections

### Animations
- Fade in/out transitions
- Slide animations on entrance
- Hover effects on interactive elements
- Loading spinners for async operations

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/profile` - Update profile

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:jobId/bids` - Place a bid
- `GET /api/jobs/:jobId/bids` - Get job bids

### Plumbers
- `GET /api/plumbers` - List all plumbers
- `GET /api/plumbers/:id` - Get plumber profile
- `PUT /api/plumbers/:id` - Update plumber profile

### Forum
- `GET /api/forum/posts` - List forum posts
- `POST /api/forum/posts` - Create post
- `GET /api/forum/posts/:id` - Get post details
- `POST /api/forum/posts/:id/comments` - Add comment
- `POST /api/forum/posts/:id/like` - Like post

### Messages
- `GET /api/messages/conversations` - List conversations
- `POST /api/messages/conversations` - Create conversation
- `GET /api/messages/conversations/:id` - Get messages
- `POST /api/messages/conversations/:id` - Send message

### Payments
- `POST /api/payments/mpesa/initiate` - Initiate M-Pesa payment
- `GET /api/payments/verify/:transactionId` - Verify payment

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read

## WebSocket Events

Real-time communication handled by Socket.io:

**Client Events:**
- `user:online` - Broadcast user online status
- `typing` - Broadcast typing indicator

**Server Events:**
- `job:created` - New job posted
- `bid:placed` - New bid placed on job
- `message:sent` - New message sent
- `user:typing` - User is typing indicator
- `user:status` - User online/offline status
- `notification` - New notification
- `payment:completed` - Payment completed
- `forum:post_created` - New forum post
- `forum:comment_added` - New forum comment

## Development Tips

### Running without concurrently
If you prefer to run server and client separately:

```bash
# Terminal 1 - Start backend
node server.js

# Terminal 2 - Start frontend
npm run client
```

### Mock Data
The application uses mock data for demonstration. To modify:
- Jobs data: Check `server.js` - Jobs Routes section
- Plumbers data: Check `src/pages/Plumbers.jsx`
- Forum posts: Check `src/pages/Forum.jsx`

### Styling
- Global styles: `src/index.css`
- Component styles: `src/styles/[component].css`
- CSS Variables defined in `:root` of `index.css`

### State Management
Using Zustand for global state:
```javascript
import useStore from '../store';
const { user, isAuthenticated, jobs } = useStore();
```

## Production Deployment

### Build for production
```bash
npm run build
```

This creates an optimized build in the `build/` directory.

### Before deploying:
1. Update API_BASE in `src/services/api.js` to production URL
2. Replace mock data with real database
3. Implement real authentication with JWT tokens
4. Set up real M-Pesa integration
5. Configure environment variables
6. Set up database (MongoDB/PostgreSQL recommended)
7. Implement file upload for certificates
8. Add email notifications

## Future Enhancements

- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] Email verification and password reset
- [ ] User profiles with avatars
- [ ] Job completion ratings and reviews
- [ ] Payment history and invoicing
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Push notifications
- [ ] Video call integration
- [ ] Advanced search and filters
- [ ] Multi-language support (Swahili)
- [ ] Offline mode with service workers

## Contributing

This is a starter template. Feel free to:
- Modify the design
- Add new features
- Improve performance
- Fix bugs

## Support

For issues or questions:
1. Check the code comments
2. Review the API endpoints
3. Check the component structure
4. Test in development mode with console logs

## License

Created for the PlumberConnect MVP project

---

**Made with ❤️ for African skilled trades professionals**
