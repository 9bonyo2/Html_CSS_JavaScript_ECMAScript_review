/* ===== 10장. useEffect =====
   의존성 배열과 정리 함수를 눈으로 확인한다. Console 을 함께 보세요.  */

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// 1초마다 올라가는 시계 — 정리 함수가 없으면 타이머가 쌓인다
function Clock() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        console.log("[Clock] 타이머 시작");
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);

        // 정리 함수 — 컴포넌트가 사라질 때 React 가 불러 준다
        return () => {
            clearInterval(timer);
            console.log("[Clock] 타이머 정리됨");
        };
    }, []);                          // [] — 처음 한 번만

    return <p>흐른 시간 : {seconds}초</p>;
}

function App() {
    const [showClock, setShowClock] = useState(true);
    const [name, setName] = useState("홍길동");
    const [message, setMessage] = useState(null);

    // [name] — name 이 바뀔 때마다 다시 실행된다
    useEffect(() => {
        console.log("[App] name 이 바뀌었습니다 :", name);
    }, [name]);

    // 성공 메시지는 3초 뒤 저절로 사라진다.
    // 메시지가 바뀌면 React 가 이전 예약을 먼저 취소해 준다.
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => setMessage(null), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div>
            <h2>[] — 처음 한 번만</h2>
            <button type="button" onClick={() => setShowClock(!showClock)}>
                {showClock ? "시계 없애기 (정리 함수 확인)" : "시계 보이기"}
            </button>
            {showClock && <Clock />}

            <hr />

            <h2>[값] — 그 값이 바뀔 때마다</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <p style={{ color: "#777" }}>글자를 칠 때마다 Console 에 찍힙니다.</p>

            <hr />

            <h2>정리 함수 — 타이머 취소</h2>
            <button type="button" onClick={() => setMessage("저장되었습니다. (3초 뒤 사라짐)")}>
                메시지 띄우기
            </button>
            <p style={{ color: "#28a745", minHeight: "1.4em" }}>{message}</p>
            <p style={{ color: "#777" }}>
                3초가 되기 전에 다시 누르면, 이전 예약이 취소되고 3초가 새로 시작됩니다.
            </p>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
