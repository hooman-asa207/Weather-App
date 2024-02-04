let $ = document

const input = $.querySelector('input')
const searchBtn = $.querySelector('.input-box button')
const weatherInfo = $.querySelector('.weather-info')
const cityName = document.querySelector('.city')
const date = document.querySelector('.date')
const temp = document.querySelector('.temp')
const weatherIcon = document.querySelector('.weather-icon')
const hiLow = document.querySelector('.hi-low')
const error = $.querySelector('.error')
const shapes = $.querySelector('.shapes')

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let iconSrc = ['./image/lighting.png', './image/rain.png', './image/snow.png', './image/sun&cloud.png', './image/sun.png', './image/clouds.png']

let newDate = new Date()
let getMonth = newDate.getMonth()
let getDay = newDate.getDay()
let getYear = newDate.getFullYear()
let getDate = newDate.getDate()



searchBtn.addEventListener('click', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${'db3e8d1c2a2e576e19b48736ed15514b'}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            weatherInfo.innerHTML = ''

            if (data.cod === '404' || input.value === '') {
                shapes.style.display = 'none'
                weatherInfo.innerHTML = ''
                weatherInfo.insertAdjacentHTML('afterbegin', `<div class="error">City Not Found</div>`)
                input.value = ''
            } else {
                shapes.style.display = 'block'
                let u = data.weather[0].main === 'Lighting' ? iconSrc[0] : data.weather[0].main === 'Rain' ? iconSrc[1] : data.weather[0].main === 'Snow' ? iconSrc[2] : data.weather[0].main === 'Clear' ? iconSrc[4] : data.weather[0].main === 'Clouds' ? iconSrc[5] : ''


                weatherInfo.innerHTML = ''

                weatherInfo.insertAdjacentHTML('afterbegin', `
            <div class="location">
                            <h1 class="city">${data.sys.country} , ${data.name}</h1>
                            <p class="date">${days[getDay]}   ${getDate}   ${months[getMonth]}   ${getYear}</p>
                        </div>
                        <div class="tempreture">
                            <h1 class="temp">${Math.floor(data.main.temp - 274.15)}<span class="°C">°C</span></h1>
                            <img src="${u}" class="weather-icon">
                            <p class="hi-low">${Math.floor(data.main.temp_min - 274.15)}°C / ${Math.floor(data.main.temp_max - 274.15)}°C</p>
                        </div>
            `)
                input.value = ''
            }
        })
})