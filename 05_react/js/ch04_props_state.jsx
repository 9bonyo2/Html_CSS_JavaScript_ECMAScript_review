/* ===== 4장. Props 와 State =====
   props 는 부모가 주는 읽기 전용 값, state 는 컴포넌트가 가진 변하는 값.  */

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const COLORS = { error: "#dc3545", success: "#28a745" };

// props 를 매개변수 자리에서 구조 분해로 받는다 (4권 5장)
function MessageBox({ message }) {
    if (!message) return null;                 // 보여 줄 것이 없으면 그리지 않는다
    return <span style={{ color: COLORS[message.type] }}>{message.text}</span>;
}

// 함수도 props 로 넘긴다. 자식이 부모에게 알리는 유일한 방법이다.
function Toolbar({ onSuccess, onError, onClear }) {
    // Toolbar 는 무슨 일이 일어나는지 모른다. 언제 부를지만 안다.
    return (
        <p>
            <button type="button" onClick={onSuccess}>성공 메시지</button>
            <button type="button" onClick={onError}>오류 메시지</button>
            <button type="button" onClick={onClear}>지우기</button>
        </p>
    );
}

function App() {
    // state — 이 값이 바뀌면 App 이 다시 그려진다
    const [message, setMessage] = useState(null);

    return (
        <div>
            <h2>부모가 값과 함수를 내려 준다</h2>

            <Toolbar
                onSuccess={() => setMessage({ text: "저장되었습니다.", type: "success" })}
                onError={() => setMessage({ text: "이미 등록된 학번입니다.", type: "error" })}
                onClear={() => setMessage(null)}
            />

            <p>
                메시지 자리 : <MessageBox message={message} />
            </p>

            <hr />

            {/* 같은 값이 App 에서는 state, MessageBox 에서는 props 다 */}
            <p style={{ color: "#777" }}>
                지금 state : <code>{JSON.stringify(message)}</code>
            </p>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
