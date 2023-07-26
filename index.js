// HTML elements
('use strict');
import './style.css';
// HTML elements
const searchInput = document.getElementById('search');
const movieList = document.getElementById('movieList');
const form = document.querySelector('.form');

// Event listener for search button
form.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  if (searchTerm) {
    getMovies(searchTerm);
  }
});

// Function to fetch movies from the API
function getMovies(searchTerm) {
  const API_KEY = 'e4b893cb06d97093f9f664b5f4d63e15'; // Replace with your own API key
  const API_URL = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      // Process the movie data and display it on the page
      displayMovies(data.results);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to display movies on the page
function displayMovies(movies) {
  // Clear previous movie list
  movieList.innerHTML = '';

  // Check if movie data exists
  if (movies.length > 0) {
    let movieHTML = '';
    movies.forEach((movie) => {
      const releaseDate = new Date(movie.release_date).toLocaleDateString();
      movieHTML += `
        <div id="movie-item">
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster" loading="lazy">
          <p>Rating: ${movie.vote_average}</p>
          <p>Release Date: ${releaseDate}</p>
        </div>
      `;
    });
    movieList.innerHTML = movieHTML;
  } else {
    movieList.innerHTML = '<p>No movies found.</p>';
  }
}
