const canvas = document.getElementById("jsCanvas");
// canvas�� html5�� �� ���� ���� �ɷ��� ���� �� ����̴� �� �ɷµ��� �ȼ����� �ٷ��.
const ctx = canvas.getContext("2d");
//canvas�� context�� �ȼ����� ��Ʈ�� �ϴ� ���̴�. ���� ���ؽ�Ʈ�� ������ ���⿡�� 2d�� �ٷ��
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
//context�� �� ���� �� context�ȿ� �ִ� ��� ������ �� ������ ���´�.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//���� ����

// ctx.fillStyle = "green";
// ctx.fillRect(50,20,100,49);
// width�� height�� ���ؼ� ������ ������� (x,y) ��ġ�� ��ĥ�� �簢���� �׸� (x,y,width,height)
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
        // ���ο� ��θ� ����� ��ΰ� �����ƴٸ�, ���� �׸��� ��ɵѿ� ��θ� �����ϰ� ����µ� ����Ѵ�.
        ctx.moveTo(x,y);
        // ���� x�� y�� ������ ��ǥ�� �ű��.
    } else{
        ctx.lineTo(x , y);
        //lineTo�� path�� ���� ��ġ���� ���� ��ġ���� ���� ����� �ִ� ���̴�. ���� �� ���� x,y��ǥ 6,6���� 7,7���� ���콺�� ��ġ�ؼ� Ŭ���� �ϸ� path���� 7,7���� ���� ��������� (�� stroke��� �� �ִ� ��).
        ctx.stroke();
        // �������� �̿��Ͽ� ���� �׸���. 
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
    //HTML.CanvasURLElement.toDataURL() �޼ҵ�� (�⺻������ PNG�� ������) type paramter�� ���� ������ ������ �̹��� ǥ���� ������ data URL�� ���c��
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[?]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove)
    //Ŭ������ �ʰ� ���콺�� �������� ������ path�� �����Ѵ�(path�� ��) path�� ����� ���콺�� x y ��ǥ�� path�� �ű�� ���̴� 
    //��, ���� ���콺�� �����̴� ��� ������ path�� ����� ���̴�. path�� �������� ���콺�� �ִ� ���̴�.
    canvas.addEventListener("mousedown",startPainting)
    //���콺�� ������ ������ painting�� true�� �ٲ��ش�
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handlCanvasClick)
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
//Array.from�̶� ���� �迭 ��ü�� �ݺ� ������ ��ü�� ������ �����ϰ� ���ο� Array�� ��ü�� �����.
//forEach�� �־��� �Լ��� �迭 ��� ������ ���� ������ �Ѵ�.

if(range){
    range.addEventListener("input", handlRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}