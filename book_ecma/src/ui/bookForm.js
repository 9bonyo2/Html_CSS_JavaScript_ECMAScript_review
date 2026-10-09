export const bookForm = document.getElementById('bookForm');
export const submitButton = bookForm.querySelector('button[type="submit"]');
export const cancelButton = document.getElementById('cancelButton');

export function collectBookData() {
    const formData = new FormData(bookForm);
    console.log(FormData);
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
    return bookData;
}

export function fillForm(book) {
    bookForm.title.value = book.title;
    bookForm.author.value = book.author;
    bookForm.isbn.value = book.isbn;
    bookForm.price.value = book.price ?? '';
    bookForm.publishDate.value = book.publishDate ?? '';
    //상세 정보 
    bookForm.description.value = book.bookDetail?.description ?? '';
    bookForm.language.value = book.bookDetail?.language ?? '';
    bookForm.pageCount.value = book.bookDetail?.pageCount ?? '';
    bookForm.publisher.value = book.bookDetail?.publisher ?? '';
    bookForm.coverImageUrl.value = book.bookDetail?.coverImageUrl ?? '';
    bookForm.edition.value = book.bookDetail?.edition ?? '';
}

export function setEditMode(isEditing) {
    if (isEditing) {
        submitButton.textContent = '도서 수정';
        cancelButton.style.display = 'inline';
    } else {
        submitButton.textContent = '도서 등록';
        cancelButton.style.display = 'none';
    }
}

export function resetForm() {
    bookForm.reset();
    setEditMode(false);
}

export function scrollToForm(){
    bookForm.scrollIntoView({ behavior: 'smooth' });
}