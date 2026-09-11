/* ===========================================================
   [실습 4-9]  메시지 모듈
   -----------------------------------------------------------
   놓을 위치 : student_ecma/src/ui/message.js
   교재      : 05_ECMAScript_실습_단계별.docx
   =========================================================== */

const formError = document.getElementById("formError");
const loadingMessage = document.getElementById("loadingMessage");

const COLORS = { error: "#dc3545", success: "#28a745" };

/** 성공 메시지가 저절로 사라지기까지의 시간(ms) */
const MESSAGE_TIMEOUT = 3000;

/** 자동 초기화 예약. 새 메시지가 오면 이전 예약을 취소한다. */
let messageTimer = null;

/**
 * @param {"error"|"success"} [type] 기본값 "error"
 * @param {number} [timeout] 자동으로 지우기까지의 ms. 0 이면 지우지 않는다(기본값)
 */
export function showMessage(text, type = "error", timeout = 0) {
    clearTimeout(messageTimer);          // 앞선 예약을 취소한다

    formError.textContent = text;
    formError.style.color = COLORS[type] ?? COLORS.error;
    formError.style.display = "block";

    // 오류는 사용자가 고칠 때까지 남기고, 성공만 시간이 지나면 지운다.
    if (timeout > 0) {
        messageTimer = setTimeout(clearMessages, timeout);
    }
}

export const showError = (text) => showMessage(text, "error");
export const showSuccess = (text) => showMessage(text, "success", MESSAGE_TIMEOUT);

export function clearMessages() {
    clearTimeout(messageTimer);
    messageTimer = null;

    formError.textContent = "";
    formError.style.display = "none";
}

/** @param {boolean} [isLoading] 기본값 true */
export function setLoading(isLoading = true) {
    loadingMessage.style.display = isLoading ? "block" : "none";
}
