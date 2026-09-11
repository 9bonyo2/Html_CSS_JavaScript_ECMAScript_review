/* ===== 9장. DOM — 화면과 대화하기 ===== */

// 요소 참조는 보통 파일 위쪽에 모아 둡니다.
const domForm = document.getElementById("domForm");
const nameInput = document.getElementById("nameInput");
const target = document.getElementById("target");
const createTarget = document.getElementById("createTarget");

document.getElementById("btnFind").addEventListener("click", function () {
    out("getElementById('target')        →", target.tagName);
    out("querySelector('#domForm input') →",
        document.querySelector("#domForm input").tagName);
    out("querySelectorAll('button').length →",
        document.querySelectorAll("button").length);
    out("");

    // form 은 특별합니다 : 안의 입력 요소를 name 속성으로 바로 꺼낼 수 있습니다.
    out("domForm.name.value →", domForm.name.value);
    out("nameInput.value    →", nameInput.value);
    out("두 결과가 같습니다. 단, form 쪽은 id 가 아니라 name 으로 찾습니다.");
});

document.getElementById("btnValue").addEventListener("click", function () {
    out("현재 입력값 :", nameInput.value);

    nameInput.value = "김코딩";        // 값 쓰기
    out("값을 바꾼 뒤 :", nameInput.value);
    out("입력창을 보세요. 실제로 글자가 바뀌었습니다.");
});

document.getElementById("btnText").addEventListener("click", function () {
    const danger = "<b>굵은 글씨</b>";

    target.textContent = danger;
    out("textContent 로 넣으면 →", target.textContent);
    out("  화면에 태그가 글자 그대로 보입니다. 안전합니다.");

    setTimeout(function () {
        target.innerHTML = danger;
        out("");
        out("innerHTML 로 넣으면 → 태그로 해석되어 굵게 보입니다.");
        out("  사용자 입력을 이렇게 넣으면 보안 위험이 있습니다.");
    }, 1200);
});

document.getElementById("btnStyle").addEventListener("click", function () {
    // style.속성 으로 CSS 값을 직접 지정할 수 있습니다.
    target.style.backgroundColor = "#e5f0f8";
    target.style.color = "#1f4e79";
    target.style.fontWeight = "bold";

    out("style.backgroundColor, style.color, style.fontWeight 를 바꿨습니다.");
    out("CSS 의 background-color 는 JS 에서 backgroundColor 로 씁니다.");
    out("(하이픈이 사라지고 다음 글자가 대문자가 됩니다)");
});

document.getElementById("btnCreate").addEventListener("click", function () {
    // 만들기 → 채우기 → 붙이기
    const li = document.createElement("li");           // 만들고
    li.textContent = "항목 " + (createTarget.children.length + 1);  // 채우고
    createTarget.appendChild(li);                       // 붙인다

    out("요소를 하나 만들어 붙였습니다. 현재 개수 :", createTarget.children.length);
    out("appendChild 를 하기 전까지는 메모리에만 있고 화면에는 보이지 않습니다.");
});

document.getElementById("btnNull").addEventListener("click", function () {
    // 실습 3-4 에서 만나는 오류를 그대로 재현합니다.
    const notExist = document.getElementById("studentform");   // 소문자 f (오타)

    out("getElementById('studentform') →", notExist);
    out("");

    try {
        notExist.addEventListener("click", function () {});
    } catch (error) {
        out("오류 발생 →", error.name + ": " + error.message);
        out("");
        out("studentform 과 studentForm 은 완전히 다른 값입니다.");
        out("id 철자와 대소문자를 확인하세요.");
    }
});

document.getElementById("btnClear").addEventListener("click", function () {
    outClear();
    createTarget.innerHTML = "";
    target.textContent = "여기 글자가 바뀝니다.";
    target.style.cssText = "margin-top:12px; padding:10px; background:#eef1f5; border-radius:4px;";
});
