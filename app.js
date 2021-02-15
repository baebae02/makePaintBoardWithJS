const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
//html요소 캔버스 사용 context(무엇을 다룰지) 는 2d
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE = 700;
//캔버스의 크기를 선언해줘야 함. 필쑤
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth = 2.5;
//default 색상 값 지정


let painting = false; 
//painting은 마우스가 눌러저있는지 확인하기 위한 불린 변수 값
let filling = false;

function stopPainting(){
    painting = false;
    ctx.strokeStyle=color;
}

function startPainting(){
    painting = true;
    //클릭할 때 painting=true 
}

//클릭하지 않고 마우스 움직일 때
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        //path(선) 시작
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();//얘가 선긋는 애 
    }
}

function onMouseDown(event){
    painting = true;
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    //color는 click이 일어난 타겟의 스타일의 배경 색이야 ! 
    ctx.strokeStyle = color; //default color값 오버라이딩
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size= event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling ===true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jped");
    const link = document.createElement("a");
    link.href=image;
    link.download="PaintJS[Export]";
    link.click();
}

// function handleCM(event){
//     event.defaultedPrevent;
// 우클릭방지}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    //mousemove는 mouse의 움직임 인식
    //canvas속성 중 clientX, clientY는 윈도우 전체의 범위 내에서 마우스 위치 값
    //offsetX, offsetY는 컨버스(body)안에서 마우스 위치 값

    canvas.addEventListener("mousedown",startPainting);
    //mousedown은 mouse가 눌러져있는 상태일 때 즉 클릭
    
    canvas.addEventListener("mouseup",stopPainting);

    canvas.addEventListener("mouseleave",stopPainting);

    canvas.addEventListener("click", handleCanvasClick);

    // canvas.addEventListener("contextmenu", handleCM); 우클릭방지
}
    Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
    );
//Array.from 메소드 : object로부터 array를 만듬
//즉 colors를 불러서 각각의 color로 배열을 만듬. 그리고 각각의 color(foreach)를  돌려서
//addEventListner를 호출하고, 클릭되면 handleColorClick을 실행하게 만듬. 
//여기서 color는 그냥 대명사일 뿐 potato로 해도 문제 없음

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}
