// HTML elements
('use strict');
import './style.css';
// HTML elements
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchBtn');
const movieList = document.getElementById('movieList');
const form = document.querySelector('.form');
const banner = document.getElementById('banner');

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
      displayRandomBanner(data.results); // Display a random movie as the banner
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
        <h3>Results for: ${searchInput.value}</h3>
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

// Function to display a random movie as the banner
function displayRandomBanner(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  const bannerHTML = `
    <div id="banner-item">
      <img src="https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}" alt="${randomMovie.title} Poster">
      <h2>${randomMovie.title}</h2>
      <p>Rating: ${randomMovie.vote_average}</p>
      <p>Release Date: ${randomMovie.release_date}</p>
    </div>
  `;
  banner.innerHTML = bannerHTML;
}

// Initial load - Get popular movies and display a random movie as the banner
getMovies('popular');
