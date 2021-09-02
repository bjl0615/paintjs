const canvas = document.getElementById("jsCanvas");
// canvas는 html5의 한 가지 어마어마한 능력을 가진 한 요소이다 그 능력들이 픽셀들을 다룬다.
const ctx = canvas.getContext("2d");
//canvas의 context는 픽셀들을 컨트롤 하는 것이다. 많은 컨텍스트가 있지만 여기에선 2d를 다뤘다
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
//context의 선 색깔 이 context안에 있는 모든 색깔은 이 색깔을 갖는다.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//선의 넓이

// ctx.fillStyle = "green";
// ctx.fillRect(50,20,100,49);
// width와 height에 의해서 결정된 사이즈로 (x,y) 위치에 색칠된 사각형을 그림 (x,y,width,height)
// ctx.fillStyle = "purple";
// ctx.fillRect(80,100,100,49);

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        // 새로운 경로를 만든다 경로가 생성됐다면, 이후 그리기 명령둘운 경로를 구성하고 만드는데 사용한다.
        ctx.moveTo(x,y);
        // 펜을 x와 y로 지정된 좌표로 옮긴다.
    } else{
        ctx.lineTo(x , y);
        //lineTo는 path의 이전 위치에서 지금 위치까지 선을 만들어 주는 것이다. 예를 들어서 내가 x,y좌표 6,6에서 7,7까지 마우스를 위치해서 클릭을 하면 path부터 7,7까지 선이 만들어진다 (단 stroke라는 게 있는 한).
        ctx.stroke();
        // 윤곽선을 이용하여 줄을 그린다. 
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }

function handlRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth =  size;
}

function handleModeClick(){
   if(filling === true){
       filling = false;
       mode.innerText = "Fill";
   } else {
       filling = true;
       mode.innerText = "paint";
   }
}

function handlCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    //HTML.CanvasURLElement.toDataURL() 메소드는 (기본적으로 PNG로 설정된) type paramter에 의해 지정된 포맷의 이미지 표현을 포함한 data URL을 반홤함
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[?]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    //클릭하지 않고 마우스를 움직였을 때에는 path를 시작한다(path는 선) path를 만들면 마우스의 x y 좌표로 path를 옮기는 것이다 
    //즉, 내가 마우스를 움직이는 모든 순간에 path를 만드는 것이다. path의 시작점은 마우스가 있는 곳이다.
    canvas.addEventListener("mousedown",startPainting)
    //마우스를 누르고 있으면 painting을 true로 바꿔준다
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handlCanvasClick)
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
//Array.from이란 유사 배열 객체나 반복 가능한 객체를 나눠서 복사하고 새로운 Array에 객체르 만든다.
//forEach는 주어진 함수를 배열 요소 각각에 대해 설명을 한다.

if(range){
    range.addEventListener("input", handlRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}