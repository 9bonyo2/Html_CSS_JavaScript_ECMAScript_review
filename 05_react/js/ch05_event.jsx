/* ===== 5장. 이벤트 핸들링 =====
   onClick 에는 "함수"를 넘긴다. 부르면 안 된다.  */

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
    const [log, setLog] = useState([]);
    const [text, setText] = useState("홍길동");

    const add = (line) => setLog((prev) => [...prev, line]);

    function handleSubmit(event) {
        event.preventDefault();          // 이게 없으면 페이지가 새로고침된다
        add("submit — preventDefault 로 새로고침을 막았습니다: " + text);
    }

    return (
        <div>
            <h2>함수를 넘긴다, 부르지 않는다</h2>
            <p>
                {/* 맞다 — 함수 자체를 넘긴다 */}
                <button type="button" onClick={() => add("click 되었습니다")}>
                    onClick={"{() => add(...)}"}
                </button>
            </p>
            <p style={{ color: "#9c2d2d" }}>
                onClick={"{add('...')}"} 처럼 쓰면 그리는 순간 실행되고,
                그 함수가 setState 를 부르면 무한히 반복됩니다.
            </p>

            <hr />

            <h2>form 과 preventDefault</h2>
            <form onSubmit={handleSubmit}>
                <input value={text} onChange={(event) => setText(event.target.value)} />
                <button type="submit">제출</button>
            </form>

            <hr />

            <h2>이벤트 위임이 필요 없다</h2>
            {/* 4부에서는 tbody 한 곳에서 클릭을 받아야 했다.
                다시 그려도 onClick 이 함께 붙으므로 그럴 필요가 없다. */}
            <table border="1">
                <tbody>
                    {[1, 2, 3].map((id) => (
                        <tr key={id}>
                            <td>학생 {id}</td>
                            <td>
                                <button type="button" onClick={() => add("수정 " + id)}>수정</button>
                                <button type="button" onClick={() => add("삭제 " + id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

            <h2>기록</h2>
            <button type="button" onClick={() => setLog([])}>지우기</button>
            <pre>{log.join("\n")}</pre>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
