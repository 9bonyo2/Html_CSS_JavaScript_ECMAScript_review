/* ===== 12장. 오류 메시지 읽는 법 ===== */

/**
 * 함수를 실행해 보고, 오류가 나면 종류와 메시지를 화면에 보여준다.
 * @param {string} label 무엇을 시도했는지
 * @param {Function} fn 실행할 함수
 * @param {string} hint 해결 힌트
 */
function tryIt(label, fn, hint) {
    out("시도 :", label);
    try {
        fn();
        out("  (오류 없이 실행되었습니다)");
    } catch (error) {
        console.error(error);          // Console 탭에서 원본과 줄 번호를 볼 수 있습니다
        out("  종류    :", error.name);
        out("  메시지  :", error.message);
        out("  해결    :", hint);
    }
    out("");
}

document.getElementById("e1").addEventListener("click", function () {
    tryIt(
        "만들지 않은 변수를 사용",
        function () { return notDefinedVariable; },
        "변수·함수 이름의 철자와 대소문자를 확인하세요. 정의 순서도 봅니다."
    );
});

document.getElementById("e2").addEventListener("click", function () {
    tryIt(
        "getElementById 가 못 찾은 요소에 addEventListener",
        function () {
            const el = document.getElementById("존재하지않는id");
            el.addEventListener("click", function () {});
        },
        "HTML 의 id 철자와 대소문자를 확인하세요. script 위치도 봅니다."
    );
});

document.getElementById("e3").addEventListener("click", function () {
    tryIt(
        "undefined 에 점 찍기 (중첩 구조 불일치)",
        function () {
            const student = { name: "홍길동" };
            return student.detailRequest.address;
        },
        "student.detailRequest 가 undefined 입니다. 보내는 JSON 구조를 확인하세요."
    );
});

document.getElementById("e4").addEventListener("click", function () {
    tryIt(
        "함수가 아닌 값에 괄호 붙이기",
        function () {
            const students = { name: "홍길동" };   // 배열이 아니라 객체
            students.forEach(function () {});
        },
        "실제로 무엇이 왔는지 console.log 로 확인하세요. 배열이 아닐 수 있습니다."
    );
});

document.getElementById("e5").addEventListener("click", function () {
    tryIt(
        "const 로 만든 변수에 재할당",
        function () { eval("const fixed = 1; fixed = 2;"); },
        "값이 바뀌어야 하는 변수라면 let 으로 선언하세요."
    );
});

document.getElementById("e6").addEventListener("click", function () {
    tryIt(
        "괄호 짝이 맞지 않는 코드",
        function () { eval("function broken( { return 1; }"); },
        "오류 메시지에 적힌 줄 번호 주변의 괄호와 따옴표 짝을 확인하세요."
    );
});

document.getElementById("btnClear").addEventListener("click", outClear);

out("각 버튼을 눌러 오류를 직접 발생시켜 보세요.");
out("F12 → Console 을 함께 열어두면 파일명과 줄 번호까지 볼 수 있습니다.");
out("");
