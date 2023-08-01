document.addEventListener("DOMContentLoaded", () => {
  const filmList = document.getElementById("films");
  const moviePoster = document.getElementById("movie-poster");
  const movieTitle = document.getElementById("movie-title");
  const movieRuntime = document.getElementById("movie-runtime");
  const movieShowtime = document.getElementById("movie-showtime");
  const movieAvailableTickets = document.getElementById("movie-available-tickets");
  const buyTicketBtn = document.getElementById("buy-ticket-btn");

  let currentAvailableTickets = 0; // Default value for available tickets

  // Fetch movie data from the JSON DB server
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate the movie menu
      data.films.forEach((movie) => {
        const movieItem = document.createElement("li");
        movieItem.innerText = movie.title;
        movieItem.classList.add("film", "item");
        filmList.appendChild(movieItem);

        // Event listener for each movie in the menu
        movieItem.addEventListener("click", () => {
          // Display movie details in the main content area
          moviePoster.src = movie.poster;
          movieTitle.innerText = movie.title;
          movieRuntime.innerText = `Runtime: ${movie.runtime} minutes`;
          movieShowtime.innerText = `Showtime: ${movie.showtime}`;

          // Calculate available tickets
          currentAvailableTickets = movie.capacity - movie.tickets_sold;
          movieAvailableTickets.innerText = `Available Tickets: ${currentAvailableTickets}`;

          // Disable buy ticket button if no tickets available
          buyTicketBtn.disabled = currentAvailableTickets === 0;
        });
      });

      // Set the first movie's details as the initial display
      const firstMovie = data.films[0];
      moviePoster.src = firstMovie.poster;
      movieTitle.innerText = firstMovie.title;
      movieRuntime.innerText = `Runtime: ${firstMovie.runtime} minutes`;
      movieShowtime.innerText = `Showtime: ${firstMovie.showtime}`;
      currentAvailableTickets = firstMovie.capacity - firstMovie.tickets_sold;
      movieAvailableTickets.innerText = `Available Tickets: ${currentAvailableTickets}`;
      buyTicketBtn.disabled = currentAvailableTickets === 0;
    });

  // Event listener for "Buy Ticket" button
  buyTicketBtn.addEventListener("click", () => {
    // Update the available tickets when the button is clicked
    currentAvailableTickets--;
    movieAvailableTickets.innerText = `Available Tickets: ${currentAvailableTickets}`;

    // Disable buy ticket button if no tickets available
    buyTicketBtn.disabled = currentAvailableTickets === 0;
  });
});
