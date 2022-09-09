function main() {

    const form = document.getElementById('search-form');
    const inputCity = document.getElementById('city');
    const inputState = document.getElementById('state');
    
    form.addEventListener('submit', (e) => {
        // capture the event and prevent default
        e.preventDefault();
        console.log('submit event emmited');
    
        //capture the input variables value
        const inputCityName = inputCity.value.toLowerCase(); // toLowerCase() makes the data standard
        const inputStateName = inputState.value.toLowerCase();
        console.log(inputCityName);
        console.log(inputStateName);
    
        // reset the form
        form.reset();

        getActivityPlaces('Restaurant', inputCityName, inputStateName)

        // console.log(cityData);
    
    });
};

async function getActivityPlaces(inputCategoryName, inputCityName, inputStateName) {

    // declare any needed varibles to be used in the try/catch block
    let cityData;


    try {

        cityData = await getCityData(inputCityName, inputStateName)
        // const response = await fetch(
        //     `https://api.tomtom.com/search/2/categorySearch/${category}.json?lat=${lat}&lon=${lon}&view=Unified&relatedPois=off&limit=100&key=x5oSQEqlYnrwnGwEFZLA7HK78PZWE59q`}, {
        //     method: 'GET',
        //     headers: { 'X-Api-Key': '2nXylAnQUAU16yoH3D5uCg==aqpHvQp81aTPlcw5'},
        //     contentType: 'application/json',
        // });
        
    } 
    catch (error) {
        console.log(error);
    }
    
    console.log(cityData);

    console.log(inputCategoryName, cityData.latitude, cityData.longitude);

    try {
        // call the getListofPlaces(inputCategoryName, cityData.latitude, cityData.longitude) function here
        // add other code as needed
        getListofPlaces(cityData.latitude, cityData.longitude)
    } catch (error) {
        
    }

}
// // asyn / await
async function getCityData(inputCityName, inputStateName) {
console.log('activated');

    let rightCity;

    try {
        //do something api call related
        const response = await fetch(
            `https://api.api-ninjas.com/v1/geocoding?city=${inputCityName}, ${inputStateName}`, {
            method: 'GET',
            headers: { 'X-Api-Key': '2nXylAnQUAU16yoH3D5uCg==aqpHvQp81aTPlcw5'},
            contentType: 'application/json',
        });

        const cities = await response.json();
        console.log(cities);

        cities.forEach((city, index) => {
            if(city.name.toLowerCase() === inputCityName && city.state.toLowerCase() === inputStateName) {

                rightCity = city;
            };
        });

        // getListofPlaces(rightCity.latitude, rightCity.longitude);
        return rightCity;

    }

    catch(error) {
        console.log(error);
    }

}

function getListofPlaces(lat, lon){

    fetch(`https://api.tomtom.com/search/2/categorySearch/restaurant.json?lat=${lat}&lon=${lon}&view=Unified&relatedPois=off&limit=100&key=x5oSQEqlYnrwnGwEFZLA7HK78PZWE59q`)
    
    .then(
        (response) => response.json(),
        (falseResponse) => alert(falseResponse)
        )

        .then((data) => {
            console.log(data.restaurant); 
            // const getActivityPlaces = document.getElementById
            // let name = element.name;
            console.log(data);
            console.log(data.results);
            data.results.forEach( (restaurant) => {
                console.log(restaurant.poi.name)
            const restContainer = document.getElementById('restcontainer');
            restContainer.innerHTML += `<div>
            <p style="color:black">${restaurant.poi.name}</p>
            <p style="color:black">${restaurant.poi.phone}</p>
          
            </div>
            <button onclick="Add to List">Add to List</button>
            `;

            } )
        });
     }

     function addrestauranttolist(){

     }
    