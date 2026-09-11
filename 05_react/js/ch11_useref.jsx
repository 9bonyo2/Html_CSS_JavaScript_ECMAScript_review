/* ===== 11장. useRef 와 그 밖의 Hooks =====
   ref 로 "화면과 무관한 값"을 기억하고, 반복되는 로직을 커스텀 훅으로 묶는다.  */

import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

/* 커스텀 훅 — use 로 시작하는 함수.
   9~10장에서 쓴 "메시지 + 자동 소멸"을 한 덩어리로 묶었다. */
function useMessage(timeout = 3000) {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(null), timeout);
        return () => clearTimeout(timer);
    }, [message, timeout]);

    return [message, setMessage];
}

function App() {
    const [count, setCount] = useState(0);

    // 다시 그려도 사라지지 않고, 바뀌어도 다시 그리지 않는 값
    const renderCount = useRef(0);
    const prevCount = useRef(null);

    const [message, setMessage] = useMessage();

    useEffect(() => {
        renderCount.current += 1;      // 몇 번 그렸는지 세기
    });

    useEffect(() => {
        prevCount.current = count;     // 이전 값 기억하기
    }, [count]);

    return (
        <div>
            <h2>ref 로 값 기억하기</h2>
            <p>
                count = {count}
                {" "}
                <button type="button" onClick={() => setCount(count + 1)}>+1</button>
            </p>
            <ul>
                <li>이전 count : {prevCount.current === null ? "(없음)" : prevCount.current}</li>
                <li>지금까지 그린 횟수 : {renderCount.current}</li>
            </ul>
            <p style={{ color: "#777" }}>
                두 값 모두 ref 라서 바뀌어도 화면을 다시 그리지 않습니다.
                +1 을 눌러 화면이 다시 그려질 때 함께 갱신되어 보입니다.
            </p>

            <hr />

            <h2>커스텀 훅 — useMessage()</h2>
            <button type="button" onClick={() => setMessage("커스텀 훅으로 띄운 메시지입니다.")}>
                메시지 띄우기
            </button>
            <p style={{ color: "#28a745", minHeight: "1.4em" }}>{message}</p>
            <p style={{ color: "#777" }}>
                useState 와 useEffect 를 한 함수로 묶어 두면 어느 컴포넌트에서든 한 줄로 씁니다.
            </p>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
