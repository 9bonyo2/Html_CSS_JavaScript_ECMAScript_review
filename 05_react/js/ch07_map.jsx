/* ===== 7장. map 과 key =====
   key 를 index 로 쓰면 안 되는 이유를 직접 확인한다.  */

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const INITIAL = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "김코딩" },
    { id: 3, name: "이자바" },
];

// key 를 무엇으로 주느냐만 다른 두 목록
function List({ students, useIndexKey, onRemove }) {
    return (
        <ul>
            {students.map((student, index) => (
                <li key={useIndexKey ? index : student.id}>
                    {student.name}
                    {" "}
                    {/* 각 행이 자기만의 상태(입력값)를 갖는다 */}
                    <input placeholder="여기에 아무 글자나" />
                    {" "}
                    <button type="button" onClick={() => onRemove(student.id)}>삭제</button>
                </li>
            ))}
        </ul>
    );
}

function App() {
    const [a, setA] = useState(INITIAL);
    const [b, setB] = useState(INITIAL);

    return (
        <div>
            <h2>key = student.id (권장)</h2>
            <p style={{ color: "#777" }}>
                각 칸에 다른 글자를 적고 첫 번째 학생을 지워 보세요. 입력값이 따라갑니다.
            </p>
            <List students={a} useIndexKey={false}
                  onRemove={(id) => setA(a.filter((s) => s.id !== id))} />

            <hr />

            <h2>key = 배열 순서(index)</h2>
            <p style={{ color: "#9c2d2d" }}>
                같은 방법으로 지워 보세요. 입력값이 엉뚱한 행에 남습니다.
            </p>
            <List students={b} useIndexKey={true}
                  onRemove={(id) => setB(b.filter((s) => s.id !== id))} />

            <hr />
            <button type="button" onClick={() => { setA(INITIAL); setB(INITIAL); }}>
                처음으로 되돌리기
            </button>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
