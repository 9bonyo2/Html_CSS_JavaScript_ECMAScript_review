/* ===========================================================
   [실습 4-9]  폼 모듈 (studentForm.js 완성본)
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

export const cancelButton = document.getElementById("cancelButton");

const submitButton = studentForm.querySelector('button[type="submit"]');
const formContainer = studentForm.closest(".form-container");

/** 서버에서 받은 학생 정보로 폼을 채운다. */
export function fillForm(student) {
    const { name, studentNumber, detail } = student;

    studentForm.name.value = name;
    studentForm.studentNumber.value = studentNumber;

    // detail 이 없으면 ?. 가 undefined 를 돌려주고, ?? 가 빈 문자열로 바꿔 준다.
    studentForm.address.value = detail?.address ?? "";
    studentForm.phoneNumber.value = detail?.phoneNumber ?? "";
    studentForm.email.value = detail?.email ?? "";
    studentForm.dateOfBirth.value = detail?.dateOfBirth ?? "";
}

/** 등록 모드와 수정 모드를 전환한다. @param {boolean} [isEditing] 기본값 false */
export function setEditMode(isEditing = false) {
    submitButton.textContent = isEditing ? "학생 수정" : "학생 등록";
    cancelButton.style.display = isEditing ? "inline-block" : "none";
    formContainer.classList.toggle("editing", isEditing);
}

/** 폼을 비우고 등록 모드로 되돌린다. */
export function resetForm() {
    studentForm.reset();
    setEditMode(false);
}

export function scrollToForm() {
    studentForm.scrollIntoView({ behavior: "smooth" });
}
