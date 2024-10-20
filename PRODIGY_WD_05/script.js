let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let precipitation = document.getElementById('precipitation');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let dayTime = document.getElementById('day-time');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){
        searchWeather();
    }
});

// Function to format date and day
const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;

                // Get the weather condition
                const weatherCondition = data.weather[0].main.toLowerCase();

                // Select the appropriate icon based on weather condition
                let weatherIconUrl = '';

                switch (weatherCondition) {
                    case 'clear':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/01d@4x.png'; // Clear sky
                        break;
                    case 'clouds':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/02d@4x.png'; // Few clouds
                        break;
                    case 'rain':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/10d@4x.png'; // Rain
                        break;
                    case 'snow':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/13d@4x.png'; // Snow
                        break;
                    case 'thunderstorm':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/11d@4x.png'; // Thunderstorm
                        break;
                    case 'drizzle':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/09d@4x.png'; // Drizzle
                        break;
                    case 'mist':
                    case 'smoke':
                    case 'haze':
                    case 'fog':
                        weatherIconUrl = 'https://openweathermap.org/img/wn/50d@4x.png'; // Mist/Fog
                        break;
                    default:
                        weatherIconUrl = 'https://openweathermap.org/img/wn/01d@4x.png'; // Default clear icon
                        break;
                }

                temperature.querySelector('img').src = weatherIconUrl; // Set the weather icon
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                precipitation.innerText = `Precipitation: ${data.rain ? data.rain['1h'] : 0} mm`;
                humidity.innerText = `Humidity: ${data.main.humidity}%`;
                wind.innerText = `Wind Speed: ${data.wind.speed} m/s`;

                // Display the current day and date
                dayTime.innerText = formatDate(data.dt);
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        });
}

const initApp = () => {
    valueSearch.value = 'Nashik';  
    searchWeather();
}
initApp();
