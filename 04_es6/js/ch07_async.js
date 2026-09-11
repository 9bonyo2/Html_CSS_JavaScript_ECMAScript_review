/* ===== 7장. Promise 와 async / await ===== */

/* 로컬 데이터로 fetch 를 연습합니다.
   실제 서버로 바꾸려면 아래 주소를
   https://jsonplaceholder.typicode.com/posts 로 바꾸면 됩니다. */
const POSTS_URL = "data/posts.json";
const USERS_URL = "data/users.json";


/* -----------------------------------------------------------
   1. Promise 의 세 가지 상태
   ----------------------------------------------------------- */
document.getElementById("btnStates").addEventListener("click", function () {
    outClear();

    // 성공하는 Promise
    const willSucceed = new Promise((resolve, reject) => {
        setTimeout(() => resolve("결과값 도착"), 500);
    });

    // 실패하는 Promise
    const willFail = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("일부러 낸 오류")), 800);
    });

    out("만든 직후 상태 :", willSucceed);
    out("→ 아직 pending(대기) 입니다. 결과가 없습니다.");
    out("");

    willSucceed
        .then(result => {
            out("0.5초 뒤 fulfilled(이행) →", result);
        });

    willFail
        .then(result => {
            out("여기는 실행되지 않습니다");
        })
        .catch(error => {
            out("0.8초 뒤 rejected(거부)  →", error.message);
            out("");
            out("한 번 이행이나 거부로 정해지면 그 상태는 다시 바뀌지 않습니다.");
        });
});


/* -----------------------------------------------------------
   2. 실행 순서 — 동기 코드가 먼저, 비동기는 나중에
   ----------------------------------------------------------- */
document.getElementById("btnOrder").addEventListener("click", function () {
    outClear();

    out("1. 함수 시작 (동기)");

    fetch(POSTS_URL)
        .then(response => response.json())
        .then(posts => {
            out("4. 데이터 도착 (비동기) — 글 " + posts.length + "개");
            out("");
            out("3번이 4번보다 먼저 찍힌 것에 주목하세요.");
            out("fetch 는 진동벨만 돌려주고 곧바로 다음 줄로 넘어갑니다.");
        });

    out("2. fetch 를 부른 직후 (동기)");
    out("3. 함수 끝 (동기)");
});


/* -----------------------------------------------------------
   3. then 체인
   ----------------------------------------------------------- */
document.getElementById("btnThen").addEventListener("click", function () {
    outClear();
    out("fetch → then → then → catch 로 이어지는 기본형입니다.");
    out("");

    fetch(POSTS_URL)
        .then(response => {
            out("(1) 응답 도착. status =", response.status, "/ ok =", response.ok);

            // fetch 는 404, 500 에도 catch 로 가지 않습니다. 직접 확인해야 합니다.
            if (!response.ok) {
                throw new Error("불러오기 실패 : " + response.status);
            }
            return response.json();          // (2) 본문을 객체로 — 이것도 비동기
        })
        .then(posts => {
            out("(2) 본문 변환 완료. 글 개수 =", posts.length);
            posts.forEach(post => out("    -", post.title));
        })
        .catch(error => {
            out("(3) 어디서든 문제가 생기면 여기로 →", error.message);
        });
});


/* -----------------------------------------------------------
   4. async / await — 같은 일을 위에서 아래로
   ----------------------------------------------------------- */
async function getPosts() {
    try {
        const response = await fetch(POSTS_URL);

        if (!response.ok) {
            throw new Error("불러오기 실패 : " + response.status);
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        out("에러 발생 :", error.message);
        return [];
    }
}

document.getElementById("btnAwait").addEventListener("click", async function () {
    outClear();
    out("await 는 결과가 올 때까지 기다렸다가 값을 변수에 바로 담습니다.");
    out("");

    const posts = await getPosts();
    out("받은 글 개수 =", posts.length);
    posts.forEach(post => out(" -", post.title));

    out("");
    // async 함수는 언제나 Promise 를 돌려줍니다.
    out("await 없이 getPosts() 를 찍으면 →", getPosts());
    out("\"async 함수를 불렀는데 Promise 가 찍힌다\"는 대부분 이 경우입니다.");
});


/* -----------------------------------------------------------
   5. Promise.all — 여러 요청을 한꺼번에
   ----------------------------------------------------------- */
document.getElementById("btnAll").addEventListener("click", async function () {
    outClear();

    // (1) 순서대로 — 앞 요청이 끝나야 뒤 요청이 시작됩니다.
    const t1 = performance.now();
    const r1 = await fetch(POSTS_URL);
    const posts1 = await r1.json();
    const r2 = await fetch(USERS_URL);
    const users1 = await r2.json();
    const sequential = Math.round(performance.now() - t1);

    out("순서대로 :", posts1.length + "개 글,", users1.length + "명 사용자 —", sequential + "ms");

    // (2) 동시에 — 두 요청을 함께 보내고 전부 끝날 때까지 한 번만 기다립니다.
    const t2 = performance.now();
    const [r3, r4] = await Promise.all([fetch(POSTS_URL), fetch(USERS_URL)]);
    const [posts2, users2] = await Promise.all([r3.json(), r4.json()]);
    const parallel = Math.round(performance.now() - t2);

    out("동시에   :", posts2.length + "개 글,", users2.length + "명 사용자 —", parallel + "ms");
    out("");
    out("로컬 파일이라 차이가 작지만, 실제 서버라면 요청 수만큼 차이가 벌어집니다.");
    out("서로 관계가 없는 요청이라면 Promise.all 을 쓰세요.");
});


document.getElementById("btnClear").addEventListener("click", outClear);
