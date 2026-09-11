/* ===== 6장. 함수와 화살표 함수 ===== */

// function 으로 선언한 함수는 파일 전체에서 미리 인식됩니다(호이스팅).
// 그래서 아래에서 정의한 함수를 위에서 불러도 동작합니다.
out("greet 호출 결과 :", greet("홍길동"));
out("");

/**
 * 인사말을 만들어 돌려준다.
 * @param {string} name 이름
 * @returns {string} 인사말
 */
function greet(name) {
    return name + "님, 안녕하세요.";
}

document.getElementById("btnSame").addEventListener("click", function () {
    // 아래 셋은 완전히 같은 함수입니다.
    const a = function (n) { return n * 2; };   // ① 전통적인 표기
    const b = (n) => { return n * 2; };          // ② 화살표 함수
    const c = (n) => n * 2;                      // ③ 중괄호와 return 생략
    const dd = n => n * 2;                       // ④ 매개변수 괄호까지 생략

    out("① function  →", a(21));
    out("② 화살표     →", b(21));
    out("③ 생략형     →", c(21));
    out("④ 괄호 생략  →", dd(21));
    out("");
    out("네 결과가 모두 같습니다. 표기만 다를 뿐 같은 함수입니다.");
});

document.getElementById("btnReturn").addEventListener("click", function () {
    const good = (n) => { return n * 2; };   // 중괄호 + return
    const bad = (n) => { n * 2; };            // 중괄호를 썼는데 return 누락

    out("return 있음 →", good(21));
    out("return 없음 →", bad(21), "  ← undefined 가 돌아옵니다");
    out("");
    out("중괄호를 쓰면 return 을 반드시 직접 써야 합니다.");
});

document.getElementById("btnCallback").addEventListener("click", function () {
    /**
     * 다른 함수를 넘겨받아 나중에 실행한다.
     * @param {Function} callback 나중에 실행할 함수
     */
    function doLater(callback) {
        out("  (준비 중...)");
        callback("완료!");            // 여기서 넘겨받은 함수를 실행
    }

    out("콜백 함수 — 다른 함수에 '나중에 할 일'을 맡기는 것");
    doLater((message) => {
        out("  콜백 실행 :", message);
    });
    out("");
    out("fetch 의 .then((response) => { ... }) 이 바로 이 구조입니다.");
    out("지금 실행하는 것이 아니라 '다 되면 이걸 해 줘' 하고 맡겨두는 것입니다.");
});

document.getElementById("btnParen").addEventListener("click", function () {
    out("실수 재현 : addEventListener 에 괄호를 붙이면?");
    out("");

    function sayHi() {
        out("  ← sayHi 가 실행되었습니다");
        return "이 반환값이 등록됩니다";
    }

    // 숨겨진 임시 버튼을 만들어 두 방식을 비교합니다.
    const tempButton = document.createElement("button");

    // 잘못된 방식 : 지금 즉시 실행되고, 그 반환값(문자열)이 등록됩니다.
    out("잘못된 방식 — addEventListener('click', sayHi())");
    tempButton.addEventListener("click", sayHi());
    out("  → 클릭하지도 않았는데 위에서 이미 실행되었습니다.");
    out("");

    // 올바른 방식 : 함수 자체를 넘깁니다.
    out("올바른 방식 — addEventListener('click', sayHi)");
    out("  → 지금은 아무 일도 없고, 실제로 클릭할 때 실행됩니다.");
});

document.getElementById("btnClear").addEventListener("click", outClear);
