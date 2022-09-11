

function grabMovies() {
    let movies = localStorage.movies;
}

function grabRestaurants() {
    let restaurants = JSON.parse(localStorage.restaurants);
    console.log(restaurants);
    rng(restaurants)

}

function rng(arr) {
    const restaurant = arr[Math.floor(Math.random() * arr.length)];
    console.log(restaurant);
    displayRestaurant(restaurant);
}

function generateDate() {
    console.log("generating");
    grabRestaurants();

}

function displayRestaurant(restaurant) {
    console.log(restaurant);
    const mainBody = document.getElementById("mainBody");
    mainBody.innerHTML += `<div id = "restDiv" class="col-md"></div>`
    let restDiv = document.getElementById("restDiv");
    let tempName = restaurant.poi.name;
    let tempAdd = restaurant.address.freeformAddress
    restDiv.innerHTML = 
    `
    <div class="card" id="${tempName}">
    <h2>${tempName}</h2>
    
    </div>
    `
    let tempCard = document.getElementById(`${tempName}`);
    if (restaurant.poi.phone) {
        tempCard.innerHTML += `<p>${restaurant.poi.phone}</p>`
    }
    if (restaurant.poi.url) {
        tempCard.innerHTML += `<a href=${restaurant.poi.url}>${restaurant.poi.url}</a>`
    }

};

function displayMovie() {
    
}