/* ===========================================================
   [실습 5-6]  폼을 제어 컴포넌트로
   -----------------------------------------------------------
   놓을 위치 : student_react_first/src/components/StudentForm.jsx
   교재      : 06_React기초_실습_단계별.docx
   =========================================================== */

/* ===========================================================
   학생 등록 · 수정 폼
   -----------------------------------------------------------
   4부까지는 폼이 index.html 에 있었고, ui/studentForm.js 가
   그 요소를 찾아 값을 읽고 쓰고 버튼 글자를 바꿨습니다.

   React 에서는 폼이 이 파일 안에 있습니다. 그리고
   input 의 값은 DOM 이 아니라 부모가 준 form 객체에서 옵니다.
   이런 입력을 "제어 컴포넌트(controlled component)" 라고 합니다.

     화면에 보이는 값  = props.form
     값이 바뀌면       = props.onChange 로 부모에게 알린다

   이 컴포넌트는 값을 저장하지 않습니다. 그리기만 합니다.
   =========================================================== */

import MessageBox from "./MessageBox.jsx";

/** 입력칸 정의. 여섯 개를 일일이 쓰지 않고 map 으로 그린다. */
const FIELDS = [
    { name: "name", label: "이름", type: "text", required: true },
    { name: "studentNumber", label: "학번", type: "text", required: true },
    { name: "address", label: "주소", type: "text", required: true },
    { name: "phoneNumber", label: "전화번호", type: "tel", required: true },
    { name: "email", label: "이메일", type: "email", required: false },
    { name: "dateOfBirth", label: "생년월일", type: "date", required: false },
];

/**
 * @param {object} props
 * @param {object} props.form 화면에 보일 입력값
 * @param {boolean} props.isEditing 수정 모드인가
 * @param {object|null} props.message 폼 아래 보여 줄 메시지
 * @param {(name: string, value: string) => void} props.onChange 한 칸이 바뀔 때
 * @param {(event: React.FormEvent) => void} props.onSubmit 제출할 때
 * @param {() => void} props.onCancel 취소를 누를 때
 * @param {React.RefObject} props.containerRef 수정 시 이 위치로 스크롤하기 위한 참조
 */
function StudentForm({ form, isEditing, message, onChange, onSubmit, onCancel, containerRef }) {
    // 4부 setEditMode 가 classList.toggle 로 하던 일을 className 문자열로 표현한다.
    const containerClass = isEditing ? "form-container editing" : "form-container";

    return (
        <div className={containerClass} ref={containerRef}>
            <h2>학생 {isEditing ? "수정" : "등록"}</h2>

            {/* onSubmit 안에서 event.preventDefault() 를 부르는 것은 4부와 같다. */}
            <form onSubmit={onSubmit}>
                <div className="form-grid">
                    {FIELDS.map(({ name, label, type, required }) => (
                        <div className="form-group" key={name}>
                            <label htmlFor={name}>{label}:</label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                required={required}
                                value={form[name]}
                                onChange={(event) => onChange(name, event.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <div className="button-group">
                    <button type="submit">학생 {isEditing ? "수정" : "등록"}</button>

                    {/* 4부에서는 style.display 를 바꿨지만, 여기서는 아예 그리지 않는다. */}
                    {isEditing && (
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            취소
                        </button>
                    )}

                    <MessageBox message={message} />
                </div>
            </form>
        </div>
    );
}

export default StudentForm;
