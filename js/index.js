document.addEventListener("DOMContentLoaded", () => {
    const filmList = document.getElementById("films");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const movieAvailableTickets = document.getElementById("movie-available-tickets");
    const buyTicketBtn = document.getElementById("buy-ticket-btn");
  
    let currentAvailableTickets = 0;
  
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        data.films.forEach((movie) => {
          const movieItem = document.createElement("li");
          movieItem.innerText = movie.title;
          movieItem.classList.add("film", "item");
          filmList.appendChild(movieItem);
  
          movieItem.addEventListener("click", () => {
            moviePoster.src = movie.poster;
            movieTitle.innerText = movie.title;
            movieRuntime.innerText = `Runtime: ${movie.runtime} minutes`;
            movieShowtime.innerText = `Showtime: ${movie.showtime}`;
  
            currentAvailableTickets = movie.capacity - movie.tickets_sold;
            movieAvailableTickets.innerText = `Available Tickets: ${currentAvailableTickets}`;
  
            buyTicketBtn.disabled = currentAvailableTickets === 0;
          });
        });
  
        const firstMovie = data.films[0];
        moviePoster.src = firstMovie.poster;
        movieTitle.innerText = firstMovie.title;
        movieRuntime.innerText = `Runtime: ${firstMovie.runtime} minutes`;
        movieShowtime.innerText = `Showtime: ${firstMovie.showtime}`;
        currentAvailableTickets = firstMovie.capacity - firstMovie.tickets_sold;
        movieAvailableTickets.innerText = `Available Tickets: ${currentAvailableTickets}`;
        buyTicketBtn.disabled = currentAvailableTickets === 0;
      });
  
    buyTicketBtn.addEventListener("click", () => {
      currentAvailableTickets--;
      movieAvailableTickets.innerText = `Available Tickets: ${currentAvailableTickets}`;
  
      buyTicketBtn.disabled = currentAvailableTickets === 0;
    });
  });
  