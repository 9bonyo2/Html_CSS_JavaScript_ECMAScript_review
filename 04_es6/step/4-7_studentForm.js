/* ===========================================================
   [실습 4-7]  폼 값 수집 다시 쓰기
   -----------------------------------------------------------
   놓을 위치 : student_ecma/src/ui/studentForm.js
   교재      : 05_ECMAScript_실습_단계별.docx
   =========================================================== */

export const studentForm = document.getElementById("studentForm");

export function collectStudentData() {
    // FormData 를 한 번에 객체로 바꾼 뒤, 필요한 값만 구조 분해로 꺼낸다.
    const { name, studentNumber, address, phoneNumber, email, dateOfBirth } =
        Object.fromEntries(new FormData(studentForm).entries());

    return {
        name: name.trim(),
        studentNumber: studentNumber.trim(),
        detailRequest: {
            address: address.trim(),
            phoneNumber: phoneNumber.trim(),
            // 빈 문자열("")도 걸러야 하므로 여기서는 ?? 가 아니라 || 를 쓴다.
            email: email.trim() || null,
            dateOfBirth: dateOfBirth || null,
        },
    };
}
