/* ===== 4장. 연산자 ===== */

document.getElementById("btnCompare").addEventListener("click", function () {
    out("1 === '1'          →", 1 === "1");
    out("1 ==  '1'          →", 1 == "1", "  ← 자료형을 맞춰버립니다");
    out("0 === ''           →", 0 === "");
    out("0 ==  ''           →", 0 == "", "  ← 직관에 어긋납니다");
    out("null == undefined  →", null == undefined);
    out("null === undefined →", null === undefined);
    out("");
    out("결론 : 언제나 === 와 !== 를 쓰세요.");
});

document.getElementById("btnTruthy").addEventListener("click", function () {
    // 조건문에서 참/거짓으로 취급되는 값을 직접 확인합니다.
    const values = [false, 0, "", null, undefined, NaN,
                    "0", "false", [], {}, 1, "홍길동"];

    values.forEach(function (v) {
        // 표시용 이름 만들기
        let label;
        if (typeof v === "string") label = '"' + v + '"';
        else if (Array.isArray(v)) label = "[]";
        else if (v !== null && typeof v === "object") label = "{}";
        else label = String(v);

        // 값 앞에 ! 를 두 번 붙이면 불리언으로 바뀝니다.
        out((!!v ? "참   " : "거짓 ") + "  " + label);
    });
    out("");
    out("실습 3-5 의 if (!student.name) 이 이 성질을 씁니다.");
    out("빈 문자열은 거짓이므로 !student.name 이 참이 되어 경고가 뜹니다.");
});

document.getElementById("btnTernary").addEventListener("click", function () {
    const withDetail = { name: "홍길동", detail: { address: "서울시 강남구" } };
    const noDetail = { name: "김코딩" };

    // 삼항 연산자 : 조건 ? 참일때 : 거짓일때
    out("detail 있음 :", withDetail.detail ? withDetail.detail.address : "-");
    out("detail 없음 :", noDetail.detail ? noDetail.detail.address : "-");
    out("");

    // || 기본값 : 왼쪽이 falsy 면 오른쪽을 쓴다
    const errorData = {};
    out("|| 기본값   :", errorData.message || "학생 등록에 실패했습니다.");
    out("빈 문자열   :", "".trim() || null);
    out("");

    // ?. 옵셔널 체이닝 + ?? 널 병합 (최신 문법)
    out("?. 와 ??    :", noDetail?.detail?.address ?? "-");
    out("삼항을 여러 겹 쓰는 것보다 짧습니다.");
});

document.getElementById("btnClear").addEventListener("click", outClear);
