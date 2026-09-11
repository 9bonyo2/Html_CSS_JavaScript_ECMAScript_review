/* ===== 5장. 구조 분해 할당 (Destructuring Assignment) ===== */

const user = {
    name: "둘리",
    age: 30,
    phone: {
        home: "1234",
        mobile: "4566"
    }
};

/* -----------------------------------------------------------
   1. 객체에서 필요한 값만 꺼내기
   ----------------------------------------------------------- */

// 예전 방식이라면 하나씩 꺼내야 합니다.
// const name = user.name;
// const age  = user.age;

// 구조 분해 할당 — 한 줄로
const { name, age, phone } = user;

out("name  =", name);
out("age   =", age);
out("phone =", phone);
out("");


/* -----------------------------------------------------------
   2. 중첩된 객체를 한 번에 분해하기
   ----------------------------------------------------------- */

// 한 번에 안쪽까지 — phone 은 변수가 되지 않고 "길 안내" 역할만 합니다.
const { phone: { home, mobile } } = user;

out("home   =", home);
out("mobile =", mobile);
out("");

// 이름 바꿔 받기 · 기본값 정하기
const { name: userName } = user;          // name 을 userName 이라는 이름으로
const { address = "미입력" } = user;       // 값이 없으면(undefined) 기본값

out("userName =", userName);
out("address  =", address, "  ← user 에 없는 속성이라 기본값이 쓰였다");
out("");


/* -----------------------------------------------------------
   3. 배열 분해와 매개변수 분해
   ----------------------------------------------------------- */
const colors = ["red", "green", "blue"];
const [first, second] = colors;

out("first, second =", first, second);

// 건너뛰기와 나머지
const [, , third] = colors;
out("세 번째만      =", third);

// 두 값을 맞바꾸기 — 임시 변수가 필요 없습니다.
let a = 1;
let b = 2;
[a, b] = [b, a];
out("swap 후 a, b   =", a, b);
out("");

// 매개변수 자리에서 바로 분해 — React 에서 아주 자주 보는 형태
function printStudent({ name, studentNumber }) {
    out(`printStudent → ${name} / ${studentNumber}`);
}
printStudent({ name: "홍길동", studentNumber: "20241234", age: 20 });
out("");


/* -----------------------------------------------------------
   4. 메서드를 분해하면 this 가 사라진다
   ----------------------------------------------------------- */
const obj = {
    names: "React",
    greet() {
        return this.names;
    }
};

document.getElementById("btnThis").addEventListener("click", function () {
    outClear();

    out("obj.greet()  →", obj.greet(), "  ← 객체를 통해 부르면 정상");

    // 구조 분해로 함수만 떼어내면 자신이 어느 객체의 것이었는지 잊어버립니다.
    const { names, greet } = obj;
    out("names        →", names);

    out("greet()      →", greet(), "  ← undefined!");
    out("             함수만 떼어내면 this 가 obj 를 가리키지 않습니다.");

    out("");
    out("해결 방법 1 — bind() 로 객체를 붙여 준다");
    const boundGreet = obj.greet.bind(obj);
    out("boundGreet() →", boundGreet());

    out("");
    out("해결 방법 2 — 처음부터 this 를 쓰지 않는다");
    const obj2 = {
        names: "React",
        greet2: () => obj2.names
    };
    const { greet2 } = obj2;
    out("greet2()     →", greet2());
});

document.getElementById("btnClear").addEventListener("click", outClear);
