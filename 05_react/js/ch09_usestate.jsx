/* ===== 9장. useState =====
   불변성과 "즉시 반영되지 않는다"를 직접 확인한다.  */

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const EMPTY_FORM = { name: "", studentNumber: "" };

function App() {
    const [count, setCount] = useState(0);
    const [form, setForm] = useState(EMPTY_FORM);
    const [items, setItems] = useState(["사과"]);
    const [log, setLog] = useState("");

    // 입력칸이 여럿이어도 함수 하나 — [name] 은 계산된 속성명(4권 6-5)
    function handleChange(event) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function wrong() {
        // state 를 직접 고치면 React 는 바뀐 줄 모른다
        items.push("바나나");
        setLog("items.push(...) — 값은 늘었지만 화면은 그대로입니다. 길이=" + items.length);
    }

    function right() {
        setItems([...items, "바나나"]);      // 새 배열을 만들어 넘긴다
        setLog("[...items, ...] — 새 배열이라 화면이 다시 그려집니다.");
    }

    function delayed() {
        setCount(count + 1);
        // 지금 실행 중인 함수 안의 count 는 아직 이번에 그려질 때의 값이다
        setLog("setCount 직후 읽은 count = " + count + " (아직 예전 값)");
    }

    return (
        <div>
            <h2>값이 바뀌면 화면이 따라온다</h2>
            <p>
                count = {count}
                {" "}
                <button type="button" onClick={() => setCount(count + 1)}>+1</button>
                <button type="button" onClick={delayed}>+1 하고 바로 읽어 보기</button>
            </p>

            <hr />

            <h2>불변성 — 직접 고치면 안 된다</h2>
            <p>
                <button type="button" onClick={wrong}>push (틀린 방법)</button>
                <button type="button" onClick={right}>전개 구문 (맞는 방법)</button>
                <button type="button" onClick={() => setItems(["사과"])}>되돌리기</button>
            </p>
            <p>화면에 보이는 items : {items.join(", ")} ({items.length}개)</p>

            <hr />

            <h2>입력칸이 여럿일 때 — 함수 하나로</h2>
            <p>
                <input name="name" value={form.name} onChange={handleChange} placeholder="이름" />
                {" "}
                <input name="studentNumber" value={form.studentNumber} onChange={handleChange} placeholder="학번" />
                {" "}
                <button type="button" onClick={() => setForm(EMPTY_FORM)}>비우기</button>
            </p>
            <p>form = <code>{JSON.stringify(form)}</code></p>

            <hr />
            <p style={{ color: "#9c5700" }}>{log}</p>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
