/* ===== 3장. JSX =====
   JSX 는 React.createElement 를 사람이 읽기 좋게 쓰는 문법일 뿐이다.  */

import React from "react";
import { createRoot } from "react-dom/client";

const student = { name: "홍길동", detail: { address: "서울시" } };

// (1) JSX 없이 — 중첩되면 어디가 어디인지 알 수 없다
function WithoutJsx() {
    return React.createElement(
        "tr",
        null,
        React.createElement("td", null, student.name),
        React.createElement("td", null, student.detail?.address ?? "-")
    );
}

// (2) JSX 로 — 들여쓰기가 곧 화면 구조다. 두 코드는 완전히 같다.
function WithJsx() {
    return (
        <tr>
            <td>{student.name}</td>
            <td>{student.detail?.address ?? "-"}</td>
        </tr>
    );
}

function App() {
    const isEditing = true;

    return (
        <div>
            <h2>같은 결과, 두 가지 표기</h2>
            <table border="1">
                <tbody>
                    <WithoutJsx />
                    <WithJsx />
                </tbody>
            </table>

            <hr />

            <h2>중괄호 안에는 "값을 내는 것"이면 무엇이든</h2>
            <ul>
                <li>변수 : {student.name}</li>
                <li>함수 호출 : {student.name.toUpperCase()}</li>
                <li>4권 문법 그대로 : {student.detail?.address ?? "-"}</li>
                <li>삼항 연산자 : {isEditing ? "수정" : "등록"}</li>
                <li>숫자도 중괄호로 : <span colSpan={7}>colSpan={7}</span></li>
            </ul>

            <hr />

            <h2>HTML 과 다른 점</h2>
            {/* class 가 아니라 className, for 가 아니라 htmlFor */}
            <p className="note">className 으로 씁니다 (class 는 예약어)</p>
            <label htmlFor="x">htmlFor 로 씁니다 : </label>
            <input id="x" defaultValue="입력칸" />

            {/* style 은 문자열이 아니라 객체. 중괄호가 두 겹인 이유 */}
            <p style={{ color: "#c0504d", backgroundColor: "#fceaea", padding: 8 }}>
                style 은 객체로 줍니다. backgroundColor 처럼 낙타 표기법입니다.
            </p>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
