/* ===========================================================
   [실습 5-10]  App.jsx 로 조립하기 (완성본)
   -----------------------------------------------------------
   놓을 위치 : student_react_first/src/App.jsx
   교재      : 06_React기초_실습_단계별.docx
   =========================================================== */

/* ===========================================================
   App.jsx — 4부의 main.js 자리
   -----------------------------------------------------------
   하는 일은 main.js 와 같습니다. 서버를 부르고, 그 결과로
   화면을 바꾸고, 사용자의 동작을 받아 처리합니다.

   달라진 것은 "화면을 바꾸는 방법" 하나뿐입니다.

     4부 : renderStudentTable(students)  — 내가 DOM 을 고친다
     5부 : setStudents(students)         — 값만 바꾸면 React 가 다시 그린다

   그래서 이 파일에는 document 가 한 번도 나오지 않습니다.
   =========================================================== */

import { useEffect, useRef, useState } from "react";

import {
    fetchStudents,
    fetchStudent,
    createStudent,
    updateStudent,
    deleteStudent,
} from "./api/studentApi.js";

import { validateStudent } from "./lib/validation.js";
import { EMPTY_FORM, toRequest, toFormValues } from "./lib/studentData.js";

import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";

import "./style.css";

/** 성공 메시지가 저절로 사라지기까지의 시간(ms) — 4부와 같다. */
const MESSAGE_TIMEOUT = 3000;

function App() {
    /* ---------------------------------------------------------
       화면을 이루는 값들
       -----------------------------------------------------------
       4부에서 전역 변수와 DOM 에 흩어져 있던 상태가 여기 모였습니다.
       이 여섯 개만 보면 화면이 어떤 모습인지 알 수 있습니다.
       --------------------------------------------------------- */
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);   // null 이면 등록 모드
    const [loading, setLoading] = useState(false);
    const [listError, setListError] = useState(null);
    const [message, setMessage] = useState(null);       // { text, type }

    /** 수정 버튼을 눌렀을 때 폼으로 스크롤하기 위한 참조 */
    const formRef = useRef(null);

    const isEditing = editingId !== null;

    /* ---------------------------------------------------------
       목록 불러오기
       --------------------------------------------------------- */
    async function loadStudents() {
        setLoading(true);
        setListError(null);

        try {
            const data = await fetchStudents();
            setStudents(data);
        } catch (error) {
            console.error("Error:", error);
            setMessage({ text: error.message, type: "error" });
            setListError("오류: 데이터를 불러올 수 없습니다.");
        } finally {
            // 성공하든 실패하든 로딩 표시는 반드시 끈다.
            setLoading(false);
        }
    }

    /* ---------------------------------------------------------
       처음 한 번만 목록을 불러온다
       -----------------------------------------------------------
       4부에서 파일 맨 아래에 적었던 loadStudents() 한 줄에 해당합니다.
       두 번째 인자 [] 는 "처음 한 번만" 이라는 뜻입니다.
       --------------------------------------------------------- */
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- 처음 한 번 목록을 불러오는 것은 의도된 동작입니다
        loadStudents();
    }, []);

    /* ---------------------------------------------------------
       성공 메시지는 3초 뒤에 저절로 사라진다
       -----------------------------------------------------------
       4부에서 messageTimer 변수를 두고 clearTimeout 을 부르던 일을
       useEffect 의 정리 함수(return)가 대신합니다. 메시지가 바뀌면
       React 가 이전 예약을 먼저 취소해 줍니다.
       --------------------------------------------------------- */
    useEffect(() => {
        if (message?.type !== "success") return;

        const timer = setTimeout(() => setMessage(null), MESSAGE_TIMEOUT);
        return () => clearTimeout(timer);
    }, [message]);

    /* ---------------------------------------------------------
       입력칸 한 개가 바뀔 때
       -----------------------------------------------------------
       기존 값을 펼친 뒤 바뀐 칸만 덮어씁니다.
       state 는 직접 고치지 않고 언제나 새 객체로 바꿉니다.
       --------------------------------------------------------- */
    function handleChange(name, value) {
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    /** 폼을 비우고 등록 모드로 되돌린다 — 4부 resetForm() */
    function resetForm() {
        setForm(EMPTY_FORM);
        setEditingId(null);
    }

    /* ---------------------------------------------------------
       등록 / 수정 — 폼 제출
       --------------------------------------------------------- */
    async function handleSubmit(event) {
        event.preventDefault();          // 페이지 새로고침 막기
        setMessage(null);

        const studentData = toRequest(form);

        // 검사에 걸리면 메시지만 보여 주고 끝낸다(early return).
        const errorMessage = validateStudent(studentData);
        if (errorMessage) {
            setMessage({ text: errorMessage, type: "error" });
            return;
        }

        try {
            if (isEditing) {
                await updateStudent(editingId, studentData);
                setMessage({ text: "학생 정보가 성공적으로 수정되었습니다.", type: "success" });
            } else {
                await createStudent(studentData);
                setMessage({ text: "학생이 성공적으로 등록되었습니다.", type: "success" });
            }

            resetForm();
            await loadStudents();         // 목록 새로고침
        } catch (error) {
            console.error("Error:", error);
            setMessage({ text: error.message, type: "error" });
        }
    }

    /* ---------------------------------------------------------
       수정할 학생을 불러와 폼에 채운다
       --------------------------------------------------------- */
    async function handleEdit(studentId) {
        setMessage(null);

        try {
            const student = await fetchStudent(studentId);

            setForm(toFormValues(student));
            setEditingId(studentId);
            formRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.error("Error:", error);
            setMessage({ text: error.message, type: "error" });
        }
    }

    /* ---------------------------------------------------------
       확인을 받은 뒤 삭제한다
       --------------------------------------------------------- */
    async function handleDelete(studentId) {
        if (!confirm("정말로 이 학생을 삭제하시겠습니까?")) {
            return;
        }

        try {
            await deleteStudent(studentId);
            setMessage({ text: "학생이 성공적으로 삭제되었습니다.", type: "success" });

            // 수정 중이던 학생을 삭제했다면 폼도 등록 모드로 되돌린다.
            if (editingId === studentId) {
                resetForm();
            }

            await loadStudents();
        } catch (error) {
            console.error("Error:", error);
            setMessage({ text: error.message, type: "error" });
        }
    }

    /* ---------------------------------------------------------
       화면
       -----------------------------------------------------------
       4부의 index.html 에 있던 내용이 여기로 왔습니다.
       값이 필요한 자리에는 중괄호로 state 를 끼워 넣습니다.
       --------------------------------------------------------- */
    return (
        <>
            <h1>학생 관리 시스템</h1>

            <StudentForm
                form={form}
                isEditing={isEditing}
                message={message}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                containerRef={formRef}
            />

            <StudentTable
                students={students}
                loading={loading}
                error={listError}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </>
    );
}

export default App;
