import Book from "./Book";
function Bookshelf({sourceList, shelfName, shelfTitle, updateBook}) {
	const booksOnShelf = sourceList.filter(book => book.shelf === shelfName);
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{shelfTitle}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{
						booksOnShelf.map(book => <Book bookData={book} key={book.id} updateBook={updateBook} />)
					}
				</ol>
			</div>
		</div>
	);
}

export default Bookshelf;