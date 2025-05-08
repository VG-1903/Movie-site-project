// // const express = require("express");
// // const axios = require("axios");
// // const router = express.Router();
// // const User = require(`./models/User`);
// // const jwt = require ("jsonwebtoken");
// // const dotenv = require("dotenv");

// // mongoose.connect(`+srv://mongodbvanshgaba1903:vansh100@cluster0.yab0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);


// // const OMDB_API_KEY = process.env.OMDB_API_KEY;


// // const authenticate = async (req,res,next) => {
// //     const toke = req.headers.authorization;
// //     if(!token) return res.status(400).json({msg: "Unauthorized"});

// //     try {
// //         const decode = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user =await User.findBYid(decode.userId);
// //         next();
// //     } catch {
// //         res.status(400).json({msg: "Invalid token"});
// //     }
// // };





// // router.get(`/search`, authenticate, async (req,res,next) => {
// //     const { title,genre,rating } = req.query;
// //     let url = `https://www.omdbapi.com/?i=tt3896198&apikey=657e3984`;

// //     if (title) url += `&t=${title}`;
// //     if (genre) url += `&genre=${genre}`;
// //     if (rating) url += `&rating=${rating}`;

// //     try {
// //         const response = await axios.get(url);
// //         if(response.data.Response === `False`)return res.status(404).json({msg: `Movie not found`});

// //         req.user.searchHistory.push(response.data.Title);
// //         await req.user.save();

// //         res.json(response.data);
// //     } catch (err) {
// //         res.status(500).json({msg: `Error fetching data from OMDb`});

// //     }
// // });



// // router.post(`/favourite`, authenticate, async (req,res) => {
// //     const { title } =req.body;
// //     if (!title) return res.status(400).json({msg: `Movie title required`});

// //     req.user.favourites.pusj(title);
// //     await req.user.save();
// // });

// // router.get(`/favourites`, authenticate, async (req,res) => {
// //     res.json(req.user.favourites);
// // });


// // router.post(`/comment`, authenticate, (req,res) => {
// //     const { title,comment,rating } = req.body;
// //     if(!title || !comment || !rating) return res.status(400).json({msg: `Title, comment and rating required`});

// //     res.json({msg: `Commwnt & rting saved`, title, comment, rating});
// // });

// // module.exports = router;






// const express = require("express");
// const axios = require("axios");
// const mongoose = require("mongoose");  
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config(); 


// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("Connected to MongoDB Atlas"))
//   .catch(err => console.error("MongoDB connection error:", err));

// const OMDB_API_KEY = process.env.OMDB_API_KEY;


// const authenticate = async (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) return res.status(401).json({ msg: "Unauthorized" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.userId); // Corrected method name
//         if (!req.user) return res.status(404).json({ msg: "User not found" });

//         next();
//     } catch (err) {
//         res.status(401).json({ msg: "Invalid token" });
//     }
// };


// router.get("/search", authenticate, async (req, res) => {
//     const { title, genre, rating } = req.query;
//     let url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

//     if (title) url += `&t=${title}`;
//     if (genre) url += `&genre=${genre}`;
//     if (rating) url += `&rating=${rating}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.Response === "False") return res.status(404).json({ msg: "Movie not found" });

        
//         req.user.searchHistory.push(response.data.Title);
//         await req.user.save();

//         res.json(response.data);
//     } catch (err) {
//         res.status(500).json({ msg: "Error fetching data from OMDb", error: err.message });
//     }
// });


// router.post("/favourite", authenticate, async (req, res) => {
//     const { title } = req.body;
//     if (!title) return res.status(400).json({ msg: "Movie title required" });

//     req.user.favourites.push(title); 
//     await req.user.save();

//     res.json({ msg: "Movie added to favorites", favourites: req.user.favourites });
// });


// router.get("/favourites", authenticate, async (req, res) => {
//     res.json({ favourites: req.user.favourites });
// });


// router.post("/comment", authenticate, async (req, res) => {
//     const { title, comment, rating } = req.body;
//     if (!title || !comment || rating === undefined) return res.status(400).json({ msg: "Title, comment, and rating required" });

//     if (isNaN(rating) || rating < 1 || rating > 10) return res.status(400).json({ msg: "Rating must be a number between 1 and 10" });

//     req.user.comments.push({ title, comment, rating }); // Assuming User model has a comments array
//     await req.user.save();

//     res.json({ msg: "Comment & rating saved", title, comment, rating });
// });

// module.exports = router;













// const express = require("express");
// const axios = require("axios");
// const mongoose = require("mongoose");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || !process.env.OMDB_API_KEY) {
//     throw new Error("Missing required environment variables");
// }


// const authenticate = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ msg: "No authentication token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded.userId) {
//             return res.status(401).json({ msg: "Invalid token format" });
//         }

