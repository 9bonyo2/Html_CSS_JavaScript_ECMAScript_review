export const bookForm = document.getElementById('bookForm');

export function collectBookData(){
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