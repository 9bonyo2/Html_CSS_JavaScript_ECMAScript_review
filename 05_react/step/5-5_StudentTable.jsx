/* ===========================================================
   [실습 5-5]  표를 컴포넌트로 — map 과 key
   -----------------------------------------------------------
   놓을 위치 : student_react_first/src/components/StudentTable.jsx
   교재      : 06_React기초_실습_단계별.docx
   =========================================================== */

/* ===========================================================
   학생 목록 표
   -----------------------------------------------------------
   4부 ui/studentTable.js 에서 사라진 것들입니다.

     createElement / appendChild   →  JSX 로 바로 쓴다
     innerHTML = ""                →  students 가 바뀌면 React 가 다시 그린다
     DocumentFragment              →  필요 없다
     data-action + 이벤트 위임     →  onClick 에 함수를 직접 넘긴다

   4부에서 이벤트 위임을 쓴 이유는 "행을 다시 그리면 이벤트가
   떨어져 나가기 때문" 이었습니다. React 는 그릴 때마다 onClick 을
   다시 붙여 주므로 그 문제가 없습니다.
   =========================================================== */

/** 표의 열 개수. colspan 에 쓴다. */
const COLUMN_COUNT = 7;

const HEADERS = ["이름", "학번", "주소", "전화번호", "이메일", "생년월일", "액션"];

/**
 * @param {object} props
 * @param {object[]} props.students 학생 배열
 * @param {boolean} props.loading 불러오는 중인가
 * @param {string|null} props.error 목록을 못 불러왔을 때의 메시지
 * @param {(id: number) => void} props.onEdit 수정 버튼을 눌렀을 때
 * @param {(id: number) => void} props.onDelete 삭제 버튼을 눌렀을 때
 */
function StudentTable({ students, loading, error, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <h2>학생 목록</h2>

            {/* 4부 setLoading() 대신 조건부 렌더링을 쓴다. */}
            {loading && <div className="loading">로딩 중...</div>}

            <table>
                <thead>
                    <tr>
                        {HEADERS.map((text) => (
                            <th key={text}>{text}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {error && (
                        <tr>
                            <td colSpan={COLUMN_COUNT} className="error-row">
                                {error}
                            </td>
                        </tr>
                    )}

                    {!error && students.length === 0 && !loading && (
                        <tr>
                            <td colSpan={COLUMN_COUNT} className="empty-row">
                                등록된 학생이 없습니다.
                            </td>
                        </tr>
                    )}

                    {!error &&
                        students.map(({ id, name, studentNumber, detail }) => (
                            // key 는 React 가 어느 행이 어느 행인지 알아보는 표시다.
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{studentNumber}</td>
                                <td>{detail?.address ?? "-"}</td>
                                <td>{detail?.phoneNumber ?? "-"}</td>
                                <td>{detail?.email ?? "-"}</td>
                                <td>{detail?.dateOfBirth ?? "-"}</td>
                                <td>
                                    {/* data-id 도 Number(id) 도 필요 없다. id 를 그대로 넘긴다. */}
                                    <button type="button" className="edit-btn" onClick={() => onEdit(id)}>
                                        수정
                                    </button>
                                    <button type="button" className="delete-btn" onClick={() => onDelete(id)}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
