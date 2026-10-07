/* ---------------------------------------------------------
   메시지 표시 — 성공 / 실패 / 로딩
   form10.js 는 모든 안내를 alert 으로 띄웠습니다.
   alert 은 화면을 멈춰 세우고, 사용자가 확인을 누를 때까지
   아무것도 할 수 없게 만듭니다.

   여기서는 폼 아래의 한 자리(#formError)에 글자로 보여 줍니다.
   색과 자동 삭제 여부만 다르므로 showMessage 하나로 합치고
   나머지 둘은 인자만 달리해 이름을 붙였습니다.
   --------------------------------------------------------- */

// form10.js 에서는 DOMContentLoaded 를 기다려야 했지만 여기서는 필요 없다.
// <script type="module"> 은 HTML 을 다 읽은 뒤에 실행되기 때문이다.
const formError = document.getElementById("formError");
const loadingMessage = document.getElementById("loadingMessage");

// 색을 코드 여기저기에 적지 않고 한곳에 모아 둔다.
const COLORS = {
    error: "#f44336",
    success: "#4CAF50",
};

// 성공 메시지가 저절로 사라지기까지의 시간(ms)
const MESSAGE_TIMEOUT = 3000;

// setTimeout 이 돌려준 예약 번호를 담아 둔다.
// 새 메시지가 오면 이 번호로 이전 예약을 취소한다.
let messageTimer = null;

/* type 과 timeout 은 기본 매개변수다. 생략하면 "error" 와 0 이 들어간다.
   생략했을 때 안전한 쪽(지워지지 않는 오류 메시지)이 되도록 골랐다. */
export function showMessage(text, type = "error", timeout = 0) {
    // 이전에 걸어 둔 자동 삭제 예약을 취소한다.
    // 이게 없으면 앞 메시지의 예약이 새 메시지를 지워 버린다.
    clearTimeout(messageTimer);

    formError.textContent = text;
    // COLORS.type 이 아니라 COLORS[type] 이다.
    // 대괄호를 쓰면 변수에 담긴 이름으로 꺼낼 수 있다.
    formError.style.color = COLORS[type] ?? COLORS.error;
    formError.style.display = "block";

    // 오류는 사용자가 고칠 때까지 남겨 두고, 성공만 시간이 지나면 지운다.
    if (timeout > 0) {
        messageTimer = setTimeout(clearMessages, timeout);
    }
}

// 자주 쓰는 두 가지는 showMessage 에 인자만 채워 이름을 붙였다.
export const showError = (text) => showMessage(text, "error");

export const showSuccess = (text) => showMessage(text, "success", MESSAGE_TIMEOUT);

export function clearMessages() {
    clearTimeout(messageTimer);      // 남아 있는 예약도 함께 취소한다
    messageTimer = null;

    formError.textContent = "";
    formError.style.display = "none";
}

// form10.css 에는 .loading 규칙이 있었지만 form10.js 는 쓰지 않았다.
// 여기서 실제로 동작한다.
export function setLoading(isLoading = true) {
    loadingMessage.style.display = isLoading ? "block" : "none";
}