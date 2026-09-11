/* ===========================================================
   [실습 5-2]  React 를 화면에 붙이기
   -----------------------------------------------------------
   놓을 위치 : student_react_first/src/main.jsx
   교재      : 06_React기초_실습_단계별.docx
   =========================================================== */

/* ===========================================================
   main.jsx — React 앱을 화면에 붙이는 곳
   -----------------------------------------------------------
   4부에서는 index.html 이 화면 전체를 갖고 있었고,
   main.js 가 그 요소들을 찾아 이벤트를 걸었습니다.

   5부에서는 index.html 에 <div id="root"></div> 하나만 있고,
   그 자리에 App 컴포넌트를 그려 넣습니다.
   =========================================================== */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
