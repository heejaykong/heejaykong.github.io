const clock = document.querySelector('.js-clock');
const usernameText = document.querySelector('.js-greetingsText'),
      usernameForm = document.querySelector('.js-usernameForm'),
      nameInput = usernameForm.querySelector('input');
const LS_KEY_USERNAME = 'username';
const CLASSNAME_SHOWING = 'showing';

function saveUsername(text){
  localStorage.setItem(LS_KEY_USERNAME, text);
}
function askForName(){
  usernameText.classList.remove(CLASSNAME_SHOWING);
  usernameForm.classList.add(CLASSNAME_SHOWING);
  usernameForm.addEventListener('submit', handleUsernameSubmit);
}
function paintUsername(username){
  usernameForm.classList.remove(CLASSNAME_SHOWING);
  usernameText.classList.add(CLASSNAME_SHOWING);
  usernameText.innerText = `Hello, ${username}!`;
}
function paintTime(){
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes();
  const seconds = now.getSeconds();
  clock.innerHTML = `
  ${hours<10? `0${hours}`: hours}
  : ${mins<10? `0${mins}`: mins}
  : ${seconds<10? `0${seconds}`: seconds}`;
}
function handleUsernameSubmit(e){
  e.preventDefault();
  const currentVal = nameInput.value;
  if(currentVal){
    paintUsername(currentVal);
    saveUsername(currentVal);
    nameInput.value = '';
  } else{
    askForName();
  }
}
function loadUsername(){
  const username = localStorage.getItem(LS_KEY_USERNAME);
  if (username){
    paintUsername(username);
  } else {
    askForName();
  }
}
function init(){
  loadUsername();
  setInterval(paintTime, 1000);
}
init();