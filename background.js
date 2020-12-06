const IMG_AMOUNT = 9;

function paintImage(num){
  const image = new Image();
  image.src = `bgImages/${num}.jpg`;
  image.addEventListener('load', function(){
    document.body.appendChild(image);
    image.classList.add("bgImage");
  });
}
function generateRandomNum(){
  return Math.floor(Math.random() * IMG_AMOUNT + 1);
}
function init(){
  const num = generateRandomNum();
  paintImage(num);
}
init();