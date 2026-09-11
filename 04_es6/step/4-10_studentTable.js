/* ===========================================================
   [실습 4-10]  표 다시 그리기 (studentTable.js 완성본)
   -----------------------------------------------------------
   놓을 위치 : student_ecma/src/ui/studentTable.js
   교재      : 05_ECMAScript_실습_단계별.docx
   =========================================================== */

const studentTableBody = document.getElementById("studentTableBody");
const COLUMN_COUNT = 7;

/**
 * 한 줄짜리 안내 행을 만든다. 빈 목록 안내와 오류 안내가 함께 쓴다.
 * @param {string} message 표시할 문구
 * @param {string} [className] 행에 붙일 클래스 (기본값 "empty-row")
 */
function createMessageRow(message, className = "empty-row") {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = COLUMN_COUNT;   // 한 칸이 표 전체 너비를 차지하게 한다
    cell.className = className;
    cell.textContent = message;
    row.appendChild(cell);

    return row;
}

function createStudentRow(student) {
    const { id, name, studentNumber, detail } = student;
    const row = document.createElement("tr");

    const values = [
        name,
        studentNumber,
        detail?.address ?? "-",
        detail?.phoneNumber ?? "-",
        detail?.email ?? "-",
        detail?.dateOfBirth ?? "-",
    ];

    values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;      // 태그가 실행되지 않는다
        row.appendChild(cell);
    });

    // 액션 칸 — 버튼에 어떤 동작인지, 어떤 학생인지를 data 속성으로 새겨 둔다.
    const actionCell = document.createElement("td");

    [
        { action: "edit", label: "수정", className: "edit-btn" },
        { action: "delete", label: "삭제", className: "delete-btn" },
    ].forEach(({ action, label, className }) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = className;
        button.textContent = label;
        button.dataset.action = action;   // data-action="edit"
        button.dataset.id = id;           // data-id="3"

        actionCell.appendChild(button);
    });

    row.appendChild(actionCell);
    return row;
}

export function renderStudentTable(students = [], { emptyMessage = "등록된 학생이 없습니다." } = {}) {
    // 먼저 비우지 않으면 목록을 새로고침할 때마다 같은 학생이 쌓인다.
    studentTableBody.innerHTML = "";

    if (students.length === 0) {
        studentTableBody.appendChild(createMessageRow(emptyMessage));
        return;
    }

    // 여러 행을 한 번에 붙이기 위한 임시 그릇 (화면을 한 번만 다시 그린다)
    const fragment = document.createDocumentFragment();
    students.forEach((student) => fragment.appendChild(createStudentRow(student)));

    studentTableBody.appendChild(fragment);
}

/**
 * 목록을 불러오지 못했을 때 표 자리에 오류를 표시한다.
 * @param {string} [message] 기본값 "오류: 데이터를 불러올 수 없습니다."
 */
export function renderTableError(message = "오류: 데이터를 불러올 수 없습니다.") {
    studentTableBody.innerHTML = "";
    studentTableBody.appendChild(createMessageRow(message, "error-row"));
}

export { studentTableBody };
