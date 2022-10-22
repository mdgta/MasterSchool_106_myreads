import "./App.css";
import {useState, useEffect} from "react";
import {get, getAll, update, search} from "./BooksAPI";
import Book from "./Book";
import Bookshelf from "./Bookshelf";

function App() {
	const [showSearchPage, setShowSearchpage] = useState(false);
	const [books, setBooks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	/* functionality */
	function updateBook(book, shelf) {
		console.log(`moving [${book.title}] to [${book.shelf}]: START`, book);
		update(book, shelf).then(data => {
			console.log(`moving [${book.title}] to [${book.shelf}]: DONE`, book);
			console.log("update data was:", data);
			const newBooksState = [...books];
			const existingBookIndex = newBooksState.findIndex(bookInOldList => bookInOldList.id === book.id);
			console.log({newBooksState: newBooksState.concat(), existingBookIndex});
			if (existingBookIndex > -1) {
				// remove if old state
				newBooksState.splice(existingBookIndex, 1);
			}
			if (!(shelf === "none")) {
				console.log("shelf was NOT none, so adding book to spliced list");
				newBooksState.push({...book, shelf});
			}
			console.log({newBooksState: newBooksState.concat(), existingBookIndex});
			setBooks(newBooksState);
		});
	}

	/* load books upon page loading/reload */
	useEffect(() => {
		getAll().then(data => {
			console.log(data);
			setBooks(data);
		});
	}, []);

	/* search functionality */
	useEffect(() => {
		console.log("searching for: " + searchTerm);
		// ignore upon page loading or when blanking the search bar
		if (searchTerm === "") {
			setSearchTerm("");
			return;
		}
		search(searchTerm).then(results => {
			console.log("search results:", results);
			if (!(results instanceof Array)) {
				// no results (regular object returned)- do nothing
				return;
			}
			setSearchResults(results.map(searchResultBook => {
				// check if a book already exists in user's shelves- if so add the shelf to the search result
				const existingMatch = books.find(existingBook => existingBook.id === searchResultBook.id);
				if (existingMatch) {
					searchResultBook.shelf = existingMatch.shelf;
				}
				// return book
				return searchResultBook;
			}));
		});
	}, [searchTerm]);

	return (
		<div className="app">
			{showSearchPage ? (
				<div className="search-books">
					<div className="search-books-bar">
						<a
							className="close-search"
							onClick={() => setShowSearchpage(!showSearchPage)}
						>
							Close
						</a>
						<div className="search-books-input-wrapper">
							<input
								type="text"
								placeholder="Search by title, author, or ISBN"
								value={searchTerm}
								onChange={(e) => {setSearchTerm(e.target.value)}}
							/>
						</div>
					</div>
					<div className="search-books-results">
						<ol className="books-grid">
							{
								searchResults.map(book => <Book bookData={book} key={book.id} updateBook={updateBook} />)
							}
						</ol>
					</div>
				</div>
			) : (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							<Bookshelf sourceList={books} shelfName="currentlyReading" shelfTitle="Currently Reading" updateBook={updateBook} />
							<Bookshelf sourceList={books} shelfName="wantToRead" shelfTitle="Want to Read" updateBook={updateBook} />
							<Bookshelf sourceList={books} shelfName="read" shelfTitle="Read" updateBook={updateBook} />
						</div>
					</div>
					<div className="open-search">
						<a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;