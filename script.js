const apiKey = '6d1a0852ed73461b1eecfb0fde8f0798';
const textInput1 = document.getElementById('cityInput1');
const textInput2 = document.getElementById('cityInput2');
const form = document.getElementById('weatherForm');
const apiUrlWeather = 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0b9a0b33b39412b42e3b8ed579478735';
const apiPicture = 'https://api.unsplash.com/photos/?client_id=l2psSZ7s-EII5eJw3kkWXDvdjUNlWxeNZf9kc1AeAnE';


const savedCity1 = localStorage.getItem('userCity1');
const savedCity2 = localStorage.getItem('userCity2');

if (savedCity1) {
  textInput1.value = savedCity1;
}
if (savedCity2) {
  textInput2.value = savedCity2;
}
const weatherIcons = {
    //thunderstom
    'thunderstorm with light rain': './img/thunderstorm.png',
    'thunderstorm with rain': './img/thunderstorm.png',
    'thunderstorm with heavy rain': './img/thunderstorm.png',
    'light thunderstorm': './img/thunderstorm.png',
    'thunderstorm': './img/thunderstorm.png',
    'heavy thunderstorm': './img/thunderstorm.png',
    'ragged thunderstorm': './img/thunderstorm.png',
    'thunderstorm with light drizzle': './img/thunderstorm.png',
    'thunderstorm with drizzle': './img/thunderstorm.png',
    'thunderstorm with heavy drizzle': './img/thunderstorm.png',
    //drizzle
    'light intensity drizzle': './img/bruime.png',
    'drizzle': './img/bruime.png',
    'heavy intensity drizzle': './img/bruime.png',
    'light intensity drizzle rain': './img/bruime.png',
    'drizzle rain': './img/bruime.png',
    'heavy intensity drizzle rain': './img/bruime.png',
    'shower rain and drizzle': './img/bruime.png',
    'heavy shower rain and drizzle': './img/bruime.png',
    'shower drizzle': './img/bruime.png',
    //rain
    'light rain': './img/rain.png',
    'moderate rain': './img/rain.png',
    'heavy intensity rain': './img/rain.png',
    'very heavy rain': './img/rain.png',
    'extreme rain': './img/rain.png',
    'freezing rain': './img/mist.png',
    'light intensity shower rain': './img/bruime.png',
    'shower rain': './img/img/bruime.png',
    'heavy intensity shower rain': './img/bruime.png',
    'ragged shower rain': './img/bruime.png',
    //snow
    'light snow': './img/snow.png',
    'snow': './img/snow.png',
    'heavy snow': './img/snow.png',
    'sleet': './img/snow.png',
    'shower sleet': './img/snow.png',
    'light rain and snow': './img/snow.png',
    'rain and snow': './img/snow.png',
    'light shower snow': './img/snow.png',
    'shower snow': './img/snow.png',
    'heavy shower snow': './img/snow.png',
    //atmosphere
    'mist': './img/mist.png',
    'smoke': './img/mist.png',
    'haze': './img/mist.png',
    'sand, dust whirls': './img/mist.png',
    'fog': './img/mist.png',
    'sand': './img/mist.png',
    'dust': './img/mist.png',
    'volcanic ash': './img/mist.png',
    'squalls': './img/mist.png',
    'tornado': './img/mist.png',
    //clear
    'clear sky': './img/clear.png',
    //clouds
    'few clouds': './img/few_clouds.png',
    'scattered clouds': './img/cloudy.png',
    'broken clouds': './img/grey_clouds.png',
    'overcast clouds': './img/grey_clouds.png',
};

// Add an event listener to the form for when the user submits
form.addEventListener('submit', async function (e) {
    e.preventDefault(); //Ne pas recharger la page = user experience

    const city1 = textInput1.value;
    const city2 = textInput2.value;

    localStorage.setItem('userCity1', city1);
    localStorage.setItem('userCity2', city2);

    const apiUrlForecast1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city1}&appid=${apiKey}`;
    const apiUrlForecast2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city2}&appid=${apiKey}`;

    try {
        const response1 = await fetch(apiUrlForecast1);
        const forecastData1 = await response1.json();

        const response2 = await fetch(apiUrlForecast2);
        const forecastData2 = await response2.json();

        displayWeather('weatherData1', forecastData1);
        displayWeather('weatherData2', forecastData2);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
});

async function displayWeather(containerId, forecastData) {
    const card = document.getElementById(containerId);
    card.querySelector('.card-content').innerHTML = '';

    const uniqueDays = new Set();
    for (let i = 0; i < forecastData.list.length && uniqueDays.size < 5; i++) {
        const forecast = forecastData.list[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.getDate();

        if (!uniqueDays.has(day)) {
            uniqueDays.add(day);
            const cityName = forecastData.city.name;
            const temperature = (forecast.main.temp - 273.15).toFixed(0);
            const description = forecast.weather[0].description;
            const humidity = forecast.main.humidity;
            const iconUrl = weatherIcons[description.toLowerCase()];
            let response = await fetch (`https://api.unsplash.com/search/photos?client_id=l2psSZ7s-EII5eJw3kkWXDvdjUNlWxeNZf9kc1AeAnE&page=1&query=${cityName}`);
            let tableau = await response.json();
            console.log(tableau);
            let url = tableau.results[0].urls.small;
            const cardContent = document.createElement('div');
            
            cardContent.classList.add('forecast-card');
            cardContent.innerHTML = `
                <img src="${url}" class="imgVille">
                <h2>${cityName} le ${date.toLocaleDateString()}</h2>
                <p>${temperature}°C</p>
                <img src="${iconUrl}" alt="${description}" />
                <p>${description}</p>
                <p>Humidity: ${humidity}%</p>
            `;
            
            card.querySelector('.card-content').appendChild(cardContent);
        }
    }
}