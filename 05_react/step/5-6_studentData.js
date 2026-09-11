/* ===========================================================
   [실습 5-6]  폼 값과 서버 데이터 변환
   -----------------------------------------------------------
   놓을 위치 : student_react_first/src/lib/studentData.js
   교재      : 06_React기초_실습_단계별.docx
   =========================================================== */

/* ===========================================================
   폼 값과 서버 데이터 사이의 변환
   -----------------------------------------------------------
   4부 ui/studentForm.js 가 하던 일 중
   "값을 모으고 채우는 부분"만 여기로 옮겨 왔습니다.

   document 를 만지던 코드는 전부 사라졌습니다.
   React 에서는 입력값이 DOM 이 아니라 state 에 있으므로,
   FormData 로 긁어모을 필요도, input.value 에 넣어 줄 필요도 없습니다.

     4부 collectStudentData()  →  toRequest(form)
     4부 fillForm(student)     →  toFormValues(student)
   =========================================================== */

/** 등록 모드의 빈 폼. 폼을 되돌릴 때도 이 값을 쓴다. */
export const EMPTY_FORM = {
    name: "",
    studentNumber: "",
    address: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
};

/**
 * 폼 state 를 서버가 받는 구조로 바꾼다.
 * @param {object} form 화면의 입력값 (EMPTY_FORM 과 같은 모양)
 * @returns {object} { name, studentNumber, detailRequest: { ... } }
 */
export function toRequest(form) {
    const { name, studentNumber, address, phoneNumber, email, dateOfBirth } = form;

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

/**
 * 서버에서 받은 학생 정보를 폼 state 모양으로 바꾼다.
 * @param {object} student 서버 응답 (detail 이 없을 수도 있다)
 * @returns {object} EMPTY_FORM 과 같은 모양
 */
export function toFormValues(student) {
    const { name, studentNumber, detail } = student;

    // input 의 value 에 undefined 를 넣으면 React 가 경고를 낸다.
    // detail 이 없으면 ?. 가 undefined 를, ?? 가 빈 문자열을 돌려준다.
    return {
        name: name ?? "",
        studentNumber: studentNumber ?? "",
        address: detail?.address ?? "",
        phoneNumber: detail?.phoneNumber ?? "",
        email: detail?.email ?? "",
        dateOfBirth: detail?.dateOfBirth ?? "",
    };
}
