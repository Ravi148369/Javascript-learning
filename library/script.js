class Library{
    constructor(){
        this.books
    }
    get availableBooks(){
        return this.books.filter(book => book.inStock > 0 &&  (book.reading + book.borrowed - book.returned) < book.inStock )
    }
    get allBookedBooks(){
        return this.books.filter(book=> book.reading)
    }
    get allReturnedBooks(){
        return this.books.filter(book => book.returned)
    }
    get allBorrowedBooks(){
        return this.books.filter(book => book.borrowed)
    }
    collectBook(bookTitle, author, borrow, quantity){
        const book = this.books.filter(book => bookTitle.toLowerCase() == book.title.toLowerCase() && author.toLowerCase() == book.author.toLowerCase())[0]        
        if(book && quantity <= book.inStock){
            book.inStock -= quantity
            borrow ? book.borrowed += quantity :book.reading += quantity
            return book.bookPlacement
        } else {
            return "OUT OF STOCK"
        }
    }
    returnBooks(ISBN, quantity){
        const book = this.allBookedBooks.filter(book => book.ISBN == ISBN )[0]
        if(book && quantity <= book.reading){
            book.inStock += quantity
            book.reading -= quantity
        } else {
            return "All books has not been returned"
        }
    }

    borrowBook(bookTitle, author){
        return this.collectBook(bookTitle, author, true)
    }
    returnBorrowBooks(ISBN, quantity){
        const book = this.allBorrowedBooks(book => book.ISBN == ISBN)[0]
        if(book && quantity <= book.borrowed) {
            book.inStock += quantity
            book.returned += quantity
            book.borrowed -= quantity
            return book.bookPlacement
        } else {
            return "All books has not been returned"
        }
    }
}
class Art extends Library{
    constructor(){
        super()
        this.books = [
            {
                title: 'Love is bitter',
                author: 'Ariane Grande',
                ISBN: 4029,
                inStock: 20,
                bookPlacement: 'Art|200|1',
                reading: 0,
                borrowed: 0,
                returned: 0
            },
            {
                title: 'Romeo and Juliet',
                author: 'William Shakespire',
                ISBN: 4129,
                inStock: 1,
                bookPlacement: 'Art|200|2',
                reading: 0,
                borrowed: 0,
                returned: 0
            },
            {
                title: 'The beauty of Art',
                author: 'John Doe',
                ISBN: 4429,
                inStock: 30,
                bookPlacement: 'Art|200|3',
                reading: 0,
                borrowed: 0,
                returned: 0
            }
        ]
    }
}
const art = new Art()
console.log(art.availableBooks);
console.log(art.allBookedBooks);
console.log(art.allReturnedBooks)




































// class LibrarySection {
//     constructor() {
//       this._books
//     }
  
//     get availableBooks() {
//       return this._books.filter((book) => {
//           return book.inStock && book.inStock >= book.reading && book.inStock >= book.borrowed
//       })
//     }
  
//     get allBookedBooks() {
//       return this._books.filter((book) => {
//         return book.reading;
//       });
//     }
  
//     get allBorrowedBooks() {
//       return this._books.filter((book) => {
//         return book.borrowed && book.borrowed >= book.returned;
//       });
//     }
  
//     get allReturnedBooks() {
//       // books originally borrowed
//       return this._books.filter((book) => {
//         return book.returned;
//       });
//     }
  
//     // collecting book from shelf
//     collectBook(bookTitle, author, borrow, quantity) {
//       // to arrive at the exact book, you have to spell correctly
//       const titleInRegex = new RegExp(bookTitle, 'gi');
//       const authorInRegex = new RegExp(author, 'gi')
//       const bookToUse = this.availableBooks.filter((book) => {
//         return titleInRegex.test(book.title) && authorInRegex.test(book.author)
//       })[0];
  
//       // reduce the number of stocked books by one
//       if (bookToUse && quantity <= bookToUse.inStock) {
//         bookToUse.inStock -= quantity;
//         borrow ? bookToUse.borrowed += 1 : bookToUse.reading += quantity;
//         return bookToUse.bookPlacement
//       } else {
//         return 'Out of stock'
//       }
//     }
  
//     // returning book back to shelf
//     returnBooks(ISBN, quantity) {
//       const bookToReturn = this.allBookedBooks.filter((bookedBook) => {
//         return bookedBook.ISBN === ISBN;
//       })[0];
  
//       if (bookToReturn && quantity <= bookToReturn.reading) {
//         bookToReturn.inStock += quantity;
//         bookToReturn.reading -= quantity;
//         return bookToReturn.bookPlacement;
//       } else {
//         return 'Not collected in the quantity provided'
//       }
//     }
  
//     // borrowing books from library
//     borrowBook(bookTitle, author) {
//       return this.collectBook(bookTitle, author, true);
//     }
  
//     // return borrowed books
//     returnBorrowedBooks(ISBN, quantity) {
//       const bookToReturn = this.allBorrowedBooks.filter((borrowedBook) => {
//         return borrowedBook.ISBN === ISBN;
//       })[0];
  
//       if (bookToReturn && quantity <= bookToReturn.borrowed) {
//         bookToReturn.inStock += quantity;
//         bookToReturn.returned += quantity;
//         bookToReturn.borrowed -= quantity;
//         return bookToReturn.bookPlacement;
//       } else {
//         return 'Not borrowed in the quantity provided'
//       }
//     }
//   }
  
//   class ArtSection extends LibrarySection {
//     constructor() {
//       super();
  
//       // accessing this array directly will lead to CONFUSION
//       this._books = [
//         {
//           title: 'Love is bitter',
//           author: 'Ariane Grande',
//           ISBN: 4029,
//           inStock: 20,
//           bookPlacement: 'Art|200|1',
//           reading: 0,
//           borrowed: 0,
//           returned: 0
//         },
//         {
//           title: 'Romeo and Juliet',
//           author: 'William Shakespire',
//           ISBN: 4129,
//           inStock: 1,
//           bookPlacement: 'Art|200|2',
//           reading: 0,
//           borrowed: 0,
//           returned: 0
//         },
//         {
//           title: 'The beauty of Art',
//           author: 'John Doe',
//           ISBN: 4429,
//           inStock: 30,
//           bookPlacement: 'Art|200|3',
//           reading: 0,
//           borrowed: 0,
//           returned: 0
//         }
//       ]
//     }
//   }
  
//   const art = new ArtSection();
//   art.collectBook('Love is Bitter', 'Ariane', false, 10);
//   art.returnBooks(4029, 2)
//   // // borrowing a book
//   art.borrowBook('Love is Bitter', 'Ariane Grande');
//   art.borrowBook('Romeo and Juliet', 'William Shakespire');
//   art.returnBorrowedBooks(4029, 1)
//   console.log(art.allBookedBooks)