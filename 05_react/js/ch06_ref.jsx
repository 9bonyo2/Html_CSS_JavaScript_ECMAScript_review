/* ===== 6장. ref =====
   값으로 표현할 수 없는 동작(포커스·스크롤·재생)에만 실제 DOM 이 필요하다.  */

import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
    const inputRef = useRef(null);      // DOM 요소를 담을 상자
    const bottomRef = useRef(null);
    const countRef = useRef(0);         // 화면과 무관한 값
    const [state, setState] = useState(0);

    return (
        <div>
            <h2>포커스 주기 — 값으로는 표현할 수 없다</h2>
            <input ref={inputRef} placeholder="여기에 커서가 옵니다" />
            <button type="button" onClick={() => inputRef.current?.focus()}>
                커서 보내기
            </button>

            <hr />

            <h2>state 와 ref 의 차이</h2>
            <p>
                <button type="button" onClick={() => setState(state + 1)}>
                    state 올리기 (다시 그려진다)
                </button>
                <button type="button" onClick={() => { countRef.current += 1; }}>
                    ref 올리기 (다시 그려지지 않는다)
                </button>
            </p>
            <p>
                state = {state} &nbsp;/&nbsp; ref = {countRef.current}
            </p>
            <p style={{ color: "#777" }}>
                ref 만 올리면 값은 실제로 바뀌지만 화면은 그대로입니다.
                그 뒤 state 를 한 번 올리면 그때 밀린 ref 값이 함께 보입니다.
            </p>

            <hr />

            <h2>스크롤</h2>
            <button
                type="button"
                onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
                맨 아래로
            </button>
            <div style={{ height: 400 }} />
            <p ref={bottomRef} style={{ background: "#dce6f1", padding: 10 }}>
                여기가 bottomRef 입니다.
            </p>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
