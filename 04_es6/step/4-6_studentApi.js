/* ===========================================================
   [실습 4-6]  나머지 CRUD 를 화살표 함수로 (studentApi.js 완성본)
   -----------------------------------------------------------
   놓을 위치 : student_ecma/src/api/studentApi.js
   교재      : 05_ECMAScript_실습_단계별.docx
   =========================================================== */

import { STUDENTS_URL, JSON_HEADERS } from "../config.js";

/** 상태 코드별 기본 메시지. 서버가 message 를 주지 않을 때 쓴다. */
const DEFAULT_MESSAGES = {
    400: "입력한 값이 올바르지 않습니다.",
    404: "존재하지 않는 학생입니다.",
    409: "이미 등록된 학번입니다.",
    500: "서버에서 오류가 발생했습니다.",
};

async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        // 서버가 JSON 이 아닌 오류 페이지를 줄 수도 있으므로 방어한다.
        const errorData = await response.json().catch(() => ({}));

        const message =
            errorData.message ??
            DEFAULT_MESSAGES[response.status] ??
            `요청에 실패했습니다. (${response.status})`;

        throw new Error(message);
    }

    // 204 No Content — 삭제 성공처럼 돌려줄 본문이 없는 경우
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

/** 학생 목록을 가져온다. */
export const fetchStudents = () => request(STUDENTS_URL);

/** 학생 한 명을 가져온다. */
export const fetchStudent = (id) => request(`${STUDENTS_URL}/${id}`);

/** 학생을 새로 등록한다. */
export const createStudent = (student) =>
    request(STUDENTS_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(student),
    });

/** 학생 정보를 수정한다. */
export const updateStudent = (id, student) =>
    request(`${STUDENTS_URL}/${id}`, {
        method: "PUT",
        headers: JSON_HEADERS,
        body: JSON.stringify(student),
    });

/** 학생을 삭제한다. */
export const deleteStudent = (id) =>
    request(`${STUDENTS_URL}/${id}`, {
        method: "DELETE",
    });
