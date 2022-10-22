import {generateBookComponents} from "../helperFunctions";

function Bookshelf({shelfTitle, shelfList, updateBook}) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{shelfTitle}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{
						generateBookComponents(shelfList, updateBook)
					}
				</ol>
			</div>
		</div>
	);
}

export default Bookshelf;