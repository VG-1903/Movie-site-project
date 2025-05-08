// const express = require("express");
// const User = require(`./models/User`);
// const jwt = require ("jsonwebtokens");
// const router = express.Router();

// mongoose.connect(`mongodb+srv://vanshgaba1903:vansh100@cluster0.yab0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

// router.post(`/register`, async (req,res) => {
//     const { email,password } = req.body;

//     try {
//         const userExists = await User.findOne({email});
//         if (userExists) return res.status(400).json({msg: `User already exists`});

//         const newUser = new User({email,password});
//         await newUser.save();
//     }catch (err) {
//         res.status(500).json({msg: `Server error`});
//     }
// });



// router.post(`/login`, async(req,res) => {
//     const{email, password} = req.body;

//     try {
//         const user = await User.findOne({email});
//         if (!user) return res.status(400).json({msg:`Invalid credentials`});

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) return res.status(400).json({msg:`Invalid credentials`});

//         const token = jwt.sign ({userId: user._id}, process.env.JWT_SECRET, { expiresIn: `1h`});
//         res.json({token});



        
//     }catch(err) {

//         res.status(500).json({msg: `Server error`});

//     }
// });

// module.exports = router;








// this is the oneeeeeeee



// const express = require("express");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");



// dotenv.config();

// if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
//     throw new Error("Missing required environment variables");
// }

// // mongoose.connect(process.env.MONGODB_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // })
// // .then(() => console.log("Connected to MongoDB Atlas"))
// // .catch(err => {
// //     console.error("MongoDB connection error:", err);
// //     process.exit(1);
// // });
// router.get('/',(req,res)=>{
//     return res.sendFile('C:/Users/Vansh/Desktop/movie project/index.html');
// })
// router.post("/register", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ msg: "Email and password are required" });
//         }

//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             return res.status(400).json({ msg: "Invalid email format" });
//         }

//         if (password.length < 8) {
//             return res.status(400).json({ msg: "Password must be at least 8 characters long" });
//         }

//         const userExists = await User.findOne({ email: email.toLowerCase() });
//         if (userExists) {
//             return res.status(400).json({ msg: "User already exists" });
//         }

//         const newUser = new User({
//             email: email.toLowerCase(),
//             password
//         });

//         await newUser.save();

//         const token = jwt.sign(
//             { userId: newUser._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(201).json({
//             msg: "User registered successfully",
//             token,
//             user: {
//                 id: newUser._id,
//                 email: newUser.email
//             }
//         });

//     } catch (err) {
//         console.error("Registration error:", err);
//         res.status(500).json({ msg: "Server error during registration" });
//     }
// });

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ msg: "Email and password are required" });
//         }

//         const user = await User.findOne({ email: email.toLowerCase() });
//         if (!user) {
//             return res.status(401).json({ msg: "Invalid credentials" });
//         }

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).json({ msg: "Invalid credentials" });
//         }

//         const token = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.json({
//             msg: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email
//             }
//         });

//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ msg: "Server error during login" });
//     }
// });

// router.post("/logout", (req, res) => {
//     res.json({ msg: "Logged out successfully" });
// });

// module.exports = router;




























// const express = require("express");
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
//     throw new Error("Missing required environment variables");
// }

// // Use a relative path or provide the path as a configuration
// router.get('/', (req, res) => {
//     return res.sendFile('index.html', { root: '.' });
// });

// router.post("/register", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log("Registration attempt:", { email });

//         if (!email || !password) {
//             return res.status(400).json({ msg: "Email and password are required" });
//         }

//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             return res.status(400).json({ msg: "Invalid email format" });
//         }

//         if (password.length < 8) {
//             return res.status(400).json({ msg: "Password must be at least 8 characters long" });
//         }

//         const userExists = await User.findOne({ email: email.toLowerCase() });
//         if (userExists) {
//             return res.status(400).json({ msg: "User already exists" });
//         }

//         const newUser = new User({
//             email: email.toLowerCase(),
//             password
//         });

//         await newUser.save();
//         console.log("User registered successfully:", { id: newUser._id, email: newUser.email });

//         const token = jwt.sign(
//             { userId: newUser._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(201).json({
//             msg: "User registered successfully",
//             token,
//             user: {
//                 id: newUser._id,
//                 email: newUser.email
//             }
//         });

//     } catch (err) {
//         console.error("Registration error:", err);
//         res.status(500).json({ msg: "Server error during registration", error: err.message });
//     }
// });

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log("Login attempt:", { email });

//         if (!email || !password) {
//             return res.status(400).json({ msg: "Email and password are required" });
//         }

//         const user = await User.findOne({ email: email.toLowerCase() });
//         if (!user) {
//             console.log(`User not found: ${email.toLowerCase()}`);
//             return res.status(401).json({ msg: "Invalid credentials" });
//         }
//         console.log(`User found: ${user._id}`);

//         // Direct approach to get user with password for better debugging
//         const userWithPassword = await User.findById(user._id).select('+password');
//         if (!userWithPassword || !userWithPassword.password) {
//             console.log(`Could not retrieve password for user: ${user._id}`);
//             return res.status(500).json({ msg: "Error retrieving user data" });
//         }

//         const isMatch = await bcrypt.compare(password, userWithPassword.password);
//         if (!isMatch) {
//             console.log(`Password mismatch for user: ${user._id}`);
//             return res.status(401).json({ msg: "Invalid credentials" });
//         }
//         console.log(`Password matched for user: ${user._id}`);

//         const token = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // Update last login time
//         user.lastLogin = new Date();
//         await user.save();

//         res.json({
//             msg: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email
//             }
//         });

//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ msg: "Server error during login", error: err.message });
//     }
// });

// router.post("/logout", (req, res) => {
//     res.json({ msg: "Logged out successfully" });
// });

// module.exports = router;
































const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error("Missing required environment variables");
}

router.get('/', (req, res) => {
    return res.sendFile('index.html', { root: '.' });
});

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Registration attempt:", { email });

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ msg: "Password must be at least 8 characters long" });
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const newUser = new User({
            email: email.toLowerCase(),
            password
        });

        await newUser.save();
        console.log("User registered successfully:", { id: newUser._id, email: newUser.email });

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            msg: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ msg: "Server error during registration", error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", { email });

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log(`User not found: ${email.toLowerCase()}`);
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        console.log(`User found: ${user._id}`);

        // Get user with password field - this approach works based on our test
        const userWithPassword = await User.findById(user._id).select('+password');
        if (!userWithPassword || !userWithPassword.password) {
            console.log(`Could not retrieve password for user: ${user._id}`);
            return res.status(500).json({ msg: "Error retrieving user data" });
        }

        // Direct bcrypt comparison that we know works
        const isMatch = await bcrypt.compare(password, userWithPassword.password);
        if (!isMatch) {
            console.log(`Password mismatch for user: ${user._id}`);
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        console.log(`Password matched for user: ${user._id}`);

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Update last login time
        user.lastLogin = new Date();
        await user.save();

        res.json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: "Server error during login", error: err.message });
    }
});

router.post("/logout", (req, res) => {
    res.json({ msg: "Logged out successfully" });
});

module.exports = router;