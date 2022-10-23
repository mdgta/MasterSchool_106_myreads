export function Bookshelf({sourceList, shelfName, shelfTitle, updateBook}) {
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
export function Book({bookData, updateBook}) {
	const {title, authors, shelf, imageLinks} = bookData;
	const imgUrl = imageLinks?.thumbnail || "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api";
	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage:
								'url("' + imgUrl + '")',
						}}
					></div>
					<div className="book-shelf-changer">
						<select value={shelf} onChange={(e) => {
								updateBook(bookData, e.target.value);
							}}>
							<option value="--none--" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">
					{
						(authors || []).map((author, i, list) => {
							return author + (i + 1 < list.length ? (i + 2 === list.length ? " and" : ",") : "")
						}).join(" ") || "<Unknown Author>"
					}
				</div>
			</div>
		</li>
	);
}