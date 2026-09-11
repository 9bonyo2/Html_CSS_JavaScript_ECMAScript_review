/* ===== 2장. 변수 — const 와 let ===== */

// const : 재할당 불가. 대부분의 값은 이것으로 충분합니다.
const API_BASE_URL = "http://localhost:8080";

// let : 값이 바뀌어야 하는 경우에만 사용합니다.
let editingStudentId = null;

out("API_BASE_URL =", API_BASE_URL);
out("editingStudentId =", editingStudentId);

// let 은 다시 넣을 수 있습니다 — 실습 3-9 의 모드 전환이 이 방식입니다.
editingStudentId = 7;
out("수정 모드로 전환 후 editingStudentId =", editingStudentId);
out("");

document.getElementById("btnReassign").addEventListener("click", function () {
    try {
        // eval 을 쓴 이유 : 이 파일 전체가 문법 오류로 멈추지 않게 하기 위함입니다.
        // 실제 코드에서는 이렇게 쓰지 마세요.
        eval("const fixed = 1; fixed = 2;");
    } catch (error) {
        out("오류 발생 →", error.name + ": " + error.message);
        out("const 로 만든 변수에는 새 값을 넣을 수 없습니다. let 으로 바꾸세요.");
    }
});

document.getElementById("btnMutate").addEventListener("click", function () {
    const student = { name: "홍길동" };
    out("변경 전 :", student);

    student.name = "김코딩";      // 속성 변경은 허용됩니다
    student.age = 20;             // 속성 추가도 허용됩니다

    out("변경 후 :", student);
    out("const 는 \"이름이 가리키는 대상을 바꾸지 마라\"는 뜻입니다.");
    out("그 대상의 내용을 바꾸지 말라는 뜻이 아닙니다.");
});

document.getElementById("btnClear").addEventListener("click", outClear);
