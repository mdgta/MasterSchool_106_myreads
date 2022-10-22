import Book from "./components/Book";

export function generateBookComponents(sourceList, updateBook) {
	return sourceList.map((book, i) => {
		const bookData = book;
		return <Book bookData={bookData} key={i} updateBook={updateBook} />
	})
}