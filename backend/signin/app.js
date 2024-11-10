// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const session = require('express-session');
// // const User = require('./models/user');  // Ensure that User model is correctly imported

// // const app = express();
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static('public'));  // Serve static files from the "public" folder
// // app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

// // app.set('view engine', 'ejs');

// // // Connect to MongoDB
// // mongoose.connect('mongodb://127.0.0.1:27017/signinDB', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => console.log('Connected to MongoDB'))
// //   .catch((err) => console.error('Failed to connect to MongoDB', err));

// // // Sign In Route
// // app.get('/', (req, res) => {
// //   res.render('signin', { error: null });
// // });

// // app.post('/signin', async (req, res) => {
// //   const { username, password } = req.body;
// //   const user = await User.findOne({ username });

// //   if (user && await user.isValidPassword(password)) {
// //     req.session.user = user;
// //     res.send('Signed in successfully!');
// //   } else {
// //     res.render('signin', { error: 'Invalid username or password' });
// //   }
// // });

// // // Create Account Route (Sign Up)
// // app.get('/signup', (req, res) => {
// //   res.render('signup', { error: null });  // Ensure error is passed as null if there's no error
// // });

// // app.post('/signup', async (req, res) => {
// //   const { username, password, confirmPassword } = req.body;

// //   // Check if the passwords match
// //   if (password !== confirmPassword) {
// //     return res.render('signup', { error: 'Passwords do not match' });
// //   }

// //   // Check if the username is already taken
// //   const existingUser = await User.findOne({ username });
// //   if (existingUser) {
// //     return res.render('signup', { error: 'Username already exists' });
// //   }

// //   // Create a new user and save to the database
// //   const newUser = new User({ username, password });
// //   await newUser.save();

// //   res.redirect('/');  // Redirect to sign-in page after successful registration
// // });

// // // View Users Route (for debugging)
// // app.get('/view-users', async (req, res) => {
// //   try {
// //     const users = await User.find();  // Fetch all users
// //     res.json(users);  // Send the users as JSON to view in the browser
// //   } catch (err) {
// //     res.status(500).send('Error retrieving users');
// //   }
// // });

// // // Start the server
// // app.listen(3000, () => {
// //   console.log('Server running on http://localhost:3000');
// // });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');
// const User = require('./models/user');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(
//   session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.set('view engine', 'ejs');

// // Connect to MongoDB
// mongoose
//   .connect('mongodb://127.0.0.1:27017/signinDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB', err));

// // Routes for Signin and Signup Pages
// app.get('/', (req, res) => {
//   res.render('signin', { error: null });
// });

// app.post('/signin', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (user && await user.isValidPassword(password)) {
//     req.session.user = user;
//     res.redirect('/app');  // Redirect to React app after successful login
//   } else {
//     res.render('signin', { error: 'Invalid username or password' });
//   }
// });

// app.get('/signup', (req, res) => {
//   res.render('signup', { error: null });
// });

// app.post('/signup', async (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.render('signup', { error: 'Passwords do not match' });
//   }

//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     return res.render('signup', { error: 'Username already exists' });
//   }

//   const newUser = new User({ username, password });
//   await newUser.save();
//   res.redirect('/');
// });

// // Serve the React App after Login
// app.use(express.static(path.join(__dirname, 'frontend/build')));
// app.get('/app', (req, res) => {
//   if (!req.session.user) {
//     return res.redirect('/');
//   }
//   res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
// });

// // View Users Route for Debugging
// app.get('/view-users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send('Error retrieving users');
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');
// const User = require('./models/user'); // Ensure this is your user model with the necessary methods like isValidPassword

// const app = express();

// // Middleware setup
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public')); // Serve static files (e.g., stylesheets, images)
// app.use(
//   session({
//     secret: 'mysecret', // Session secret, should be secure in production
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // View engine setup
// app.set('view engine', 'ejs');

// // MongoDB connection setup
// mongoose
//   .connect('mongodb://127.0.0.1:27017/signinDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB', err));

// // Routes for Signin and Signup Pages
// app.get('/', (req, res) => {
//   res.render('signin', { error: null });
// });

