const apiKey = '6d1a0852ed73461b1eecfb0fde8f0798';
const textInput = document.getElementById('cityInput');
const apiUrlWeather = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0b9a0b33b39412b42e3b8ed579478735';

const savedCity = localStorage.getItem('userCity');
if (savedCity) {
  textInput.value = savedCity;
}



// Add an event listener to the form for when the user submits
document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const city = textInput.value;

    localStorage.setItem('userCity', city);

    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrlForecast)
        .then((response) => response.json())
        .then((forecastData) => {
            const card = document.getElementById('weatherData');
            card.querySelector('.card-content').innerHTML = '';

            const uniqueDays = new Set();
            for (let i = 0; i < forecastData.list.length && uniqueDays.size < 5; i++) {
                const forecast = forecastData.list[i];
                const date = new Date(forecast.dt * 1000);
                const day = date.getDate();

                if (!uniqueDays.has(day)) {
                    uniqueDays.add(day);
                    
                    const temperature = (forecast.main.temp - 273.15).toFixed(0);
                    const description = forecast.weather[0].description;
                    const iconUrl = weatherIcons[description.toLowerCase()];
                    const humidity = forecast.main.humidity;

                    const cardContent = document.createElement('div');
                    cardContent.classList.add('forecast-card'); // Add the 'forecast-card' class
                    cardContent.innerHTML = `
                        <p>${date.toLocaleDateString()}</p>
                        <p>${temperature}°C</p>
                        <img src="${iconUrl}" alt="${description}" />
                        <p>${description}</p>
                        <p>Humidity: ${humidity}%</p>
                    `;

                    // Append the card content to the card element
                    card.querySelector('.card-content').appendChild(cardContent);
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching 5-day forecast data:', error);
        });
});

