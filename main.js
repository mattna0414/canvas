/*
[JS 요약 설명]
1. window.onload : 웹 브라우저 로딩 완료 상태를 확인합니다
2. canvas[0].getContext("2d") : 캔버스 오브젝트를 얻어옵니다
3. canvas[0].height = div.height(); : 부모 div 크기만큼 영역을 생성합니다
4. canvas.on("mousedown", pcDraw); : 이벤트를 등록합니다
5. 참고 : pc 에서는 마우스로 처리, 모바일에서는 터치로 처리해야합니다
*/

var canvas;
var div;

var ctx;
var drawble = false;

/* [html 최초 로드 및 이벤트 상시 대기 실시] */
$(window).load(function () {
    console.log("");
    console.log("[window onload] : [start]");
    console.log("");

    canvas = $("#canvas");
    div = $("#canvas_container");

    ctx = canvas[0].getContext("2d"); //캔버스 오브젝트 가져온다

    init();
    canvasResize();
});

function init() {
    console.log("");
    console.log("[init] : [start]");
    console.log("");

    $(window).on("resize", canvasResize);

    canvas.on("mousedown", pcDraw);
    canvas.on("mousemove", pcDraw);
    canvas.on("mouseup", pcDraw);
    canvas.on("mouseout", pcDraw);//pc는 마우스로

    canvas.on("touchstart", mobileDraw);
    canvas.on("touchend", mobileDraw);
    canvas.on("touchcancel", mobileDraw);
    canvas.on("touchmove", mobileDraw);//모바일은 터치로

    //버튼 클릭 및 이미지 저장 등록
};

function canvasResize() {
    canvas[0].height = div.height();
    canvas[0].width = div.width();
};//화면 조절


function pcDraw(evt) {
    switch (evt.type) {
        case "mousedown" : {
            BodyScrollDisAble(); //body 스크롤 정지
            drawble = true;
            ctx.beginPath();
            ctx.moveTo(getPcPosition(evt).X, getPcPosition(evt).Y);
        }
            break;

        case "mousemove" : {
            if (drawble) {
                ctx.lineTo(getPcPosition(evt).X, getPcPosition(evt).Y);
                ctx.stroke();
            }
        }
            break;

        case "mouseup" :
        case "mouseout" : {
            BodyScrollDisAble(); //body 스크롤 허용
            drawble = false;
            ctx.closePath();
        }
            break;
    }
};//pc에서 그리기

function getPcPosition(evt) {
    var x = evt.pageX - canvas.offset().left;
    var y = evt.pageY - canvas.offset().top;
    return {X: x, Y: y};
};


function mobileDraw(evt) {
    console.log("");
    console.log("[mobileDraw] : [start]");
    console.log("");

    switch (evt.type) {
        case "touchstart" : {
            BodyScrollDisAble(); //body 스크롤 정지
            drawble = true;
            ctx.beginPath();
            ctx.moveTo(getMobilePosition(evt).X, getMobilePosition(evt).Y);
        }
            break;

        case "touchmove" : {
            if (drawble) {
                // 스크롤 및 이동 이벤트 중지
                evt.preventDefault();
                ctx.lineTo(getMobilePosition(evt).X, getMobilePosition(evt).Y);
                ctx.stroke();
            }
        }
            break;

        case "touchend" :
        case "touchcancel" : {
            BodyScrollDisAble(); //body 스크롤 허용
            drawble = false;
            ctx.closePath();
        }
            break;
    }
};//모바일에서 그리기

function getMobilePosition(evt) {
    var x = evt.originalEvent.changedTouches[0].pageX - canvas.offset().left;
    var y = evt.originalEvent.changedTouches[0].pageY - canvas.offset().top;
    return {X: x, Y: y};
};


function BodyScrollDisAble() {
    document.body.style.overflow = "hidden"; //스크롤 막음
};

function BodyScrollAble() {
    document.body.style.overflow = "auto"; //스크롤 허용
};


function saveUrl() {
    console.log("");
    console.log("[saveUrl] : [start]");
    console.log("");

    console.log("");
    console.log("[saveUrl] : [url] : " + canvas[0].toDataURL()); //데이터베이스에 저장
    console.log("");
};//url 저장 부분



function saveCanvas() {
    // a 태그를 만들어서 다운로드를 만듭니다
    var link = document.createElement("a");

    // base64 데이터 링크
    link.href = canvas[0].toDataURL("image/png"); //로컬 pc 다운로드 이미지

    // 다운로드시 파일명 지정
    link.download = "image.png";

    // body에 추가
    document.body.appendChild(link);
    link.click();

    // 다운로드용 a 태그는 다운로드가 끝나면 삭제
    document.body.removeChild(link);
};//캔버스 지우기 부분


function deleteCanvas() {
    canvasResize();
};//캔버스 새로고침