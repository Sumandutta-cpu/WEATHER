const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    weatherFn('Pune');
});

async function weatherFn(cName) {
    const tempUrl = `${url}?q=${cName}&appid=${apiKey}&units=metric`; // Corrected template literal syntax
    try {
        const res = await fetch(tempUrl);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`); // Corrected template literal syntax
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`); // Corrected template literal syntax
    $('#weather-icon').attr(
        'src',
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` // Added icon URL
    );
    $('#weather-info').fadeIn();
}
