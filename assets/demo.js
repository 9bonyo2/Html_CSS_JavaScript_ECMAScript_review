/* ===========================================================
   예제 공용 헬퍼
   -----------------------------------------------------------
   out(...) 을 부르면 콘솔과 화면의 #output 영역에 함께 찍힙니다.
   개발자 도구를 열지 않아도 결과를 볼 수 있게 하기 위한 것이며,
   수업 내용은 아닙니다.
   =========================================================== */

/**
 * 값을 화면과 콘솔에 함께 출력한다.
 * @param {...*} args 출력할 값들 (문자열, 숫자, 객체 무엇이든)
 */
function out() {
    var args = Array.prototype.slice.call(arguments);

    // 콘솔에는 원래 값 그대로 (객체를 펼쳐볼 수 있도록)
    console.log.apply(console, args);

    // 화면에는 읽기 좋은 문자열로 변환해서
    var text = args.map(function (v) {
        if (typeof v === "string") return v;
        if (v === undefined) return "undefined";
        if (v === null) return "null";
        try {
            return JSON.stringify(v, null, 2);
        } catch (e) {
            return String(v);
        }
    }).join(" ");

    var box = document.getElementById("output");
    if (box) {
        box.textContent += text + "\n";
    }
}

/** 화면 출력 영역을 비운다. */
function outClear() {
    var box = document.getElementById("output");
    if (box) box.textContent = "";
}
