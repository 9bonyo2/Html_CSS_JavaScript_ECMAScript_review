// 도서 데이터 유효성 검사
export function validateBook(book) {
    // 필수 필드 검사
    if (!book.title) {
        
        return '제목을 입력해주세요.';
    }

    if (!book.author) {
        
        return '저자를 입력해주세요.';
    }

    if (!book.isbn) {
        
        return 'ISBN을 입력해주세요.';
    }

    // ISBN 형식 검사 (기본적인 영숫자 조합)
    const isbnPattern = /^[0-9X-]+$/;
    if (!isbnPattern.test(book.isbn)) {
        
        return '올바른 ISBN 형식이 아닙니다. (숫자와 X, -만 허용)';
    }

    // 가격 유효성 검사
    if (book.price !== null && book.price < 0) {
        
        return '가격은 0 이상이어야 합니다.';
    }

    // 페이지 수 유효성 검사
    if (book.bookDetail.pageCount !== null && book.bookDetail.pageCount < 0) {
        
        return '페이지 수는 0 이상이어야 합니다.';
    }

    // URL 형식 검사 (입력된 경우에만)
    if (book.bookDetail.coverImageUrl && !isValidUrl(book.bookDetail.coverImageUrl)) {
        
        return '올바른 이미지 URL 형식이 아닙니다.';
    }

    return '';
}