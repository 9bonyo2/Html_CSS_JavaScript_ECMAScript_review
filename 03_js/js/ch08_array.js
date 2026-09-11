/* ===== 8장. 배열과 배열 메서드 ===== */

// 서버가 돌려주는 것과 같은 형태 : "객체가 들어 있는 배열"
const students = [
    { id: 1, name: "홍길동", studentNumber: "20241234", age: 20,
      detail: { address: "서울시 강남구", email: "hong@test.com" } },
    { id: 2, name: "김코딩", studentNumber: "20241235", age: 19,
      detail: { address: "부산시 해운대구", email: null } },
    { id: 3, name: "이자바", studentNumber: "20241236", age: 22,
      detail: null }
];

const studentTableBody = document.getElementById("studentTableBody");

document.getElementById("btnBasic").addEventListener("click", function () {
    out("students.length   →", students.length);
    out("students[0]       →", students[0]);
    out("students[0].name  →", students[0].name);
    out("students[2].detail→", students[2].detail, "  (null 인 경우도 있습니다)");
});

document.getElementById("btnForEach").addEventListener("click", function () {
    out("forEach — 배열의 요소를 하나씩 꺼내 함수에 넘겨줍니다");
    students.forEach(function (student) {
        out("  " + student.name + " (" + student.studentNumber + ")");
    });
    out("");
    out("student 이라는 이름은 우리가 마음대로 정한 것입니다. item 이든 s 든 상관없습니다.");
});

document.getElementById("btnMethods").addEventListener("click", function () {
    // map : 하나씩 변환해 새 배열을 만듦
    const names = students.map((s) => s.name);
    out("map    →", names);

    // filter : 조건에 맞는 것만 골라냄
    const adults = students.filter((s) => s.age >= 20);
    out("filter →", adults.map((s) => s.name));

    // find : 조건에 맞는 첫 번째 하나
    const target = students.find((s) => s.id === 2);
    out("find   →", target);

    // forEach 는 값을 돌려주지 않습니다
    const nothing = students.forEach((s) => s.name);
    out("forEach 의 반환값 →", nothing, "  ← 변환이 목적이면 map 을 쓰세요");
});

/**
 * 학생 배열을 표에 그린다. (실습 3-6 과 같은 구조)
 * @param {Array} list 학생 목록
 * @param {boolean} clearFirst 먼저 비울지 여부
 */
function renderStudentTable(list, clearFirst) {
    if (clearFirst) {
        studentTableBody.innerHTML = "";          // (1) 기존 목록 비우기
    }

    list.forEach((student) => {                   // (2) 배열을 하나씩 순회
        const row = document.createElement("tr");  // (3) 빈 행 만들기

        // (4) 행 내용 채우기 — 주석은 반드시 백틱(`) 바깥에 둡니다
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentNumber}</td>
            <td>${student.detail ? student.detail.address : "-"}</td>
            <td>${student.detail ? student.detail.email || "-" : "-"}</td>
        `;

        studentTableBody.appendChild(row);         // (5) 화면에 붙이기
    });
}

document.getElementById("btnRender").addEventListener("click", function () {
    renderStudentTable(students, true);
    out("표를 그렸습니다. 먼저 비웠으므로 몇 번을 눌러도 3명입니다.");
    out("detail 이 null 인 이자바 학생은 삼항 연산자 덕분에 '-' 로 표시됩니다.");
});

document.getElementById("btnDup").addEventListener("click", function () {
    renderStudentTable(students, false);          // 비우지 않고 추가만
    out("비우지 않고 그렸습니다. 현재 행 개수 :", studentTableBody.children.length);
    out("여러 번 누르면 계속 쌓입니다. 이것이 '목록 중복' 문제의 정체입니다.");
});

document.getElementById("btnClear").addEventListener("click", function () {
    outClear();
    studentTableBody.innerHTML = "";
});
