/* ===== 2장. 컴포넌트 =====
   컴포넌트는 "화면을 돌려주는 함수"다. 특별한 문법이 아니다.  */

import React from "react";
import { createRoot } from "react-dom/client";

// 이름은 반드시 대문자로 시작한다.
// 소문자로 시작하면 React 가 HTML 태그로 보고 아무것도 그리지 않는다.
function MessageBox() {
    return <span style={{ color: "#28a745" }}>저장되었습니다.</span>;
}

function Card() {
    // 돌려주는 태그는 하나여야 한다.
    // 여러 개를 나란히 두려면 <> </> 로 감싼다(프래그먼트).
    return (
        <>
            <h3>프로젝트 제목</h3>
            <p>설명 문구입니다.</p>
        </>
    );
}

// 컴포넌트 안에서 다른 컴포넌트를 태그처럼 쓴다 → 컴포넌트 트리
function App() {
    return (
        <div>
            <h2>컴포넌트는 함수다</h2>
            <MessageBox />

            <hr />

            <h2>컴포넌트 안의 컴포넌트</h2>
            <div style={{ border: "1px solid #ccd", padding: 12 }}>
                <Card />
            </div>

            <hr />

            <h2>같은 컴포넌트를 여러 번</h2>
            <Card />
            <Card />
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
