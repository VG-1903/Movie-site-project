// const express = require ("express");
// const mongoose = require ("mongoose");
// const dotenv = require ("dotenv");
// const cors = require ("cors");
// const authRoutes = require ("./routes/auth");
// const movieRoutes = require("./routes/movie");

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(`mongodb+srv://vanshgaba1903:vansh100@cluster0.yab0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => console.log('Connected to MongoDB Atlas'))
//     .catch((err) => console.error('MongoDB connection error:', err));
  
    
//   app.use('/api/auth', authRoutes);
//   app.use('/api/movies', movieRoutes);


//   // Test login functionality
// const testLogin = async () => {
//   try {
//     console.log('Testing login functionality...');
    
//     // First, find if the test user exists
//     const testUser = await User.findOne({ email: 'test@example.com' });
//     console.log('Test user exists:', !!testUser);
    
//     if (testUser) {
//       // Test the password comparison directly
//       const userWithPassword = await User.findById(testUser._id).select('+password');
//       console.log('User with password:', !!userWithPassword);
      
//       if (userWithPassword && userWithPassword.password) {
//         const isMatch = await bcrypt.compare('password123', userWithPassword.password);
//         console.log('Password match result:', isMatch);
//       } else {
//         console.log('Could not retrieve password for user');
//       }
//     }
//   } catch (error) {
//     console.error('Test login error:', error);
//   }
// };

// // Run the test after server starts
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
//   testLogin();
// });
  
//   // app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  





const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Added for password comparison
const User = require("./models/User"); // Added to access User model
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://vanshgaba1903:vansh100@cluster0.yab0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));
  
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Test login functionality
const testLogin = async () => {
  try {
    console.log('Testing login functionality...');
    
    // First, find if the test user exists
    const testUser = await User.findOne({ email: 'test@example.com' });
    console.log('Test user exists:', !!testUser);
    
    if (testUser) {
      console.log('User ID:', testUser._id);
      
      // Test the password comparison directly
      const userWithPassword = await User.findById(testUser._id).select('+password');
      console.log('User with password retrieved:', !!userWithPassword);
      
      if (userWithPassword && userWithPassword.password) {
        console.log('Password hash exists:', !!userWithPassword.password);
        console.log('Password hash:', userWithPassword.password);
        const isMatch = await bcrypt.compare('password123', userWithPassword.password);
        console.log('Password match result:', isMatch);
      } else {
        console.log('Could not retrieve password for user');
      }
    }
  } catch (error) {
    console.error('Test login error:', error);
  }
};

// Only one app.listen should be present
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  testLogin(); // Run the test after the server starts
});