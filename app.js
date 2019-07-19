const form = document.getElementById("form");
const search = document.getElementById("search");

const api = "https://api.openweathermap.org/data/2.5/weather?q=";
const api_key = "&units=metric&appid=7b1dc3984cda7b97825cbfe8885b3a24";

//Show Stange Name
const currentCity = document.querySelector(".city > h3");

//Show Date
const currentDate = document.querySelector(".date > p");
let makeDate = `${getDate().day} ${getDate().dateNum} ${getDate().month} ${
  getDate().hour
}:${getDate().min}`;
currentDate.innerText = makeDate;

//Show Stange temp
const mainCityTemp = document.querySelector(".temp-num");

//Show Stange icon
const mainCityIcon = document.querySelector(".temp-icon > i");
mainCityIcon.className = "";

//Show Stange description
const mainCityDesc = document.querySelector(".temp-desc");

//Show Stange Humidity
const humidityNum = document.querySelector(".humidity-num > h4");

//Show Stange Wind
const windNum = document.querySelector(".wind-num > h4");

//Loading Sign
const loading = document.getElementById('loading');



//submit event handler
form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value;
  searchTemp(searchTerm);
  
  form.reset();
});

function searchTemp(city) {
  const full_api = `${api}${city}${api_key}`;
  loading.style.display = 'block';
  return fetch(full_api)
    .then(res => res.json())
    .then(data => {
      const { main, weather, wind } = data;

      return data;
    })
}



function changeDOM(main, city, weather, wind) {
  searchTemp(city).then(result => {
    console.log(result)
});

  const mainCityName = document.querySelector(".city > h3");
  mainCityName.innerText = city.charAt(0).toUpperCase() + city.slice(1);

  mainCityTemp.innerText = `${Math.round(main.temp)}°`;

  mainCityIcon.className = "far fa-sun";
  mainCityDesc.innerHTML = weather[0].description;

  humidityNum.innerText = `${main.humidity}%`;
  windNum.innerText = `${wind.speed}`;
  loading.style.display = 'none';
}


function changeCityDOM(city,temp) {
  let cityTemp = "";

  if(temp == "temp1"){
    cityTemp = "city1-temp"
  }else if(temp == "temp2"){
    cityTemp = "city2-temp"
  }else if(temp == "temp3"){
    cityTemp = "city3-temp"
  }else{
    cityTemp = "";
  }

  searchTemp(city).then(result => {
      const citiesTemp = document.querySelector(`.${cityTemp} > h4`);
      citiesTemp.innerHTML = `${Math.round(result.main.temp)}°`
  });
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
