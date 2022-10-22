import {generateBookComponents} from "../helperFunctions";

function Bookshelf({shelfTitle, shelfList}) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{shelfTitle}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{
						generateBookComponents(shelfList)
					}
				</ol>
			</div>
		</div>
	);
}

export default Bookshelf;