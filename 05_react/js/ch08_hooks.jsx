/* ===== 8장. Hooks =====
   같은 컴포넌트를 클래스형과 함수형으로 나란히 만들어 비교한다.  */

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

/* ── Hooks 이전 : 클래스 컴포넌트 ──
   state 는 this.state 에 있고, 시점마다 정해진 이름의 메서드가 불린다.
   메서드를 이벤트 핸들러로 넘기려면 this 를 묶어야 했다.            */
class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);   // this 묶기
    }

    componentDidMount() {
        console.log("[클래스] componentDidMount — 화면에 붙은 뒤");
    }

    componentDidUpdate() {
        console.log("[클래스] componentDidUpdate — 갱신된 뒤");
    }

    componentWillUnmount() {
        console.log("[클래스] componentWillUnmount — 사라지기 전");
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <p>
                클래스형 : {this.state.count}
                {" "}
                <button type="button" onClick={this.handleClick}>+1</button>
            </p>
        );
    }
}

/* ── Hooks 이후 : 함수 컴포넌트 ──
   this 가 없고, 흩어져 있던 생명주기 코드가 useEffect 한자리에 모인다.  */
function HookCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("[함수] mount + update — 의존성 배열에 count 를 넣었다");
        return () => console.log("[함수] cleanup — 다음 실행 전 / 사라질 때");
    }, [count]);

    return (
        <p>
            함수형 : {count}
            {" "}
            <button type="button" onClick={() => setCount(count + 1)}>+1</button>
        </p>
    );
}

function App() {
    const [show, setShow] = useState(true);

    return (
        <div>
            <h2>같은 일을 하는 두 컴포넌트</h2>
            <p style={{ color: "#777" }}>
                F12 → Console 을 열고 버튼을 눌러 보세요. 어느 시점에 무엇이 불리는지 보입니다.
            </p>

            <button type="button" onClick={() => setShow(!show)}>
                {show ? "사라지게 하기 (정리 함수 확인)" : "다시 보이기"}
            </button>

            {show && (
                <div style={{ border: "1px solid #ccd", padding: 12, marginTop: 12 }}>
                    <ClassCounter />
                    <HookCounter />
                </div>
            )}
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);
