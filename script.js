
var searchBox = document.getElementById("searchBox")
var searchIcon = document.getElementById("searchIcon")

async function superFetch(link){
    const response = await fetch(link)
    const data = await response.json()
    return data;
}

async function getCoords(cityName){
    const geoLocatie = "https://geocoding-api.open-meteo.com/v1/search?language=en&count=1&format=json&name=";
    var coordLink = geoLocatie + cityName
    const data = await superFetch(coordLink)
    //console.log(data);
    //console.log(data.results[0].latitude, data.results[0].longitude);
    var returnPackage = {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        judet: data.results[0].admin1,
        tara: data.results[0].country,
        elevation: data.results[0].elevation,
        nume: data.results[0].nume
    }
    console.log(returnPackage);
    return returnPackage;    
}

async function getWeather (coord){
    const apiUrl = "https://api.open-meteo.com/v1/forecast?current_weather=true&timezone=auto"
var lat = "&latitude=" + coord.latitude
var lng = "&longitude=" + coord.longitude
var weatherLink = apiUrl + lat + lng
const data = await superFetch(weatherLink)
var returnPackage = {
    isDay: data.current_weather.is_day,
    temperature:data.current_weather.temperature,
    time:data.current_weather.time,
    weatherCode:data.current_weather.weathercode,
    windSpeed:data.current_weather.windspeed,
    windDirection:data.current_weather.winddirection
}
console.log(returnPackage);
}

async function testerSync(){
    let coord = await getCoords("Miercurea")
    getWeather(coord);
}
testerSync()
