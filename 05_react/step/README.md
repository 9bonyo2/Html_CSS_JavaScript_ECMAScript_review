# 5부 단계별 코드

교재 `06_React기초_실습_단계별.docx` 의 코드박스 중 **한 페이지를 넘기는 긴 코드**를 파일로 옮겨 둔 것입니다.
문서에서 옮겨 적기 불편할 때 여기서 복사하세요. 각 파일 맨 위 주석에 놓을 위치가 적혀 있습니다.

| 실습 | 파일 | 놓을 위치 |
|---|---|---|
| 5-2 | [`5-2_main.jsx`](5-2_main.jsx) | `src/main.jsx` |
| 5-5 | [`5-5_StudentTable.jsx`](5-5_StudentTable.jsx) | `src/components/StudentTable.jsx` |
| 5-6 | [`5-6_studentData.js`](5-6_studentData.js) | `src/lib/studentData.js` |
| 5-6 | [`5-6_StudentForm.jsx`](5-6_StudentForm.jsx) | `src/components/StudentForm.jsx` |
| 5-7 | [`5-7_MessageBox.jsx`](5-7_MessageBox.jsx) | `src/components/MessageBox.jsx` |
| 5-10 | [`5-10_App.jsx`](5-10_App.jsx) | `src/App.jsx` (완성본) |

## 4부에서 그대로 가져오는 파일

아래 세 파일은 **한 줄도 고치지 않고** `student_ecma` 에서 복사합니다. 화면(`document`)을 건드리지 않는 순수 모듈이기 때문입니다.

- `src/config.js`
- `src/api/studentApi.js`
- `src/lib/validation.js`

`src/style.css` 와 `.env.development` · `.env.production` 도 그대로 옮깁니다.

완성된 프로젝트 전체는 `student_react_first/` 폴더에 있습니다.
