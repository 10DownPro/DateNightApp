function generateDate() {
  if (localStorage.restaurants && localStorage.movies) {
    console.log("generating");
    grabRestaurants();
    grabMovies();
  } else {
    const mainBody = document.getElementById("mainBody");
    mainBody.innerHTML = `<h2>You need to save at least one movie and restaurant to your lists.</h2>`;
  }
};

function grabMovies() {
  let movies = JSON.parse(localStorage.movies);
  rng(movies);
};

function grabRestaurants() {
  let restaurants = JSON.parse(localStorage.restaurants);
  console.log(restaurants);
  rng(restaurants);
};

function rng(arr) {
  const element = arr[Math.floor(Math.random() * arr.length)];
  if (typeof element.id === "string") {
    console.log(element);
    displayRestaurant(element);
  } else {
    console.log(element);
    displayMovie(element);
  }
};

function displayRestaurant(restaurant) {
  console.log(restaurant);
  const mainBody = document.getElementById("mainBody");
  mainBody.innerHTML += `<div id = "restDiv" class="card-group"></div>`;
  let restDiv = document.getElementById("restDiv");
  let tempName = restaurant.poi.name;
  let tempAdd = restaurant.address.freeformAddress;
  restDiv.innerHTML = `
    <div class="card text-white bg-#23052A" id="${tempName}">
    <h2>${tempName}</h2>
    <p>${tempAdd}</p>
    </div>
    `;
    // </div>
  let tempCard = document.getElementById(`${tempName}`);
  if (restaurant.poi.phone) {
    tempCard.innerHTML += `<p>${restaurant.poi.phone}</p>`;
  }
  if (restaurant.poi.url) {
    tempCard.innerHTML += `<a href=${restaurant.poi.url}>${restaurant.poi.url}</a>`;
  }
};

function displayMovie(movie) {
  console.log("object");
  const mainBody = document.getElementById("mainBody");
  let restDiv = document.getElementById("restDiv");
  let tempName = movie.title;
  let tempPoster = movie.poster_path;
  restDiv.innerHTML += `
    <div class="card text-white bg-#23052A" id="${tempName}">
    <h2>${tempName}</h2>
    <img class="movieImage card-image-top" id="" src="https://image.tmdb.org/t/p/w500/${tempPoster}?api_key=5939701731a13d332a596770de3bd499"></img>
    
    </div>
    `;
    // </div>
};