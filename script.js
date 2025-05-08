// const API_URL = "http://localhost:3000/api";
// let token = null;

// function showSection(sectionId) {
//     document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
//     document.getElementById(sectionId).style.display = 'block';
// }

// async function login() {
//     const email = document.getElementById("login-email").value;
//     const password = document.getElementById("login-password").value;

//     const res = await fetch(`${API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     document.getElementById("login-message").innerText = data.msg || "Login successful!";
    
//     if (res.ok) {
//         token = data.token;
//         showSection('search-section');
//     }
// }

// async function register() {
//     const email = document.getElementById("register-email").value;
//     const password = document.getElementById("register-password").value;

//     const res = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     document.getElementById("register-message").innerText = data.msg || "Registered successfully!";
// }

// // async function searchMovie() {
// //     const title = document.getElementById("movie-title").value;
// //     const res = await fetch(`${API_URL}/movies/search?title=${title}`);
// //     const movie = await res.json();

// //     document.getElementById("movie-result").innerHTML = `
// //         <h3>${movie.Title}</h3>
// //         <p>${movie.Plot}</p>
// //         <img src="${movie.Poster}" alt="Movie Poster">
// //     `;
// // }



// async function searchMovie() {
//     const title = document.getElementById("movie-title").value;

//     if (!title) {
//         document.getElementById("movie-result").innerHTML = "<p>Please enter a movie title.</p>";
//         return;
//     }

//     try {
//         const res = await fetch(`${API_URL}/movies/search?title=${title}`);
//         const movie = await res.json();

//         if (!movie || movie.Response === "False") {
//             document.getElementById("movie-result").innerHTML = "<p>Movie not found. Try another title.</p>";
//             return;
//         }

//         document.getElementById("movie-result").innerHTML = `
//             <h3>${movie.Title}</h3>
//             <p><strong>Year:</strong> ${movie.Year}</p>
//             <p><strong>Plot:</strong> ${movie.Plot}</p>
//             <img src="${movie.Poster}" alt="Movie Poster" style="max-width: 200px; border-radius: 5px;">
//         `;
//     } catch (error) {
//         console.error("Error fetching movie:", error);
//         document.getElementById("movie-result").innerHTML = "<p>Something went wrong. Please try again.</p>";
//     }
// }
