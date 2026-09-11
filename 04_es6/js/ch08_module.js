/* ===== 8장. 모듈 예제 — 가져오는 쪽 (main) =====

   이 파일은 <script type="module"> 로 불러옵니다.
   type="module" 이 없으면 "Cannot use import statement outside a module" 오류가 납니다.

   브라우저에서 직접 쓸 때는 경로에 ./ 를 붙이고 확장자(.js)까지 적어야 합니다.
   Vite 같은 번들러를 쓰면 './mortgage' 처럼 확장자를 생략할 수 있습니다.
*/

// default export 는 중괄호 없이, 이름은 마음대로
import calcAmortization from "./mortgage.js";

// named export 는 중괄호 안에 같은 이름으로
import { calculateMonthlyPayment } from "./mortgage.js";

// 전부 한 덩어리로 받기
import * as mortgage from "./mortgage.js";


const PRINCIPAL = 30000000;   // 원금 3천만원
const RATE = 0.05;            // 연이율 5%
const YEARS = 3;              // 3년


out("=== default export 로 가져온 함수 ===");
out("import calcAmortization from './mortgage.js'");
out("");
calcAmortization(PRINCIPAL, RATE, YEARS).forEach(row => out(row));
out("");

out("=== named export 로 가져온 함수 ===");
out("import { calculateMonthlyPayment } from './mortgage.js'");
out("월 상환금 =", calculateMonthlyPayment(PRINCIPAL, RATE, YEARS).toLocaleString("ko-KR") + "원");
out("");

out("=== * as 로 통째로 가져오기 ===");
out("import * as mortgage from './mortgage.js'");
out("mortgage 안에 들어 있는 이름 :", Object.keys(mortgage));
out("→ default 는 mortgage.default 로 꺼냅니다.");
out("→ formatWon 은 export 를 붙이지 않았으므로 목록에 없습니다.");
out("");

out("=== 모듈은 전역을 더럽히지 않습니다 ===");
out("window.calculateMonthlyPayment =", window.calculateMonthlyPayment);
out("→ undefined. 모듈 안의 이름은 밖으로 새어 나가지 않습니다.");
out("   3권까지 쓰던 <script> 방식은 모든 함수가 전역에 노출됐습니다.");


document.getElementById("btnCalc").addEventListener("click", () => {
    outClear();

    const principal = Number(document.getElementById("principal").value);
    const rate = Number(document.getElementById("rate").value) / 100;
    const years = Number(document.getElementById("years").value);

    if (!principal || !years) {
        out("원금과 기간을 입력해 주세요.");
        return;
    }

    out(`원금 ${principal.toLocaleString("ko-KR")}원 / 연이율 ${rate * 100}% / ${years}년`);
    out("월 상환금 =", calculateMonthlyPayment(principal, rate, years).toLocaleString("ko-KR") + "원");
    out("");
    calcAmortization(principal, rate, years).forEach(row => out(row));
});

document.getElementById("btnClear").addEventListener("click", outClear);
