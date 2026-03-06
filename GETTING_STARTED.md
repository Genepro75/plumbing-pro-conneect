# 🚀 Getting Started with PlumberConnect

## Quick Start (5 minutes)

### 1. Extract the Folder
Extract `plumberconnect.zip` to your desired location.

### 2. Install Dependencies
```bash
cd plumberconnect
npm install
```

This will install all required packages (React, Express, Socket.io, etc.)

### 3. Start the Application
```bash
npm start
```

This will start BOTH the backend server and frontend simultaneously.

The app will automatically open in your browser at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### 4. Demo Login
Click on the top right "Sign Up" or "Login" button and use demo credentials:
- **Email**: plumber@demo.com
- **Password**: demo123

Or click "Demo: Plumber" button for quick fill

---

## What's Included

### ✅ Complete MVP Features

1. **Job Marketplace**
   - Browse plumbing jobs with filters
   - Search by location and job type
   - View job details and budgets
   - Place bids (authenticated users)

2. **Plumber Directory**
   - Search and filter certified plumbers
   - View ratings, expertise, and response times
   - Contact plumber directly
   - Sort by rating, experience, or rate

3. **Technical Forum**
   - Read and create discussions
   - Filter by categories
   - Like and comment on posts
   - Real-time notifications

4. **Authentication System**
   - Register as plumber or client
   - Secure login with validation
   - Profile management
   - Demo account support

5. **Real-time Features**
   - WebSocket-based notifications
   - Live job updates
   - Real-time chat (infrastructure ready)
   - Typing indicators

6. **M-Pesa Integration**
   - Mock payment system for testing
   - Transaction ID generation
   - Payment status tracking
   - Ready for production integration

7. **Modern Design**
   - Apple glass morphism aesthetic
   - Smooth animations
   - Mobile responsive
   - Fast loading

---

## Project Structure

```
plumberconnect/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/
│   │   └── Header.jsx      # Navigation header
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Jobs.jsx        # Job marketplace
│   │   ├── Plumbers.jsx    # Plumber directory
│   │   ├── Forum.jsx       # Forum discussions
│   │   ├── Login.jsx       # Login page
│   │   └── Register.jsx    # Registration
│   ├── styles/             # Component CSS files
│   ├── store/
│   │   └── index.js        # Zustand state management
│   ├── services/
│   │   └── api.js          # API client
│   ├── App.jsx             # Main app component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── server.js               # Express backend
├── package.json            # Dependencies
├── README.md               # Full documentation
└── setup.sh                # Setup script
```

---

## Running the App

### Option 1: Both Server & Client Together (Recommended for Development)
```bash
npm start
```
This uses `concurrently` to run both servers simultaneously.

### Option 2: Run Separately
**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Option 3: Production Build
```bash
npm run build
```
Creates optimized production build in `/build` folder.

---

## Exploring the App

### 📄 Home Page
- Hero section with key messaging
- Features showcase with 6 key benefits
- Stats and social proof
- Call-to-action buttons

### 💼 Jobs Page
- 4 sample plumbing jobs
- Filter by job type (Emergency, Project, Installation, Maintenance)
- Search by title or location
- Real-time bid count
- Location-based recommendations

### 👨‍🔧 Plumbers Page
- 4 certified plumber profiles
- Filter and sort capabilities
- Ratings and review counts
- Expertise tags
- Response time indicators
- Hourly rates

### 💬 Forum Page
- 5 technical discussion topics
- Categories (Technical, Installation, Business, etc.)
- View counts and engagement metrics
- Trending indicators
- Like and comment functionality

### 🔐 Authentication
- **Register**: Choose account type → Fill details → Create account
- **Login**: Use demo credentials or own email
- **Profile**: Auto-populated with demo data (extends easily)

---

## Understanding the Code

### Authentication Flow
```javascript
// User registers/logs in
Login/Register → Store User → Save Token → Redirect to Dashboard

// Check authentication
const { user, isAuthenticated } = useStore();
if (isAuthenticated) { /* show content */ }
```

### API Calls
```javascript
// Fetch jobs
const response = await api.get('/jobs');

// Create job
const response = await api.post('/jobs', jobData);

// Real-time updates via Socket.io
io.on('job:created', (newJob) => {
  // Handle new job
});
```

