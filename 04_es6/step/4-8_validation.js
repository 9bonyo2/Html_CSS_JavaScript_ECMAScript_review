/* ===========================================================
   [실습 4-8]  유효성 검사를 순수 함수로 분리하기
   -----------------------------------------------------------
   놓을 위치 : student_ecma/src/lib/validation.js
   교재      : 05_ECMAScript_실습_단계별.docx
   =========================================================== */

const STUDENT_NUMBER_PATTERN = /^[A-Za-z0-9]+$/;
const PHONE_PATTERN = /^[0-9-\s]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_PATTERN.test(email);

/**
 * 학생 데이터를 검사해 첫 번째 오류 메시지를 돌려준다.
 * @returns {string|null} 문제가 없으면 null
 */
export function validateStudent(student) {
    // 구조 분해로 필요한 값만 꺼낸다. detailRequest 가 없을 때를 대비해 기본값 {} 를 둔다.
    const { name, studentNumber, detailRequest = {} } = student;
    const { address, phoneNumber, email } = detailRequest;

    if (!name) return "이름을 입력해주세요.";
    if (!studentNumber) return "학번을 입력해주세요.";
    if (!address) return "주소를 입력해주세요.";
    if (!phoneNumber) return "전화번호를 입력해주세요.";

    if (!STUDENT_NUMBER_PATTERN.test(studentNumber)) {
        return "학번은 영문과 숫자만 입력 가능합니다.";
    }
    if (!PHONE_PATTERN.test(phoneNumber)) {
        return "올바른 전화번호 형식이 아닙니다.";
    }

    // 이메일은 선택 항목이므로 입력된 경우에만 검사한다.
    if (email && !isValidEmail(email)) {
        return "올바른 이메일 형식이 아닙니다.";
    }

    return null;
}
