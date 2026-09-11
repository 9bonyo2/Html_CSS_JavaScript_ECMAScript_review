/* ===========================================================
   [실습 4-6]  main.js 정리 — 서버 통신을 studentApi.js 에 맡긴다
   -----------------------------------------------------------
   놓을 위치 : student_ecma/src/main.js
   교재      : 05_ECMAScript_실습_단계별.docx
   =========================================================== */

import "./style.css";
import {
    fetchStudents,
    fetchStudent  as apiFetchStudent,
    createStudent as apiCreateStudent,
    updateStudent as apiUpdateStudent,
    deleteStudent as apiDeleteStudent,
} from "./api/studentApi.js";

// const API_BASE_URL = "http://localhost:8080";   ← 이제 이 줄을 지웁니다

// 바꾼 뒤 — 통신은 studentApi.js 에 맡기고, 화면 처리만 남는다
async function createStudent(studentData) {
    try {
        await apiCreateStudent(studentData);

        showSuccess("학생이 성공적으로 등록되었습니다.");
        studentForm.reset();
        loadStudents();
    } catch (error) {
        console.error("Error:", error);
        showError(error.message);
    }
}

// 학생 수정 처리
async function updateStudent(studentId, studentData) {
    try {
        await apiUpdateStudent(studentId, studentData);

        resetForm();   // clearMessages() 가 들어 있으므로 메시지보다 먼저
        showSuccess("학생 정보가 성공적으로 수정되었습니다.");
        loadStudents();
    } catch (error) {
        console.error("Error:", error);
        showError(error.message);
    }
}

// 학생 삭제 — confirm 은 화면 처리이므로 그대로 남는다
async function deleteStudent(studentId) {
    if (!confirm("정말로 이 학생을 삭제하시겠습니까?")) {
        return;
    }

    try {
        await apiDeleteStudent(studentId);

        showSuccess("학생이 성공적으로 삭제되었습니다.");
        loadStudents();
    } catch (error) {
        console.error("Error:", error);
        showError(error.message);
    }
}

// 수정 전 데이터 로드 — 폼 채우기는 실습 4-9 에서 fillForm 으로 옮긴다
async function editStudent(studentId) {
    try {
        const student = await apiFetchStudent(studentId);

        studentForm.name.value = student.name;
        studentForm.studentNumber.value = student.studentNumber;

        if (student.detail) {
            studentForm.address.value = student.detail.address;
            studentForm.phoneNumber.value = student.detail.phoneNumber;
            studentForm.email.value = student.detail.email || "";
            studentForm.dateOfBirth.value = student.detail.dateOfBirth || "";
        }

        editingStudentId = studentId;
        submitButton.textContent = "학생 수정";
        studentForm.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        console.error("Error:", error);
        showError(error.message);
    }
}
