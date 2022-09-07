

// function getActionMovie() {
//   console.log("My Function and My Button are Working");

//   fetch("http://www.omdbapi.com/?s=action&apikey=d9865a09")
//     .then(
//       (response) => response.json(),
//       (falseResponse) => alert(falseResponse)
//     )
//     .then((data) => {
//       console.log(data);
//       console.log(data.Search);
//       const movieDiv = document.getElementById("containerForMovie");

//         const actionMovieArray = [
//           data.Search[0],
//           data.Search[1],
//           data.Search[2],
//           data.Search[3],
//           data.Search[4],
//           data.Search[5],
//           data.Search[6],
//           data.Search[7],
//           data.Search[8],
//           data.Search[9]];
//         const randomActionNumber = Math.floor(
//           Math.random() * actionMovieArray.length - 1 + 1
//         );
//         const randomActionMovie = actionMovieArray[randomActionNumber];

//         console.log(actionMovieArray);
//         console.log(randomActionMovie);
//         console.log(randomActionNumber);

//         movieDiv.innerHTML = `<div class="row">
//         <div class="results">
//           <div
//             class="movies-container card-group text-center"
//             id="containerForMovie"
//           ><h2 class="text-capitalize text-center">${randomActionMovie.Title}</h2>
//         <img class="movieImage" id="movieImage" src=${randomActionMovie.Poster}>
//         <p style="color:black">${randomActionMovie.Year}</p>
//         </div>
//       </div>`;

//         fetch(`https://api.themoviedb.org/3/search/movie?api_key=5939701731a13d332a596770de3bd499&query=` + randomActionMovie.Title)
//     .then(
//       (response) => response.json(),
//       (falseResponse) => alert(falseResponse)
//     )
//     .then((tmdbData) => {
//       const tmdbPlot = tmdbData.results[0].overview;
//       console.log(tmdbPlot);
//       console.log("data: ", tmdbData);
//       const moviePlotDiv = document.getElementById("containerForPlot");
//           moviePlotDiv.innerHTML = `<div>
//                   <p style="color:black">${tmdbPlot}</p></div>
//                   `;
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
//         return randomActionMovie
     
//     });
// }

//add randomActionMovie so that it chooses a movie from the array to display and not all of them on the page at the same time. :)
//maybe add if/then statements to consolidate code for the different 'genres'
//get page to reset after first result and refresh when genre is clicked
//get plot to show up on the page
//work on frontend - HTML and CSS to make it pretty and consistent with other pages

function getMovieByGenre (genre) {
  console.log(genre)
  
  fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&primary_release_year=2022&sort_by=popularity.desc&api_key=${apiKey}`)
    .then(
      (response) => response.json(),
      (falseResponse) => alert(falseResponse)
    )
    .then((data) => {
      console.log(data)
      console.log(data.results)
      const movie = data.results[Math.floor(Math.random()*data.results.length)];
      console.log(movie);

      const movieDiv = document.getElementById("containerForMovie");      

      movieDiv.innerHTML = `<div class="row">
        <div class="results">
          <div
            class="movies-container card-group text-center"
            id="containerForMovie"
          ><h2 class="text-capitalize text-center">${movie.original_title}</h2>
        <img class="movieImage" id="movieImage" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=${apiKey}">
        <p style="color:black">${movie.release_date}</p>
        </div>
      </div>`;
      const moviePlotDiv = document.getElementById("containerForPlot");
          moviePlotDiv.innerHTML = `<div>
                  <p style="color:black">${movie.overview}</p></div>
                  `;
    });
     

}

function getRandomMovie() {
  const randomCategoryArray = [
    "action",
    "comedy",
    "romance",
    "suspence",
    "horror"
  ];

  const randomNumber = Math.floor(
    Math.random() * randomCategoryArray.length - 1 + 1
  );

  const randomGenre = randomCategoryArray[randomNumber];

  const randomMovie = getMovieByGenre(randomGenre);
  console.log(randomMovie)



  // fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5939701731a13d332a596770de3bd499&with_genres=${randomGenre}`)
  //   .then(
  //     (response) => response.json(),
  //     (falseResponse) => alert(falseResponse)
  //   )
  //   .then((data) => {
  //     console.log(data)
  //     // let poster = data.Poster;
  //     // let type = data.Type;
  //     // console.log(poster);
  //     // console.log("Type:", type);
  //     // const img = document.getElementById("movieImage");
  //     // img.setAttribute(`src`, poster);
  //     // return poster;
  //   });
}