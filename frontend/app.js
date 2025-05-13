// Import core modules
const express = require('express');
const path = require('path');
const app = express();

// ==============================
// 🔧 View Engine Configuration
// ==============================

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Support multiple view directories for different modules
app.set('views', [
  path.join(__dirname, 'Greeting_Page/views'),
  path.join(__dirname, 'login_page/views'),
  path.join(__dirname, 'guest_page/views')
]);

// ==============================
// 🗂️ Static Files (CSS, JS, Images)
// ==============================

// Serve static files from each module’s public folder
app.use(express.static(path.join(__dirname, 'Greeting_Page/public')));
app.use(express.static(path.join(__dirname, 'login_page/public')));
app.use(express.static(path.join(__dirname, 'guest_page/public')));
app.use(express.static(path.join(__dirname, 'public')));

// Serve guest public files under /guest route too (optional, helpful for scoping)
app.use('/guest', express.static(path.join(__dirname, 'guest_page/public')));

// ==============================
// 📬 Middleware
// ==============================

// Parse form data sent by POST requests
app.use(express.urlencoded({ extended: true }));

// ==============================
// 🔗 Load and Use Route Modules
// ==============================

const greetingRoutes = require('./Greeting_Page/routes/greetingRoutes');
const loginRoutes = require('./login_page/routes/loginRoutes');
const registerRoutes = require('./login_page/routes/registerRoutes');
const guestRoutes = require('./guest_page/routes/guestRoutes');

// Use modular routes

app.use('/', greetingRoutes);         // Handles homepage/greeting routes
app.use('/', loginRoutes);            // Handles login
app.use('/', registerRoutes);         // Handles registration
app.use('/guest', guestRoutes);       // Handles guest features like cards, sign detection

// ==============================
// 📄 Direct Routes for Pages
// ==============================

// Guest landing page (guest.ejs)
app.get('/guest', (req, res) => {
  res.render('guest');
});

// Default route → redirect to greeting homepage
app.get('/', (req, res) => {
  res.redirect('/greeting');
});

// Greeting page (main homepage)
app.get('/home', (req, res) => {
  res.render('greeting');
});

// Guest card pages
app.get('/routes', (req, res) => {
  res.render('routes');  // Routes map
});

app.get('/area-info', (req, res) => {
  res.render('area-info');  // Area information
});

// Hand Sign Detection page (renamed from clustering)
app.get('/sign-detection', (req, res) => {
  res.render('sign-detection');  // Sign language detection UI
});

// About Us page (for greeting module)
app.get('/AboutUs', (req, res) => {
  res.render('aboutgreetingpage');
});

app.get('/about', (req, res) => {
  res.render('about'); // loads guest_page/views/about.ejs
});

// Contact Us page (for greeting module)
app.get('/contact', (req, res) => {
  res.render('contactgreetingpage');
});

// ==============================
// 🚀 Start the Server
// ==============================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
