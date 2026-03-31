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
    console.log("hämta väderData körs , värden:", lat, lon);

    try {
        const tempElements = [
            document.getElementById("temp-today"),
            document.getElementById("temp-tomorrow"),
            document.getElementById("temp-third"),
        ];

        const imgElements = [imgToday, imgTomorrow, imgThird];

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=auto`,
        );

        if (!response.ok) {
            throw new Error("Fel vid hämtning av väderApi");
        }

        const data = await response.json();
        console.log(data);

        const temps = data.daily.temperature_2m_max;
        const weatherCodes = data.daily.weathercode;

        
        for (let i = 0; i < 3; i++) {
            const temp = temps[i];
            const code = weatherCodes[i];

            tempElements[i].textContent = temp + " Grader";
            imgElements[i].src = getWeatherImage(code);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}



function getWeatherImage(code) {
    if (code === 0) return "images/sun.png";
    if (code <= 3) return "images/cloudy.png";
    if (code <= 67) return "images/rain.png";
    return "images/halfrain.png";
}
getLocation();
