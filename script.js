const apiKey = "3f01aeed0fccface73aaf72aab2e0934";

// Get weather by city name
function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city.trim() === "") {
    alert("Please enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeatherData(url);
}

// Get weather using geolocation
function getWeatherByLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetchWeatherData(url);
      },
      error => {
        alert("Unable to get your location. Please allow location access.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Fetch data from API
function fetchWeatherData(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].main;
      const icon = getWeatherIcon(condition);

      document.getElementById("weatherInfo").innerHTML = `
        <div class="weather-icon">${icon}</div>
        <div><strong>Temperature:</strong> ${temp}°C</div>
        <div><strong>Humidity:</strong> ${humidity}%</div>
        <div><strong>Condition:</strong> ${condition}</div>
      `;

      setBackground(condition);
    })
    .catch(error => {
      document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

// Icons based on weather
function getWeatherIcon(condition) {
  switch (condition) {
    case "Clear": return "☀️";
    case "Rain": return "🌧️";
    case "Clouds": return "☁️";
    case "Snow": return "❄️";
    case "Thunderstorm": return "⛈️";
    case "Drizzle": return "🌦️";
    case "Mist": return "🌫️";
    default: return "🌍";
  }
}

// Background change
function setBackground(condition) {
  let bg = "#f0f0f0";

  if (condition === "Clear") bg = "url('sunny.png')";
  else if (condition === "Rain") bg = "url('rainy.png')";
  else if (condition === "Clouds") bg = "url('cloudy.png')";
  else if (condition === "Snow") bg = "url('snow.png')";

  document.body.style.backgroundImage = bg;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
