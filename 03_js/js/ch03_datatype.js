/* ===== 3장. 자료형과 템플릿 리터럴 ===== */

const API_BASE_URL = "http://localhost:8080";

// --- 자료형 확인 : typeof 로 종류를 알 수 있습니다 ---
out("typeof '홍길동'  →", typeof "홍길동");
out("typeof 42        →", typeof 42);
out("typeof true      →", typeof true);
out("typeof undefined →", typeof undefined);
out("typeof { }       →", typeof {});
out("");
out("null 과 undefined 의 차이");
out("  null      : 개발자가 일부러 비워 둔 것");
out("  undefined : 아직 아무도 채우지 않은 상태");
out("");

document.getElementById("btnStr").addEventListener("click", function () {
    const name = "  홍길동  ";
    out("원본        :", "[" + name + "]");
    out("trim()      :", "[" + name.trim() + "]");
    out("length      :", name.trim().length);
    out("toUpperCase :", "abc".toUpperCase());
    out("split(',')  :", "a,b,c".split(","));
    out("includes    :", "홍길동".includes("길"));
});

document.getElementById("btnTpl").addEventListener("click", function () {
    const id = 7;

    // 예전 방식 — 따옴표와 + 로 이어 붙임
    const url1 = API_BASE_URL + "/api/students/" + id;

    // 템플릿 리터럴 — 훨씬 읽기 쉬움
    const url2 = `${API_BASE_URL}/api/students/${id}`;

    out("이어 붙이기 :", url1);
    out("템플릿      :", url2);
    out("두 결과가 같은가?", url1 === url2);
    out("");

    // 여러 줄도 그대로 유지됩니다
    const student = { name: "홍길동", studentNumber: "20241234" };
    const row = `
    <td>${student.name}</td>
    <td>${student.studentNumber}</td>`;
    out("여러 줄 템플릿 :", row);
});

document.getElementById("btnTrim").addEventListener("click", function () {
    // 실습 3-5 에서 만나는 오류를 그대로 재현합니다.
    const value = null;              // name 속성이 없는 입력창에서 오는 값
    try {
        out(value.trim());
    } catch (error) {
        out("오류 발생 →", error.name + ": " + error.message);
        out("");
        out("formData.get('address') 가 null 을 돌려주면 .trim() 에서 이 오류가 납니다.");
        out("해당 input 에 name 속성이 있는지 확인하세요.");
    }
});

document.getElementById("btnClear").addEventListener("click", outClear);
