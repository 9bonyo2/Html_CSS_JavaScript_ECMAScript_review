/* ===== 1장. JavaScript 붙이기와 콘솔 ===== */

// 이 파일은 외부 JS 파일입니다. HTML 에는 script 태그 한 줄만 있습니다.
out("① 외부 JS 파일이 실행되었습니다.");
out("② 이 줄은 페이지가 열리는 즉시 실행됩니다.");
out("");

// 실습에 쓸 예시 데이터
var students = [
    { id: 1, name: "홍길동", studentNumber: "20241234" },
    { id: 2, name: "김코딩", studentNumber: "20241235" }
];

document.getElementById("btnLog").addEventListener("click", function () {
    out("console.log — 문자열과 객체를 함께 찍을 수 있습니다.");
    out(students[0]);
});

document.getElementById("btnError").addEventListener("click", function () {
    // console.error 는 Console 탭에서 빨간색으로 표시됩니다.
    console.error("Error: 이렇게 빨갛게 표시됩니다. (Console 탭 확인)");
    out("console.error 를 호출했습니다. F12 → Console 을 보세요.");
});

document.getElementById("btnTable").addEventListener("click", function () {
    // console.table 은 배열을 표로 그려 줍니다. 목록 확인에 아주 편리합니다.
    console.table(students);
    out("console.table 을 호출했습니다. F12 → Console 에서 표를 확인하세요.");
});

document.getElementById("btnClear").addEventListener("click", outClear);
