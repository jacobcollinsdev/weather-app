const api = {
    key:"50cded2caa921633e9f136755a3519b6",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener('keypress', setQuery);

function setQuery(e){
    if (e.keyCode == 13){
        getResults(searchBox.value);
    } 
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`).then(weather => {
        return weather.json(); //HTTP response
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${weather.main.temp.toFixed(1)}<span>&deg;c</span>`;

    let description = document.querySelector('.weather');
    description.innerText = `${weather.weather[0].main}`;

    let minMax = document.querySelector('.hi-low');
    minMax.innerText = `${weather.main.temp_min.toFixed(1)}°c / ${weather.main.temp_max.toFixed(1)}°c`

}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}