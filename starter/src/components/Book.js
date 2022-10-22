function Book({bookData, updateBook}) {
	const {title, authors, imageLinks, shelf} = bookData;
	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
						width: 128,
						height: 193,
						backgroundImage: 'url("' + (imageLinks?.thumbnail || "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o=") + '")',
						backgroundSize: "cover"
					}}></div>
					<div className="book-shelf-changer">
						<select value={shelf} onChange={(e) => {console.log("trying to update book using updateBook:", updateBook); updateBook(bookData, e.target.value)}}>
							<option value="none" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">{authors?.[0] || "<Unknown Author>"}</div>
			</div>
		</li>
	);
}

export default Book;