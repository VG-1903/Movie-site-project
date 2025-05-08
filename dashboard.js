document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('user-name').textContent = `Welcome, ${user.name}`;

    initializeApp();
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

function initializeApp() {
    populateYearFilter();
    fetchPopularMovies();
    setupEventListeners();
}

function populateYearFilter() {
    const yearFilter = document.getElementById('year-filter');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1970; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }
}

function setupEventListeners() {
    document.getElementById('search-btn').addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value.trim();
        if (searchTerm) {
            searchMovies(searchTerm);
        }
    });

    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = document.getElementById('search-input').value.trim();
            if (searchTerm) {
                searchMovies(searchTerm);
            }
        }
    });

    document.getElementById('rating-filter').addEventListener('change', applyFilters);
    document.getElementById('year-filter').addEventListener('change', applyFilters);

    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const genre = e.target.getAttribute('data-genre');
            document.getElementById('page-title').textContent = `${genre} Movies`;
            fetchMoviesByGenre(genre);
        });
    });

    document.getElementById('favorites-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('page-title').textContent = 'My Favorites';
        loadFavorites();
    });

    document.getElementById('rated-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('page-title').textContent = 'My Rated Movies';
        loadRatedMovies();
    });
}

function fetchPopularMovies() {
    showLoading();

    setTimeout(() => {
        const popularMovies = [
            { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'https://via.placeholder.com/300x450?text=Shawshank', imdbRating: '9.3' },
            { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: 'https://via.placeholder.com/300x450?text=Godfather', imdbRating: '9.2' }
        ];
        displayMovies(popularMovies);
    }, 1000);
}

function showLoading() {
    document.getElementById('movie-container').innerHTML = '<div class="loading">Loading movies...</div>';
}

function displayMovies(movies) {
    const container = document.getElementById('movie-container');
    container.innerHTML = '';
    movies.forEach(movie => {
        container.innerHTML += `<div class="movie-card"><img src="${movie.Poster}" alt="${movie.Title}"><p>${movie.Title} (${movie.Year})</p></div>`;
    });
}
