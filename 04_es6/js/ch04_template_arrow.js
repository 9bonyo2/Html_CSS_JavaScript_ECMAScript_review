/* ===== 4장. 템플릿 리터럴과 화살표 함수 ===== */

/* -----------------------------------------------------------
   1. 템플릿 리터럴 — 백틱 문자열
   ----------------------------------------------------------- */
const port = 8080;
const domain = "mydomain";

// 예전 방식 — 따옴표와 + 로 이어 붙이기
const url = "http://" + domain + ":" + port;
out("문자열 연결   :", url);

// 템플릿 리터럴
const urlAfter = `http://${domain}:${port}`;
out("템플릿 리터럴 :", urlAfter);
out("");

// ${ } 안에는 계산식과 함수 호출도 넣을 수 있습니다.
const student = { name: "홍길동", score: 87 };
const grade = (s) => (s >= 90 ? "A" : s >= 80 ? "B" : "C");

out(`${student.name} 님의 점수는 ${student.score}점, 등급은 ${student.score >= 80 ? "A" : "B"} 입니다.`);
out(`함수 호출도 가능 : ${student.name} → ${grade(student.score)}등급`);
out("");

// 줄바꿈이 쓴 그대로 유지됩니다.
const rows = `<td>${student.name}</td>
<td>${student.score}</td>`;
out("여러 줄 문자열 :");
out(rows);
out("");


/* -----------------------------------------------------------
   2. 화살표 함수 — 축약 단계
   ----------------------------------------------------------- */

// (1) 전통적인 함수 선언
function add(n1, n2) {
    return n1 + n2;
}

// (2) 한 줄이면 중괄호와 return 을 함께 생략
const add2 = (n1, n2) => n1 + n2;

// (3) 괄호로 감싸도 결과는 같다
const add3 = (n1, n2) => (n1 + n2);

// (4) 중괄호를 쓰면 return 을 직접 써야 한다
const add4 = (n1, n2) => {
    let temp = n1 + 10;
    return temp + n2;
};

out("add(10, 20)  =", add(10, 20));
out("add2(10, 20) =", add2(10, 20));
out("add3(10, 20) =", add3(10, 20));
out("add4(10, 20) =", add4(10, 20), "  ← 안에서 10 을 더했으므로 40");
out("");

// 매개변수가 하나면 괄호를 생략할 수 있습니다.
const double = n => n * 2;

// 매개변수가 없으면 빈 괄호가 필요합니다.
const now = () => "지금";

// 객체를 바로 돌려주려면 괄호로 감쌉니다.
const makeOk = () => ({ ok: true });
const makeWrong = () => { ok: true };     // 중괄호를 함수 몸통으로 해석 → undefined

out("double(21)   =", double(21));
out("now()        =", now());
out("makeOk()     =", makeOk());
out("makeWrong()  =", makeWrong(), "  ← 괄호로 감싸지 않으면 undefined");
out("");

// 콜백으로 넘길 때 짧게 쓸 수 있다는 것이 화살표 함수의 진짜 장점입니다.
const scores = [88, 92, 75];
out("map 으로 변환 :", scores.map(s => s + 5));
out("filter 로 선별 :", scores.filter(s => s >= 85));


/* -----------------------------------------------------------
   3. this — function 과 화살표 함수의 근본적인 차이
   ----------------------------------------------------------- */
const timer = {
    name: "타이머",

    startWrong: function () {
        setTimeout(function () {
            // 이 함수는 자기만의 this 를 갖는다 → timer 를 가리키지 않음
            out("function 콜백  : this 는", this === window ? "window (전역 객체)" : this);
            out("               this.name =", JSON.stringify(this.name), " ← timer 의 이름이 아니다");
        }, 100);
    },

    startRight: function () {
        setTimeout(() => {
            // 화살표 함수는 this 를 갖지 않고 바깥의 this 를 그대로 쓴다
            out("화살표 콜백    : this 는", this === timer ? "timer 객체" : this);
            out("               this.name =", JSON.stringify(this.name), " ← 바깥의 this 를 그대로 사용");
        }, 300);
    }
};

document.getElementById("btnThis").addEventListener("click", function () {
    outClear();
    out("setTimeout 콜백 안에서 this 가 어떻게 달라지는지 봅니다.");
    out("");
    timer.startWrong();
    timer.startRight();
});

document.getElementById("btnClear").addEventListener("click", outClear);
