// let restArr = [];
// console.log(restArr);
function main() {
  console.log("I'm here");


  form.addEventListener("submit", (e) => {
    // capture the event and prevent default
    e.preventDefault();
    // console.log('submit event emmited');

    //capture the input variables value
    const inputCityName = inputCity.value.toLowerCase(); // toLowerCase() makes the data standard
    const inputStateName = inputState.value.toLowerCase();
    // console.log(inputCityName);
    // console.log(inputStateName);

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
    // const response = await fetch(
    //     `https://api.tomtom.com/search/2/categorySearch/${category}.json?lat=${lat}&lon=${lon}&view=Unified&relatedPois=off&limit=100&key=x5oSQEqlYnrwnGwEFZLA7HK78PZWE59q`}, {
    //     method: 'GET',
    //     headers: { 'X-Api-Key': '2nXylAnQUAU16yoH3D5uCg==aqpHvQp81aTPlcw5'},
    //     contentType: 'application/json',
    // });
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
};

// function arrLogic(lat, lon) {
//   let restArr = [];
//   // let results = document.getElementById(restContainer);
//   console.log("hello");
//   console.log(counter);
//   if () {
//     console.log("if");
//     restArr = [];
//     console.log(`arrLogic: ${JSON.stringify(restArr)}`);
//     getListofPlaces(lat, lon, restArr);
//   } else {
//     console.log("else");
//     restArr = [];
//     console.log(restArr);
//     getListofPlaces(lat, lon, restArr);
//   }
//   console.log(counter);
// }

function getListofPlaces(lat, lon) {
  // let restArr = [];
  // if (!restArr === []) {
  //     restArr = [];
  // }
  // if (!restArr) {
  //     let restArr = [];
  // }
  // else {
  //     restArr = [];
  //     console.log(restArr);
  // restArr.delete();
  let restArr = [];
  restArr.length = 0;
  // restArr.length = [];
  // console.log(restArr);
  console.log("object");
  const restContainer = document.getElementById("restContainer");
  restContainer.style = "display: flex";
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
      //   console.log(`restArr after res: ${JSON.stringify(restArr, null, 2)}`);
      data.results.forEach((restaurant, index) => {
        // console.log(restaurant);
        // console.log(JSON.stringify(restaurant, null, 2));
        restArr.push(restaurant);
        // console.log(restArr);
          let idNum = `${restaurant.id}`
        //   let idNumString = idNum.toString();
          console.log(idNum);
          let divId = idNum.concat("Div")
          console.log(divId);
          restContainer.innerHTML += `
            <div id="${divId}">
                <p style="color:black">${restaurant.poi.name}</p>
                <p style="color:black">${restaurant.address.freeformAddress}</p>
            </div>
            `;
          let restDiv = document.getElementById(`${divId}`)
        if(restaurant.poi.phone){
              restDiv.innerHTML += `<p style="color:black">${restaurant.poi.phone}</p>`
          };
          restDiv.innerHTML +=`<button id="${idNum}" class="addButton">Add to List</button>`
        //     let button = document.getElementById(`${index}`);
        //     button.addEventListener("click", callAddToList(`${restArr, index}`) )
        // })
        // function callAddToList(restArr, index) {
        //     addToList(restArr, index);
        // }
      });
      document.addEventListener("click", (e) => {
        let idNum = e.target.id;
        // console.log(typeof i);
        if (e.target.className === "addButton") {
          addToList(restArr, idNum);
        }
      });
    });
};
// };

function addToList(restArr, idNum) {
  //   console.log(`rest: ${JSON.stringify(restArr[i], null, 2)}`);
  //   console.log(`restArr: ${restArr.length}`);
  //   console.log(`addToList restArr: ${JSON.stringify(restArr, null, 2)}`);
  if (!localStorage.restaurants) {
    console.log("if");
    localStorage.setItem("restaurants", "[]");
    // let restaurants = localStorage.restaurants;
      let tempRestaurants = JSON.parse(localStorage.restaurants);
      console.log(JSON.stringify(restArr, null, 2));
      console.log(`tempRestaurants: ${tempRestaurants.length}`);
      let tempRest = restArr.filter(object => object.id === `${idNum}`)
      tempRestaurants.push(tempRest[0]);
      tempRest.length = 0;
      console.log(tempRest);
      let filteredTempRestaurants = tempRestaurants.filter((e) => {
          return e !=null;
      })
    localStorage.restaurants = JSON.stringify(filteredTempRestaurants);
    // tempRestaurants = [];
    console.log(tempRestaurants);
  } else {
      console.log("else");
    // let restaurants = localStorage.restaurants;
      let tempRestaurants = JSON.parse(localStorage.restaurants);
      console.log(JSON.stringify(restArr, null, 2));
      console.log(`tempRestaurants: ${tempRestaurants.length}`);
      let tempRest = restArr.filter(object => object.id === `${idNum}`)
      tempRestaurants.push(tempRest[0]);
      tempRest.length = 0;
      console.log(tempRest);
      let filteredTempRestaurants = tempRestaurants.filter((e) => {
          return e != null;
      });
    localStorage.restaurants = JSON.stringify(filteredTempRestaurants);
    // tempRestaurants = [];
    console.log(tempRestaurants);
  }
};