// // Signin route
// app.post('/signin', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (user && await user.isValidPassword(password)) {
//     req.session.user = user;  // Store user info in the session
//     res.redirect('/app');  // Redirect to React app after successful login
//   } else {
//     res.render('signin', { error: 'Invalid username or password' });
//   }
// });

// // Signup route
// app.get('/signup', (req, res) => {
//   res.render('signup', { error: null });
// });

// app.post('/signup', async (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   // Validate passwords match
//   if (password !== confirmPassword) {
//     return res.render('signup', { error: 'Passwords do not match' });
//   }

//   // Check if username already exists
//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     return res.render('signup', { error: 'Username already exists' });
//   }

//   // Create new user
//   const newUser = new User({ username, password });
//   await newUser.save();
//   res.redirect('/');  // Redirect to sign-in page after successful registration
// });

// // Authentication check route (for frontend to check if the user is logged in)
// app.get('/api/check-auth', (req, res) => {
//   if (req.session.user) {
//     res.status(200).send('Authenticated');
//   } else {
//     res.status(401).send('Not Authenticated');
//   }
// });

// // Serve static files from the 'dist' folder (for JS, CSS, etc.)
// app.use(express.static(path.join(__dirname, 'dist')));  // Serve static files from 'dist' folder

// // Route to serve React App (ensure that user is authenticated)
// app.get('/app', (req, res) => {
//   if (!req.session.user) {
//     return res.redirect('/');  // Redirect to signin if user is not authenticated
//   }
  
//   // Serve the index.html file from 'dist' (React App entry point)
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Serve React app HTML file
// });

// // View Users Route (for debugging purposes)
// app.get('/view-users', async (req, res) => {
//   try {
//     const users = await User.find();  // Fetch all users from MongoDB
//     res.json(users);  // Return the users as JSON
//   } catch (err) {
//     res.status(500).send('Error retrieving users');
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });


require('dotenv').config(); // Load environment variables from .env

console.log("MONGO_CONNECTION_STRING:", process.env.MONGO_CONNECTION_STRING);


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./models/user'); // Ensure this is your user model with methods like isValidPassword

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (e.g., stylesheets, images)
app.use(
  session({
    secret: 'mysecret', // Session secret, should be secure in production
    resave: false,
    saveUninitialized: true,
  })
);

// View engine setup
app.set('view engine', 'ejs');

// MongoDB connection setup
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message); // Improved error message
  });

// Routes for Signin and Signup Pages
app.get('/', (req, res) => {
  res.render('signin', { error: null });
});

// Signin route
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await user.isValidPassword(password)) {
      req.session.user = user; // Store user info in the session
      res.redirect('/app'); // Redirect to React app after successful login
    } else {
      res.render('signin', { error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).render('signin', { error: 'An error occurred. Please try again.' });
    console.error('Error during sign-in:', err.message);
  }
});

// Signup route
app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.render('signup', { error: 'Passwords do not match' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/'); // Redirect to sign-in page after successful registration
  } catch (err) {
    res.status(500).render('signup', { error: 'An error occurred. Please try again.' });
    console.error('Error during sign-up:', err.message);
  }
});

// Authentication check route (for frontend to check if the user is logged in)
app.get('/api/check-auth', (req, res) => {
  if (req.session.user) {
    res.status(200).send('Authenticated');
  } else {
    res.status(401).send('Not Authenticated');
  }
});

// Serve static files from the 'dist' folder (for JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'dist')));  // Serve static files from 'dist' folder

// Route to serve React App (ensure that user is authenticated)
app.get('/app', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');  // Redirect to signin if user is not authenticated
  }
  
  // Serve the index.html file from 'dist' (React App entry point)
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Serve React app HTML file
});

// View Users Route (for debugging purposes)
// Only enable this route in non-production environments for security reasons
if (process.env.NODE_ENV !== 'production') {
  app.get('/view-users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from MongoDB
      res.json(users); // Return the users as JSON
    } catch (err) {
      res.status(500).send('Error retrieving users');
    }
  });
}
