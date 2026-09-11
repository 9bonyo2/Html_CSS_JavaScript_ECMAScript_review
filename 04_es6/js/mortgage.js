/* ===== 8장. 모듈 예제 — 내보내는 쪽 (mortgage.js) ===== */

/* named export : export 를 붙인 것만 밖으로 나갑니다.
   가져올 때 중괄호 안에 같은 이름을 써야 합니다. */

/**
 * 월 상환금을 계산한다.
 * @param {number} principal 원금
 * @param {number} rate 연이율 (예: 0.05)
 * @param {number} years 상환 기간(년)
 * @returns {number} 월 상환금 (원 단위 반올림)
 */
export const calculateMonthlyPayment = (principal, rate, years) => {
    const monthlyRate = rate / 12;
    const months = years * 12;

    if (monthlyRate === 0) {
        return Math.round(principal / months);
    }

    const payment =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    return Math.round(payment);
};

/** 이 파일에서만 쓰는 함수 — export 를 붙이지 않으면 밖으로 나가지 않습니다. */
const formatWon = (value) => value.toLocaleString("ko-KR") + "원";

/**
 * 상환 일정표를 만든다. (앞의 3개월만)
 * @param {number} principal 원금
 * @param {number} rate 연이율
 * @param {number} years 상환 기간(년)
 * @returns {string[]} 각 달의 요약 문자열
 */
const calculateAmortization = (principal, rate, years) => {
    const monthly = calculateMonthlyPayment(principal, rate, years);
    const monthlyRate = rate / 12;

    let balance = principal;
    const rows = [];

    for (let month = 1; month <= 3; month++) {
        const interest = Math.round(balance * monthlyRate);
        const principalPart = monthly - interest;
        balance = balance - principalPart;

        rows.push(
            `${month}개월차 : 상환 ${formatWon(monthly)} ` +
            `(이자 ${formatWon(interest)} / 원금 ${formatWon(principalPart)}) ` +
            `→ 남은 원금 ${formatWon(Math.max(balance, 0))}`
        );
    }

    return rows;
};

/* default export : 파일마다 하나만 지정할 수 있는 "대표 내보내기".
   가져올 때 중괄호를 쓰지 않고, 이름은 마음대로 정할 수 있습니다. */
export default calculateAmortization;
