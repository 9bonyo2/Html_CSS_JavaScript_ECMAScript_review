/* ===== 11장. 비동기와 fetch ===== */

// 서버 없이 연습할 수 있도록 로컬 JSON 파일을 씁니다.
const LOCAL_URL = "data/students.json";

// 실제 Spring Boot 서버를 쓸 때는 아래 주소로 바꾸면 됩니다.
// (실습 3-6 과 완전히 같은 코드가 됩니다)
const API_BASE_URL = "http://localhost:8080";
// const LOCAL_URL = `${API_BASE_URL}/api/students`;

const studentTableBody = document.getElementById("studentTableBody");

/* -----------------------------------------------------------
   1) 실행 순서 — 비동기가 무엇인지 눈으로 확인
   ----------------------------------------------------------- */
document.getElementById("btnOrder").addEventListener("click", function () {
    out("① 요청을 보내기 직전");

    fetch(LOCAL_URL)
        .then((response) => response.json())
        .then((students) => {
            out("③ 응답이 도착했습니다. 학생 수 :", students.length);
            out("");
            out("②가 ③보다 먼저 찍혔습니다. 이것이 비동기입니다.");
            out("fetch 는 진동벨만 주고 즉시 다음 줄로 넘어갑니다.");
        })
        .catch((error) => {
            out("오류 →", error.message);
            out("Live Server 로 열었는지 확인하세요.");
        });

    out("② 요청을 보낸 직후 (아직 응답은 오지 않았습니다)");
});

/* -----------------------------------------------------------
   2) 목록 가져오기 — 실습 3-6 과 같은 구조
   ----------------------------------------------------------- */
function loadStudents() {
    out("학생 목록 로드 중...");

    fetch(LOCAL_URL)
        .then((response) => {              // (1) 응답 도착 (상자는 아직 안 열었음)
            out("  response.ok     :", response.ok);
            out("  response.status :", response.status);

            if (!response.ok) {
                throw new Error("학생 목록을 불러오는데 실패했습니다.");
            }
            return response.json();        // (2) 상자를 여는 작업 (이것도 비동기)
        })
        .then((students) => {              // (3) 내용물을 꺼냈다
            out("  받은 학생 수    :", students.length);
            renderStudentTable(students);
            out("표를 그렸습니다.");
        })
        .catch((error) => {                // (4) 어디서든 문제가 생기면 여기로
            console.error("Error:", error);
            out("  catch 로 왔습니다 →", error.message);
        });
}

document.getElementById("btnLoad").addEventListener("click", loadStudents);

/**
 * 학생 배열을 표에 그린다.
 * @param {Array} students 학생 목록
 */
function renderStudentTable(students) {
    studentTableBody.innerHTML = "";        // 먼저 비우지 않으면 중복해서 쌓입니다

    students.forEach((student) => {
        const row = document.createElement("tr");

        // 주석은 반드시 백틱 바깥에 둡니다
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentNumber}</td>
            <td>${student.detail ? student.detail.address : "-"}</td>
            <td>${student.detail ? student.detail.email || "-" : "-"}</td>
        `;

        studentTableBody.appendChild(row);
    });
}

/* -----------------------------------------------------------
   3) 404 — fetch 는 catch 로 가지 않습니다
   ----------------------------------------------------------- */
document.getElementById("btnFail").addEventListener("click", function () {
    out("없는 파일을 요청합니다 : data/없는파일.json");

    fetch("data/없는파일.json")
        .then((response) => {
            out("  then 으로 들어왔습니다! (catch 가 아닙니다)");
            out("  response.ok     :", response.ok);
            out("  response.status :", response.status);
            out("");
            out("fetch 는 서버가 404 를 돌려줘도 '답장을 받았다'는 이유로");
            out("성공으로 처리합니다. 그래서 if (!response.ok) throw 가 필요합니다.");

            if (!response.ok) {
                throw new Error("파일을 찾을 수 없습니다. (404)");
            }
            return response.json();
        })
        .catch((error) => {
            out("");
            out("직접 throw 했으므로 이제 catch 로 왔습니다 →", error.message);
        });
});

/* -----------------------------------------------------------
   4) 서버가 꺼져 있을 때 — 이때만 catch 로 갑니다
   ----------------------------------------------------------- */
document.getElementById("btnDown").addEventListener("click", function () {
    out("응답하지 않는 주소로 요청합니다 : http://localhost:9999");

    fetch("http://localhost:9999/api/students")
        .then((response) => response.json())
        .then((data) => out("성공 :", data))
        .catch((error) => {
            out("  catch 로 왔습니다 →", error.message);
            out("");
            out("'Failed to fetch' 는 답장 자체를 못 받았다는 뜻입니다.");
            out("서버 실행 여부와 포트 번호를 확인하세요.");
        });
});

/* -----------------------------------------------------------
   5) POST 요청의 모양 (실제 전송은 하지 않습니다)
   ----------------------------------------------------------- */
document.getElementById("btnPost").addEventListener("click", function () {
    // 실습 3-7 에서 서버로 보내는 것과 같은 구조
    // 실제로는 아래 값들이 FormData 에서 옵니다 (실습 3-5)
    const email = "";              // 이메일을 비워둔 경우
    const dateOfBirth = "2000-01-01";

    const studentData = {
        name: "홍길동",
        studentNumber: "20241234",
        detailRequest: {
            address: "서울시 강남구",
            phoneNumber: "010-1234-5678",
            email: email.trim() || null,      // 비어 있으면 null 로 보냅니다
            dateOfBirth: dateOfBirth || null
        }
    };

    const options = {
        method: "POST",                              // (1) 무엇을 할 것인가
        headers: {
            "Content-Type": "application/json"       // (2) 어떤 형식인가
        },
        body: JSON.stringify(studentData)            // (3) 무엇을 보내는가
    };

    out("보낼 주소 :", `${API_BASE_URL}/api/students`);
    out("");
    out("fetch 옵션 :");
    out("  method  :", options.method);
    out("  headers :", options.headers);
    out("  body    :", options.body);
    out("");
    out("body 는 문자열입니다. HTTP 는 문자열만 실어 나를 수 있기 때문입니다.");
    out("빠뜨렸을 때 :  method → 405,  headers → 415,  body → 값이 전부 null");
    out("");
    out("(이 예제는 서버가 없으므로 실제 전송은 하지 않습니다.");
    out(" Spring Boot 서버를 켠 뒤 실습 3-7 에서 직접 보내게 됩니다.)");
});

document.getElementById("btnClear").addEventListener("click", function () {
    outClear();
    studentTableBody.innerHTML = "";
});
