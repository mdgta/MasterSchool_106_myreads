import Book from "./components/Book";
export function formatData(data) {
	const {id, title, authors, imageLinks} = data;
	return {
		id,
		title,
		author: (authors && authors[0]) || "<Unknown Author>",
		img: imageLinks?.thumbnail || "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o="
	};
}

export function generateBookComponents(sourceList) {
	return sourceList.map((book, i) => {
		const bookData = book;
		return <Book bookData={bookData} key={i} />
	})
}