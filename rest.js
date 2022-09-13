// let restArr = [];
// console.log(restArr);
function main() {
  console.log("I'm here");
  const form = document.getElementById("search-form");
  const inputCity = document.getElementById("city");
  const inputState = document.getElementById("state");
  form.addEventListener("submit", (e) => {
    // capture the event and prevent default
    e.preventDefault();
    // console.log('submit event emmited');

    //capture the input variables value
    const inputCityName = inputCity.value.toLowerCase(); // toLowerCase() makes the data standard
    const inputStateName = inputState.value.toLowerCase();

    // reset the form
    form.reset();

    getActivityPlaces("Restaurant", inputCityName, inputStateName);

    // console.log(cityData);
  });
}

async function getActivityPlaces(
  inputCategoryName,
  inputCityName,
  inputStateName
) {
  // console.log("object");
  // declare any needed varibles to be used in the try/catch block
  let cityData;

  try {
    cityData = await getCityData(inputCityName, inputStateName);
  } catch (error) {
    console.log(error);
  }

  // console.log(cityData);

  // console.log(inputCategoryName, cityData.latitude, cityData.longitude);

  try {
    // call the getListofPlaces(inputCategoryName, cityData.latitude, cityData.longitude) function here
    // add other code as needed
    console.log("object");
    getListofPlaces(cityData.latitude, cityData.longitude);
  } catch (error) {}
}
// // asyn / await
async function getCityData(inputCityName, inputStateName) {
  // console.log('activated');

  let rightCity;

  try {
    //do something api call related
    const response = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${inputCityName}, ${inputStateName}`,
      {
        method: "GET",
        headers: { "X-Api-Key": "2nXylAnQUAU16yoH3D5uCg==aqpHvQp81aTPlcw5" },
        contentType: "application/json",
      }
    );

    const cities = await response.json();
    // console.log(cities);

    cities.forEach((city, index) => {
      if (
        city.name.toLowerCase() === inputCityName &&
        city.state.toLowerCase() === inputStateName
      ) {
        rightCity = city;
      }
    });

    // getListofPlaces(rightCity.latitude, rightCity.longitude);
    return rightCity;
  } catch (error) {
    console.log(error);
  }
}

function getListofPlaces(lat, lon) {
  let restArr = [];
  restArr.length = 0;
  console.log("object");
  const restContainer = document.getElementById("restContainer");
  restContainer.style = "display: flexbox; flex-wrap: wrap;";
  restContainer.innerHTML = ``;

  fetch(
    `https://api.tomtom.com/search/2/categorySearch/restaurant.json?lat=${lat}&lon=${lon}&view=Unified&relatedPois=off&limit=100&key=x5oSQEqlYnrwnGwEFZLA7HK78PZWE59q`
  )
    .then(
      (response) => response.json(),
      (falseResponse) => alert(falseResponse)
    )

    .then((data) => {
      console.log(`data res: ${JSON.stringify(data, null, 2)}`);
      data.results.forEach((restaurant, index) => {
        restArr.push(restaurant);
        let idNum = `${restaurant.id}`;
        console.log(idNum);
        let divId = idNum.concat("Div");
        console.log(divId);
        restContainer.innerHTML += `
            <div id="${divId}" class="card">
                <p style="color:black">${restaurant.poi.name}</p>
                <p style="color:black">${restaurant.address.freeformAddress}</p>
            </div>
            `;
        let restDiv = document.getElementById(`${divId}`);
        if (restaurant.poi.phone) {
          restDiv.innerHTML += `<p style="color:black">${restaurant.poi.phone}</p>`;
        }
        restDiv.innerHTML += `<button id="${idNum}" class="addButton btn btn-primary">Add to List</button>`;
      });
      document.addEventListener("click", (e) => {
        let idNum = e.target.id;

        if (e.target.classList.contains("addButton")) {
          addToList(restArr, idNum);
        }
      });
    });
}
// };

function addToList(restArr, idNum) {
  if (!localStorage.restaurants) {
    console.log("if");
    localStorage.setItem("restaurants", "[]");
    let tempRestaurants = JSON.parse(localStorage.restaurants);
    console.log(JSON.stringify(restArr, null, 2));
    console.log(`tempRestaurants: ${tempRestaurants.length}`);
    let tempRest = restArr.filter((object) => object.id === `${idNum}`);
    tempRestaurants.push(tempRest[0]);
    tempRest.length = 0;
    console.log(tempRest);
    let filteredTempRestaurants = tempRestaurants.filter((e) => {
      return e != null;
    });
    localStorage.restaurants = JSON.stringify(filteredTempRestaurants);
    console.log(tempRestaurants);
  } else {
    console.log("else");
    let tempRestaurants = JSON.parse(localStorage.restaurants);
    console.log(JSON.stringify(restArr, null, 2));
    console.log(`tempRestaurants: ${tempRestaurants.length}`);
    let tempRest = restArr.filter((object) => object.id === `${idNum}`);
    tempRestaurants.push(tempRest[0]);
    tempRest.length = 0;
    console.log(tempRest);
    let filteredTempRestaurants = tempRestaurants.filter((e) => {
      return e != null;
    });
    localStorage.restaurants = JSON.stringify(filteredTempRestaurants);
    console.log(tempRestaurants);
  }
}
