const API = '971e7b4780610fbcc2ab99d64cf92945';
// url = https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=971e7b4780610fbcc2ab99d64cf92945&units=metric
const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temperature');
const cityName = document.querySelector('.City');
const humidity = document.querySelector('.js-humidity');
const windSpeed = document.querySelector('.js-windSpeed');
const loader = document.querySelector('.loader');


async function checkWeather(city) {
    
    loader.style.display = 'block';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
    const result = await response.json();
    loader.style.display = 'none';
    try{
        weatherImage(result);
        weatherDetail(result);
    }catch(error){
        if(result.message === 'city not found'){
            alert('City Not Found Please provide Correct city name');
        }else{
            alert('something went wrong');
        }   
    }

}

function weatherDetail(result){
    temp.innerHTML = `${Math.round(result.main.temp)}°C`;
    cityName.innerHTML = result.name;
    humidity.innerHTML = `${result.main.humidity}%`;
    windSpeed.innerHTML = `${result.wind.speed}Kmph`;
}

function weatherImage(result){
    if(result.weather[0].main == 'Mist'){
        weatherIcon.src = 'icons and images/mist.png';
    }else if(result.weather[0].main == 'Clear'){
        weatherIcon.src = 'icons and images/clear.png';
    }else if(result.weather[0].main == 'Clouds'){
        weatherIcon.src = 'icons and images/clouds.png';
    }else if(result.weather[0].main == 'Rain'){
        weatherIcon.src = 'icons and images/rain.png';
    }else if(result.weather[0].main == 'Snow'){
        weatherIcon.src = 'icons and images/snow.png';
    }else if(result.weather[0].main == 'Drizzle'){
        weatherIcon.src = 'icons and images/drizzle.png';
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(input.value);
    input.value = '';
})

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && input.value != ''){
      checkWeather(input.value);
      input.value = '';
    }
});



window.onload =() =>{
    const defaultCity = 'Delhi';
    checkWeather(defaultCity);
}
