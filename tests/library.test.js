describe('DOM Elements', () => {
    test('formContainer should exist', () => {
        expect(formContainer).toBeDefined();
    });

    test('wishlistContainer should exist', () => {
        expect(wishlistContainer).toBeDefined();
    });

    test('form should exist', () => {
        expect(form).toBeDefined();
    });

    // Add more tests for other DOM elements
});

describe('Helper Classes and Functions', () => {
    test('Book class should be defined', () => {
        expect(Book).toBeDefined();
    });

    test('WishlistBook class should be defined', () => {
        expect(WishlistBook).toBeDefined();
    });

    test('formOpenOrClosed should be defined', () => {
        expect(formOpenOrClosed).toBeDefined();
    });

    // Add more tests for other helper classes and functions
});

describe('Functionality', () => {
    beforeEach(() => {
        // Reset the books and wishlistBooks arrays before each test
        localStorage.setItem('books', JSON.stringify([]));
        localStorage.setItem('wishlistBooks', JSON.stringify([]));
        books = [];
        wishlistBooks = [];
    });

    test('Adding a book should update the books array and localStorage', () => {
        const bookTitle = 'Test Book';
        const bookAuthor = 'Test Author';
        const bookPages = 100;
        const bookRead = 'Yes';

        // Fill out the form and submit it
        document.getElementById('title').value = bookTitle;
        document.getElementById('author').value = bookAuthor;
        document.getElementById('pages').value = bookPages;
        document.getElementById('read').value = bookRead;
        form.submit();

        // Check if the book is added to the books array and localStorage
        expect(books).toHaveLength(1);
        expect(JSON.parse(localStorage.getItem('books'))).toHaveLength(1);
        expect(books[0].title).toBe(bookTitle);
        expect(books[0].author).toBe(bookAuthor);
        expect(books[0].pages).toBe(bookPages);
        expect(books[0].read).toBe(bookRead);
    });

    // Add more tests for other functionality
});
