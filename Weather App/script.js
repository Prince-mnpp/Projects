const apiKey = "d82306b48e877d88a4f17b4896177aee";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch (apiURL + city + `&appid=${apiKey}`);

    if (response.status == 400) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").innerHTML = "Please enter a valid city name.";
        return;
    }

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/hr";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "mist.png";
    } else {
        weatherIcon.src = "";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}


searchBtn.addEventListener("click" , () => {
    checkWeather(searchBox.value);
})





