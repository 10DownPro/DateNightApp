<!-- ABOUT THE PROJECT -->
## About The Project
LoveShop is an application designed to retrieve local restaurants, generate genre-specific randomly selected movies, and store and display user selections in a date night schedule with a responsive user interface and smooth user experience.
This is an application that fetches data from 4 APIs across sectors and industries to provide users with a unique experience for the purpose of creating the perfect date night.
The user can experiment with many different choices until they are satisfied with their selections.
### Built With
* [Bootstap 5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
*[JavaScript]
*[HTML]
*[CSS]
<!-- USAGE EXAMPLES -->
## Usage
User is looking for a restaurant
User is looking for a movie
### M. V. P.
### Provide the following:
generate a movie from a specific genre
generate a random movie
show critic rating of movie
### Stretch Goals
### Provide the following:
Drag and drop feature
Goal 2
#### Code Snippets
 <!-- put some cool code you're proud off here -->
### Code Snippets
Page: Movie Page
File Name: moviesPage.html
Line numbers: 3-32
```js
function getMovieByGenre(genre) {
  console.log(genre);
  fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&primary_release_year=2022&sort_by=popularity.desc&api_key=[]`
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
        <img class="movieImage" id="movieImage" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=5939701731a13d332a596770de3bd499"></img>
        <p class="card-text">${movie.overview}</p>
        <div id="criticDiv"></div>
        <button class="addMovieButton btn btn-primary" type="submit" id="addButton">Add to List</button>
        </div>
    </div>`;
 ```
Page:
File Name:
Line numbers:
```js
 ```
Page:
File Name:
Line numbers:
```js
 ```
Page:
File Name:
Line numbers:
```js
 ```
<!-- CONTRIBUTING -->
## Contributing
<!-- list of contributors and use github profile links -->
## Contributors (in alphabetical order)
[Quyana Barrow](https://github.com/qb-829)
Movie Page
JavaScript, HTML, CSS
[T’Vedt Lazenby](https://github.com/10DownPro)
Home Page
Main Page
Contact Us
About Us
JavaScript, HTML, CSS
[Ethan Powell](https://github.com/EthanTPowell)
Schedule, Local Storage
JavaScript, HTML, CSS
[Keisha Waller](https://github.com/keishadw44)
Restaurant Page
JavaScript, HTML, CSS
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
<!-- LICENSE -->
 ## License
Distributed under the MIT License. See `LICENSE` for more information.
<!-- CONTACT -->
## Contact
<!-- list contributors with their linked-in profile -->
Contact
[Quyana Barrow](https://www.linkedin.com/in/quyanabarrow)
[T’Vedt Lazenby](https://www.linkedin.com/in/t%E2%80%99vedt-lazenby-761281245/)
[Ethan Powell](https://www.linkedin.com/in/ethan-powell-b430b6ab/)
[Keisha Waller](https://www.linkedin.com/in/lakeisha-waller-17667872/)
<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
Alfredo Takori - [Random Movie Generator Project](https://github.com/atakori/Now-Playing-App)
