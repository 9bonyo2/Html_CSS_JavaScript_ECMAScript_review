/* ===== 3장. 변수 선언 — var, let, const ===== */

/* -----------------------------------------------------------
   1. 호이스팅 — 페이지가 열리자마자 실행됩니다.
   ----------------------------------------------------------- */

// (3) function 선언은 통째로 끌어올려집니다. 정의보다 위에서 불러도 동작합니다.
out("[호이스팅] 정의보다 위에서 함수 호출 →", hoistedGreet());

function hoistedGreet() {
    return "function 선언은 파일 전체에서 미리 인식됩니다";
}

// (1) var 는 "선언"만 끌어올려지고 값은 올라가지 않습니다.
out("[호이스팅] var 선언 전에 읽기 →", varAge, "(오류가 아닙니다)");
var varAge = 20;
out("[호이스팅] var 선언 후 읽기 →", varAge);

// (2) let / const 는 선언 전 구간이 TDZ 로 막혀 있습니다.
try {
    out(letAge);
} catch (error) {
    out("[TDZ] let 선언 전에 읽기 →", error.name + ": " + error.message);
}
let letAge = 20;
out("[TDZ] let 선언 후 읽기 →", letAge);

// (4) 화살표 함수는 const 에 담기므로 변수 규칙을 따릅니다.
try {
    arrowGreet();
} catch (error) {
    out("[TDZ] 화살표 함수를 정의보다 위에서 호출 →", error.name);
    out("     function 을 화살표 함수로 바꿀 때 자주 만나는 문제입니다.");
}
const arrowGreet = () => "화살표 함수";

out("");


/* -----------------------------------------------------------
   2. 유효 범위 — 함수 스코프 vs 블록 스코프
   ----------------------------------------------------------- */
document.getElementById("btnScope").addEventListener("click", function () {
    outClear();

    if (true) {
        var blockVar = "var 로 만든 값";
    }
    out("if 블록 밖에서 var →", blockVar, "  ← 블록을 무시한다");

    // eval 을 쓴 이유 : 이 파일 전체가 오류로 멈추지 않게 하기 위함입니다.
    // 실제 코드에서는 이렇게 쓰지 마세요.
    try {
        eval("if (true) { let blockLet = 'let 으로 만든 값'; } blockLet;");
    } catch (error) {
        out("if 블록 밖에서 let →", error.name + ": " + error.message);
    }

    out("");

    for (var i = 0; i < 3; i++) { /* 비어 있음 */ }
    out("for (var i ...) 가 끝난 뒤 i =", i, "  ← 반복문 밖에도 남아 있다");

    try {
        eval("for (let j = 0; j < 3; j++) { } j;");
    } catch (error) {
        out("for (let j ...) 가 끝난 뒤 j →", error.name + ": " + error.message);
    }

    out("");
    out("var 의 유효 범위는 함수 전체, let 과 const 는 중괄호 { } 블록입니다.");
});


/* -----------------------------------------------------------
   3. 재선언 — var 는 조용히 통과, let 은 막힌다
   ----------------------------------------------------------- */
document.getElementById("btnRedeclare").addEventListener("click", function () {
    outClear();

    eval("var userName = '홍길동'; var userName = '김코딩'; out('var 재선언 결과 →', userName);");
    out("오류도 경고도 없이 앞의 값이 사라졌습니다. 이것이 var 의 가장 위험한 점입니다.");

    out("");

    try {
        eval("let userName2 = '홍길동'; let userName2 = '김코딩';");
    } catch (error) {
        out("let 재선언 →", error.name + ": " + error.message);
        out("같은 이름을 두 번 선언하는 실수를 즉시 막아 줍니다.");
    }

    out("");
    out("재선언(let x = ...)과 재할당(x = ...)은 다릅니다. 재할당은 let 에서 얼마든지 가능합니다.");
});


/* -----------------------------------------------------------
   4. const — 재할당 금지, 내용 변경은 허용
   ----------------------------------------------------------- */
document.getElementById("btnConst").addEventListener("click", function () {
    outClear();

    const API_BASE_URL = "http://localhost:8080";
    out("const API_BASE_URL =", API_BASE_URL);

    try {
        eval("const fixed = 1; fixed = 2;");
    } catch (error) {
        out("const 재할당 →", error.name + ": " + error.message);
    }

    out("");

    const student = { name: "홍길동" };
    out("변경 전 :", student);

    student.name = "김코딩";      // 속성 변경 — 허용
    student.age = 20;             // 속성 추가 — 허용
    out("속성 변경·추가 후 :", student);

    const list = [];
    list.push(1, 2);              // 요소 추가 — 허용
    out("배열에 push 후 :", list);

    out("");
    out("const 는 \"이름이 가리키는 대상\"을 고정할 뿐, 그 대상의 내용까지 얼리지는 않습니다.");

    // 내용까지 얼리고 싶을 때 (실무에서 쓸 일은 드뭅니다)
    const frozen = Object.freeze({ name: "홍길동" });
    frozen.name = "김코딩";       // 조용히 무시됨 (strict mode 에서는 오류)
    out("Object.freeze 후 변경 시도 :", frozen);
});


/* -----------------------------------------------------------
   5. var 와 let 의 차이가 가장 극적으로 드러나는 예
   ----------------------------------------------------------- */
document.getElementById("btnTimer").addEventListener("click", function () {
    outClear();
    out("반복문 안에서 setTimeout 을 걸면 어떻게 될까요?");
    out("");

    for (var i = 1; i <= 3; i++) {
        setTimeout(function () {
            out("var  i =", i, "  ← 셋 다 4. i 가 하나뿐이라 반복이 끝난 값을 본다");
        }, 100);
    }

    for (let j = 1; j <= 3; j++) {
        setTimeout(function () {
            out("let  j =", j, "  ← 1, 2, 3. 반복마다 새 j 가 만들어진다");
        }, 300);
    }
});


document.getElementById("btnClear").addEventListener("click", outClear);
