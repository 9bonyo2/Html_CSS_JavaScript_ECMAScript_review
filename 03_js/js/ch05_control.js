/* ===== 5장. 조건문과 반복문 ===== */

// 실습 3-9 와 같은 "상태" 변수
let editingStudentId = null;

document.getElementById("btnMode").addEventListener("click", function () {
    // 버튼을 누를 때마다 등록 모드 <-> 수정 모드를 오갑니다.
    editingStudentId = editingStudentId ? null : 7;

    out("editingStudentId =", editingStudentId);
    if (editingStudentId) {
        out("  → 수정 모드 : updateStudent(" + editingStudentId + ", data) 호출");
        out("  → 버튼 문구를 '학생 수정' 으로 바꾸고 취소 버튼을 보여줍니다.");
    } else {
        out("  → 등록 모드 : createStudent(data) 호출");
        out("  → 버튼 문구는 '학생 등록', 취소 버튼은 숨깁니다.");
    }
    out("");
});

/**
 * 학생 데이터가 유효한지 검사한다. (실습 3-5 와 같은 구조)
 * @param {Object} student 검사할 학생 데이터
 * @returns {boolean} 통과하면 true
 */
function validateStudent(student) {
    if (!student.name) {
        out("  검증 실패 : 이름을 입력해주세요.");
        return false;                 // early return
    }
    if (!student.studentNumber) {
        out("  검증 실패 : 학번을 입력해주세요.");
        return false;
    }
    if (!student.detailRequest.address) {
        out("  검증 실패 : 주소를 입력해주세요.");
        return false;
    }
    return true;
}

document.getElementById("btnValidate").addEventListener("click", function () {
    const cases = [
        { name: "", studentNumber: "20241234", detailRequest: { address: "서울" } },
        { name: "홍길동", studentNumber: "", detailRequest: { address: "서울" } },
        { name: "홍길동", studentNumber: "20241234", detailRequest: { address: "" } },
        { name: "홍길동", studentNumber: "20241234", detailRequest: { address: "서울" } }
    ];

    cases.forEach(function (data, i) {
        out((i + 1) + "번 데이터 :", JSON.stringify(data));
        out("  결과 →", validateStudent(data) ? "통과" : "탈락");
        out("");
    });
});

document.getElementById("btnLoop").addEventListener("click", function () {
    const students = ["홍길동", "김코딩", "이자바"];

    out("① forEach — 배열을 순회할 때 가장 많이 씁니다");
    students.forEach(function (name) {
        out("   " + name);
    });

    out("");
    out("② for...of — 중간에 break 로 멈춰야 할 때");
    for (const name of students) {
        out("   " + name);
        if (name === "김코딩") {
            out("   (여기서 break)");
            break;
        }
    }

    out("");
    out("③ 전통적인 for — 인덱스가 필요할 때");
    for (let i = 0; i < students.length; i++) {
        out("   " + i + " : " + students[i]);
    }
});

document.getElementById("btnClear").addEventListener("click", outClear);
