const API_KEY = "dd21757731957d28d7f33108f8801dd5";
const weatherBox = document.querySelector(".js-weatherBox");
const weatherText = document.querySelector(".js-weatherText");
const COORDS = 'coords';
function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    console.log(json);
    const temp = json.main.temp;
    const weather = json.weather[0].main;
    const place  = json.name;
    const iconId = json.weather[0].icon;
    const icon = new Image();
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    icon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    icon.classList.add("weatherIcon");
    p1.innerHTML = `${temp}℃`;
    p2.innerHTML = weather;
    p3.innerHTML = place;
    weatherText.appendChild(p1);
    weatherText.appendChild(p2);
    weatherText.appendChild(p3);
    weatherBox.appendChild(icon);
  });
}
function savePosition(obj){
  localStorage.setItem(COORDS, JSON.stringify(obj));
}
function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const geoObj = {
    latitude,
    longitude
  };
  savePosition(geoObj);
  getWeather(latitude, longitude);
}
function handleGeoError(){
  console.log("cannot get current position");
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords(){
  const currentCoords = localStorage.getItem(COORDS);
  if (!currentCoords){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init(){
  loadCoords()
}
init();