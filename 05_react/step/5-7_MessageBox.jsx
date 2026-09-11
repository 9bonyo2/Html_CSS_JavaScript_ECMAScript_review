/* ===========================================================
   [실습 5-7]  메시지와 조건부 렌더링
   -----------------------------------------------------------
   놓을 위치 : student_react_first/src/components/MessageBox.jsx
   교재      : 06_React기초_실습_단계별.docx
   =========================================================== */

/* ===========================================================
   메시지 한 줄 — 4부 ui/message.js 를 대신한다
   -----------------------------------------------------------
   4부에서는 showError() 가 formError 요소를 찾아
   textContent 와 style 을 직접 바꿨습니다.

   React 에서는 "무엇을 보여줄지"만 넘겨받아 그리고,
   보여줄 것이 없으면 아무것도 그리지 않습니다.
   화면을 지우는 코드(clearMessages)가 따로 필요 없습니다.
   =========================================================== */

/** 메시지 종류별 글자색 — 4부 COLORS 와 같다. */
const COLORS = {
    error: "#dc3545",
    success: "#28a745",
};

/**
 * @param {{ message: {text: string, type: "error"|"success"} | null }} props
 */
function MessageBox({ message }) {
    // null 을 돌려주면 아무것도 그리지 않는다. display: none 을 쓸 필요가 없다.
    if (!message) return null;

    return (
        <span className="error-message" style={{ color: COLORS[message.type] ?? COLORS.error }}>
            {message.text}
        </span>
    );
}

export default MessageBox;