//         const user = await User.findById(decoded.userId);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         if (err.name === 'JsonWebTokenError') {
//             return res.status(401).json({ msg: "Invalid token" });
//         }
//         if (err.name === 'TokenExpiredError') {
//             return res.status(401).json({ msg: "Token expired" });
//         }
//         res.status(500).json({ msg: "Server error during authentication", error: err.message });
//     }
// };

// router.get("/search", authenticate, async (req, res) => {
//     try {
//         const { title, genre, rating } = req.query;
        
//         if (!title) {
//             return res.status(400).json({ msg: "Title parameter is required" });
//         }

//         let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;
//         url += `&t=${encodeURIComponent(title)}`;
//         if (genre) url += `&genre=${encodeURIComponent(genre)}`;
//         if (rating) url += `&rating=${encodeURIComponent(rating)}`;

//         const response = await axios.get(url);
        
//         if (response.data.Response === "False") {
//             return res.status(404).json({ msg: "Movie not found" });
//         }

//         await User.findByIdAndUpdate(
//             req.user._id,
//             { $push: { searchHistory: response.data.Title } },
//             { new: true }
//         );

//         res.json(response.data);
//     } catch (err) {
//         if (axios.isAxiosError(err)) {
//             return res.status(502).json({ msg: "Error fetching data from OMDb", error: err.message });
//         }
//         res.status(500).json({ msg: "Server error", error: err.message });
//     }
// });

// router.post("/favourite", authenticate, async (req, res) => {
//     try {
//         const { title } = req.body;
        
//         if (!title) {
//             return res.status(400).json({ msg: "Movie title required" });
//         }

//         if (req.user.favourites.includes(title)) {
//             return res.status(400).json({ msg: "Movie already in favorites" });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             req.user._id,
//             { $push: { favourites: title } },
//             { new: true }
//         );

//         res.json({
//             msg: "Movie added to favorites",
//             favourites: updatedUser.favourites
//         });
//     } catch (err) {
//         res.status(500).json({ msg: "Error adding to favorites", error: err.message });
//     }
// });

// router.get("/favourites", authenticate, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id)
//             .select('favourites')
//             .lean();
            
//         res.json({ favourites: user.favourites });
//     } catch (err) {
//         res.status(500).json({ msg: "Error fetching favorites", error: err.message });
//     }
// });

// router.post("/comment", authenticate, async (req, res) => {
//     try {
//         const { title, comment, rating } = req.body;

//         if (!title || !comment || rating === undefined) {
//             return res.status(400).json({ msg: "Title, comment, and rating required" });
//         }

//         const numRating = Number(rating);
//         if (isNaN(numRating) || numRating < 1 || numRating > 10) {
//             return res.status(400).json({ msg: "Rating must be a number between 1 and 10" });
//         }

//         const sanitizedComment = comment.trim();
//         if (sanitizedComment.length < 1) {
//             return res.status(400).json({ msg: "Comment cannot be empty" });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             req.user._id,
//             {
//                 $push: {
//                     comments: {
//                         title,
//                         comment: sanitizedComment,
//                         rating: numRating,
//                         createdAt: new Date()
//                     }
//                 }
//             },
//             { new: true }
//         );

//         res.json({
//             msg: "Comment & rating saved",
//             comment: updatedUser.comments[updatedUser.comments.length - 1]
//         });
//     } catch (err) {
//         res.status(500).json({ msg: "Error saving comment", error: err.message });
//     }
// });

// module.exports = router;























const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// // Authentication middleware
// const authenticate = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ msg: "No authentication token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded.userId) {
//             return res.status(401).json({ msg: "Invalid token format" });
//         }

//         const user = await User.findById(decoded.userId);
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         if (err.name === 'JsonWebTokenError') {
//             return res.status(401).json({ msg: "Invalid token" });
//         }
//         if (err.name === 'TokenExpiredError') {
//             return res.status(401).json({ msg: "Token expired" });
//         }
//         res.status(500).json({ msg: "Server error during authentication", error: err.message });
//     }
// };




// Authentication middleware with debugging
const authenticate = async (req, res, next) => {
    try {
        console.log("Auth header:", req.headers.authorization);
        const token = req.headers.authorization?.split(' ')[1];
        console.log("Extracted token:", token);
        
        if (!token) {
            return res.status(401).json({ msg: "No authentication token provided" });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length);
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
            
            if (!decoded.userId) {
                return res.status(401).json({ msg: "Invalid token format" });
            }

            const user = await User.findById(decoded.userId);
            console.log("Found user:", user ? "yes" : "no");
            
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            req.user = user;
            next();
        } catch (jwtError) {
            console.error("JWT verification error:", jwtError.name, jwtError.message);
            return res.status(401).json({ 
                msg: "Invalid token", 
                error: jwtError.message,
                name: jwtError.name
            });
        }
    } catch (err) {
        console.error("Auth error:", err.name, err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: "Invalid token" });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: "Token expired" });
        }
        res.status(500).json({ msg: "Server error during authentication", error: err.message });
    }
};








