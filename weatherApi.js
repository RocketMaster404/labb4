const imgToday = document.getElementById("weather-img-today");
const imgTomorrow = document.getElementById("weather-img-tomorrow");
const imgThird = document.getElementById("weather-img-thirdDay");

function getLocation() {
    console.log("getLocation körs");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocation funkar inte");
    }
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log("FÖRE");

    fetchWeatherData(latitude, longitude);

    console.log("EFTER");
    console.log("SUCCESS");
}

function error(err) {
    console.log("Geolocation error:", err);
}

async function fetchWeatherData(lat, lon) {
    console.log("hämta väderData körs , vörden:", lat, lon);

    try {
        const tempToday = document.getElementById("temp-today");
        const tempTomorrow = document.getElementById("temp-tomorrow");
        const tempThird = document.getElementById("temp-third");
        console.log(tempToday, tempTomorrow, tempThird);

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=auto`,
        );

        if (!response.ok) {
            throw new Error("Fel vid hämtning av väderApi");
        }

        const data = await response.json();
        const weatherCodes = data.daily.weathercode;
        console.log(data);

        const todayTemp = data.daily.temperature_2m_max[0];
        const tomorrowTemp = data.daily.temperature_2m_max[1];
        const thirdTemp = data.daily.temperature_2m_max[2];

        console.log("Temperaturer:", todayTemp, tomorrowTemp, thirdTemp);

        tempToday.textContent = todayTemp + " Grader";
        tempTomorrow.textContent = tomorrowTemp + " Grader";
        tempThird.textContent = thirdTemp + " Grader";

        imgToday.src = getWeatherImage(weatherCodes[0]);
        imgTomorrow.src = getWeatherImage(weatherCodes[1]);
        imgThird.src = getWeatherImage(weatherCodes[2]);

        console.log(tempToday);
    } catch (error) {
        console.log("Error:", error);
    }
}

function getWeatherImage(code) {
    if (code === 0) return "images/soligt.png";
    if (code <= 3) return "images/molningt.png";
    if (code <= 67) return "images/regn.png";
    return "images/halvklart-regn.png";
}
getLocation();
