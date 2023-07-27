'use strict';
import './style.css';

// HTML elements
const searchInput = document.getElementById('search');
const movieList = document.getElementById('movieList');
const form = document.querySelector('.form');
const results_for = document.getElementById('results-for');

// Event listener for search button
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

searchInput.addEventListener('input', async () => {
  const searchTerm = searchInput.value;
  results_for.textContent = `Results for: ${searchTerm}`;
  if (searchTerm) {
    await delay(500);
    const movies = await getMovies(searchTerm);
    displayMovies(movies);
  }
});

// Function to fetch movies from the API
async function getMovies(searchTerm) {
  const API_KEY = 'e4b893cb06d97093f9f664b5f4d63e15'; // Replace with your own API key
  const API_URL = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
}

// Function to display movies on the page
function displayMovies(movies) {
  // Clear previous movie list
  movieList.innerHTML = '';

  if (movies.length > 0) {
    const movieHTML = movies
      .map((movie) => {
        const releaseDate = new Date(movie.release_date).toLocaleDateString();
        return `
          <div id="movie-item">
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster" loading="lazy">
          </div>
        `;
      })
      .join('');
    movieList.innerHTML = movieHTML;
  } else {
    movieList.innerHTML = '<p>No movies found.</p>';
  }
}

// Utility function to delay execution
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