// Test route to check JWT_SECRET
router.get("/test-jwt", (req, res) => {
    try {
        const secretLength = process.env.JWT_SECRET?.length || 0;
        res.json({ 
            msg: "JWT_SECRET check", 
            hasSecret: secretLength > 0,
            secretLength: secretLength,
            secretFirstChar: secretLength > 0 ? process.env.JWT_SECRET[0] : null,
            secretLastChar: secretLength > 0 ? process.env.JWT_SECRET[secretLength - 1] : null
        });
    } catch (err) {
        res.status(500).json({ msg: "Error checking JWT_SECRET", error: err.message });
    }
});

// Test route to generate a token
router.get("/generate-test-token", (req, res) => {
    try {
        const token = jwt.sign(
            { testData: "This is a test" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        // Now try to verify it immediately
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ 
                msg: "Test token generated and verified", 
                token: token,
                verified: true,
                decoded: decoded
            });
        } catch (verifyErr) {
            res.json({ 
                msg: "Test token generated but verification failed", 
                token: token,
                verified: false,
                error: verifyErr.message
            });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error generating test token", error: err.message });
    }
});















router.get("/search", authenticate, async (req, res) => {
    try {
        const { title, genre, rating } = req.query;
        
        if (!title) {
            return res.status(400).json({ msg: "Title parameter is required" });
        }

        let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;
        url += `&t=${encodeURIComponent(title)}`;
        if (genre) url += `&genre=${encodeURIComponent(genre)}`;
        if (rating) url += `&rating=${encodeURIComponent(rating)}`;

        const response = await axios.get(url);
        
        if (response.data.Response === "False") {
            return res.status(404).json({ msg: "Movie not found" });
        }

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { searchHistory: response.data.Title } },
            { new: true }
        );

        res.json(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return res.status(502).json({ msg: "Error fetching data from OMDb", error: err.message });
        }
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

router.post("/favourite", authenticate, async (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({ msg: "Movie title required" });
        }

        if (req.user.favourites.includes(title)) {
            return res.status(400).json({ msg: "Movie already in favorites" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { favourites: title } },
            { new: true }
        );

        res.json({
            msg: "Movie added to favorites",
            favourites: updatedUser.favourites
        });
    } catch (err) {
        res.status(500).json({ msg: "Error adding to favorites", error: err.message });
    }
});

router.get("/favourites", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('favourites')
            .lean();
            
        res.json({ favourites: user.favourites });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching favorites", error: err.message });
    }
});

router.post("/comment", authenticate, async (req, res) => {
    try {
        const { title, comment, rating } = req.body;

        if (!title || !comment || rating === undefined) {
            return res.status(400).json({ msg: "Title, comment, and rating required" });
        }

        const numRating = Number(rating);
        if (isNaN(numRating) || numRating < 1 || numRating > 10) {
            return res.status(400).json({ msg: "Rating must be a number between 1 and 10" });
        }

        const sanitizedComment = comment.trim();
        if (sanitizedComment.length < 1) {
            return res.status(400).json({ msg: "Comment cannot be empty" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: {
                    comments: {
                        title,
                        comment: sanitizedComment,
                        rating: numRating,
                        createdAt: new Date()
                    }
                }
            },
            { new: true }
        );

        res.json({
            msg: "Comment & rating saved",
            comment: updatedUser.comments[updatedUser.comments.length - 1]
        });
    } catch (err) {
        res.status(500).json({ msg: "Error saving comment", error: err.message });
    }
});

// Add a route to perform movie searches by title
router.get("/search-movies", authenticate, async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ msg: "Search query is required" });
        }

        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
        
        if (response.data.Response === "False") {
            return res.status(404).json({ msg: response.data.Error || "No movies found" });
        }

        res.json(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return res.status(502).json({ msg: "Error fetching data from OMDb", error: err.message });
        }
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Add a route to get movie details by IMDb ID
router.get("/movie/:imdbID", authenticate, async (req, res) => {
    try {
        const { imdbID } = req.params;
        
        if (!imdbID) {
            return res.status(400).json({ msg: "IMDb ID is required" });
        }

        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}`);
        
        if (response.data.Response === "False") {
            return res.status(404).json({ msg: "Movie not found" });
        }

        res.json(response.data);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return res.status(502).json({ msg: "Error fetching data from OMDb", error: err.message });
        }
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;