/* ===== 10장. 이벤트 ===== */

// DOMContentLoaded : HTML 구조가 완성되면 실행하라는 예약 명령
document.addEventListener("DOMContentLoaded", function () {
    out("DOMContentLoaded — HTML 구조가 완성되었습니다.");
    out("실습 3-4 에서 이 안에 loadStudents() 를 넣습니다.");
    out("");
});

// --- preventDefault 가 있는 폼 ---
document.getElementById("goodForm").addEventListener("submit", function (e) {
    e.preventDefault();               // 기본 동작(전송 + 새로고침)을 막는다
    out("[goodForm] 폼 제출됨 — 화면이 새로고침되지 않았습니다.");
    out("  입력값 :", this.name.value);
});

// --- preventDefault 가 없는 폼 (일부러) ---
document.getElementById("badForm").addEventListener("submit", function (e) {
    // e.preventDefault();  ← 미니 과제 : 이 줄의 주석을 풀어 보세요
    out("[badForm] 폼 제출됨 — 곧 새로고침되어 이 글자도 사라집니다.");
});

// --- 여러 가지 이벤트 ---
const typeInput = document.getElementById("typeInput");

// input : 글자를 칠 때마다
typeInput.addEventListener("input", function () {
    out("input  — 현재 값 : " + this.value);
});

// change : 값이 바뀌고 포커스가 떠날 때
typeInput.addEventListener("change", function () {
    out("change — 최종 값 : " + this.value + "  (포커스가 떠날 때 한 번만)");
});

document.getElementById("selectDemo").addEventListener("change", function () {
    out("select change — 고른 값 : " + (this.value || "(없음)"));
});

// 괄호를 붙이지 않는다는 점에 주의하세요.
document.getElementById("clickDemo").addEventListener("click", handleClick);

/** 클릭 이벤트 처리 함수 */
function handleClick(e) {
    out("click  — 버튼을 눌렀습니다.");
    out("  e.target.tagName :", e.target.tagName);
}
