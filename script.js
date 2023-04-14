
var searchBox = document.getElementById("searchBox")
var searchIcon = document.getElementById("searchIcon")


async function getCoords(cityName){
    const geoLocatie = "https://geocoding-api.open-meteo.com/v1/search?language=en&count=1&format=json&name=";
    var coordLink = geoLocatie + cityName
    const response = await fetch(coordLink)
    const data = await response.json()
    //console.log(data);
    //console.log(data.results[0].latitude, data.results[0].longitude);
    var returnPackage = {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
    }
    return returnPackage;
}
//console.log(getCoords("Bacau"))

async function getWeather (coord){
    const apiUrl = "https://api.open-meteo.com/v1/forecast?current_weather=true&timezone=auto"
var lat = "&latitude=" + coord.latitude
var lng = "&longitude=" + coord.longitude
var weatherLink = apiUrl + lat + lng
const response = await fetch(weatherLink)
const data = await response.json()
console.log(data);
}
async function testerSync(){
    let coord = await getCoords("Bacau")
    getWeather(coord);
}
testerSync()



        

//         //document.querySelector(".temp").innerHTML = Math.round(data.hourly.temperature) + "°C";
//current_weather:
// is_day
// : 
// 1
// temperature
// : 
// 18.5
// time
// : 
// "2023-04-14T16:00"
// weathercode
// : 
// 2
// winddirection
// : 
// 136
// windspeed
// : 
// 18.6