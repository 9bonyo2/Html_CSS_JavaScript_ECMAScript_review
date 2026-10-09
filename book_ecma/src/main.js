import "./style.css";
console.log(import.meta.env.VITE_API_BASE_URL);
import {
    createBook as apiCreateBook,
    updateBook as apiUpdateBook,
    deleteBook as apiDeleteBook,
    fetchBook,
    fetchBooks
} from "./api/bookApi.js";
import {bookForm, collectBookData, submitButton, cancelButton, setEditMode, resetForm, fillForm, scrollToForm} from "./ui/bookForm.js";
import {validateBook} from "./lib/validation.js";
import {showMessage, showError, showSuccess, clearMessages, setLoading} from "./ui/message.js"

// 전역 변수
let editingBookId = null; // 현재 수정 중인 도서 ID

// DOM 요소 참조
const bookTableBody = document.getElementById('bookTableBody');
//export const bookForm = document.getElementById('bookForm');
//const submitButton = bookForm.querySelector('button[type="submit"]');

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지 로드 완료');
    loadBooks();
});

// 폼 제출 이벤트 핸들러
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 폼 데이터 수집
    const bookData = collectBookData();

    // 도서 데이터 유효성 검사
    const message = validateBook(bookData);
    if (message) {
    //alert('등록에 실패했습니다.');
    showError(message);   // 과제 9 에서 만든다. 지금은 alert 으로 둔다
    return;
    }
    
    // 수정 모드인지 확인
    if (editingBookId) {
        updateBook(editingBookId, bookData);
    } else {
        createBook(bookData);
    }
});

//수정 취소 버튼
cancelButton.addEventListener('click', function() {
    resetForm();          // bookForm.js의 함수 호출
    editingBookId = null; // main.js 자신의 상태 직접 수정
});

// 도서 생성 함수
async function createBook(book) {
  try{
    setLoading(true);
    await apiCreateBook(book);
    showSuccess('등록되었습니다.');
    resetForm();
    loadBooks();
  }catch(error) {
        showError(error.message);
  }finally{
        setLoading(false);
  }
}

// URL 유효성 검사
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
}

// 도서 목록 로드 함수
async function loadBooks() {
    try{  
        const books = await fetchBooks();
        console.log(books);
        renderBookTable(books);
    }catch(error){
        console.error('Error:', error);
        alert('도서 목록을 불러오는데 실패했습니다.');
    }finally{
        console.log('로딩중');
    }
}

// 도서 테이블 렌더링
function renderBookTable(books) {
    bookTableBody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');

        const formattedPrice = book.price ? `₩${book.price.toLocaleString()}` : '-';
        const formattedDate = book.publishDate || '-';
        const publisher = book.bookDetail ? book.bookDetail.publisher || '-' : '-';

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${formattedPrice}</td>
            <td>${formattedDate}</td>
            <td>${publisher}</td>
            <td>
                <button class="edit-btn" onclick="editBook(${book.id})">수정</button>
                <button class="delete-btn" onclick="deleteBook(${book.id})">삭제</button>
                <button class="detail-btn" onclick="showBookDetail(${book.id})">상세</button>
            </td>
        `;

        bookTableBody.appendChild(row);
    });
}

// 도서 삭제 함수
async function deleteBook(bookId) {
    if (!confirm('정말로 이 도서를 삭제하시겠습니까?')) {
        return;
    }
    try{
      await apiDeleteBook(bookId);
      loadBooks();
    }catch(error){
        console.error('Error:', error);
        alert('도서 삭제에 실패했습니다.');
    }finally{
      console.log('삭제 로딩중');
    }
}

// 도서 수정 함수
async function editBook(bookId) {
    try{
    const book = await fetchBook(bookId);
    fillForm(book);
    // 수정 모드로 설정
    editingBookId = bookId;
    setEditMode(true);
    // 폼으로 스크롤
    scrollToForm();
  } catch(error){
    console.error('Error:', error);
    alert('도서 정보를 불러오는데 실패했습니다.');
  }
}

//도서 업데이트 함수
async function updateBook(bookId, bookData) {
  try{
    setLoading(true);
    await apiUpdateBook(bookId, bookData);
    showSuccess('수정되었습니다.');
    resetForm();
    loadBooks(); // 목록 새로고침
  } catch(error){
    showError(error.message);
  } finally{
    setLoading(false);
  }
}

// 도서 상세보기 함수
async function showBookDetail(bookId) {
  try{
      const book = await fetchBook(bookId);
      let detailInfo = `제목: ${book.title}\n`;
      detailInfo += `저자: ${book.author}\n`;
      detailInfo += `ISBN: ${book.isbn}\n`;
      detailInfo += `가격: ${book.price ? '₩' + book.price.toLocaleString() : '-'}\n`;
      detailInfo += `출판일: ${book.publishDate || '-'}\n\n`;

      if (book.bookDetail) {
      detailInfo += `설명: ${book.bookDetail.description || '-'}\n`;
      detailInfo += `언어: ${book.bookDetail.language || '-'}\n`;
      detailInfo += `페이지 수: ${book.bookDetail.pageCount || '-'}\n`;
      detailInfo += `출판사: ${book.bookDetail.publisher || '-'}\n`;
      detailInfo += `에디션: ${book.bookDetail.edition || '-'}\n`;
      detailInfo += `표지 이미지: ${book.bookDetail.coverImageUrl || '-'}`;
      }
      alert(detailInfo);
  }catch(error){
    console.error('Error:', error);
    alert('도서 정보를 불러오는데 실패했습니다.');
  }
}

window.editBook = editBook;
window.deleteBook = deleteBook;
window.showBookDetail = showBookDetail;
