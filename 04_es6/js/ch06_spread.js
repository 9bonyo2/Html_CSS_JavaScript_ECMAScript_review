/* ===== 6장. 전개 구문과 그 밖의 ES6+ 문법 ===== */

/* -----------------------------------------------------------
   1. 전개 구문(spread) — 배열 펼치기
   ----------------------------------------------------------- */
const a = [1, 2];
const b = [3, 4];

out("합치기        [...a, ...b] =", [...a, ...b]);
out("복사          [...a]       =", [...a]);
out("앞에 끼워넣기 [0, ...a]    =", [0, ...a]);

// 함수 인자로 펼치기
const scores = [88, 92, 75];
out("Math.max(...scores)        =", Math.max(...scores), "  ← Math.max(88, 92, 75) 와 같다");
out("문자열도 펼칠 수 있다      =", [..."abc"]);
out("");


/* -----------------------------------------------------------
   2. 전개 구문 — 객체 합치기와 값 바꾸기
   ----------------------------------------------------------- */
const student = { name: "홍길동", age: 20 };

const copied = { ...student };                    // 값이 같은 새 객체
const updated = { ...student, age: 21 };          // age 만 바꾼 새 객체
const merged = { ...student, email: "a@b.com" };  // 속성을 더하며 합치기

out("원본     :", student, "  ← 원본은 그대로");
out("복사본   :", copied);
out("age 변경 :", updated);
out("속성 추가:", merged);
out("");

// 뒤에 오는 값이 앞의 값을 덮어씁니다. 순서를 바꾸면 결과가 달라집니다.
out("{ ...student, age: 21 } →", { ...student, age: 21 }, "  ← 뒤에 쓴 값이 이긴다");
out("{ age: 21, ...student } →", { age: 21, ...student }, "  ← student 가 덮어쓴다");
out("");

// 기본값 + 사용자 입력 패턴
const defaults = { age: 20, email: null };
const input = { name: "홍길동", email: "a@b.com" };
out("기본값 + 입력 병합 →", { ...defaults, ...input });


/* -----------------------------------------------------------
   3. 얕은 복사 — 전개 구문은 한 겹만 복사합니다
   ----------------------------------------------------------- */
document.getElementById("btnShallow").addEventListener("click", function () {
    outClear();

    const origin = {
        name: "홍길동",
        detailRequest: { address: "서울시" }
    };

    const shallow = { ...origin };
    shallow.name = "김코딩";                       // 한 겹 바깥 — 원본에 영향 없음
    shallow.detailRequest.address = "부산시";      // 안쪽 — 원본까지 바뀐다!

    out("복사본 :", shallow);
    out("원본   :", origin);
    out("");
    out("name 은 바뀌지 않았지만 detailRequest.address 는 원본까지 바뀌었습니다.");
    out("전개 구문은 한 겹만 복사하기 때문입니다(얕은 복사).");
    out("");

    // 안쪽까지 새로 만들려면 안쪽도 함께 펼쳐야 합니다.
    const origin2 = { name: "홍길동", detailRequest: { address: "서울시" } };
    const deep = {
        ...origin2,
        detailRequest: { ...origin2.detailRequest, address: "부산시" }
    };

    out("안쪽까지 펼친 복사본 :", deep);
    out("원본                 :", origin2, "  ← 이번에는 원본이 그대로입니다");
});


/* -----------------------------------------------------------
   4. 나머지 구문(rest) — 남는 것을 모으기
   ----------------------------------------------------------- */
function sum(...numbers) {          // numbers 는 배열이 된다
    return numbers.reduce((acc, n) => acc + n, 0);
}

function logLine(level, ...messages) {
    out("level =", level, "/ messages =", messages);
}

document.getElementById("btnRest").addEventListener("click", function () {
    outClear();

    out("sum(1, 2, 3)       =", sum(1, 2, 3));
    out("sum(1, 2, 3, 4, 5) =", sum(1, 2, 3, 4, 5));
    out("");

    logLine("INFO", "a", "b");
    out("");

    // 구조 분해에서도 씁니다.
    const { name, ...rest } = { name: "홍길동", age: 20, email: "a@b.com" };
    out("{ name, ...rest } → name =", name, "/ rest =", rest);

    const [head, ...tail] = [1, 2, 3];
    out("[head, ...tail]   → head =", head, "/ tail =", tail);
    out("");
    out("같은 점 세 개라도 값을 쓰는 자리면 전개, 받는 자리면 나머지입니다.");
});


/* -----------------------------------------------------------
   5. 기본 매개변수(default parameter)
   ----------------------------------------------------------- */
function greet(name = "손님") {
    return `${name}님 환영합니다`;
}

// 앞 매개변수를 기본값에서 참조할 수 있습니다.
function range(start, end = start + 10) {
    return [start, end];
}

// 객체 매개변수 + 구조 분해 + 기본값 — React 예제에 자주 나오는 형태
function createStudent({ name, age = 20, email = null } = {}) {
    return { name, age, email };
}

// = {} 를 빠뜨리면 인자 없이 부를 때 오류가 납니다.
function createStudentWrong({ name, age = 20 }) {
    return { name, age };
}

document.getElementById("btnDefault").addEventListener("click", function () {
    outClear();

    out("greet()          →", greet());
    out("greet('홍길동')   →", greet("홍길동"));
    out("greet(undefined) →", greet(undefined), "  ← 안 넘긴 것으로 본다");
    out("greet(null)      →", greet(null), "  ← null 은 넘긴 값이므로 그대로 쓰인다");
    out("greet('')        →", greet(""), "  ← 빈 문자열도 넘긴 값이다");
    out("");

    out("range(5)         →", range(5), "  ← end 기본값이 start + 10");
    out("range(5, 7)      →", range(5, 7));
    out("");

    out("createStudent({ name: '홍길동' }) →", createStudent({ name: "홍길동" }));
    out("createStudent()                  →", createStudent(), "  ← = {} 덕분에 오류가 안 난다");
    out("");

    try {
        createStudentWrong();
    } catch (error) {
        out("= {} 를 빠뜨린 함수를 인자 없이 호출 →");
        out("   " + error.name + ": " + error.message);
    }
});


/* -----------------------------------------------------------
   6. 단축 속성명 · 계산된 속성명 · ?. · ??
   ----------------------------------------------------------- */
document.getElementById("btnEtc").addEventListener("click", function () {
    outClear();

    const name = "홍길동";
    const studentNumber = "20241234";

    // 변수 이름과 속성 이름이 같으면 한 번만 씁니다.
    const newStudent = { name, studentNumber };
    out("단축 속성명   :", newStudent);

    // 속성 이름을 변수로 정할 때는 대괄호를 씁니다.
    const key = "email";
    out("계산된 속성명 :", { [key]: "a@b.com" });
    out("");

    const user = { name: "김코딩", age: 0, address: null };

    out("user.phone?.home        =", user.phone?.home, "  ← 오류 대신 undefined");
    out("user.age || 25          =", user.age || 25, "  ← 0 이 falsy 라 밀려난다");
    out("user.age ?? 25          =", user.age ?? 25, "  ← 의도한 0 이 유지된다");
    out("user.address ?? '미입력' =", user.address ?? "미입력");
    out("");

    try {
        out(user.phone.home);
    } catch (error) {
        out("?. 없이 user.phone.home →", error.name + ": " + error.message);
    }
});


document.getElementById("btnClear").addEventListener("click", outClear);
