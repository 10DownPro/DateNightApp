//select a random movie from a user-chosen genre, release year, and popularity
//movie grabbed using data from The Movie DB
function getMovieByGenre(genre) {
  console.log(genre);

  fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&primary_release_year=2022&sort_by=popularity.desc&api_key=${apiKey}`
  )
    .then(
      (response) => response.json(),
      (falseResponse) => alert(falseResponse)
    )
    .then((data) => {
      console.log(data);
      console.log(data.results);
      const movie =
        data.results[Math.floor(Math.random() * data.results.length)];
      console.log(movie);

      //display random movie selection on screen

      const movieDiv = document.getElementById("containerForMovie");

      movieDiv.innerHTML = `<section class="card text-center">
      <div class="card-body">
        <h5 class="card-title display-6">${movie.original_title}</h5>
        <img class="movieImage" id="movieImage" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=${apiKey}"></img>
        <p class="card-text">${movie.overview}</p>
        <div id="criticDiv"></div>
        <button class="addMovieButton btn btn-primary" type="submit" id="addButton">Add to List</button>
        </div>
    </div>`;

    document.addEventListener("click", (e) => {
      if (e.target.id="addButton") {
        console.log(JSON.stringify(movie, null, 2))
        let tempMovie = JSON.stringify(movie);
        addMovie(tempMovie)
      }
    })

      //make 2nd api call to NYT to get critic info
      //display critic choice on screen

      const url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movie.original_title}&api-key=${apiKeyNyt}`;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText,
              errorMessage: err,
            });
          });
        })
        .then((reviewData) => {
          console.log(reviewData);
          const criticPick = reviewData.results[0].critics_pick;
          const criticDiv = document.getElementById("criticDiv");
          console.log(criticPick);
          if (criticPick === 1) {
            console.log("it is a pick");
            criticDiv.innerHTML = `<p class="display-6 text-center" style="color:white">Critics Say: Yes</p>`;
          } else {
            console.log(`issa no`);
            criticDiv.innerHTML = `<p class="display-6 text-center" style="color:white">Critics Say: No</p>`;
          }
        })
        .catch((err) => {
          console.error(err);
          criticDiv.innerHTML = `<p class="display-6 text-center" style="color:white">Not Reviewed By NYT</p>`;
        });
    });
}

function getRandomMovie() {
  const randomCategoryArray = [
    "action",
    "comedy",
    "romance",
    "suspense",
    "horror",
  ];

  const randomNumber = Math.floor(
    Math.random() * randomCategoryArray.length - 1 + 1
  );

  const randomGenre = randomCategoryArray[randomNumber];

  const randomMovie = getMovieByGenre(randomGenre);
};

function addMovie(tempMovie) {
  if (!localStorage.movies) {
    localStorage.setItem("movies", "[]");
    let movies = JSON.parse(localStorage.movies);
    let movie = JSON.parse(tempMovie);
    movies.push(movie);
    let tempMovies = JSON.stringify(movies);
    localStorage.movies = tempMovies;
  }
  else {
    let movies = JSON.parse(localStorage.movies);
    let movie = JSON.parse(tempMovie);
    movies.push(movie);
    let tempMovies = JSON.stringify(movies);
    localStorage.movies = tempMovies;
  }
};
