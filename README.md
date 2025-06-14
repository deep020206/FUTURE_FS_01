<<<<<<< HEAD
# Portfolio Contact Form Setup

This README explains how to set up the contact form functionality for the portfolio.

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Edit the `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

### 3. Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this app password in the `EMAIL_PASS` field

### 4. Install and Start MongoDB
- Download and install MongoDB Community Edition
- Start MongoDB service
- The app will create the database automatically

### 5. Start the Backend Server
```bash
cd backend
npm run dev
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd deep-portfolio
npm install
```

### 2. Start the Frontend
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` (or the port shown in terminal)

## Features Fixed

### 1. Contact Form
- ✅ Form validation (required fields, email format)
- ✅ Email sending functionality via Nodemailer
- ✅ Form data storage in MongoDB
- ✅ Loading states and user feedback
- ✅ Error handling for network issues
- ✅ Auto-clearing status messages

### 2. Navigation Scroll Behavior
- ✅ Intersection Observer for active section detection
- ✅ Automatic navigation highlighting while scrolling
- ✅ Smooth scrolling between sections
- ✅ Proper section detection with 50% visibility threshold

## Testing the Contact Form

1. Start both backend and frontend servers
2. Fill out the contact form
3. Check the browser console for any errors
4. Check the backend terminal for request logs
5. Check your email for the contact notification

## Troubleshooting

### Common Issues:

1. **"Network error" message**: Make sure the backend server is running on port 5000
2. **Email not sending**: Check your Gmail credentials and app password
3. **Database connection error**: Ensure MongoDB is running
4. **Navigation not highlighting**: Refresh the page after scrolling

### Logs to Check:
- Browser Developer Console (F12)
- Backend terminal output
- MongoDB connection status

## File Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables
├── config/
│   └── db.js         # Database connection
├── models/
│   └── Contact.js    # Contact form data model
└── routes/
    └── contact.js    # Contact form API routes

deep-portfolio/
└── src/
    └── App.jsx       # Main frontend component with contact form
```
=======
# FUTURE_FS_01
>>>>>>> a03fb12c7f975ffb9cb789c1376ce2c923823cf9
