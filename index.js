//API
const api = "https://api.openweathermap.org/data/2.5/weather?q=";
const api_key = "&units=metric&appid=7b1dc3984cda7b97825cbfe8885b3a24";

const form = document.getElementById("form");
const search = document.getElementById("search");

/** Searched city on view*/
const currentCity = document.querySelector(".city > h3");
const currentDate = document.querySelector(".date > p");
let makeDate = `${getDate().day} ${getDate().dateNum} ${getDate().month} ${
  getDate().hour
}:${getDate().min}`;
currentDate.innerText = makeDate;
const mainCityTemp = document.querySelector(".temp-num");
const mainCityIcon = document.querySelector(".temp-icon > i");
mainCityIcon.className = "";
const mainCityDesc = document.querySelector(".temp-desc");
const humidityNum = document.querySelector(".humidity-num > h4");
const windNum = document.querySelector(".wind-num > h4");

/** Loading */
const loading = document.getElementById('loading');


//submit event handler
form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = search.value;
    searchTemp(searchTerm).then(changeMainDOM);
    form.reset();
});


function searchTemp(city) {
    const full_api = `${api}${city}${api_key}`;
    // loading.style.display = 'block';
    return fetch(full_api)
        .then(res => res.json())
        .then(data => {
            const {
                main,
                weather,
                wind
            } = data;
            return {
                main,
                weather,
                wind,
                city
            };
        }).catch((err) => {
            console.error("Error:", err);
            loading.innerHTML = `Cant find ${city}`
            }
        )
}


function changeMainDOM(data) {
    currentCity.innerText = data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
    mainCityTemp.innerText = `${Math.round(data.main.temp)}°`;

    mainCityIcon.className = "far fa-sun";
    mainCityDesc.innerHTML = data.weather[0].description;

    humidityNum.innerText = `${data.main.humidity}%`;
    windNum.innerText = `${data.wind.speed}`;
    loading.style.display = 'none';
}

/** Cities Under the main temprature view*/

changeCitiesDOM('oslo');
changeCitiesDOM('hamar');
changeCitiesDOM('tangen');

function getCitiesTemp(city) {
    return searchTemp(city).then((data) => {
        return data
    })
}

function changeCitiesDOM(city){
    let num = returnCityPos(city);
    let firstCity = document.querySelector(`.city${num}-temp > h4`);
    getCitiesTemp(city).then((data) => {
        firstCity.innerText = `${Math.round(data.main.temp)}°`;
    })
    
}

function returnCityPos(city){
    let pos = 0;
    if(city === "oslo"){
        pos = 1;
    }else if(city === "hamar"){
        pos = 2;
    }else{
        pos = 3
    }
    return pos;
}

 
function getDate() {
    const date = new Date();

    let day = date.getDay();
    day = dateToString(day);
    const dateNum = date.getDate();
    let month = date.getMonth();
    month = monthToString(month);
    const hour = date.getHours();
    const min = ("0" + date.getMinutes()).slice(-2);

    return {
        day,
        dateNum,
        month,
        hour,
        min
    };
}

function dateToString(day) {
    let weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    return weekday[day];
}

function monthToString(month) {
    let months = new Array(12);
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "Mar";
    months[3] = "Apr";
    months[4] = "May";
    months[5] = "Jun";
    months[6] = "July";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Ocy";
    months[10] = "Nov";
    months[11] = "Des";
    return months[month];
}