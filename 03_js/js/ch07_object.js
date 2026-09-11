/* ===== 7장. 객체 ===== */

document.getElementById("btnFlat").addEventListener("click", function () {
    // 실습 3-5 까지 쓰던 평평한 구조
    const studentData = {
        name: "홍길동",
        studentNumber: "20241234",
        address: "서울시 강남구",
        phoneNumber: "010-1234-5678"
    };

    out("평평한 구조 :", studentData);
    out("");
    out("studentData.address  →", studentData.address);
    out("점 표기법으로 한 번에 접근합니다.");
});

document.getElementById("btnNested").addEventListener("click", function () {
    // 실습 3-7 부터 쓰는 중첩 구조 (서버 DTO 에 맞춘 형태)
    const studentData = {
        name: "홍길동",
        studentNumber: "20241234",
        detailRequest: {
            address: "서울시 강남구",
            phoneNumber: "010-1234-5678",
            email: "hong@test.com",
            dateOfBirth: "2000-01-01"
        }
    };

    out("중첩 구조 :", studentData);
    out("");
    out("studentData.detailRequest.address →", studentData.detailRequest.address);
    out("studentData.address               →", studentData.address);
    out("");
    out("두 번째가 undefined 인 이유 : address 는 detailRequest 안에 있습니다.");
    out("이것이 실습 3-7 에서 validateStudent 도 함께 고쳐야 하는 이유입니다.");
});

document.getElementById("btnError").addEventListener("click", function () {
    const student = { name: "홍길동" };     // detail 이 없는 학생

    out("student        :", student);
    out("student.detail →", student.detail, "  (undefined — 여기까진 괜찮습니다)");
    out("");

    try {
        out(student.detail.address);        // undefined 에 점을 찍으면 오류
    } catch (error) {
        out("오류 발생 →", error.name + ": " + error.message);
    }

    out("");
    out("그래서 실습 3-6 의 표 그리기 코드가 이렇게 방어합니다 :");
    out("  삼항 연산자 →", student.detail ? student.detail.address : "-");
    out("  최신 문법   →", student.detail?.address ?? "-");
});

document.getElementById("btnJson").addEventListener("click", function () {
    const studentData = {
        name: "홍길동",
        studentNumber: "20241234",
        detailRequest: { address: "서울시 강남구" }
    };

    // 보낼 때 : 객체 → 문자열
    const text = JSON.stringify(studentData);
    out("JSON.stringify 결과 (문자열) :");
    out("  " + text);
    out("  typeof →", typeof text);
    out("");

    // 받을 때 : 문자열 → 객체
    const back = JSON.parse(text);
    out("JSON.parse 결과 (객체) :", back);
    out("  typeof →", typeof back);
    out("");
    out("stringify 와 json() 은 한 쌍입니다. 보낼 때 stringify, 받을 때 json().");
});

document.getElementById("btnClear").addEventListener("click", outClear);
