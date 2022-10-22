import "./App.css";
import { useState, useEffect } from "react";
import {generateBookComponents} from "./helperFunctions";
import Bookshelf from "./components/Bookshelf";
import {get, getAll, update, search} from "./BooksAPI";

function App() {
	const [showSearchPage, setShowSearchpage] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	function updateBook(book, shelf) {
		update(book, shelf).then(data => {
			console.log("updated book:", {
				originalBookData: book,
				responseData: data,
				newShelf: shelf
			});
			getAll().then(updatedBookList => {
				setShelfCurrentlyReading(data.currentlyReading.map(id => updatedBookList.find(book => book.id === id)));
				setShelfWantToRead(data.wantToRead.map(id => updatedBookList.find(book => book.id === id)));
				setShelfRead(data.read.map(id => updatedBookList.find(book => book.id === id)));
			});
			/*
			setShelfCurrentlyReading(data.shelfCurrentlyReading);
			setShelfWantToRead(data.shelfWantToRead);
			setShelfRead(data.shelfRead);
			*/
		});
	}

//const {[0]:a, [1]:b} = useState([])

	const [shelfCurrentlyReading, setShelfCurrentlyReading] = useState([]);
	const [shelfWantToRead, setShelfWantToRead] = useState([]);
	const [shelfRead, setShelfRead] = useState([]);

	/* add books upon loading */
	useEffect(() => {
		getAll().then(data => {
			console.log(data);
			const shelves = {};
			const shelfUpdates = {
				currentlyReading: setShelfCurrentlyReading,
				wantToRead: setShelfWantToRead,
				read: setShelfRead
			};
			data.map(book => {
				shelves[book.shelf] = shelves[book.shelf] || [];
				shelves[book.shelf].push(book);
				setShelfCurrentlyReading(shelfCurrentlyReading.concat(book));
			});
			for (const shelf in shelves) {
				shelfUpdates[shelf](shelves[shelf])
			}
		});
	}, []);

	/* search functionality */
	useEffect(() => {
		// empty search or upon page loading- don't fetch anything and empty list
		if (searchTerm === "") {
			setSearchResults([]);
			return;
		}
		search(searchTerm).then(data => {
			if (!(data instanceof Array)) {
				// no results (regular object returned)
				// clear previous results if there are now 0 results
				setSearchResults([]);
				return;
			}
			setSearchResults(data);
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
								onChange={(e)=> {setSearchTerm(e.target.value)}}
							/>
						</div>
					</div>
					<div className="search-books-results">
						<ol className="books-grid">
							{
								generateBookComponents(searchResults, updateBook)
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
							<Bookshelf shelfTitle="Currently Reading" shelfList={shelfCurrentlyReading} updateBook={updateBook} />
							<Bookshelf shelfTitle="Want to Read" shelfList={shelfWantToRead} updateBook={updateBook} />
							<Bookshelf shelfTitle="Read" shelfList={shelfRead} updateBook={updateBook} />
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
