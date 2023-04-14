var weatherStates ={
    clear: "clear",
    clouds:"clouds",
    drizzle:"drizzle",
    fog:"humidity",
    rain:"rain",
    snow:"snow"
}
var searchBox = document.getElementById("searchBox")
var searchButton = document.getElementById("searchIcon")

function getWState(code){
    if(code==0){
        return weatherStates.clear
    }
    else if(code==1 || code==2 || code==3){
        return weatherStates.clouds
    }
    else if(code==51 || code==53 || code==55 || code==46 || code==57){
        return weatherStates.drizzle
    }
    else if(code==45 || code==48){
        return weatherStates.fog
    }
    else if(code==71 || code==73 || code==75 || code==77 || code==85 || code==86){
        return weatherStates.snow
    }
    else{ 
        return weatherStates.rain
    }
}
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
        nume: data.results[0].name
    }
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
        return returnPackage;
}
async function setPage (coords, weather){
    const temp = document.getElementById("temp")
    const city = document.getElementById("city")
    const windDirection = document.getElementById("windDirection")
    const windSpeed = document.getElementById("windSpeed")
    const weatherIcon = document.getElementById("weather-icon")
    temp.innerText  = Math.round(weather.temperature) + "°C"
    city.innerHTML  = coords.nume + " <br>" + coords.judet + "<br>" + coords.tara 
    weatherIcon.src = "images/" + getWState(weather.weatherCode) + ".png"
    windSpeed.innerText = weather.windSpeed + "km/h"
    windDirection.innerText = weather.windDirection + " deg"
}

async function inputEvent(){
    let coord = await getCoords(searchBox.value)
    let weather = await getWeather(coord);
    setPage(coord, weather)
}
searchBox.onkeyup = inputEvent
searchButton.onclick = inputEvent