### State Management (Zustand)
```javascript
import useStore from '../store';

function MyComponent() {
  const { jobs, setJobs, user, isAuthenticated } = useStore();
  // Use state and setters
}
```

---

## Design System

### Color Scheme
- **Primary**: #0066ff (Blue)
- **Secondary**: #ff3b30 (Red)
- **Success**: #34c759 (Green)
- **Gray**: Various shades for text hierarchy

### Typography
- **Display**: Sora font (modern, friendly)
- **Body**: Inter font (clean, readable)

### Glass Morphism Effects
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
}
```

---

## Testing Scenarios

### Scenario 1: Browse Jobs as Client
1. Go to http://localhost:3000
2. Click "Browse Jobs"
3. Search or filter jobs
4. Click a job card to view details

### Scenario 2: Create Account as Plumber
1. Click "Sign Up"
2. Select "I'm a Plumber"
3. Fill in details
4. Explore jobs marketplace
5. Click "Find Plumbers" to see competitors

### Scenario 3: Join Forum Discussion
1. Navigate to "Forum"
2. Read existing discussions
3. Filter by category
4. Click a post to view details
5. See engagement metrics

### Scenario 4: View Plumber Profiles
1. Click "Find Plumbers"
2. Search or sort plumbers
3. View detailed profile
4. See ratings and expertise
5. Contact information ready

---

## Customization Tips

### Change App Name
Edit `public/index.html`:
```html
<title>Your App Name</title>
```

### Modify Mock Data
Edit the initial data in respective pages:
- Jobs: `src/pages/Jobs.jsx` - `useState([...])`
- Plumbers: `src/pages/Plumbers.jsx` - `useState([...])`
- Forum: `src/pages/Forum.jsx` - `useState([...])`

### Update Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #0066ff;  /* Change this */
  --secondary: #ff3b30;
  /* ... etc */
}
```

### Add New Pages
1. Create page in `src/pages/NewPage.jsx`
2. Create styles in `src/styles/new-page.css`
3. Add route in `src/App.jsx`
4. Update Header navigation

---

## Troubleshooting

### Issue: Port 3000/5000 Already in Use
**Solution:**
```bash
# Change port in package.json scripts or use:
PORT=3001 npm run client
# or
NODE_ENV=development PORT=5001 node server.js
```

### Issue: "Cannot find module" errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: WebSocket connection fails
**Solution:**
- Ensure backend is running on port 5000
- Check that server.js is not crashing
- Look at console for error messages

### Issue: Styles not loading
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Ensure CSS files are in correct paths

### Issue: Hot reload not working
**Solution:**
- Restart `npm start`
- Check that browser hasn't locked the app
- Try incognito/private mode

---

## Next Steps to Production

### 1. Database Integration
- Replace mock data with MongoDB/PostgreSQL
- Implement proper user authentication with JWT
- Store jobs, plumbers, messages persistently

### 2. Real M-Pesa Integration
- Get M-Pesa merchant account
- Integrate Daraja API
- Handle payment webhooks

### 3. File Uploads
- Implement certificate uploads for plumbers
- Store in AWS S3 or similar
- Validate file types and sizes

### 4. Email System
- Setup email service (SendGrid, AWS SES)
- Send notifications and updates
- Password reset emails

### 5. Deployment
- Push to GitHub
- Deploy frontend (Vercel, Netlify)
- Deploy backend (Heroku, AWS, DigitalOcean)
- Setup custom domain

### 6. Security
- Add rate limiting
- Implement CORS properly
- Use environment variables
- Add input validation
- Setup HTTPS

---

## Resources

- **React Docs**: https://react.dev
- **Socket.io**: https://socket.io/docs/
- **Zustand**: https://github.com/pmndrs/zustand
- **Express**: https://expressjs.com
- **M-Pesa Daraja API**: https://developer.safaricom.co.ke

---

## Support & Questions

If you encounter issues:

1. **Check the code comments** - Most components are well-documented
2. **Review error messages** - Browser console and terminal logs
3. **Check network tab** - See API calls and responses
4. **Read README.md** - Full technical documentation
5. **Inspect components** - React DevTools can help

---

## Success! 🎉

You now have a fully functional PlumberConnect MVP ready to:
- Demonstrate to stakeholders
- Test with users
- Build upon with additional features
- Scale to production

Happy building! 🚀

---

**Made with ❤️ for African entrepreneurs**
