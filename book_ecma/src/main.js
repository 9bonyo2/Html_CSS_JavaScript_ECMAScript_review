import "./style.css";
console.log(import.meta.env.VITE_API_BASE_URL);
import { fetchBooks } from "./api/bookApi.js";

// 전역 변수
const API_BASE_URL = 'http://localhost:8080';
let editingBookId = null; // 현재 수정 중인 도서 ID

// DOM 요소 참조
const bookForm = document.getElementById('bookForm');
const bookTableBody = document.getElementById('bookTableBody');
const submitButton = bookForm.querySelector('button[type="submit"]');

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지 로드 완료');
    loadBooks();
});

// 폼 제출 이벤트 핸들러
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(bookForm);
    const bookData = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
        isbn: formData.get('isbn').trim(),
        price: formData.get('price') ? parseInt(formData.get('price')) : null,
        publishDate: formData.get('publishDate') || null,
        bookDetail: {
            description: formData.get('description').trim(),
            language: formData.get('language').trim(),
            pageCount: formData.get('pageCount') ? parseInt(formData.get('pageCount')) : null,
            publisher: formData.get('publisher').trim(),
            coverImageUrl: formData.get('coverImageUrl').trim(),
            edition: formData.get('edition').trim()
        }
    };

    // 유효성 검사
    if (!validateBook(bookData)) {
        return;
    }

    // 수정 모드인지 확인
    if (editingBookId) {
        updateBook(editingBookId, bookData);
    } else {
        createBook(bookData);
    }
});

// 도서 생성 함수
function createBook(bookData) {
    fetch(`${API_BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('도서 등록에 실패했습니다.');
        }
        return response.json();
    })
    .then(result => {
        alert('도서가 성공적으로 등록되었습니다.');
        bookForm.reset();
        loadBooks(); // 목록 새로고침
    })
    .catch(error => {
        console.error('Error:', error);
        alert('도서 등록에 실패했습니다.');
    });
}

// 도서 데이터 유효성 검사
function validateBook(book) {
    // 필수 필드 검사
    if (!book.title) {
        alert('제목을 입력해주세요.');
        return false;
    }

    if (!book.author) {
        alert('저자를 입력해주세요.');
        return false;
    }

    if (!book.isbn) {
        alert('ISBN을 입력해주세요.');
        return false;
    }

    // ISBN 형식 검사 (기본적인 영숫자 조합)
    const isbnPattern = /^[0-9X-]+$/;
    if (!isbnPattern.test(book.isbn)) {
        alert('올바른 ISBN 형식이 아닙니다. (숫자와 X, -만 허용)');
        return false;
    }

    // 가격 유효성 검사
    if (book.price !== null && book.price < 0) {
        alert('가격은 0 이상이어야 합니다.');
        return false;
    }

    // 페이지 수 유효성 검사
    if (book.bookDetail.pageCount !== null && book.bookDetail.pageCount < 0) {
        alert('페이지 수는 0 이상이어야 합니다.');
        return false;
    }

    // URL 형식 검사 (입력된 경우에만)
    if (book.bookDetail.coverImageUrl && !isValidUrl(book.bookDetail.coverImageUrl)) {
        alert('올바른 이미지 URL 형식이 아닙니다.');
        return false;
    }

    return true;
}

// URL 유효성 검사
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// 도서 목록 로드 함수
function loadBooks() {
    fetch(`${API_BASE_URL}/api/books`)
        .then(response => {
            if (!response.ok) {
                throw new Error('도서 목록을 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(books => {
            renderBookTable(books);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 목록을 불러오는데 실패했습니다.');
        });
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
function deleteBook(bookId) {
    if (!confirm('정말로 이 도서를 삭제하시겠습니까?')) {
        return;
    }

    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('도서 삭제에 실패했습니다.');
        }
        alert('도서가 성공적으로 삭제되었습니다.');
        loadBooks(); // 목록 새로고침
    })
    .catch(error => {
        console.error('Error:', error);
        alert('도서 삭제에 실패했습니다.');
    });
}

// 도서 수정 함수
function editBook(bookId) {
    fetch(`${API_BASE_URL}/api/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('도서 정보를 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(book => {
            // 폼에 기본 도서 정보 채우기
            bookForm.title.value = book.title;
            bookForm.author.value = book.author;
            bookForm.isbn.value = book.isbn;
            bookForm.price.value = book.price || '';
            bookForm.publishDate.value = book.publishDate || '';

            // 폼에 상세 정보 채우기
            if (book.bookDetail) {
                bookForm.description.value = book.bookDetail.description || '';
                bookForm.language.value = book.bookDetail.language || '';
                bookForm.pageCount.value = book.bookDetail.pageCount || '';
                bookForm.publisher.value = book.bookDetail.publisher || '';
                bookForm.coverImageUrl.value = book.bookDetail.coverImageUrl || '';
                bookForm.edition.value = book.bookDetail.edition || '';
            }

            // 수정 모드로 설정
            editingBookId = bookId;
            submitButton.textContent = '도서 수정';

            // 폼으로 스크롤
            bookForm.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 정보를 불러오는데 실패했습니다.');
        });
}

// 도서 업데이트 함수
function updateBook(bookId, bookData) {
    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('도서 정보 수정에 실패했습니다.');
        }
        return response.json();
    })
    .then(result => {
        alert('도서 정보가 성공적으로 수정되었습니다.');
        resetForm();
        loadBooks(); // 목록 새로고침
    })
    .catch(error => {
        console.error('Error:', error);
        alert('도서 정보 수정에 실패했습니다.');
    });
}

// 도서 상세보기 함수
function showBookDetail(bookId) {
    fetch(`${API_BASE_URL}/api/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('도서 정보를 불러오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(book => {
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
        })
        .catch(error => {
            console.error('Error:', error);
            alert('도서 정보를 불러오는데 실패했습니다.');
        });
}

// 폼 초기화 함수
function resetForm() {
    bookForm.reset();
    editingBookId = null;
    submitButton.textContent = '도서 등록';
}

window.editBook = editBook;
window.deleteBook = deleteBook;
window.showBookDetail = showBookDetail;
