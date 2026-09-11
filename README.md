# 기초 문서 예제 모음

`student/docs/` 의 기초 문서 4종(HTML / CSS / JavaScript / ECMAScript)에 나오는 예제를
실제로 열어보고 고쳐볼 수 있는 소스입니다.

## 여는 방법

1. VS Code 에서 `student/docs/examples` 폴더를 엽니다.
2. `index.html` 에서 마우스 오른쪽 → **Open with Live Server**
3. 주소가 `http://127.0.0.1:5500/...` 으로 시작하는지 확인합니다.

> 파일을 더블클릭해서 열면 주소가 `file:///` 로 시작합니다.
> 대부분의 예제는 그래도 동작하지만 **JavaScript 11장(fetch)** 과
> **ECMAScript 7장(Promise) · 8장(모듈)** 은
> 브라우저가 차단하므로 반드시 Live Server 로 여세요.

## 구성

| 폴더 | 대응 문서 | 내용 |
|---|---|---|
| `01_html/` | 01_HTML_기초.docx | 8개 장. 태그·문서 구조·텍스트·목록과 표·이미지와 링크·폼·div/class·시맨틱 |
| `02_css/` | 02_CSS_기초.docx | 12개 장. 장마다 HTML 1개 + CSS 1개 |
| `03_js/` | 03_JavaScript_기초.docx | 12개 장. 장마다 HTML 1개 + JS 1개 |
| `04_es6/` | 04_ECMAScript_기초.docx | 3~9장. var/let/const, 구조 분해, 전개 구문, 비동기, 모듈, Vite |
| `assets/` | — | 공용 스타일(`base.css`), 출력 헬퍼(`demo.js`), 샘플 이미지(`sample.svg`) |

## 각 폴더의 목차

- `01_html/index.html`
- `02_css/index.html`
- `03_js/index.html`
- `04_es6/index.html`

## 실습 방법

각 장의 `css/` 와 `js/` 폴더에 있는 파일을 직접 고쳐 보세요.
Live Server 를 쓰면 저장하는 즉시 브라우저가 새로고침됩니다.

페이지 안의 **미니 과제** 상자에 무엇을 바꿔보면 좋을지 적어 두었습니다.
망가뜨려도 괜찮습니다. 원래대로 되돌리는 것도 연습입니다.

## 본 교재와의 연결

| 본 교재 구간 | 먼저 보면 좋은 예제 |
|---|---|
| 실습 1-1 ~ 1-6 (Portfolio) | HTML 1~3장, 7~8장 · CSS 1~5장 |
| 실습 2-1 ~ 2-8 (Projects) | CSS 6장(Grid), 9장(그림자), 11장(hover) |
| 실습 3-1 ~ 3-3 (폼과 스타일) | HTML 4장(표), 6장(폼) · CSS 6장, 12장 |
| 실습 3-4 ~ 3-5 (JavaScript 시작) | JS 1~6장, 9~10장 |
| 실습 3-6 ~ 3-11 (서버 통신) | JS 7~8장, 11~12장 |
| 본 교재 이후 (React 준비) | ECMAScript 3~8장 전부 |

## 참고

- `03_js/data/students.json` 은 서버 없이 fetch 를 연습하기 위한 로컬 데이터입니다.
  Spring Boot 서버 응답과 같은 구조로 되어 있습니다.
- 실제 서버로 바꾸려면 `03_js/js/ch11_fetch.js` 위쪽의 `LOCAL_URL` 을
  `` `${API_BASE_URL}/api/students` `` 로 바꾸면 됩니다.
  그러면 본 교재 실습 3-6 과 완전히 같은 코드가 됩니다.
- `04_es6/` 의 1장·2장·10장은 개념과 도구 설명이라 실행 예제가 없습니다.
  9장(Vite)은 브라우저가 아니라 터미널에서 따라 하는 실습 안내 페이지입니다.
